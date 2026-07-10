import { ApiErrorResponse, ApiSuccessResponse } from "./types.ts";
import { corsHeaders } from "./cors.ts";

export function success<T>(message: string, data?: T, status = 200): Response {
  const body: ApiSuccessResponse<T> = {
    success: true,
    message,
    data,
  };

  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

export function error(
  message: string,
  status = 400,
  errors?: Record<string, string | string[]>,
): Response {
  const body: ApiErrorResponse = {
    success: false,
    message,
    errors,
  };

  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

export function created<T>(message: string, data?: T): Response {
  return success(message, data, 201);
}

export function badRequest(
  message = "Bad request.",
  errors?: Record<string, string | string[]>,
): Response {
  return error(message, 400, errors);
}

export function unauthorized(message = "Unauthorized."): Response {
  return error(message, 401);
}

export function forbidden(message = "Forbidden."): Response {
  return error(message, 403);
}

export function notFound(message = "Resource not found."): Response {
  return error(message, 404);
}

export function serverError(message = "An unexpected server error occurred."): Response {
  return error(message, 500);
}
