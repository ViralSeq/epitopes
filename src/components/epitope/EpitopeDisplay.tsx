import { useEpitopeContext } from "@/contexts/epitope";
import SeqHighlighters from "./SeqHighlighters";
import Epitope from "./Epitope";

export default function EpitopeDisplay() {
  const {
    epitope: { epitopeType, participantId },
  } = useEpitopeContext();

  return (
    <div
      className="h-[fit-content] font-mono grid p-2 px-4 pt-4 bg-stone-400 shadow-sm rounded"
      style={{
        fontFamily: "Courier",
        gridColumnGap: "8px",
        gridTemplateColumns: "auto auto 1fr",
      }}
      data-cy="epitope-card"
    >
      <div className="mb-6 whitespace-break-spaces col-span-3">
        {epitopeType}
      </div>
      <div className="col-span-2">{participantId}</div>
      <Epitope />
      <SeqHighlighters />
    </div>
  );
}
