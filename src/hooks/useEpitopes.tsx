import { useEffect, useState } from "react";
import { Epitope } from "@/interfaces";

export default function useEpitopes() {
  const [epitopes, setEpitopes] = useState<Epitope[]>([]);

  useEffect(() => {
    let epitopes = require("@/utils/epitopes.json");
    epitopes = JSON.parse(JSON.stringify(epitopes));
    setEpitopes(epitopes);
  }, []);

  return [epitopes];
}
