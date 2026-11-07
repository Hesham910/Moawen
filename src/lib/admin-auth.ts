import { safeEqual } from "@/lib/rate-limit";

/**
 * Admin authorization helper shared by the admin API routes. The secret must
 * be provided through the ADMIN_SECRET environment variable — there is
 * deliberately NO default value, so a misconfigured deployment fails closed
 * instead of leaving the CMS open.
 */
export function isAdminAuthorized(request: Request): boolean {
  const expectedSecret = process.env.ADMIN_SECRET;
  if (!expectedSecret) return false;
  const provided = request.headers.get("x-admin-secret") || "";
  if (provided.length === 0) return false;
  return safeEqual(provided, expectedSecret);
}

export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_SECRET);
}
