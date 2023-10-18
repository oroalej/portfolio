import {CardRoot} from "@/components";
import DaydreamRowLoading from "@/app/admin/daydreams/_components/Loading/DaydreamRowLoading";

const DaydreamTableLoading = () => (
    <CardRoot>
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
                <DaydreamRowLoading key={`daydream-row-loading-${index}`}/>
            ))}
            </tbody>
        </table>
    </CardRoot>
)

export default DaydreamTableLoading
