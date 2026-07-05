import "server-only";
import { cookies } from "next/headers";
import { API_BASE_URL, API_ENDPOINTS } from "@/constants/api";

type Session = { email: string; token: string; role: "ADMIN" | "USER" };
function roleFromToken(token: string): Session["role"] | null {
  try {
    const claims = JSON.parse(Buffer.from(token.split(".")[1], "base64url").toString("utf8"));
    if (claims.roles?.includes("ROLE_ADMIN")) return "ADMIN";
    if (claims.roles?.includes("ROLE_USER")) return "USER";
  } catch { return null; }
  return null;
}
export async function getVerifiedSession(): Promise<Session | null> {
  const value = (await cookies()).get("user_info")?.value;
  if (!value) return null;
  try {
    const stored = JSON.parse(value) as { email: string; token: string };
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH_VERIFY}`, { method: "POST", cache: "no-store", headers: { "Content-Type": "application/json" }, body: JSON.stringify(stored) });
    if (!response.ok) return null;
    const payload = await response.json();
    const token = payload.data?.token as string | undefined;
    const role = token ? roleFromToken(token) : null;
    return token && role ? { email: stored.email, token, role } : null;
  } catch { return null; }
}
