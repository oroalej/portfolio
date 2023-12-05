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
import { Fragment } from "react";
import QuoteInputFieldLoading from "@/app/admin/(modules)/quotes/_components/Loading/QuoteInputFieldLoading";

interface QuoteFormLoadingProps {
  title: string;
  submitButtonText: string;
}

const QuoteFormLoading = ({
  title,
  submitButtonText,
}: QuoteFormLoadingProps) => (
  <fieldset disabled className="max-w-sm w-full">
    <CardRoot rounded>
      <CardHeader className="pb-0">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardBody>
        <FormGroup>
          <Label required>Category</Label>

          <QuoteInputFieldLoading />
        </FormGroup>

        <Fragment>
          <FormGroup>
            <Label required>Artist, Movie or Book title</Label>

            <QuoteInputFieldLoading />
          </FormGroup>

          <FormGroup>
            <Label required>Song Title, Interview, or Character Name</Label>

            <QuoteInputFieldLoading />
          </FormGroup>
        </Fragment>

        <FormGroup>
          <Label required htmlFor="input-content">
            Content
          </Label>

          <BaseSkeletonLoader
            className="rounded-md"
            style={{ height: "142px" }}
          />
        </FormGroup>
      </CardBody>
      <CardFooter className="justify-end pt-0">
        <Button
          disabled
          type="button"
          variant="text"
          color="secondary"
          size="small"
          rounded
        >
          Reset
        </Button>

        <Button type="submit" disabled size="small" rounded>
          {submitButtonText}
        </Button>
      </CardFooter>
    </CardRoot>
  </fieldset>
);

export default QuoteFormLoading;
