import { Button } from "@/components";
import DaydreamFormLoading from "@/app/admin/daydreams/_components/DaydreamFormLoading";

const CreateDaydreamLoading = () => (
  <div className="py-14 max-w-xl mx-auto">
    <div className="mb-8">
      <Button disabled>Back to list</Button>
    </div>

    <DaydreamFormLoading
      title="Create Daydream"
      cancelButtonText="Cancel"
      submitButtonText="Submit"
    />
  </div>
);

export default CreateDaydreamLoading;
