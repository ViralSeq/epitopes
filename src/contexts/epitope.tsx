import { createContext, ReactNode, useContext } from "react";
import { QueryResult } from "@/interfaces/context";

type EpitopeContextType = { epitope: QueryResult };

export const EpitopeContext = createContext<EpitopeContextType>({
  epitope: {},
});

export function useEpitopeContext(): EpitopeContextType {
  return useContext(EpitopeContext);
}

export default function EpitopeContextProvider({
  children,
  epitope,
}: {
  children: ReactNode;
  epitope: QueryResult;
}): JSX.Element {
  epitope.uniqueKey = epitope.participantId + epitope.epitopeId;

  return (
    <EpitopeContext.Provider
      value={{
        epitope,
      }}
    >
      {children}
    </EpitopeContext.Provider>
  );
}
