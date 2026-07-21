"use client";

import { useActionState } from "react";
import { signInAdmin, type SignInState } from "../actions";

const initialState: SignInState = {};

export function AdminLoginForm({ redirectTo }: { redirectTo: string }) {
  const [state, formAction, pending] = useActionState(signInAdmin, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="redirect" value={redirectTo} />

      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-navy-800"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          placeholder="admin@silazanzibar.com"
          className="w-full rounded-lg border border-sand-300 bg-white px-4 py-3 text-ink outline-none transition focus:border-navy-500 focus:ring-2 focus:ring-navy-500/20"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-navy-800"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="••••••••"
          className="w-full rounded-lg border border-sand-300 bg-white px-4 py-3 text-ink outline-none transition focus:border-navy-500 focus:ring-2 focus:ring-navy-500/20"
        />
      </div>

      {state.error ? (
        <p
          role="alert"
          className="rounded-lg border border-crimson-200 bg-crimson-50 px-4 py-3 text-sm text-crimson-700"
        >
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="btn-red w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
