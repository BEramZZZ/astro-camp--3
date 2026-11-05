import { event } from "@/data/event";

export type RegisterValues = {
  fullName: string;
  email: string;
  phone: string;
  status: string;
  university: string;
  sessions: string[];
  website: string; // honeypot: real users never fill it
};

export type RegisterErrors = Partial<Record<keyof RegisterValues, string>>;

export const emptyValues: RegisterValues = {
  fullName: "",
  email: "",
  phone: "",
  status: "student",
  university: "",
  sessions: [],
  website: "",
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+\d][\d\s.-]{7,17}$/;

export function validate(v: RegisterValues): RegisterErrors {
  const e: RegisterErrors = {};
  if (v.fullName.trim().length < 3) e.fullName = "Enter your full name.";
  if (!EMAIL.test(v.email.trim())) e.email = "Enter a valid email address.";
  if (v.phone.trim() && !PHONE.test(v.phone.trim()))
    e.phone = "Enter a valid phone number.";
  if (v.status === "student" && v.university.trim().length < 2)
    e.university = "Enter your university.";
  const valid = event.agenda.map((a) => a.id);
  if (v.sessions.length === 0 || !v.sessions.every((s) => valid.includes(s)))
    e.sessions = "Pick at least one session.";
  return e;
}