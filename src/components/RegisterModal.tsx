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
  "w-full rounded-lg border border-periwinkle/25 bg-white/5 px-3 py-2.5 text-base text-white outline-none transition placeholder:text-white/30 focus:border-periwinkle focus:ring-2 focus:ring-periwinkle/30 [&>option]:bg-space";

const skyBg = {
  backgroundColor: "#05050f",
  backgroundImage:
    "radial-gradient(ellipse at 100% 0%, rgba(128,133,240,0.28), transparent 55%), radial-gradient(ellipse at 0% 100%, rgba(90,40,160,0.30), transparent 55%), radial-gradient(1px 1px at 30px 40px, rgba(255,255,255,.7), transparent), radial-gradient(1px 1px at 150px 110px, rgba(255,255,255,.5), transparent), radial-gradient(1.5px 1.5px at 240px 190px, rgba(255,255,255,.7), transparent)",
  backgroundSize: "auto, auto, 280px 240px, 280px 240px, 280px 240px",
};

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
      setValues((v) => ({ ...v, sessions: id ? [id] : v.sessions }));
      setOpen(true);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
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

      // Email already in the Sheet
      if (res.status === 409) {
        setErrors({
          email: "This email is already registered. See you at the event!",
        });
        setStatus("idle");
        return;
      }

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
      style={skyBg}
      className="m-auto w-[min(92vw,34rem)] overflow-hidden rounded-3xl border border-periwinkle/40 p-0 text-white shadow-[0_0_60px_rgba(128,133,240,0.25)] backdrop:bg-black/80 backdrop:backdrop-blur-sm"
    >
      {/* orbit decoration */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 size-52 rounded-full border border-periwinkle/30"
      >
        <div className="orbit absolute inset-0">
          <span className="absolute left-1/2 top-0 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_14px_var(--color-accent)]" />
        </div>
        <div className="absolute inset-6 rounded-full border border-periwinkle/20" />
      </div>

      <div className="relative max-h-[90svh] overflow-y-auto no-scrollbar p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-lavender/70">
              {event.name}
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold text-white">
              Join the mission
            </h2>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="grid size-9 shrink-0 place-items-center rounded-full border border-white/20 text-xl leading-none text-white/70 transition hover:border-periwinkle hover:text-white"
          >
            ×
          </button>
        </div>

        {status === "done" ? (
          <div className="py-12 text-center" role="status">
            <div className="relative mx-auto size-24">
              <div className="absolute inset-0 rounded-full border border-periwinkle/40" />
              <div className="orbit absolute inset-0">
                <span className="absolute left-1/2 top-0 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_14px_var(--color-accent)]" />
              </div>
              <div className="absolute inset-0 grid place-items-center text-4xl text-accent">
                ✓
              </div>
            </div>
            <p className="mt-6 font-display text-2xl font-bold">
              Launch confirmed
            </p>
            <p className="mt-3 text-lavender">
              Welcome aboard, {values.fullName.trim().split(" ")[0]}. Your seat
              is reserved. See you on {event.agenda[0].date}.
            </p>
            <button
              type="button"
              onClick={close}
              className="mt-8 rounded-xl bg-linear-to-b from-periwinkle to-[#5b5fc7] px-6 py-2.5 font-display text-sm font-medium uppercase"
            >
              Back to the site
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="mt-7 space-y-5">
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

            <Field label="Full name" required error={errors.fullName}>
              <input
                className={field}
                value={values.fullName}
                onChange={(e) => set("fullName", e.target.value)}
                autoComplete="name"
                placeholder="Your name"
              />
            </Field>

            <Field label="Email" required error={errors.email}>
              <input
                type="email"
                className={field}
                value={values.email}
                onChange={(e) => set("email", e.target.value)}
                autoComplete="email"
                placeholder="you@example.com"
              />
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Phone (optional)" error={errors.phone}>
                <input
                  type="tel"
                  className={field}
                  value={values.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  autoComplete="tel"
                  placeholder="+213 ..."
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
            </div>

            {values.status === "student" && (
              <Field label="University" required error={errors.university}>
                <input
                  className={field}
                  value={values.university}
                  onChange={(e) => set("university", e.target.value)}
                  placeholder="Your university"
                />
              </Field>
            )}

            <fieldset>
              <legend className={labelCls}>
                Choose your sessions <span className="text-accent">*</span>
              </legend>
              <div className="mt-2 space-y-2">
                {event.agenda.map((a) => (
                  <label
                    key={a.id}
                    className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-3 transition hover:border-periwinkle/60 has-checked:border-periwinkle has-checked:bg-periwinkle/15"
                  >
                    <input
                      type="checkbox"
                      checked={values.sessions.includes(a.id)}
                      onChange={() => toggleSession(a.id)}
                      className="peer sr-only"
                    />
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-white/30 text-[11px] font-bold text-transparent transition peer-checked:border-accent peer-checked:bg-accent peer-checked:text-space peer-focus-visible:ring-2 peer-focus-visible:ring-periwinkle">
                      ✓
                    </span>
                    <span className="leading-snug">
                      <span className="block">{a.title}</span>
                      <span className="text-xs uppercase tracking-widest text-lavender/70">
                        {a.type} · {a.date}, {a.time}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
              {errors.sessions && <Err>{errors.sessions}</Err>}
            </fieldset>

            {status === "error" && (
              <p role="alert" className="text-sm text-accent">
                Signal lost. Please try again.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-xl bg-linear-to-b from-periwinkle to-[#5b5fc7] py-3 font-display text-sm font-medium uppercase tracking-wider shadow-lg shadow-periwinkle/30 transition hover:brightness-110 disabled:opacity-60"
            >
              {status === "sending" ? "Launching..." : "Reserve my seat"}
            </button>
          </form>
        )}
      </div>
    </dialog>
  );
}

const labelCls = "text-xs uppercase tracking-widest text-lavender/80";

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className={`${labelCls} mb-1.5 block`}>
        {label} {required && <span className="text-accent">*</span>}
      </span>
      {children}
      {error && <Err>{error}</Err>}
    </label>
  );
}

function Err({ children }: { children: React.ReactNode }) {
  return (
    <span role="alert" className="mt-1.5 block text-sm text-accent">
      {children}
    </span>
  );
}