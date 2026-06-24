"use client";

import { useId, useState, type FormEvent } from "react";
import {
  buildWhatsAppUrl,
  validateContact,
  type ContactFields,
} from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";

const EMPTY: ContactFields = { name: "", email: "", company: "", message: "" };

const inputBase =
  "w-full rounded-[var(--radius)] border border-border bg-surface-2 px-4 py-3 text-ink " +
  "placeholder:text-faint transition-colors focus:border-accent " +
  "aria-[invalid=true]:border-danger";

export function ContactForm() {
  const [values, setValues] = useState<ContactFields>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const uid = useId();

  function set<K extends keyof ContactFields>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: "" }));
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = document.getElementById(`${uid}-${Object.keys(found)[0]}`);
      first?.focus();
      return;
    }
    window.open(buildWhatsAppUrl(values), "_blank", "noopener,noreferrer");
  }

  const fieldProps = (key: keyof ContactFields, required = true) => ({
    id: `${uid}-${key}`,
    name: key,
    value: values[key] ?? "",
    "aria-invalid": Boolean(errors[key]),
    "aria-describedby": errors[key] ? `${uid}-${key}-error` : undefined,
    "aria-required": required,
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => set(key, e.target.value),
  });

  const errorEl = (key: keyof ContactFields) =>
    errors[key] ? (
      <p
        id={`${uid}-${key}-error`}
        role="alert"
        className="mt-1.5 font-mono text-xs text-danger"
      >
        {errors[key]}
      </p>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-name`} className="mb-1.5 block text-sm text-muted">
            Name
          </label>
          <input type="text" autoComplete="name" className={inputBase} {...fieldProps("name")} />
          {errorEl("name")}
        </div>
        <div>
          <label htmlFor={`${uid}-email`} className="mb-1.5 block text-sm text-muted">
            Email
          </label>
          <input type="email" autoComplete="email" className={inputBase} {...fieldProps("email")} />
          {errorEl("email")}
        </div>
      </div>

      <div>
        <label htmlFor={`${uid}-company`} className="mb-1.5 block text-sm text-muted">
          Company <span className="text-faint">(optional)</span>
        </label>
        <input type="text" autoComplete="organization" className={inputBase} {...fieldProps("company", false)} />
      </div>

      <div>
        <label htmlFor={`${uid}-message`} className="mb-1.5 block text-sm text-muted">
          Message
        </label>
        <textarea rows={5} className={`${inputBase} resize-y`} {...fieldProps("message")} />
        {errorEl("message")}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit">Send via WhatsApp</Button>
        <p className="font-mono text-xs text-faint">
          Opens WhatsApp with your message ready to send.
        </p>
      </div>
    </form>
  );
}
