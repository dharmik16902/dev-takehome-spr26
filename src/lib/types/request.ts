export enum RequestStatus {
  PENDING = "pending",
  APPROVED = "approved",
  COMPLETED = "completed",
  REJECTED = "rejected",
}

export interface ItemRequest {
  id: string;
  requestorName: string;
  itemRequested: string;
  requestCreatedDate: Date;
  lastEditedDate: Date | null;
  status: RequestStatus;
}
