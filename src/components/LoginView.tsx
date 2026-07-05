"use client";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "@/context/SessionContext";

export function LoginView() {
  const router = useRouter();
  const { login, isAuthLoading } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (await login(email.trim(), password)) router.refresh();
  }

  return (
    <main
      id="main-content"
      className="grid min-h-dvh gap-8 bg-background p-6 sm:p-8 lg:grid-cols-[minmax(20rem,0.8fr)_1.2fr] lg:p-12"
    >
      <section className="neo-raised flex items-center px-8 py-16 sm:px-12 lg:px-16">
        <div className="max-w-xl">
          <p className="text-sm uppercase tracking-[0.1em] text-primary">
           interní systém
          </p>
          <h1 className="mt-6 text-[clamp(2.25rem,5vw,3rem)] font-medium leading-none tracking-tight text-foreground">
            MAKON
          </h1>
        </div>
      </section>
      <section className="flex items-center justify-center px-2 py-12 sm:px-12 lg:px-24">
        <form
          className="neo-raised w-full max-w-md p-8 sm:p-12"
          onSubmit={submit}
        >
          <h2 className="mt-2 text-[clamp(1.5rem,3vw,1.75rem)] font-medium leading-none tracking-tight">
            Přihlášení
          </h2>
          <div className="mt-10 grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Heslo</Label>
              <div className="relative">
                <Input
                  className="pr-12"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <Button
                  className="absolute right-1 top-1/2 -translate-y-1/2"
                  type="button"
                  size="icon"
                  variant="ghost"
                  aria-label={showPassword ? "Skrýt heslo" : "Zobrazit heslo"}
                  onClick={() => setShowPassword((value) => !value)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="size-5" aria-hidden="true" />
                  ) : (
                    <EyeIcon className="size-5" aria-hidden="true" />
                  )}
                </Button>
              </div>
            </div>
            <Button
              className="mt-2 h-12"
              disabled={isAuthLoading}
              type="submit"
            >
              {isAuthLoading ? "Přihlašuji…" : "Přihlásit se"}
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
}
