import { defineMiddleware, sequence } from 'astro:middleware';

// Advanced: Comprehensive middleware demonstrating authentication,
// logging, rewrites, and context.locals usage

// Type augmentation for context.locals
declare module 'astro' {
  interface Locals {
    user?: {
      id: string;
      name: string;
      role: 'admin' | 'user' | 'guest';
    };
    requestId: string;
    requestTime: number;
  }
}

// Middleware 1: Request tracking
const requestTracker = defineMiddleware(async (context, next) => {
  // Add request ID and timestamp to context.locals
  context.locals.requestId = crypto.randomUUID();
  context.locals.requestTime = Date.now();

  console.warn(`[${context.locals.requestId}] ${context.request.method} ${context.url.pathname}`);

  const response = await next();

  const duration = Date.now() - context.locals.requestTime;
  console.warn(
    `[${context.locals.requestId}] Response: ${String(response.status)} (${String(duration)}ms)`
  );

  // Add custom headers
  response.headers.set('X-Request-ID', context.locals.requestId);
  response.headers.set('X-Response-Time', `${String(duration)}ms`);

  return response;
});

// Middleware 2: Authentication simulation
const authChecker = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Simulate user authentication based on cookie or header
  const authToken = context.cookies.get('auth-token')?.value;
  const authHeader = context.request.headers.get('Authorization');

  if (authToken === 'admin-token' || authHeader === 'Bearer admin-token') {
    context.locals.user = {
      id: '1',
      name: 'Admin User',
      role: 'admin',
    };
  } else if (authToken === 'user-token' || authHeader === 'Bearer user-token') {
    context.locals.user = {
      id: '2',
      name: 'Regular User',
      role: 'user',
    };
  } else {
    context.locals.user = {
      id: 'guest',
      name: 'Guest',
      role: 'guest',
    };
  }

  // Protect admin routes
  if (pathname.startsWith('/routing-and-navigation-middleware-admin')) {
    if (context.locals.user.role !== 'admin') {
      console.warn(
        `[${context.locals.requestId}] Access denied: ${context.locals.user.role} tried to access admin area`
      );

      // Rewrite to access-denied page instead of redirect
      return context.rewrite('/routing-and-navigation-middleware-access-denied');
    }
  }

  // Protect user routes (admin and user allowed)
  if (pathname.startsWith('/routing-and-navigation-middleware-protected')) {
    if (context.locals.user.role === 'guest') {
      console.warn(`[${context.locals.requestId}] Guest tried to access protected area`);

      // Rewrite to login page
      return context.rewrite('/routing-and-navigation-middleware-login');
    }
  }

  return next();
});

// Middleware 3: API rate limiting simulation
const rateLimiter = defineMiddleware(async (context, next) => {
  // Only apply to API routes
  if (context.url.pathname.startsWith('/api/')) {
    const rateLimitHeader = context.request.headers.get('X-Rate-Limit');

    if (rateLimitHeader === 'exceeded') {
      return new Response(
        JSON.stringify({
          error: 'Rate limit exceeded',
          retryAfter: 60,
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': '60',
          },
        }
      );
    }
  }

  return next();
});

// Export middleware chain using sequence()
export const onRequest = sequence(requestTracker, authChecker, rateLimiter);
