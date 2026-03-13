import { NextRequest, NextResponse } from 'next/server';

async function sign(value: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(value));
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function verifyToken(token: string, secret: string): Promise<boolean> {
  const [timestamp, signature] = token.split('.');
  if (!timestamp || !signature) return false;

  const expected = await sign(timestamp, secret);
  if (expected !== signature) return false;

  const age = (Date.now() - parseInt(timestamp, 10)) / 1000;
  return age < 7 * 24 * 60 * 60; // 7 days
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes (except /admin/login)
  if (!pathname.startsWith('/admin') || pathname === '/admin/login') {
    return NextResponse.next();
  }

  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  const token = request.cookies.get('admin_session')?.value;
  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  const valid = await verifyToken(token, secret);
  if (!valid) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
