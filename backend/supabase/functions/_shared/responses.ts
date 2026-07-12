const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

export function optionsResponse() {
  return new Response("ok", {
    headers: corsHeaders,
  });
}

export function successResponse(data: unknown, message: string, status = 200) {
  return new Response(
    JSON.stringify({
      success: true,
      message,
      data,
    }),
    {
      status,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    },
  );
}

export function errorResponse(message: string, status = 500) {
  return new Response(
    JSON.stringify({
      success: false,
      message,
    }),
    {
      status,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    },
  );
}
