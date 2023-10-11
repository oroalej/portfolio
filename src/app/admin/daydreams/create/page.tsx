import {Container} from "@/components";
import CreateDreamForm from "@/app/admin/daydreams/create/_components/CreateDreamForm";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Admin - Create Dream"
}

const CreateDaydreamPage = () => {
    return (
        <Container>
            <div className="py-14">
                <CreateDreamForm/>
            </div>
        </Container>
    )
}

export default CreateDaydreamPage;
