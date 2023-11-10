import { Button, Container } from "@/components";
import EditDaydreamWrapper from "@/app/admin/daydreams/[daydreamId]/_components/EditDaydreamWrapper";
import { Metadata } from "next";
import { Suspense } from "react";
import DaydreamFormLoading from "@/app/admin/daydreams/_components/DaydreamFormLoading";

export const metadata: Metadata = {
  title: "Admin - Editing dream..",
};

const DreamEditPage = () => (
  <Container>
    <div className="py-14">
      <div className="mb-8">
        <Button href="/admin/daydreams">Back to list</Button>
      </div>

      <Suspense
        fallback={
          <DaydreamFormLoading
            title="Update Daydream"
            cancelButtonText="Reset"
            submitButtonText="Update"
          />
        }
      >
        <EditDaydreamWrapper />
      </Suspense>
    </div>
  </Container>
);

export default DreamEditPage;
