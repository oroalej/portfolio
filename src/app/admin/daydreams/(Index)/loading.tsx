import Link from "next/link";
import DaydreamTableLoading from "@/app/admin/daydreams/_components/Loading/DaydreamTableLoading";

const AdminDaydreamListLoading = () => {
    return (
        <div className="max-w-screen-xl mx-auto">
            <div className="py-14">
                <div className="flex justify-end mb-4">
                    <Link
                        href={"/admin/daydreams/create"}
                        type="submit"
                        className="text-neutral-200 bg-neutral-800 px-4 py-2 hover:bg-opacity-90 transition-colors active:bg-opacity-100 cursor-pointer disabled:cursor-default disabled:bg-opacity-75">
                        Add Dream
                    </Link>
                </div>

                <DaydreamTableLoading/>
            </div>
        </div>
    )
}

export default AdminDaydreamListLoading
