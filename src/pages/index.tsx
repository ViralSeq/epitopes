import IndexTitle from "@/components/IndexTitle";
import QueryHeader from "@/components/QueryHeader";
import QueryResults from "@/components/QueryResults";
import { WithQueryContext } from "@/contexts/query";

function IndexPage() {
  return (
    <div className="flex flex-col gap-2 container mx-auto my-4">
      <IndexTitle />
      <QueryHeader />
      <QueryResults />
    </div>
  );
}

export default WithQueryContext(IndexPage);
