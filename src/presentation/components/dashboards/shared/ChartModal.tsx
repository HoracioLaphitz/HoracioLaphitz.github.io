import { type ReactNode } from "react";
import { createPortal } from "react-dom";
import { XMarkIcon } from "../../ui/Icons";
import { useFocusTrap } from "./useFocusTrap";

interface ChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function ChartModal({ isOpen, onClose, title, children }: ChartModalProps) {
  const containerRef = useFocusTrap(isOpen, onClose);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      {/* Overlay — click to close */}
      <div
        className="absolute inset-0 bg-black/80 transition-opacity duration-200"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Content */}
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative z-[95] flex max-h-[90vh] w-full max-w-[90vw] flex-col rounded-2xl bg-skin-primary p-6 shadow-2xl transition-all duration-200 ease-out"
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between gap-4">
          <h3 className="font-display text-lg font-semibold text-skin-text">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="focus-ring flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-skin-text-secondary transition-colors hover:bg-skin-secondary hover:text-skin-text"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Chart container */}
        <div className="min-h-0 flex-1">{children}</div>
      </div>
    </div>,
    document.body
  );
}
