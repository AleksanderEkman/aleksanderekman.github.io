import { error, type Handle } from '@sveltejs/kit';
import { RateLimiter } from 'sveltekit-rate-limiter/server';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';
import { config } from 'dotenv';

config();

const limiter = new RateLimiter({
	IP: [1000, 'd'],
	IPUA: [1000, 'h']
});

const securityHeaders = {
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(self), microphone=()',
    'Access-Control-Allow-Origin': 'https://www.aleksanderekman.no',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    Vary: 'Origin',
    'Cache-Control': 'public, max-age=3600'
};

export const handle: Handle = async ({ event, resolve }) => {
    try {
        decodeURI(event.url.pathname);
    } catch (uriError) {
        // Handle malformed URI
        console.error('Malformed URI:', event.url.pathname);
        throw error(400, 'Bad Request: Malformed URI');
    }
    // Apply rate limiting
    if (await limiter.isLimited(event)) {
        throw error(429, 'Too Many Requests');
    }

    event.locals.supabase = createSupabaseServerClient({
        supabaseUrl: process.env.SUPABASE_URL!,
        supabaseKey: process.env.SUPABASE_ANON_KEY!,
        event
    });

    event.locals.getSession = async () => {
        const { data: { session } } = await event.locals.supabase.auth.getSession();
        return session;
    };
    const session = await event.locals.getSession(); 
    const location = event.url.pathname
    if (location.startsWith('/admin')) {
        if (!session) {
            throw redirect(303, '/');
        }
    } else if (location.startsWith('/secure')) {
        if (session) {
            throw redirect(303, '/admin-dashboard767d24c-a69a-448d-a025-5db944c51167')
        }
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
        transformPageChunk: ({ html }) => html.replace(/<script type="module" src="\/_app\/start-[a-z0-9]+\.js"><\/script>/, '')
    });

    response.headers.set('Strict-Transport-Security', securityHeaders['Strict-Transport-Security']);
    response.headers.set('X-Frame-Options', securityHeaders['X-Frame-Options']);
    response.headers.set('X-Content-Type-Options', securityHeaders['X-Content-Type-Options']);
    response.headers.set('Referrer-Policy', securityHeaders['Referrer-Policy']);
    response.headers.set('Permissions-Policy', securityHeaders['Permissions-Policy']);
    response.headers.set('Access-Control-Allow-Origin', securityHeaders['Access-Control-Allow-Origin']);
    response.headers.set('Access-Control-Allow-Methods', securityHeaders['Access-Control-Allow-Methods']);
    response.headers.set('Access-Control-Allow-Headers', securityHeaders['Access-Control-Allow-Headers']);
    response.headers.set('Vary', securityHeaders['Vary']);
    if (location.startsWith('/admin') || location.startsWith('/secure')) {
        response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    } else {
        response.headers.set('Cache-Control', securityHeaders['Cache-Control']);
    }
    return response;
};