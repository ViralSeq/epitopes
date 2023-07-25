import { useEpitopeContext } from "@/contexts/epitope";
import { Fragment } from "react";
import ColorizeHighlighter from "./ColorizeHighlighter";

export default function SeqHighlighters() {
  const {
    epitope: { seqHighlighters, uniqueKey },
  } = useEpitopeContext();

  const keys = Object.keys(seqHighlighters);
  return (
    <>
      {!!keys &&
        keys.map((specimenId) => {
          const highlighters = seqHighlighters[specimenId];

          return (
            <Fragment key={uniqueKey + specimenId}>
              {highlighters.map(({ highlighter, count }, i) => (
                <Fragment key={uniqueKey + highlighter}>
                  <div>{i === 0 && specimenId}</div>
                  <div className={i === highlighters.length - 1 ? "mb-4" : ""}>
                    N={count}
                  </div>
                  <div className="tracking-widest font-bold justify-self-end">
                    <ColorizeHighlighter highlighter={highlighter} />
                  </div>
                </Fragment>
              ))}
            </Fragment>
          );
        })}
    </>
  );
}
