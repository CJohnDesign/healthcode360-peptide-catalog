"use client";

import { useState } from "react";
import Link from "next/link";
import { List, LayoutGrid, Send, ArrowRight, ShoppingBag, Trash2, RotateCcw } from "lucide-react";
import { useInterestList } from "@/context/InterestListContext";
import { InterestListItem } from "@/components/interest/InterestListItem";
import { Modal } from "@/components/ui/Modal";
import { CompareTable } from "@/components/interest/CompareTable";
import { InquirySubmission } from "@/components/interest/InquirySubmission";
import type { EmailCaptureData } from "@/components/interest/EmailCaptureForm";
import { Button, ButtonLink } from "@/components/ui/Button";

export default function InterestListPage() {
  const { items, removeItem, clearList } = useInterestList();
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [view, setView] = useState<"list" | "compare">("list");

  const handleClearList = () => {
    clearList();
    setShowClearConfirm(false);
  };

  const handleSubmitClick = () => {
    setShowEmailCapture(true);
  };

  const handleEmailCaptureSubmit = (_data: EmailCaptureData) => {
    setShowEmailCapture(false);
    setShowSuccess(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    clearList();
  };

  const canCompare = items.length >= 2;

  if (items.length === 0 && !showSuccess) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-4">
          My List
        </h1>
        <p className="text-body-sm text-brand-silver mb-8">
          Your list is empty. Add products from the catalog to inquire about them.
        </p>
        <ButtonLink
          href="/products"
          variant="primary"
          size="lg"
          icon={ShoppingBag}
          iconPosition="right"
        >
          Browse Catalog
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 min-h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 shrink-0">
        <div>
          <h1 className="font-display text-3xl uppercase tracking-tight text-brand-white">
            My List
          </h1>
          <p className="text-body-sm text-brand-silver mt-2">
            Review your selections and submit an inquiry. Switch between list and compare views.
          </p>
        </div>
        <Button
          type="button"
          onClick={() => setShowClearConfirm(true)}
          variant="ghost"
          size="md"
          icon={RotateCcw}
          iconPosition="left"
          className="sm:self-start"
        >
          Clear List
        </Button>
      </div>

      {items.length >= 2 && (
        <div className="flex gap-2 mb-8">
          <Button
            type="button"
            onClick={() => setView("list")}
            variant="toggle"
            size="md"
            isSelected={view === "list"}
            icon={List}
            iconPosition="left"
          >
            List
          </Button>
          <Button
            type="button"
            onClick={() => setView("compare")}
            variant="toggle"
            size="md"
            isSelected={view === "compare"}
            icon={LayoutGrid}
            iconPosition="left"
          >
            Compare
          </Button>
        </div>
      )}

      {items.length === 1 && (
        <p className="text-body-sm text-brand-silver-dark mb-8">
          Add 2 or more products to compare them side by side.
        </p>
      )}

      {view === "list" && (
        <div className="flex flex-col flex-1 min-h-0">
          <div
            className={
              items.length === 1
                ? "flex-1 flex flex-col min-h-0"
                : "space-y-6 flex-1"
            }
          >
            {items.map((p) => (
              <div
                key={p.slug}
                className={items.length === 1 ? "flex-1 min-h-0 flex" : undefined}
              >
                <InterestListItem
                  product={p}
                  onRemove={() => removeItem(p.slug)}
                  className={items.length === 1 ? "flex-1 min-h-0 w-full" : undefined}
                />
              </div>
            ))}
          </div>
          <div className="mt-12 flex gap-4 shrink-0">
            <Button
              type="button"
              onClick={handleSubmitClick}
              variant="primary"
              size="lg"
              icon={Send}
              iconPosition="right"
            >
              Submit Inquiry
            </Button>
            <ButtonLink
              href="/products"
              variant="secondary"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
            >
              Continue Browsing
            </ButtonLink>
          </div>
        </div>
      )}

      {view === "compare" && canCompare && (
        <>
          {items.length > 3 && (
            <p className="text-body-sm text-brand-silver-dark mb-4">
              Showing first 3 of {items.length} products.
            </p>
          )}
          <CompareTable products={items} />
        </>
      )}

      <Modal
        isOpen={showEmailCapture}
        onClose={() => setShowEmailCapture(false)}
        title="Submit Your Inquiry"
        className="max-w-lg"
      >
        <InquirySubmission
          items={items}
          onSubmit={handleEmailCaptureSubmit}
          onCancel={() => setShowEmailCapture(false)}
        />
      </Modal>

      <Modal isOpen={showSuccess} onClose={handleCloseSuccess} title="Inquiry Sent">
        <p className="text-body-sm text-brand-silver">
          Your inquiry has been received. We&apos;ll personally draft your invoice and reach out within 24 hours.
        </p>
        <Link
          href="/products"
          onClick={handleCloseSuccess}
          className="mt-6 inline-block text-brand-white underline"
        >
          Back to Catalog
        </Link>
      </Modal>

      <Modal
        isOpen={showClearConfirm}
        onClose={() => setShowClearConfirm(false)}
        title="Clear your list?"
      >
        <p className="text-body-sm text-brand-silver mb-6">
          Your selections will vanish into the void—but you can always add them back. No pressure.
        </p>
        <div className="flex gap-4">
          <Button
            type="button"
            onClick={handleClearList}
            variant="primary"
            size="lg"
            icon={Trash2}
            iconPosition="left"
          >
            Clear List
          </Button>
          <Button
            type="button"
            onClick={() => setShowClearConfirm(false)}
            variant="secondary"
            size="lg"
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
}
