import type { APIRoute } from 'astro';

// Advanced: Multi-method API endpoint with full CRUD operations
// Demonstrates GET, POST, PUT, PATCH, DELETE, and ALL

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

// In-memory store (in production, use a database)
const users: Map<string, User> = new Map([
  [
    '1',
    {
      id: '1',
      name: 'Alice Admin',
      email: 'alice@example.com',
      role: 'admin',
      createdAt: new Date().toISOString(),
    },
  ],
  [
    '2',
    {
      id: '2',
      name: 'Bob User',
      email: 'bob@example.com',
      role: 'user',
      createdAt: new Date().toISOString(),
    },
  ],
]);

// GET: Retrieve user(s)
export const GET: APIRoute = ({ params, request }) => {
  const url = new URL(request.url);
  const id = params.id;

  // Get single user
  if (id && id !== 'all') {
    const user = users.get(id);
    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Get all users with optional filtering
  const role = url.searchParams.get('role');
  let allUsers = Array.from(users.values());

  if (role) {
    allUsers = allUsers.filter((u) => u.role === role);
  }

  return new Response(
    JSON.stringify({
      users: allUsers,
      count: allUsers.length,
      filters: { role: role || 'none' },
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};

// POST: Create new user
export const POST: APIRoute = async ({ request }) => {
  try {
    const body = (await request.json()) as Partial<User>;

    if (!body.name || !body.email) {
      return new Response(JSON.stringify({ error: 'Name and email are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const newUser: User = {
      id: String(users.size + 1),
      name: body.name,
      email: body.email,
      role: body.role || 'user',
      createdAt: new Date().toISOString(),
    };

    users.set(newUser.id, newUser);

    return new Response(
      JSON.stringify({
        message: 'User created successfully',
        user: newUser,
      }),
      {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
          Location: `/routing-and-navigation-api-users/${newUser.id}`,
        },
      }
    );
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// PUT: Replace entire user
export const PUT: APIRoute = async ({ params, request }) => {
  const { id } = params;

  if (!id || id === 'all') {
    return new Response(JSON.stringify({ error: 'User ID is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!users.has(id)) {
    return new Response(JSON.stringify({ error: 'User not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = (await request.json()) as Partial<User>;

    if (!body.name || !body.email) {
      return new Response(JSON.stringify({ error: 'Name and email are required for PUT' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const existingUser = users.get(id);
    if (!existingUser) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const updatedUser: User = {
      ...existingUser,
      name: body.name,
      email: body.email,
      role: body.role || 'user',
    };

    users.set(id, updatedUser);

    return new Response(
      JSON.stringify({
        message: 'User replaced successfully',
        user: updatedUser,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// PATCH: Update partial user data
export const PATCH: APIRoute = async ({ params, request }) => {
  const { id } = params;

  if (!id || id === 'all') {
    return new Response(JSON.stringify({ error: 'User ID is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const existingUser = users.get(id);
  if (!existingUser) {
    return new Response(JSON.stringify({ error: 'User not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = (await request.json()) as Partial<User>;

    const updatedUser: User = {
      ...existingUser,
      ...body,
      id: existingUser.id, // Preserve ID
      createdAt: existingUser.createdAt, // Preserve creation date
    };

    users.set(id, updatedUser);

    return new Response(
      JSON.stringify({
        message: 'User updated successfully',
        user: updatedUser,
        updated: Object.keys(body),
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// DELETE: Remove user
export const DELETE: APIRoute = ({ params }) => {
  const { id } = params;

  if (!id || id === 'all') {
    return new Response(JSON.stringify({ error: 'User ID is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!users.has(id)) {
    return new Response(JSON.stringify({ error: 'User not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const deletedUser = users.get(id);
  users.delete(id);

  return new Response(
    JSON.stringify({
      message: 'User deleted successfully',
      user: deletedUser,
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};

// ALL: Catch-all for other methods
export const ALL: APIRoute = ({ request }) => {
  return new Response(
    JSON.stringify({
      error: `Method ${request.method} not supported`,
      supported: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    }),
    {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
        Allow: 'GET, POST, PUT, PATCH, DELETE',
      },
    }
  );
};
