import {
  BaseSkeletonLoader,
  CardBody,
  CardFooter,
  CardRoot,
  FormGroup,
  Label,
} from "@/components";
import { InputFieldLoading } from "@/components/Form/InputField";
import { ScreenshotItemLoading } from "@/app/admin/projects/_components/Loading/ScreenshotItemLoading";

export const ProjectFormLoading = () => (
  <CardRoot rounded className="w-4/5 mx-auto opacity-95">
    <CardBody className="grid grid-cols-2 gap-8">
      <div>
        <div className="flex flex-row items-center justify-between mb-2">
          <h3 className="text-base font-bold text-neutral-600 mb-3">
            {"Screenshots: "}
          </h3>

          <BaseSkeletonLoader
            className="rounded-md"
            style={{ height: "28px", width: "110px" }}
          />
        </div>

        <div className="grid grid-cols-1 gap-1.5 relative">
          <ScreenshotItemLoading />

          <div
            className="rounded-md border border-dashed border-neutral-300"
            style={{ height: "77px" }}
          />
        </div>
      </div>

      <div>
        <h3 className="text-base font-bold text-neutral-600 mb-3">
          {"Details: "}
        </h3>
        <FormGroup>
          <Label required htmlFor="title-input-form">
            Title
          </Label>
          <InputFieldLoading />
        </FormGroup>
        <FormGroup>
          <Label required>Description</Label>
          <BaseSkeletonLoader
            className="rounded-md"
            style={{ height: "118px" }}
          />
        </FormGroup>

        <FormGroup>
          <Label required>Type</Label>
          <InputFieldLoading />
        </FormGroup>

        <FormGroup>
          <Label required>Technologies</Label>
          <InputFieldLoading />
        </FormGroup>

        <h3 className="text-base font-bold text-neutral-600 mb-3">
          {"Links: "}
        </h3>

        <div className="flex flex-col gap-2">
          <InputFieldLoading />
          <InputFieldLoading />
          <InputFieldLoading />
        </div>
      </div>
    </CardBody>
    <CardFooter className="justify-between">
      <BaseSkeletonLoader
        className="rounded-md"
        style={{ height: "36px", width: "70px" }}
      />

      <div className="inline-flex flex-row gap-3">
        <BaseSkeletonLoader
          className="rounded-md"
          style={{ height: "36px", width: "70px" }}
        />
        <BaseSkeletonLoader
          className="rounded-md"
          style={{ height: "36px", width: "110px" }}
        />
      </div>
    </CardFooter>
  </CardRoot>
);
