import { useQueryContext } from "@/contexts/query";
import EpitopeDisplay from "./epitope/EpitopeDisplay";
import EpitopeContextProvider from "@/contexts/epitope";

export default function QueryResults() {
  const {
    state: { results },
    toggleSortResults,
  } = useQueryContext();

  if (!results.length) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <div className="font-lg text-lg font-bold">Results:</div>
        <div className="flex gap-2 items-center">
          Sort By:
          <select
            className="shadow rounded p-1"
            onChange={(e) => toggleSortResults(e.target.value)}
          >
            <option value="participantId">Participant ID</option>
            <option value="epitopeId">Epitope ID</option>
          </select>
        </div>
      </div>
      <div className="flex w-full h-full">
        <div className="flex flex-col">
          <div className="flex flex-wrap gap-2 p-1">
            {results.map((epitope, i) => (
              <EpitopeContextProvider
                epitope={epitope}
                key={`epitope-provider-${i}`}
              >
                <EpitopeDisplay />
              </EpitopeContextProvider>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
