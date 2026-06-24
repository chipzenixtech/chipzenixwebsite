import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "./ContactForm";

describe("ContactForm", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("shows validation errors and does not open WhatsApp on empty submit", async () => {
    const open = vi.spyOn(window, "open").mockImplementation(() => null);
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: /whatsapp/i }));

    expect(await screen.findByText(/enter your name/i)).toBeInTheDocument();
    expect(screen.getByText(/enter your email/i)).toBeInTheDocument();
    expect(screen.getByText(/enter a message/i)).toBeInTheDocument();
    expect(open).not.toHaveBeenCalled();
  });

  it("opens WhatsApp with the enquiry on valid submit", async () => {
    const open = vi.spyOn(window, "open").mockImplementation(() => null);
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/name/i), "Asha Rao");
    await user.type(screen.getByLabelText(/email/i), "asha@example.com");
    await user.type(screen.getByLabelText(/message/i), "We need 7nm verification.");
    await user.click(screen.getByRole("button", { name: /whatsapp/i }));

    expect(open).toHaveBeenCalledTimes(1);
    const url = open.mock.calls[0][0] as string;
    expect(url).toContain("https://wa.me/919618102268?text=");
    expect(decodeURIComponent(url)).toContain("Asha Rao");
  });
});
