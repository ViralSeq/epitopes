import { useEpitopeContext } from "@/contexts/epitope";
import UpperAnnotation from "./UpperAnnotation";
import LowerAnnotation from "./LowerAnnotation";

export default function Epitope() {
  const {
    epitope: { sequence },
  } = useEpitopeContext();

  return (
    <div className="flex mb-5 justify-self-end">
      {sequence.split("").map((c, i) => {
        // because (start|end)positions start at 1
        const j = i + 1;
        return (
          <span className="relative" key={`${c}_${i}`}>
            <UpperAnnotation i={j} />
            <LowerAnnotation i={j} />
            <span className="font-bold tracking-widest">{c}</span>
          </span>
        );
      })}
    </div>
  );
}
