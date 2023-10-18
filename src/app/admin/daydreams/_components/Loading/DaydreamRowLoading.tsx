import {BaseSkeletonLoader, ImageSkeletonLoader} from "@/components";

const DaydreamRowLoading = () => (
    <tr>
        <td><ImageSkeletonLoader/></td>
        <td><BaseSkeletonLoader/></td>
        <td><BaseSkeletonLoader/></td>
        <td>
            <BaseSkeletonLoader className="mb-1.5"/>
            <BaseSkeletonLoader className="mb-1.5"/>
            <BaseSkeletonLoader className="mb-1.5"/>
        </td>
        <td><BaseSkeletonLoader/></td>
        <td></td>
    </tr>
)

export default DaydreamRowLoading;
