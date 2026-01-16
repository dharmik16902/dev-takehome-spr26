import { ServerResponseBuilder } from "@/lib/builders/serverResponseBuilder";
import { InputException } from "@/lib/errors/inputExceptions";
import { HTTP_STATUS_CODE, ResponseType } from "@/lib/types/apiResponse";
import {
  createNewRequest,
  editStatusRequest,
  getItemRequests,
} from "@/server/requests";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const status = url.searchParams.get("status");
  const pageParam = url.searchParams.get("page");
  const page = pageParam ? Number(pageParam) : 1;

  try {
    const requests = await getItemRequests(status, page);
    return new Response(JSON.stringify(requests), {
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

export async function PUT(request: Request) {
  try {
    const req = await request.json();
    const newRequest = await createNewRequest(req);
    return new Response(JSON.stringify(newRequest), {
      status: HTTP_STATUS_CODE.CREATED,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error instanceof InputException) {
      return new ServerResponseBuilder(ResponseType.INVALID_INPUT).build();
    }
    return new ServerResponseBuilder(ResponseType.UNKNOWN_ERROR).build();
  }
}

export async function PATCH(request: Request) {
  try {
    const req = await request.json();
    const editedRequest = await editStatusRequest(req);

    if (!editedRequest) {
      return new Response(JSON.stringify({ message: "Request not found." }), {
        status: HTTP_STATUS_CODE.NOT_FOUND,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(editedRequest), {
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
