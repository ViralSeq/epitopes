import { useEpitopeContext } from "@/contexts/epitope";

export default function LowerAnnotation({ i }) {
  const {
    epitope: { lowerAnnotation },
  } = useEpitopeContext();

  const strand = lowerAnnotation?.find((strand) => strand.startPosition === i);

  if (!strand) {
    return null;
  }

  const length = 2 + (strand.endPosition - strand.startPosition);

  return (
    <>
      <hr
        className="absolute top-6 bg-black h-[3px] border-none"
        style={{ width: length + "ch" }}
      />
      <span
        className="text-sm absolute top-6 whitespace-nowrap text-center tracking-normal font-normal"
        style={{ width: length + "ch" }}
      >
        {strand.text}
      </span>
    </>
  );
}
