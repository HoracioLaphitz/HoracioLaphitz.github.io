import React, { useState, useEffect } from "react";
import { getAvailabilityStatus, type AvailabilityStatus } from "@shared/availability";

export interface AvailabilityBadgeProps {
  variant?: "full" | "compact";
  className?: string;
}

export const AvailabilityBadge: React.FC<AvailabilityBadgeProps> = ({
  variant = "full",
  className = "",
}) => {
  const [status, setStatus] = useState<AvailabilityStatus>(() => getAvailabilityStatus());

  useEffect(() => {
    setStatus(getAvailabilityStatus());
    const interval = setInterval(() => {
      setStatus(getAvailabilityStatus());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const { isAvailable } = status;

  if (variant === "compact") {
    return (
      <span
        role="status"
        aria-live="polite"
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs transition-colors duration-200 ${
          isAvailable
            ? "border border-skin-border/40 bg-skin-primary/80 text-skin-muted"
            : "border border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400"
        } ${className}`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            isAvailable ? "bg-emerald-500 animate-pulse" : "bg-rose-500"
          }`}
          aria-hidden="true"
        />
        <span>{status.shortLabel}</span>
      </span>
    );
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-medium transition-colors duration-200 ${
        isAvailable
          ? "border border-skin-border/50 bg-skin-secondary/70 text-skin-muted"
          : "border border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400"
      } ${className}`}
    >
      <span
        className={`h-2 w-2 rounded-full ${
          isAvailable ? "bg-emerald-500 animate-pulse" : "bg-rose-500"
        }`}
        aria-hidden="true"
      />
      <span>{status.label}</span>
    </div>
  );
};

export default AvailabilityBadge;
