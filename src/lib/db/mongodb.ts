import { MongoClient } from "mongodb";
import { RequestStatus } from "@/lib/types/request";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || "crisis_corner";
const COLLECTION_NAME = "requests";

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI environment variable.");
}

const requestSchema = {
  bsonType: "object",
  required: ["requestorName", "itemRequested", "requestCreatedDate", "status"],
  additionalProperties: false,
  properties: {
    _id: {
      bsonType: "objectId",
    },
    requestorName: {
      bsonType: "string",
      minLength: 3,
      maxLength: 30,
    },
    itemRequested: {
      bsonType: "string",
      minLength: 2,
      maxLength: 100,
    },
    requestCreatedDate: {
      bsonType: "date",
    },
    lastEditedDate: {
      bsonType: ["date", "null"],
    },
    status: {
      bsonType: "string",
      enum: Object.values(RequestStatus),
    },
  },
};

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const client = new MongoClient(MONGODB_URI);
const clientPromise = global._mongoClientPromise ?? client.connect();

if (process.env.NODE_ENV !== "production") {
  global._mongoClientPromise = clientPromise;
}

let collectionReady = false;

async function ensureRequestsCollection(): Promise<void> {
  if (collectionReady) {
    return;
  }

  const db = (await clientPromise).db(MONGODB_DB);
  const existingCollections = await db
    .listCollections({ name: COLLECTION_NAME })
    .toArray();

  if (existingCollections.length === 0) {
    try {
      await db.createCollection(COLLECTION_NAME, {
        validator: { $jsonSchema: requestSchema },
        validationLevel: "strict",
        validationAction: "error",
      });
    } catch (error: unknown) {
      if (
        !(
          error &&
          typeof error === "object" &&
          "codeName" in error &&
          error.codeName === "NamespaceExists"
        )
      ) {
        throw error;
      }
    }
  }

  collectionReady = true;
}

export interface RequestDocument {
  requestorName: string;
  itemRequested: string;
  requestCreatedDate: Date;
  lastEditedDate: Date | null;
  status: RequestStatus;
}

export async function getRequestsCollection() {
  await ensureRequestsCollection();
  const db = (await clientPromise).db(MONGODB_DB);
  return db.collection<RequestDocument>(COLLECTION_NAME);
}
