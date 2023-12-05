import {
  BaseSkeletonLoader,
  Button,
  CardBody,
  CardFooter,
  CardHeader,
  CardRoot,
  CardTitle,
  FormGroup,
  Label,
} from "@/components";

interface DaydreamFormLoadingProps {
  title: string;
  submitButtonText: string;
}

const DaydreamFormLoading = ({
  title,
  submitButtonText,
}: DaydreamFormLoadingProps) => (
  <CardRoot rounded className="max-w-md w-full sticky top-2">
    <CardHeader className="pb-0">
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardBody>
      <h3 className="text-base font-bold text-neutral-600 mb-3">{"Photo: "}</h3>

      <div className="w-full mb-3">
        <BaseSkeletonLoader className="w-52 mx-auto aspect-square rounded-md m-[2px]" />
      </div>

      <div>
        <h3 className="text-base font-bold text-neutral-600 mb-3">
          {"Details: "}
        </h3>

        <FormGroup>
          <Label required>Year</Label>

          <BaseSkeletonLoader
            className="rounded-md"
            style={{ height: "42px" }}
          />
        </FormGroup>

        <FormGroup>
          <Label required>Description</Label>

          <BaseSkeletonLoader
            className="rounded-md"
            style={{ height: "70px" }}
          />
        </FormGroup>

        <h3 className="text-base font-bold text-neutral-600 mb-3">
          {"Camera Setting: "}
        </h3>

        <div className="grid grid-cols-2 gap-x-4">
          <FormGroup>
            <Label required>ISO</Label>

            <BaseSkeletonLoader
              className="rounded-md"
              style={{ height: "40px" }}
            />
          </FormGroup>

          <FormGroup>
            <Label required>Shutter Speed</Label>

            <BaseSkeletonLoader
              className="rounded-md"
              style={{ height: "40px" }}
            />
          </FormGroup>

          <FormGroup>
            <Label required>Aperture</Label>

            <BaseSkeletonLoader
              className="rounded-md"
              style={{ height: "40px" }}
            />
          </FormGroup>
        </div>
      </div>
    </CardBody>
    <CardFooter className="justify-end pt-0">
      <Button
        type="button"
        variant="text"
        color="secondary"
        size="small"
        rounded
      >
        Reset
      </Button>

      <Button type="submit" size="small" rounded disabled>
        {submitButtonText}
      </Button>
    </CardFooter>
  </CardRoot>
);

export default DaydreamFormLoading;
