import { useState } from "react";
import md from "../../README.md";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

const table = md
  .split(/\n/)
  .filter((row) => row[0] === "|")
  .map((row) =>
    row
      .split("|")
      .filter((str) => !!str.length)
      .map((str) => str.trim())
  );

const headers = table[0];

//skip "----" row
const body = table.slice(2);

export default function IndexTitle() {
  const [show, setShow] = useState(true);

  return (
    <table className="table">
      <caption className="text-xl font-bold self-center mb-2 relative">
        HIV-1 envelope-reactive broadly neutralizing antibody (bnAb) epitopes
        <span
          className="absolute right-0 top-0 cursor-pointer border border-red-300 hover:bg-red-300 hover:text-white rounded-full p-1"
          onClick={() => setShow((b) => !b)}
        >
          {show ? (
            <ChevronDownIcon className="w-4 h-4" />
          ) : (
            <ChevronUpIcon className="w-4 h-4" />
          )}
        </span>
      </caption>
      <thead className={show ? "" : "hidden"}>
        <tr>
          {headers.map((header) => (
            <th key={`header_${header}`}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody className={show ? "" : "hidden"}>
        {body.map((row, i) => (
          <tr key={`index-table-${i}`}>
            {row.map((cell, j) => (
              <td
                key={`index-table-${i}-${j}`}
                className="border-black border-1 border p-1"
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
