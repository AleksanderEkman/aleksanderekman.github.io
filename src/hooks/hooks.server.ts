import { error, type Handle } from '@sveltejs/kit';
import { RateLimiter } from 'sveltekit-rate-limiter/server';

const limiter = new RateLimiter({
    IP: [100, 'd'],
    IPUA: [1000, 'h']
});

const securityHeaders = {
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(self), microphone=()',
    'Access-Control-Allow-Origin': 'https://portfolio-weld-eight-38.vercel.app',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    Vary: 'Origin',
    'Cache-Control': 'public, max-age=3600'
};

export const handle: Handle = async ({ event, resolve }) => {
    // Apply rate limiting
    if (await limiter.isLimited(event)) {
        throw error(429, 'Too Many Requests');
    }

    if (event.request.method === 'OPTIONS') {
        return new Response(null, {
            headers: {
                ...securityHeaders,
                'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            }
        });
    }

    const response = await resolve(event, {
        transformPageChunk: ({ html }) => html
    });

    for (const [key, value] of Object.entries(securityHeaders)) {
        response.headers.set(key, value);
    }

    return response;
};