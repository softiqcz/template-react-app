"use client";

import {
  ArrowPathIcon,
  KeyIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { type FormEvent, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MyDialog,
  MyDialogCloseButton,
  MyDialogContainer,
  MyDialogSurface,
} from "@/components/ui/my-dialog";
import { API_BASE_URL, API_ENDPOINTS } from "@/constants/api";
import {
  emptyUserDraft,
  type ManagedUser,
  type UserDraft,
  unwrapUser,
  unwrapUsers,
  userRequest,
} from "./userManagementUtils";

type FormMode = "create" | "edit" | "password" | null;

const endpoint = (path: string) => `${API_BASE_URL}${path}`;

export function UserManagement({
  email,
  token,
}: {
  email: string;
  token: string;
}) {
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [mode, setMode] = useState<FormMode>(null);
  const [selected, setSelected] = useState<ManagedUser | null>(null);
  const [draft, setDraft] = useState<UserDraft>(emptyUserDraft);
  const [deleteTarget, setDeleteTarget] = useState<ManagedUser | null>(null);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      setUsers(
        unwrapUsers(
          await userRequest(
            endpoint(API_ENDPOINTS.ADMIN_USERS_GET),
            email,
            token,
          ),
        ),
      );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Uživatele se nepodařilo načíst.",
      );
    } finally {
      setLoading(false);
    }
  }, [email, token]);

  useEffect(() => void loadUsers(), [loadUsers]);

  const closeForm = () => {
    setMode(null);
    setSelected(null);
    setDraft(emptyUserDraft);
  };

  const openEdit = async (user: ManagedUser) => {
    try {
      const detail =
        unwrapUser(
          await userRequest(
            endpoint(API_ENDPOINTS.ADMIN_USERS_GET_ONE),
            email,
            token,
            { id: user.id },
          ),
        ) ?? user;
      setSelected(detail);
      setDraft({ ...detail, password: "" });
      setMode("edit");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Detail uživatele se nepodařilo načíst.",
      );
    }
  };

  const openPassword = (user: ManagedUser) => {
    setSelected(user);
    setDraft({ ...emptyUserDraft, password: "" });
    setMode("password");
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    try {
      if (mode === "password" && selected) {
        await userRequest(
          endpoint(API_ENDPOINTS.ADMIN_USERS_CHANGE_PASSWORD),
          email,
          token,
          { id: selected.id, password: draft.password },
        );
        toast.success("Heslo bylo změněno.");
      } else {
        const body = {
          userEmail: draft.email.trim(),
          clientName: draft.name.trim(),
          role: draft.role,
          enabled: draft.enabled,
          ...(mode === "create" ? { password: draft.password } : {}),
          ...(mode === "edit" && selected ? { id: selected.id } : {}),
        };
        await userRequest(
          mode === "edit" && selected
            ? endpoint(API_ENDPOINTS.ADMIN_USERS_UPDATE)
            : endpoint(API_ENDPOINTS.ADMIN_USERS_CREATE),
          email,
          token,
          body,
        );
        toast.success(
          mode === "edit" ? "Uživatel byl upraven." : "Uživatel byl vytvořen.",
        );
      }
      closeForm();
      await loadUsers();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Změnu se nepodařilo uložit.",
      );
    } finally {
      setSaving(false);
    }
  };

  const removeUser = async () => {
    if (!deleteTarget) return;
    setSaving(true);
    try {
      await userRequest(
        endpoint(API_ENDPOINTS.ADMIN_USERS_DELETE),
        email,
        token,
        { id: deleteTarget.id },
      );
      toast.success("Uživatel byl odstraněn.");
      setDeleteTarget(null);
      await loadUsers();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Uživatele se nepodařilo odstranit.",
      );
    } finally {
      setSaving(false);
    }
  };

  const userForm = mode ? (
    <form onSubmit={submit} className="p-6" aria-labelledby="user-form-title">
      <div className="flex items-start justify-between gap-4">
        <h3 id="user-form-title" className="text-xl font-medium">
          {mode === "create"
            ? "Nový uživatel"
            : mode === "edit"
              ? "Upravit uživatele"
              : `Změnit heslo: ${selected?.email}`}
        </h3>
        <MyDialogCloseButton aria-label="Zavřít dialog" onClick={closeForm} />
      </div>
      {mode === "password" ? (
        <div className="mt-6">
          <Field label="Nové heslo" id="management-password">
            <Input
              id="management-password"
              type="password"
              minLength={8}
              required
              autoComplete="new-password"
              autoFocus
              value={draft.password}
              onChange={(e) =>
                setDraft((d) => ({ ...d, password: e.target.value }))
              }
            />
          </Field>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Field label="Jméno" id="management-name">
            <Input
              id="management-name"
              required
              autoFocus
              value={draft.name}
              onChange={(e) =>
                setDraft((d) => ({ ...d, name: e.target.value }))
              }
            />
          </Field>
          <Field label="E-mail" id="management-email">
            <Input
              id="management-email"
              type="email"
              required
              autoComplete="email"
              value={draft.email}
              onChange={(e) =>
                setDraft((d) => ({ ...d, email: e.target.value }))
              }
            />
          </Field>
          {mode === "create" && (
            <Field label="Heslo" id="management-password">
              <Input
                id="management-password"
                type="password"
                minLength={8}
                required
                autoComplete="new-password"
                value={draft.password}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, password: e.target.value }))
                }
              />
            </Field>
          )}
          <Field label="Role" id="management-role">
            <select
              id="management-role"
              className="ui-input"
              value={draft.role}
              onChange={(e) =>
                setDraft((d) => ({
                  ...d,
                  role: e.target.value as UserDraft["role"],
                }))
              }
            >
              <option value="USER">Uživatel</option>
              <option value="ADMIN">Administrátor</option>
            </select>
          </Field>
          <label className="flex min-h-11 items-center gap-3 self-end text-base font-medium">
            <input
              type="checkbox"
              className="size-5 accent-primary"
              checked={draft.enabled}
              onChange={(e) =>
                setDraft((d) => ({ ...d, enabled: e.target.checked }))
              }
            />
            Účet je povolen
          </label>
        </div>
      )}
      <div className="mt-6 flex flex-wrap justify-end gap-3">
        <Button type="button" variant="outline" onClick={closeForm}>
          Zrušit
        </Button>
        <Button type="submit" disabled={saving}>
          {saving ? "Ukládám…" : "Uložit"}
        </Button>
      </div>
    </form>
  ) : null;

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-[clamp(1.35rem,3vw,1.75rem)] font-medium text-foreground">
            Správa uživatelů
          </h2>
          <p className="mt-2 text-base text-muted-foreground">
            Vytvářejte účty a spravujte jejich přístup.
          </p>
        </div>
        <Button
          onClick={() => {
            setDraft(emptyUserDraft);
            setSelected(null);
            setMode("create");
          }}
        >
          <PlusIcon className="mr-2 size-5" aria-hidden="true" />
          Přidat uživatele
        </Button>
      </div>

      {loading ? (
        <div className="flex min-h-64 items-center justify-center text-muted-foreground">
          <ArrowPathIcon className="mr-3 size-6 animate-spin" />
          Načítám uživatele…
        </div>
      ) : users.length === 0 ? (
        <div className="flex min-h-64 flex-col items-center justify-center text-muted-foreground">
          <UserGroupIcon className="mb-4 size-10" />
          <p>Zatím tu nejsou žádní uživatelé.</p>
        </div>
      ) : (
        <div className="neo-table relative left-1/2 w-[calc(100vw-2rem)] -translate-x-1/2 sm:w-[calc(100vw-3rem)] lg:w-[calc(100vw-4rem)]">
          <table className="w-full table-auto text-left text-sm text-muted-foreground">
            <thead>
              <tr>
                {["ID", "Jméno", "E-mail", "Role", "Stav", "Akce"].map(
                  (label) => (
                    <th
                      key={label}
                      className="whitespace-nowrap px-6 py-3 font-medium"
                    >
                      {label}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="odd:bg-background even:bg-foreground/[0.04]"
                >
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium text-primary"
                  >
                    {user.id}
                  </th>
                  <td className="whitespace-nowrap px-6 py-4">
                    {user.name || "—"}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">{user.email}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {user.role === "ADMIN" ? "Administrátor" : "Uživatel"}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {user.enabled ? "Povolen" : "Zakázán"}
                  </td>
                  <td className="whitespace-nowrap px-6 py-3">
                    <div className="flex gap-3">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => void openEdit(user)}
                        aria-label={`Upravit uživatele ${user.email}`}
                      >
                        <PencilSquareIcon className="size-5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => openPassword(user)}
                        aria-label={`Změnit heslo uživatele ${user.email}`}
                      >
                        <KeyIcon className="size-5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-red-700 dark:text-red-400"
                        onClick={() => setDeleteTarget(user)}
                        aria-label={`Odstranit uživatele ${user.email}`}
                      >
                        <TrashIcon className="size-5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <MyDialog
        isOpen={mode !== null}
        onOpenChange={(isOpen) => !isOpen && closeForm()}
      >
        <MyDialogContainer
          role="dialog"
          aria-modal="true"
          aria-labelledby="user-form-title"
        >
          <MyDialogSurface className="border-0 bg-background">
            {userForm}
          </MyDialogSurface>
        </MyDialogContainer>
      </MyDialog>

      <MyDialog
        isOpen={deleteTarget !== null}
        onOpenChange={(isOpen) => !isOpen && setDeleteTarget(null)}
        closeOnBackdropClick={!saving}
      >
        <MyDialogContainer
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="delete-user-title"
          aria-describedby="delete-user-description"
        >
          <MyDialogSurface className="border-0 bg-background p-6">
            <div className="flex items-start justify-between gap-4">
              <h3 id="delete-user-title" className="text-xl font-medium">
                Odstranit uživatele
              </h3>
              <MyDialogCloseButton
                aria-label="Zavřít dialog"
                disabled={saving}
                onClick={() => setDeleteTarget(null)}
              />
            </div>
            <p id="delete-user-description" className="mt-6 text-base">
              Opravdu chcete odstranit uživatele{" "}
              <span className="font-medium text-foreground">
                {deleteTarget?.email}
              </span>
              ?
            </p>
            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setDeleteTarget(null)}
                disabled={saving}
              >
                Zrušit
              </Button>
              <Button
                onClick={() => void removeUser()}
                disabled={saving}
                className="text-red-700 dark:text-red-400"
              >
                {saving ? "Odstraňuji…" : "Ano, odstranit"}
              </Button>
            </div>
          </MyDialogSurface>
        </MyDialogContainer>
      </MyDialog>
    </div>
  );
}

function Field({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-base font-medium text-foreground"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
