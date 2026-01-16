import { ServerResponseBuilder } from "@/lib/builders/serverResponseBuilder";
import { InputException } from "@/lib/errors/inputExceptions";
import { HTTP_STATUS_CODE, ResponseType } from "@/lib/types/apiResponse";
import {
  deleteRequestsBatch,
  editStatusRequestsBatch,
} from "@/server/requests";

export const runtime = "nodejs";

export async function PATCH(request: Request) {
  try {
    const req = await request.json();
    const result = await editStatusRequestsBatch(req);
    return new Response(JSON.stringify(result), {
      status: HTTP_STATUS_CODE.OK,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error instanceof InputException) {
      return new ServerResponseBuilder(ResponseType.INVALID_INPUT).build();
    }
    return new ServerResponseBuilder(ResponseType.UNKNOWN_ERROR).build();
  }
}

export async function DELETE(request: Request) {
  try {
    const req = await request.json();
    const result = await deleteRequestsBatch(req);
    return new Response(JSON.stringify(result), {
      status: HTTP_STATUS_CODE.OK,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error instanceof InputException) {
      return new ServerResponseBuilder(ResponseType.INVALID_INPUT).build();
    }
    return new ServerResponseBuilder(ResponseType.UNKNOWN_ERROR).build();
  }
}
