import { useEpitopeContext } from "@/contexts/epitope";

export default function UpperAnnotation({ i }) {
  const {
    epitope: { upperAnnotation },
  } = useEpitopeContext();

  const n = upperAnnotation?.find((top) => top.position === i)?.text;

  if (!n) {
    return null;
  }

  return (
    <>
      <span className="absolute top-[-3ch] left-[-.5ch] text-xs">{n}</span>
      <span
        className="absolute top-[-2.25ch] left-0"
        style={{
          background: "linear-gradient(#000, #000) no-repeat bottom/2px 33%",
        }}
      >
        &nbsp;
      </span>
    </>
  );
}
