import { cookies } from 'next/headers';

const SESSION_COOKIE = 'admin_session';
const SESSION_MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds

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
  return Buffer.from(signature).toString('hex');
}

async function verify(value: string, signature: string, secret: string): Promise<boolean> {
  const expected = await sign(value, secret);
  return expected === signature;
}

export async function createSession(): Promise<void> {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) throw new Error('ADMIN_PASSWORD not set');

  const timestamp = Date.now().toString();
  const signature = await sign(timestamp, secret);
  const token = `${timestamp}.${signature}`;

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  });
}

export async function verifySession(token: string): Promise<boolean> {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret || !token) return false;

  const [timestamp, signature] = token.split('.');
  if (!timestamp || !signature) return false;

  const isValid = await verify(timestamp, signature, secret);
  if (!isValid) return false;

  // Check expiry
  const age = (Date.now() - parseInt(timestamp, 10)) / 1000;
  return age < SESSION_MAX_AGE;
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function checkPassword(password: string): Promise<boolean> {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return password === expected;
}
