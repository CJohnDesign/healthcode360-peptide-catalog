"use client";

import { useState, FormEvent } from "react";
import { Send } from "lucide-react";
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
}

const inputBase =
  "w-full bg-transparent border border-brand-border px-4 py-2 text-body-sm text-brand-white placeholder:text-brand-silver-dark focus:outline-none focus:border-brand-silver-dark transition-colors";

export function EmailCaptureForm({
  onSubmit,
  onCancel,
  submitLabel = "Submit Inquiry",
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
      <div>
        <label htmlFor="name" className="block text-label font-display tracking-wider uppercase text-brand-silver mb-1">
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
        <label htmlFor="email" className="block text-label font-display tracking-wider uppercase text-brand-silver mb-1">
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
        <label htmlFor="phone" className="block text-label font-display tracking-wider uppercase text-brand-silver mb-1">
          Phone <span className="text-brand-silver-dark">(optional)</span>
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
      <div className="pt-6 sm:pt-4 space-y-4">
        <Button
          type="submit"
          variant="cta"
          size="lg"
          icon={Send}
          iconPosition="right"
          className="w-full"
        >
          {submitLabel}
        </Button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="block w-full text-center text-caption text-brand-silver-dark hover:text-brand-silver transition-colors py-2"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
