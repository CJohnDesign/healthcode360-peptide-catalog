"use client";

import { useState } from "react";
import { faqItems } from "@/data/faq";

export default function FAQPage() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-8">
        FAQ
      </h1>
      <div className="space-y-2">
        {faqItems.map((item) => (
          <div
            key={item.id}
            className="border border-brand-border overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setOpenId(openId === item.id ? null : item.id)}
              className="w-full flex items-center justify-between p-4 text-left font-display text-body-sm uppercase tracking-wider text-brand-white hover:bg-brand-grey-900 transition-colors"
            >
              {item.question}
              <span className="text-brand-silver-dark">{openId === item.id ? "−" : "+"}</span>
            </button>
            {openId === item.id && (
              <div className="px-4 py-4 text-body-sm text-brand-silver border-t border-brand-border">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
