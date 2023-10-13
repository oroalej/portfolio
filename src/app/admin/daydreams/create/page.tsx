import {Button, Container} from "@/components";
import {Metadata} from "next";
import CreateDaydreamWrapper from "@/app/admin/daydreams/create/_components/CreateDaydreamWrapper";

export const metadata: Metadata = {
    title: "Admin - Create Dream"
}

const CreateDaydreamPage = () => {
    return (
        <Container>
            <div className="py-14">
                <div className="mb-8">
                    <Button href="/admin/daydreams">Back to list</Button>
                </div>

                <CreateDaydreamWrapper />
            </div>
        </Container>
    )
}

export default CreateDaydreamPage;
