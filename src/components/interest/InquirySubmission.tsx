"use client";

import type { Product } from "@/types";
import { EmailCaptureForm } from "./EmailCaptureForm";
import type { EmailCaptureData } from "./EmailCaptureForm";

interface InquirySubmissionProps {
  items: Product[];
  onSubmit: (data: EmailCaptureData) => void;
  onCancel?: () => void;
}

export function InquirySubmission({
  items,
  onSubmit,
  onCancel,
}: InquirySubmissionProps) {
  return (
    <div className="space-y-8">
      <section>
        <h4 className="text-label font-display tracking-wider uppercase text-brand-silver mb-3">
          Your Order
        </h4>
        <ul className="space-y-2 border-l-2 border-brand-border pl-4">
          {items.map((p) => (
            <li key={p.slug} className="text-body-sm text-brand-white">
              {p.name}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h4 className="text-label font-display tracking-wider uppercase text-brand-silver mb-3">
          What Happens Next
        </h4>
        <p className="text-body-sm text-brand-silver leading-relaxed">
          You&apos;re submitting an inquiry for the products above. A member of our team will
          personally review your order and draft a custom invoice for you within 24 hours. We&apos;ll
          reach out via the contact info you provide below—no commitment required.
        </p>
      </section>

      <section>
        <h4 className="text-label font-display tracking-wider uppercase text-brand-silver mb-3">
          Contact Info
        </h4>
        <EmailCaptureForm
          onSubmit={onSubmit}
          onCancel={onCancel}
          submitLabel="Submit Inquiry"
          introMessage="Where should we send your invoice? All fields are optional."
        />
      </section>
    </div>
  );
}
