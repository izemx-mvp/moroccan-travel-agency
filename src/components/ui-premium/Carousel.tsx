import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CarouselProps {
  children: ReactNode;
  /** Accessible name of the scroll region. */
  label: string;
  tone?: "light" | "dark";
  className?: string;
  trackClassName?: string;
}

/**
 * Horizontal snap carousel: native swipe on touch, drag with the mouse, arrow buttons.
 * Items are passed as children and should set their own width + `snap-start shrink-0`.
 */
export function Carousel({ children, label, tone = "light", className, trackClassName }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0, moved: 0 });
  const [dragging, setDragging] = useState(false);
  const [edges, setEdges] = useState({ start: true, end: false });

  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setEdges({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    updateEdges();
    const el = trackRef.current;
    if (!el) return;
    const ro = new ResizeObserver(updateEdges);
    ro.observe(el);
    return () => ro.disconnect();
  }, [updateEdges, children]);

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !trackRef.current) return;
    drag.current = { active: true, startX: e.clientX, scrollLeft: trackRef.current.scrollLeft, moved: 0 };
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!drag.current.active || !el) return;
    const dx = e.clientX - drag.current.startX;
    drag.current.moved = Math.abs(dx);
    if (drag.current.moved > 5 && !dragging) setDragging(true);
    el.scrollLeft = drag.current.scrollLeft - dx;
  };
  const endDrag = () => {
    drag.current.active = false;
    setDragging(false);
  };

  const arrowClass = cn(
    "inline-flex size-12 items-center justify-center rounded-full border transition-all disabled:cursor-not-allowed disabled:opacity-35",
    tone === "dark"
      ? "border-gold/40 text-gold hover:bg-gold hover:text-coal"
      : "border-gold-deep/40 text-gold-deep hover:bg-gold hover:text-coal"
  );

  return (
    <div className={className}>
      <div
        ref={trackRef}
        role="region"
        aria-label={label}
        tabIndex={0}
        onScroll={updateEdges}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        // Swallow the click that ends a drag so cards are not opened by accident.
        onClickCapture={(e) => {
          if (drag.current.moved > 5) {
            e.preventDefault();
            e.stopPropagation();
            drag.current.moved = 0;
          }
        }}
        className={cn(
          "scrollbar-none -mx-4 flex gap-5 overflow-x-auto scroll-px-4 px-4 pb-4 pt-2 focus-visible:outline-none md:-mx-8 md:scroll-px-8 md:px-8",
          dragging ? "cursor-grabbing select-none snap-none" : "snap-x snap-mandatory md:cursor-grab",
          trackClassName
        )}
      >
        {children}
      </div>
      <div className="mt-6 flex justify-end gap-3">
        <button type="button" onClick={() => scroll(-1)} disabled={edges.start} aria-label="Précédent" className={arrowClass}>
          <ChevronLeft className="size-5" />
        </button>
        <button type="button" onClick={() => scroll(1)} disabled={edges.end} aria-label="Suivant" className={arrowClass}>
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
}
