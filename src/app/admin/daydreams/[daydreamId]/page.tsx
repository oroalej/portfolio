import {Button, Container} from "@/components";
import {getDaydream} from "@/api/DaydreamAPI";
import EditDaydreamWrapper from "@/app/admin/daydreams/[daydreamId]/_components/EditDaydreamWrapper";
import {Metadata} from "next";

interface DreamEditPageProps {
    params: { daydreamId: string }
}

export async function generateMetadata({params: {daydreamId}}: DreamEditPageProps): Promise<Metadata> {
    const item = await getDaydream(daydreamId);

    return {
        title: `Admin - Editing ${item?.description} dream..`
    }
}

const DreamEditPage = async () => {
    return (
        <Container>
            <div className="py-14">
                <div className="mb-8">
                    <Button href="/admin/daydreams">Back to list</Button>
                </div>

                <EditDaydreamWrapper/>
            </div>
        </Container>
    )
}

export default DreamEditPage
