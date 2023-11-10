import { Button } from "@/components";
import DaydreamFormLoading from "@/app/admin/daydreams/_components/DaydreamFormLoading";

const EditDaydreamLoading = () => (
  <div className="py-14 max-w-xl mx-auto">
    <div className="mb-8">
      <Button disabled>Back to list</Button>
    </div>

    <DaydreamFormLoading
      title="Update Daydream"
      cancelButtonText="Reset"
      submitButtonText="Update"
    />
  </div>
);

export default EditDaydreamLoading;
