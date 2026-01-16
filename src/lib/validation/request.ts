import { RequestStatus } from "@/lib/types/request";

export interface CreateItemRequestInput {
  requestorName: string;
  itemRequested: string;
}

export interface EditStatusRequestInput {
  id: string;
  status: RequestStatus;
}

export interface BatchStatusUpdateInput {
  ids: string[];
  status: RequestStatus;
}

export interface BatchDeleteInput {
  ids: string[];
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidStringLength(
  value: string,
  lower: number,
  upper: number
): boolean {
  return value.length >= lower && value.length <= upper;
}

export function normalizeStatus(status: string): RequestStatus | null {
  const normalized = status.trim().toLowerCase();
  return Object.values(RequestStatus).includes(normalized as RequestStatus)
    ? (normalized as RequestStatus)
    : null;
}

export function isValidStatus(status: unknown): status is RequestStatus {
  if (!isNonEmptyString(status)) {
    return false;
  }
  return normalizeStatus(status) !== null;
}

export function validateCreateItemRequest(
  request: unknown
): CreateItemRequestInput | null {
  if (!request || typeof request !== "object") {
    return null;
  }

  const requestorName = (request as Record<string, unknown>).requestorName;
  const itemRequested = (request as Record<string, unknown>).itemRequested;

  if (!isNonEmptyString(requestorName) || !isNonEmptyString(itemRequested)) {
    return null;
  }

  const trimmedName = requestorName.trim();
  const trimmedItem = itemRequested.trim();

  if (
    !isValidStringLength(trimmedName, 3, 30) ||
    !isValidStringLength(trimmedItem, 2, 100)
  ) {
    return null;
  }

  return {
    requestorName: trimmedName,
    itemRequested: trimmedItem,
  };
}

export function validateEditStatusRequest(
  request: unknown
): EditStatusRequestInput | null {
  if (!request || typeof request !== "object") {
    return null;
  }

  const id = (request as Record<string, unknown>).id;
  const status = (request as Record<string, unknown>).status;

  if (!isNonEmptyString(id) || !isNonEmptyString(status)) {
    return null;
  }

  const normalizedStatus = normalizeStatus(status);
  if (!normalizedStatus) {
    return null;
  }

  return {
    id: id.trim(),
    status: normalizedStatus,
  };
}

function normalizeIdArray(ids: unknown): string[] | null {
  if (!Array.isArray(ids) || ids.length === 0) {
    return null;
  }
  const normalized = ids
    .filter((id) => isNonEmptyString(id))
    .map((id) => id.trim());
  return normalized.length === ids.length ? normalized : null;
}

export function validateBatchStatusUpdate(
  request: unknown
): BatchStatusUpdateInput | null {
  if (!request || typeof request !== "object") {
    return null;
  }

  const ids = (request as Record<string, unknown>).ids;
  const status = (request as Record<string, unknown>).status;
  const normalizedIds = normalizeIdArray(ids);

  if (!normalizedIds || !isNonEmptyString(status)) {
    return null;
  }

  const normalizedStatus = normalizeStatus(status);
  if (!normalizedStatus) {
    return null;
  }

  return {
    ids: normalizedIds,
    status: normalizedStatus,
  };
}

export function validateBatchDelete(
  request: unknown
): BatchDeleteInput | null {
  if (!request || typeof request !== "object") {
    return null;
  }

  const ids = (request as Record<string, unknown>).ids;
  const normalizedIds = normalizeIdArray(ids);

  if (!normalizedIds) {
    return null;
  }

  return {
    ids: normalizedIds,
  };
}
