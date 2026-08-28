import { useEffect, useId, useRef } from "react";
import { DownloadIcon, XMarkIcon } from "@presentation/components/ui/Icons";

interface CertificateModalProps {
  title: string;
  url: string;
  onClose: () => void;
}

const CertificateModal = ({ title, url, onClose }: CertificateModalProps) => {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let lastTabWasBackward = false;
    const getFocusable = () =>
      dialogRef.current
        ? Array.from(
            dialogRef.current.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])',
            ),
          )
        : [];

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !dialogRef.current) return;

      lastTabWasBackward = event.shiftKey;
      const focusable = getFocusable();
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const handleFocusIn = (event: FocusEvent) => {
      if (
        !dialogRef.current ||
        dialogRef.current.contains(event.target as Node)
      ) {
        return;
      }

      const focusable = getFocusable();
      const target = lastTabWasBackward
        ? focusable[focusable.length - 1]
        : focusable[0];
      target?.focus();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("focusin", handleFocusIn);

    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focusin", handleFocusIn);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 p-0 sm:items-center sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div
        ref={dialogRef}
        className="relative flex max-h-[96dvh] w-full max-w-6xl flex-col overflow-hidden rounded-t-2xl bg-skin-primary shadow-2xl sm:max-h-[90vh] sm:rounded-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 border-b border-skin-border bg-skin-secondary p-3 sm:p-4">
          <h3 id={titleId} className="min-w-0 truncate text-base font-bold text-skin-text sm:text-lg">{title}</h3>
          <div className="flex gap-2 flex-shrink-0">
            <a
              href={url}
              download
              className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand-primary px-3 text-sm font-semibold text-white hover:bg-brand-hover sm:px-4"
            >
              <DownloadIcon className="w-4 h-4" />
              Descargar
            </a>
            <button
              ref={closeButtonRef}
              onClick={onClose}
              aria-label="Cerrar"
              className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-xl border border-skin-border bg-skin-primary text-skin-text hover:border-brand-primary"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 bg-skin-secondary">
          <iframe
            src={url}
            className="h-[calc(96dvh-68px)] w-full sm:h-[calc(90vh-80px)]"
            title={`Certificado: ${title}`}
          />
        </div>
      </div>
    </div>
  );
};

export default CertificateModal;
