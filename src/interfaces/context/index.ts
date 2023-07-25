import { Dispatch, SetStateAction } from "react";
import { Epitope, QueryFields } from "..";
import { SeqHighlighter } from "@prisma/client";

export type seqHighlightersBySpecimenId = {
  [specimenId: string]: SeqHighlighter[];
};

export type QueryResult = Epitope & {
  uniqueKey: string;
  participantId: string;
  seqHighlighters: seqHighlightersBySpecimenId;
};

export type SortResults = "epitopeId" | "participantId";

export type QueryStateType = {
  results: QueryResult[];
  query: {
    participantIds: string[];
    epitopeIds: string[];
  };
  sortResults: SortResults;
};

export type QueryContextType = {
  state: QueryStateType;
  setState: Dispatch<SetStateAction<QueryStateType>>;
  uniqueParticipantIds: string[];
  uniqueEpitopeIds: string[];
  updateQuery: (q: QueryFields, id: string) => void;
  generateQuery: () => void;
  toggleSortResults: (sortResults: SortResults) => void;
};
