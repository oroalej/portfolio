import {BaseSkeletonLoader, TextSkeletonLoader} from "@/components";

const RowLoading = () => (
    <tr>
        <td>
            <TextSkeletonLoader/>
        </td>
        <td>
            <div className="flex flex-col gap-2">
                <TextSkeletonLoader/>
                <TextSkeletonLoader className="w-2/3"/>
            </div>
        </td>
        <td>
            <TextSkeletonLoader/>
        </td>
        <td>
            <TextSkeletonLoader/>
        </td>
        <td>
            <div className="flex flex-row gap-2">
                <BaseSkeletonLoader className="w-9 aspect-square rounded"/>
                <BaseSkeletonLoader className="w-9 aspect-square rounded"/>
            </div>
        </td>
    </tr>
)

export default RowLoading;
