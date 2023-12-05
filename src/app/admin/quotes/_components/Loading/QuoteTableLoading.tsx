import QuoteTableRowLoading from "@/app/admin/quotes/_components/Loading/QuoteTableRowLoading";
import { CardRoot } from "@/components";

const QuoteTableLoading = () => (
  <CardRoot className="grow flex-1 transition-all" rounded>
    <table className="border-b border-neutral-200">
      <thead>
        <tr>
          <th className="w-28">Category</th>
          <th>Content</th>
          <th className="w-56">Source</th>
          <th className="w-56">Media Detail</th>
          <th className="w-28"></th>
        </tr>
      </thead>
      <tbody>
        {[...Array(2)].map((_, index) => (
          <QuoteTableRowLoading key={`row-loading-${index}`} />
        ))}
      </tbody>
    </table>
  </CardRoot>
);

export default QuoteTableLoading;
