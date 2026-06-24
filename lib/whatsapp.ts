export type ContactFields = {
  name: string;
  email: string;
  company?: string;
  message: string;
};

/** Chip Zenix WhatsApp number in wa.me form (digits only, country code, no +). */
export const WHATSAPP_NUMBER = "919618102268";

export function validateContact(
  f: Partial<ContactFields>,
): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!f.name?.trim()) errors.name = "Please enter your name.";
  if (!f.email?.trim()) errors.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim()))
    errors.email = "Please enter a valid email address.";
  if (!f.message?.trim()) errors.message = "Please enter a message.";
  return errors;
}

/** Compose a wa.me click-to-chat URL pre-filled with the enquiry. */
export function buildWhatsAppUrl(f: ContactFields): string {
  const lines = [
    "New enquiry from the Chip Zenix website",
    "",
    `Name: ${f.name}`,
    `Email: ${f.email}`,
    ...(f.company?.trim() ? [`Company: ${f.company}`] : []),
    "",
    "Message:",
    f.message,
  ];
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}
