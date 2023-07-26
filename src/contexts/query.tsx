import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { QueryFields } from "@/interfaces";
import {
  QueryContextType,
  QueryResult,
  QueryStateType,
  seqHighlightersBySpecimenId,
  SortResults,
} from "@/interfaces/context";
import { ALL_KEY } from "@/utils/constants";
import useEpitopes from "@/hooks/useEpitopes";
import useSequencings from "@/hooks/useSequencings";

const INITIAL_STATE: QueryStateType = {
  results: [],
  query: {
    participantIds: [],
    epitopeIds: [],
  },
  sortResults: "participantId",
};

export const QueryContext = createContext<QueryContextType>({
  state: INITIAL_STATE,
  setState: () => null,
  uniqueParticipantIds: [],
  uniqueEpitopeIds: [],
  updateQuery: () => null,
  generateQuery: () => null,
  toggleSortResults: (sortResults: SortResults) => null,
});

export function useQueryContext(): QueryContextType {
  return useContext(QueryContext);
}

export default function QueryContextProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [state, setState] = useState<QueryStateType>(INITIAL_STATE);

  const [epitopes] = useEpitopes();
  const [sequencings] = useSequencings();

  const uniqueParticipantIds = useMemo(
    () => [
      ALL_KEY,
      ...[
        ...new Set(sequencings.map((sequence) => sequence.participantId)),
      ].sort((a, b) => a - b),
    ],
    [sequencings]
  );

  const uniqueEpitopeIds = useMemo(
    () => [
      ALL_KEY,
      ...[...new Set(epitopes.map((epitope) => epitope.epitopeId))].sort(
        (a, b) => a.localeCompare(b)
      ),
    ],
    [epitopes]
  );

  //toggle <QueryCheckbox />, special case for ALL_KEY
  const updateQuery = (queryField: QueryFields, id: string) => {
    setState((s) => {
      const { query } = s;
      let fields = query[queryField];

      if (id === ALL_KEY) {
        fields = fields.includes(ALL_KEY) ? [] : [ALL_KEY];
      } else {
        if (fields.includes(ALL_KEY)) {
          fields = fields.filter((field) => field !== ALL_KEY);
        }

        if (fields.includes(id)) {
          fields = fields.filter((field) => field !== id);
        } else {
          fields = [...fields, id];
        }
      }

      return {
        ...s,
        query: {
          ...s.query,
          [queryField]: fields,
        },
      };
    });
  };

  //process state.query into state.results
  const generateQuery = () => {
    const {
      query: { epitopeIds, participantIds },
    } = state;

    const allEpitopes = epitopeIds.includes(ALL_KEY);
    const allParticipants = participantIds.includes(ALL_KEY);

    const approvedParticipantIds: string[] = allParticipants
      ? uniqueParticipantIds.filter((id) => id !== ALL_KEY)
      : participantIds;

    const approvedEpitopeIds: string[] = allEpitopes
      ? uniqueEpitopeIds.filter((id) => id !== ALL_KEY)
      : epitopeIds;

    //RIGHT JOIN +Sequencings to +Epitopes
    const results: QueryResult[] = approvedParticipantIds
      .map((participantId) =>
        approvedEpitopeIds.map((eId) => ({
          ...epitopes.find((e) => e.epitopeId === eId),
          participantId,
          //GROUP SeqHighlighter[] to result by specimenId
          seqHighlighters: sequencings
            .filter(
              (s) => s.participantId === participantId && s.epitopeId === eId
            )
            .reduce<seqHighlightersBySpecimenId>((acc, sequencing) => {
              acc[sequencing.specimenId] = acc[sequencing.specimenId] || [];
              acc[sequencing.specimenId].push(...sequencing.seqHighlighter);
              return acc;
            }, {}),
        }))
      )
      .flat();

    setState((s) => ({ ...s, results: sortResults(results) }));
  };

  const sortResults = (results: QueryResult[] | false = false) => {
    const { sortResults } = state;

    if (!results) {
      results = state.results;
    }

    return results.sort((a, b) =>
      sortResults === "participantId"
        ? a.participantId - b.participantId
        : a.epitopeId.localeCompare(b.epitopeId)
    );
  };

  useEffect(() => {
    setState((s) => ({ ...s, results: sortResults(s.results) }));
  }, [state.sortResults]);

  const toggleSortResults = (sortResults: SortResults) =>
    setState((s) => ({
      ...s,
      sortResults,
    }));

  return (
    <QueryContext.Provider
      value={{
        state,
        setState,
        uniqueParticipantIds,
        uniqueEpitopeIds,
        updateQuery,
        generateQuery,
        toggleSortResults,
      }}
    >
      {children}
    </QueryContext.Provider>
  );
}

export const WithQueryContext = (Component) => {
  return function WrapperComponent(props) {
    return (
      <QueryContextProvider>
        <Component {...props} />
      </QueryContextProvider>
    );
  };
};
