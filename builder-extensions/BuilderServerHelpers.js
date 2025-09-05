import { cookies } from "next/headers";

// Server-side helpers for Builder extensions. Use these from server components.
export async function getCookieToken(cookieName = "access_token") {
  // Await the cookie store so callers that follow the pattern in app routes work reliably
  const cookieStore = await cookies();
  return cookieStore.get(cookieName)?.value ?? null;
}

// Parse searchParams safely in server components.
// Usage: const params = await parseSearchParams(searchParams, ["page","search"])
export async function parseSearchParams(searchParams, allowedKeys = []) {
  const params = await searchParams;
  if (!params) return {};
  return Object.fromEntries(
    Object.entries(params).filter(
      ([key, value]) =>
        (!allowedKeys.length || allowedKeys.includes(key)) && typeof value === "string"
    )
  );
}
