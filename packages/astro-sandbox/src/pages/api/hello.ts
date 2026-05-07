import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ request }) => {
  const data = {
    message: 'Hello from Astro API!',
    timestamp: new Date().toISOString(),
    server: 'Node.js',
    adapter: '@astrojs/node',
    method: request.method,
    url: request.url,
  };

  return new Response(JSON.stringify(data, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    return new Response(
      JSON.stringify(
        {
          message: 'Data received!',
          received: body,
          timestamp: new Date().toISOString(),
        },
        null,
        2
      ),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
// Test comment
