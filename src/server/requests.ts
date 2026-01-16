import { ObjectId, WithId } from "mongodb";
import { PAGINATION_PAGE_SIZE } from "@/lib/constants/config";
import {
  InvalidInputError,
  InvalidPaginationError,
} from "@/lib/errors/inputExceptions";
import { ItemRequest, RequestStatus } from "@/lib/types/request";
import { getRequestsCollection, RequestDocument } from "@/lib/db/mongodb";
import {
  normalizeStatus,
  validateBatchDelete,
  validateBatchStatusUpdate,
  validateCreateItemRequest,
  validateEditStatusRequest,
} from "@/lib/validation/request";

function toItemRequest(document: WithId<RequestDocument>): ItemRequest {
  const { _id, ...rest } = document;
  return {
    id: _id.toHexString(),
    ...rest,
  };
}

export async function getItemRequests(
  status: string | null,
  page: number
): Promise<ItemRequest[]> {
  if (!Number.isFinite(page) || page < 1) {
    throw new InvalidPaginationError(page, PAGINATION_PAGE_SIZE);
  }

  const collection = await getRequestsCollection();
  const filter: Partial<RequestDocument> = {};

  if (status !== null) {
    const normalizedStatus = normalizeStatus(status);
    if (!normalizedStatus) {
      throw new InvalidInputError("status filter");
    }
    filter.status = normalizedStatus;
  }

  const skip = (page - 1) * PAGINATION_PAGE_SIZE;
  const results = await collection
    .find(filter)
    .sort({ requestCreatedDate: -1 })
    .skip(skip)
    .limit(PAGINATION_PAGE_SIZE)
    .toArray();

  return results.map((doc) => toItemRequest(doc));
}

export async function createNewRequest(
  request: unknown
): Promise<ItemRequest> {
  const validatedRequest = validateCreateItemRequest(request);
  if (!validatedRequest) {
    throw new InvalidInputError("create item request");
  }

  const now = new Date();
  const newRequest: RequestDocument = {
    requestorName: validatedRequest.requestorName,
    itemRequested: validatedRequest.itemRequested,
    requestCreatedDate: now,
    lastEditedDate: now,
    status: RequestStatus.PENDING,
  };

  const collection = await getRequestsCollection();
  const result = await collection.insertOne(newRequest);

  return toItemRequest({ ...newRequest, _id: result.insertedId });
}

export async function editStatusRequest(
  request: unknown
): Promise<ItemRequest | null> {
  const validatedRequest = validateEditStatusRequest(request);
  if (!validatedRequest) {
    throw new InvalidInputError("edit item request");
  }

  if (!ObjectId.isValid(validatedRequest.id)) {
    throw new InvalidInputError("edit item ID");
  }

  const collection = await getRequestsCollection();
  const updated = await collection.findOneAndUpdate(
    { _id: new ObjectId(validatedRequest.id) },
    {
      $set: {
        status: validatedRequest.status,
        lastEditedDate: new Date(),
      },
    },
    { returnDocument: "after" }
  );

  if (!updated) {
    return null;
  }

  return toItemRequest(updated);
}

export async function editStatusRequestsBatch(
  request: unknown
): Promise<{ matchedCount: number; modifiedCount: number }> {
  const validatedRequest = validateBatchStatusUpdate(request);
  if (!validatedRequest) {
    throw new InvalidInputError("batch edit item request");
  }

  if (!validatedRequest.ids.every((id) => ObjectId.isValid(id))) {
    throw new InvalidInputError("batch edit item IDs");
  }

  const objectIds = validatedRequest.ids.map((id) => new ObjectId(id));
  const collection = await getRequestsCollection();
  const result = await collection.updateMany(
    { _id: { $in: objectIds } },
    {
      $set: {
        status: validatedRequest.status,
        lastEditedDate: new Date(),
      },
    }
  );

  return {
    matchedCount: result.matchedCount,
    modifiedCount: result.modifiedCount,
  };
}

export async function deleteRequestsBatch(
  request: unknown
): Promise<{ deletedCount: number }> {
  const validatedRequest = validateBatchDelete(request);
  if (!validatedRequest) {
    throw new InvalidInputError("batch delete item request");
  }

  if (!validatedRequest.ids.every((id) => ObjectId.isValid(id))) {
    throw new InvalidInputError("batch delete item IDs");
  }

  const objectIds = validatedRequest.ids.map((id) => new ObjectId(id));
  const collection = await getRequestsCollection();
  const result = await collection.deleteMany({ _id: { $in: objectIds } });

  return {
    deletedCount: result.deletedCount,
  };
}
