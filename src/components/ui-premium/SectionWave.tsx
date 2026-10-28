import { DuneWave } from "@/components/DuneWave";
import { cn } from "@/lib/utils";

interface SectionWaveProps {
  /** Background class of the section above (e.g. "bg-coal"). */
  from: string;
  /** Text class = color of the section below (e.g. "text-background"). */
  to: string;
  flip?: boolean;
}

/** Dune-wave transition between two sections of different colors. */
export function SectionWave({ from, to, flip }: SectionWaveProps) {
  return (
    <div aria-hidden="true" className={cn("-mb-px", from, to)}>
      <DuneWave flip={flip} />
    </div>
  );
}
