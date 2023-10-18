import {Button, Container} from "@/components";
import {Metadata} from "next";
import CreateDaydreamWrapper from "@/app/admin/daydreams/create/_components/CreateDaydreamWrapper";
import {Suspense} from "react";
import DaydreamFormLoading from "@/app/admin/daydreams/_components/Loading/DaydreamFormLoading";

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

                <Suspense fallback={
                    <DaydreamFormLoading
                        title="Create Daydream"
                        cancelButtonText="Cancel"
                        submitButtonText="Submit"
                    />
                }>
                    <CreateDaydreamWrapper/>
                </Suspense>
            </div>
        </Container>
    )
}

export default CreateDaydreamPage;
