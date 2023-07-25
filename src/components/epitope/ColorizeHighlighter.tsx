import { useEpitopeContext } from "@/contexts/epitope";
import { HIGHLIGHTER_COLORS } from "@/utils/constants";

export default function ColorizeHighlighter({
  highlighter,
}: {
  highlighter: string;
}) {
  const {
    epitope: { uniqueKey },
  } = useEpitopeContext();

  return (
    <>
      {highlighter.split("").map((char, i) => (
        <span
          key={`${uniqueKey}-highlighter_${i}`}
          style={
            char === "-"
              ? {}
              : {
                  color: HIGHLIGHTER_COLORS[char.toUpperCase()] || "black",
                }
          }
        >
          {char}
        </span>
      ))}
    </>
  );
}
