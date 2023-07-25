import { useEffect, useState } from "react";
import { Sequencing } from "@/interfaces";

export default function useSequencings() {
  const [sequencings, setSequencings] = useState<Sequencing[]>([]);

  useEffect(() => {
    let sequencings = require("@/utils/sequencings.json");
    sequencings = JSON.parse(JSON.stringify(sequencings));
    setSequencings(sequencings);
  }, []);

  return [sequencings];
}
