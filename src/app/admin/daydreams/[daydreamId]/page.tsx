import {Button, Container} from "@/components";
import {getDaydream} from "@/api/DaydreamAPI";
import EditDaydreamWrapper from "@/app/admin/daydreams/[daydreamId]/_components/EditDaydreamWrapper";
import {Metadata} from "next";
import {Suspense} from "react";
import DaydreamFormLoading from "@/app/admin/daydreams/_components/Loading/DaydreamFormLoading";

interface DreamEditPageProps {
    params: { daydreamId: string }
}

export async function generateMetadata({params: {daydreamId}}: DreamEditPageProps): Promise<Metadata> {
    const item = await getDaydream(daydreamId);

    return {
        title: `Admin - Editing ${item?.description} dream..`
    }
}

const DreamEditPage = () => (
    <Container>
        <div className="py-14">
            <div className="mb-8">
                <Button href="/admin/daydreams">Back to list</Button>
            </div>

            <Suspense fallback={
                <DaydreamFormLoading
                    title="Update Daydream"
                    cancelButtonText="Reset"
                    submitButtonText="Update"
                />
            }>
                <EditDaydreamWrapper/>
            </Suspense>
        </div>
    </Container>
)

export default DreamEditPage
