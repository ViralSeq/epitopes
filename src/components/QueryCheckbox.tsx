import { useQueryContext } from "@/contexts/query";
import { QueryCheckbox } from "@/interfaces";

export default function QueryCheckbox({ id, field }: QueryCheckbox) {
  const {
    state: { query },
    updateQuery,
  } = useQueryContext();

  return (
    <div
      className="flex gap-2 select-none"
      key={id}
      onClick={() => updateQuery(field, id)}
    >
      <input
        type="checkbox"
        name={id}
        checked={query[field].includes(id)}
        value={id}
        readOnly
        data-cy={`checkbox-${field}-${id}`}
      />
      <label htmlFor={id}>{id}</label>
    </div>
  );
}
