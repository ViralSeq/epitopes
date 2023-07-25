import { useQueryContext } from "@/contexts/query";
import QueryCheckbox from "./QueryCheckbox";

export default function QueryHeader() {
  const {
    state: {
      query: { participantIds, epitopeIds },
    },
    generateQuery,
    uniqueEpitopeIds,
    uniqueParticipantIds,
  } = useQueryContext();

  const generateButtonDisabled = !participantIds.length || !epitopeIds.length;

  return (
    <div className="grid grid-cols-3 justify-around items-center gap-4 rounded shadow p-4">
      <div className="shadow p-4">
        <div className="text-lg font-bolder underline mb-2">Participants</div>
        <div
          className="grid gap-2"
          style={{
            gridAutoFlow: "column",
            gridTemplateRows: `repeat(${Math.ceil(
              uniqueParticipantIds.length / 3
            )}, 1fr)`,
          }}
        >
          {uniqueParticipantIds.map((participantId) => (
            <QueryCheckbox
              key={participantId}
              id={participantId}
              field="participantIds"
            />
          ))}
        </div>
      </div>
      <div className="shadow p-4 self-start">
        <div className="text-lg font-bolder underline mb-2">Epitopes</div>
        <div
          className="grid gap-2"
          style={{
            gridAutoFlow: "column",
            gridTemplateRows: `repeat(${Math.ceil(
              uniqueEpitopeIds.length / 2
            )}, 1fr)`,
          }}
        >
          {uniqueEpitopeIds.map((epitopeId) => (
            <QueryCheckbox key={epitopeId} id={epitopeId} field="epitopeIds" />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4 place-self-center">
        <button
          data-cy="generate-query-button"
          onClick={generateQuery}
          disabled={generateButtonDisabled}
          className={
            "text-white py-2 px-4 rounded " +
            (generateButtonDisabled
              ? "bg-slate-600 cursor-not-allowed"
              : "bg-blue-600")
          }
        >
          Generate Query
        </button>
        {generateButtonDisabled && (
          <div className="p-4 shadow-lg text-white bg-green-600 rounded">
            Select a participant and epitope to generate results.
          </div>
        )}
      </div>
    </div>
  );
}
