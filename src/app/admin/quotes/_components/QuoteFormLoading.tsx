import {
    BaseSkeletonLoader,
    Button,
    CardBody,
    CardFooter,
    CardHeader,
    CardRoot,
    CardTitle,
    FormGroup,
    Label
} from "@/components";
import {Fragment} from "react";

interface QuoteFormLoadingProps {
    title: string;
    cancelButtonText: string;
    submitButtonText: string;
}

const QuoteFormLoading = ({
    title,
    cancelButtonText,
    submitButtonText
}: QuoteFormLoadingProps) => (
    <fieldset disabled>
        <CardRoot>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardBody>
                <FormGroup>
                    <Label required>Category</Label>

                    <BaseSkeletonLoader style={{height: "40px"}}/>
                </FormGroup>

                <Fragment>
                    <FormGroup>
                        <Label required>Source</Label>

                        <BaseSkeletonLoader style={{height: "40px"}}/>
                    </FormGroup>

                    <FormGroup>
                        <Label>Media Detail</Label>

                        <BaseSkeletonLoader style={{height: "40px"}}/>
                    </FormGroup>
                </Fragment>

                <FormGroup>
                    <Label required htmlFor="input-content">Content</Label>

                    <BaseSkeletonLoader style={{height: "142px"}}/>
                </FormGroup>
            </CardBody>
            <CardFooter className="justify-end gap-3">
                <Button
                    disabled
                    type="button"
                    variant="plain"
                    color="secondary"
                >
                    {cancelButtonText}
                </Button>

                <Button type="submit" disabled>{submitButtonText}</Button>
            </CardFooter>
        </CardRoot>
    </fieldset>
)

export default QuoteFormLoading;
