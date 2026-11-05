"use client";

import { useEffect, useRef, useState } from "react";
import { event } from "@/data/event";
import {
  emptyValues,
  validate,
  type RegisterErrors,
  type RegisterValues,
} from "@/lib/validation";

type Status = "idle" | "sending" | "done" | "error";

const field =
  "w-full rounded-lg border border-white/15 bg-space/60 px-3 py-2 text-base outline-none focus:border-periwinkle";

export default function RegisterModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<RegisterValues>(emptyValues);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  // Open when the URL hash is #register or #register:<session-id>
  useEffect(() => {
    const sync = () => {
      const h = window.location.hash;
      if (!h.startsWith("#register")) return;
      const id = h.split(":")[1];
      setValues((v) => ({ ...emptyValues, ...(status === "done" ? {} : v), sessions: id ? [id] : v.sessions }));
      setOpen(true);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  function close() {
    setOpen(false);
    window.history.replaceState(null, "", window.location.pathname);
    if (status === "done") {
      setValues(emptyValues);
      setStatus("idle");
    }
  }

  function set<K extends keyof RegisterValues>(key: K, val: RegisterValues[K]) {
    setValues((v) => ({ ...v, [key]: val }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function toggleSession(id: string) {
    set(
      "sessions",
      values.sessions.includes(id)
        ? values.sessions.filter((s) => s !== id)
        : [...values.sessions, id]
    );
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={() => open && close()}
      onClick={(e) => e.target === dialogRef.current && close()}
      className="m-auto w-[min(92vw,34rem)] rounded-2xl border border-white/10 bg-navy p-0 text-white backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      <div className="max-h-[90svh] overflow-y-auto p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <h2 className="font-display text-xl font-bold text-periwinkle">
            Register
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="text-2xl leading-none text-white/70 hover:text-white"
          >
            ×
          </button>
        </div>

        {status === "done" ? (
          <div className="py-10 text-center" role="status">
            <p className="font-display text-2xl font-bold text-cyan">
              You&apos;re in!
            </p>
            <p className="mt-3 text-lg">
              Thanks {values.fullName.split(" ")[0]}, your seat is reserved.
              See you on {event.agenda[0].date}.
            </p>
            <button
              type="button"
              onClick={close}
              className="mt-8 rounded-xl bg-periwinkle px-6 py-2 font-display text-sm"
            >
              Back to the site
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="mt-6 space-y-5">
            {/* honeypot */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              value={values.website}
              onChange={(e) => set("website", e.target.value)}
              className="absolute -left-[9999px]"
            />

            <Field label="Full name" error={errors.fullName}>
              <input
                className={field}
                value={values.fullName}
                onChange={(e) => set("fullName", e.target.value)}
                autoComplete="name"
              />
            </Field>

            <Field label="Email" error={errors.email}>
              <input
                type="email"
                className={field}
                value={values.email}
                onChange={(e) => set("email", e.target.value)}
                autoComplete="email"
              />
            </Field>

            <Field label="Phone (optional)" error={errors.phone}>
              <input
                type="tel"
                className={field}
                value={values.phone}
                onChange={(e) => set("phone", e.target.value)}
                autoComplete="tel"
              />
            </Field>

            <Field label="I am">
              <select
                className={field}
                value={values.status}
                onChange={(e) => set("status", e.target.value)}
              >
                <option value="student">A student</option>
                <option value="other">Other</option>
              </select>
            </Field>

            {values.status === "student" && (
              <Field label="University" error={errors.university}>
                <input
                  className={field}
                  value={values.university}
                  onChange={(e) => set("university", e.target.value)}
                />
              </Field>
            )}

            <fieldset>
              <legend className="mb-2 text-sm text-white/80">Sessions</legend>
              <div className="space-y-2">
                {event.agenda.map((a) => (
                  <label key={a.id} className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={values.sessions.includes(a.id)}
                      onChange={() => toggleSession(a.id)}
                      className="mt-1 size-4 accent-periwinkle"
                    />
                    <span>
                      {a.title}{" "}
                      <span className="text-sm text-white/60">
                        ({a.date}, {a.time})
                      </span>
                    </span>
                  </label>
                ))}
              </div>
              {errors.sessions && <Err>{errors.sessions}</Err>}
            </fieldset>

            {status === "error" && (
              <p role="alert" className="text-sm text-red-300">
                Something went wrong. Please try again.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-xl bg-linear-to-b from-periwinkle to-[#5b5fc7] py-3 font-display text-sm font-medium uppercase disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : "Reserve my seat"}
            </button>
          </form>
        )}
      </div>
    </dialog>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm text-white/80">{label}</span>
      {children}
      {error && <Err>{error}</Err>}
    </label>
  );
}

function Err({ children }: { children: React.ReactNode }) {
  return (
    <span role="alert" className="mt-1 block text-sm text-red-300">
      {children}
    </span>
  );
}