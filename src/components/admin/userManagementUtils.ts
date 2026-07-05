export type UserRole = "ADMIN" | "USER";

export type ManagedUser = {
  id: string | number;
  email: string;
  name: string;
  role: UserRole;
  enabled: boolean;
};

export type UserDraft = {
  email: string;
  name: string;
  role: UserRole;
  enabled: boolean;
  password: string;
};

export const emptyUserDraft: UserDraft = {
  email: "",
  name: "",
  role: "USER",
  enabled: true,
  password: "",
};

const asRecord = (value: unknown): Record<string, unknown> | null =>
  typeof value === "object" && value !== null
    ? (value as Record<string, unknown>)
    : null;

function normalizeUser(candidate: unknown): ManagedUser | null {
  const user = asRecord(candidate);
  const email = user?.email ?? user?.userEmail;
  if (!user || user.id == null || typeof email !== "string") return null;
  const rawRole = String(user.role ?? "USER").replace(/^ROLE_/, "");
  return {
    id: user.id as string | number,
    email,
    name:
      typeof user.clientName === "string"
        ? user.clientName
        : typeof user.name === "string"
          ? user.name
          : "",
    role: rawRole === "ADMIN" ? "ADMIN" : "USER",
    enabled:
      typeof user.enabled === "boolean"
        ? user.enabled
        : typeof user.is_enabled === "boolean"
          ? user.is_enabled
          : true,
  };
}

export function unwrapUsers(payload: unknown): ManagedUser[] {
  const root = asRecord(payload);
  const data = root?.data ?? payload;
  const dataRecord = asRecord(data);
  const candidates = Array.isArray(data)
    ? data
    : Array.isArray(dataRecord?.users)
      ? dataRecord.users
      : Array.isArray(dataRecord?.content)
        ? dataRecord.content
        : [];

  return candidates.flatMap((candidate) => {
    const user = normalizeUser(candidate);
    return user ? [user] : [];
  });
}

export function unwrapUser(payload: unknown): ManagedUser | null {
  const root = asRecord(payload);
  return normalizeUser(root?.data ?? payload);
}

export async function userRequest(
  path: string,
  email: string,
  token: string,
  data: Record<string, unknown> = {},
) {
  const response = await fetch(path, {
    method: "POST",
    body: JSON.stringify({ ...data, email, token }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Auth-Email": email,
      "X-Auth-Token": token,
    },
  });
  const text = await response.text();
  let payload: unknown = null;
  try {
    payload = text ? JSON.parse(text) : null;
  } catch {
    payload = text;
  }
  if (!response.ok) {
    const record = asRecord(payload);
    throw new Error(
      typeof record?.message === "string"
        ? record.message
        : "Požadavek se nepodařilo dokončit.",
    );
  }
  return payload;
}
