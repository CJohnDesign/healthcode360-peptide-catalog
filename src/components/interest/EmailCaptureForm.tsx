"use client";

import { useState, FormEvent } from "react";
import { Send, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface EmailCaptureData {
  name: string;
  email: string;
  phone: string;
}

interface EmailCaptureFormProps {
  onSubmit: (data: EmailCaptureData) => void;
  onCancel?: () => void;
  submitLabel?: string;
  introMessage?: string;
}

const inputBase =
  "w-full bg-transparent border border-brand-border px-4 py-2 text-sm text-brand-white placeholder:text-brand-grey-400 focus:outline-none focus:border-brand-grey-400 transition-colors";

export function EmailCaptureForm({
  onSubmit,
  onCancel,
  submitLabel = "Submit Inquiry",
  introMessage = "Share your contact info so we can follow up. All fields are optional.",
}: EmailCaptureFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email, phone });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-sm text-brand-grey-400 mb-6">
        {introMessage}
      </p>
      <div>
        <label htmlFor="name" className="block text-xs font-display tracking-wider uppercase text-brand-grey-400 mb-1">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className={inputBase}
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-xs font-display tracking-wider uppercase text-brand-grey-400 mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className={inputBase}
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-xs font-display tracking-wider uppercase text-brand-grey-400 mb-1">
          Phone <span className="text-brand-grey-500">(optional)</span>
        </label>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="(555) 123-4567"
          className={inputBase}
        />
      </div>
      <div className="flex gap-4 pt-4">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          icon={Send}
          iconPosition="right"
        >
          {submitLabel}
        </Button>
        {onCancel && (
          <Button
            type="button"
            onClick={onCancel}
            variant="secondary"
            size="lg"
            icon={X}
            iconPosition="left"
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
