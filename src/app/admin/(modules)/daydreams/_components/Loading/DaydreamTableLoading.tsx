import { CardRoot } from "@/components";
import { DaydreamTableRowLoading } from "@/app/admin/(modules)/daydreams/_components/DaydreamTableRow";

const DaydreamTableLoading = () => (
  <CardRoot rounded className="flex-1">
    <table className="border-b border-neutral-200">
      <thead>
        <tr>
          <th className="w-32">Image</th>
          <th className="w-36">Year</th>
          <th>Description</th>
          <th className="w-40">Setting</th>
          <th className="w-48">Created At</th>
          <th className="w-28"></th>
        </tr>
      </thead>
      <tbody>
        {[...Array(2)].map((_, index) => (
          <DaydreamTableRowLoading key={`daydream-row-loading-${index}`} />
        ))}
      </tbody>
    </table>
  </CardRoot>
);

export default DaydreamTableLoading;
