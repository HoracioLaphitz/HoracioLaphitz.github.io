import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowsPointingOutIcon } from "@presentation/components/ui/Icons";
import { useFocusTrap } from "@presentation/components/dashboards/shared/useFocusTrap";

interface ZoomableImageProps {
  src: string;
  alt: string;
  className?: string;
}

const ZOOM_LEVELS = [1, 1.5, 2, 3] as const;
type ZoomLevel = (typeof ZOOM_LEVELS)[number];

const ZoomableImage = ({ src, alt, className = "" }: ZoomableImageProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [zoom, setZoom] = useState<ZoomLevel>(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const panStart = useRef({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setZoom(1);
    setPanOffset({ x: 0, y: 0 });
  }, []);

  const containerRef = useFocusTrap(isOpen, handleClose);

  const handleZoomIn = useCallback(() => {
    setZoom((prev) => {
      const idx = ZOOM_LEVELS.indexOf(prev);
      return idx < ZOOM_LEVELS.length - 1 ? ZOOM_LEVELS[idx + 1] : prev;
    });
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => {
      const idx = ZOOM_LEVELS.indexOf(prev);
      return idx > 0 ? ZOOM_LEVELS[idx - 1] : prev;
    });
    if (zoom === 1.5) setPanOffset({ x: 0, y: 0 });
  }, [zoom]);

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      if (e.deltaY < 0) {
        handleZoomIn();
      } else {
        handleZoomOut();
      }
    },
    [handleZoomIn, handleZoomOut]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (zoom <= 1) return;
      e.preventDefault();
      setIsDragging(true);
      dragStart.current = { x: e.clientX, y: e.clientY };
      panStart.current = { ...panOffset };
    },
    [zoom, panOffset]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      const dx = (e.clientX - dragStart.current.x) / zoom;
      const dy = (e.clientY - dragStart.current.y) / zoom;
      setPanOffset({ x: panStart.current.x + dx, y: panStart.current.y + dy });
    },
    [isDragging, zoom]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "+" || e.key === "=") handleZoomIn();
      if (e.key === "-") handleZoomOut();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleZoomIn, handleZoomOut]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(true)}
        className={`relative group overflow-hidden ${className}`}
        aria-label={`Ampliar imagen: ${alt}`}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
          <ArrowsPointingOutIcon className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 drop-shadow-lg" />
        </div>
      </button>

      {isOpen && (
        <div
          ref={containerRef}
          role="dialog"
          aria-modal="true"
          aria-label={alt || "Imagen ampliada"}
          className="fixed inset-0 z-[90] bg-black/90 flex flex-col items-center justify-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
          onWheel={handleWheel}
        >
          {/* Controls */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            <button
              type="button"
              onClick={handleZoomOut}
              disabled={zoom <= 1}
              aria-label="Reducir zoom"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <span className="text-xl leading-none">−</span>
            </button>
            <span className="text-white text-sm min-w-[3rem] text-center tabular-nums">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              onClick={handleZoomIn}
              disabled={zoom >= 3}
              aria-label="Aumentar zoom"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <span className="text-xl leading-none">+</span>
            </button>
            <button
              type="button"
              onClick={handleClose}
              aria-label="Cerrar"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors ml-2"
            >
              <span className="text-xl leading-none">&times;</span>
            </button>
          </div>

          {/* Image container */}
          <div
            className="max-w-[90vw] max-h-[85vh] overflow-hidden flex items-center justify-center"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "default" }}
          >
            <img
              src={src}
              alt={alt}
              className="max-w-full max-h-[85vh] object-contain select-none transition-transform duration-150"
              style={{
                transform: `scale(${zoom}) translate(${panOffset.x}px, ${panOffset.y}px)`,
              }}
              draggable={false}
            />
          </div>

          {/* Caption */}
          {alt && (
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm max-w-md text-center px-4">
              {alt}
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default ZoomableImage;