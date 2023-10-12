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

const DaydreamFormLoading = () => {
    return (
        <CardRoot>
            <CardHeader>
                <CardTitle>Edit Dream</CardTitle>
            </CardHeader>
            <CardBody>
                <div className="grid gap-6 grid-cols-2">
                    <FormGroup className="flex flex-col">
                        <Label>Image: </Label>

                        <small className="leading-snug block text-neutral-500 text-xs mb-2">
                            File types supported: JPG, JPEG, PNG, and WEBP. Max size: 15 MB
                        </small>

                        <div className="relative grow group border">
                            <BaseSkeletonLoader className="h-full"/>
                        </div>
                    </FormGroup>

                    <div>
                        <h3 className="text-lg font-bold text-neutral-600 mb-3">Details: </h3>

                        <FormGroup>
                            <Label required>Year</Label>

                            <BaseSkeletonLoader style={{height: "46px"}}/>
                        </FormGroup>

                        <FormGroup>
                            <Label required htmlFor="input-description">Description</Label>

                            <BaseSkeletonLoader style={{height: "94px"}}/>
                        </FormGroup>

                        <h3 className="text-lg font-bold text-neutral-600 mb-3">Camera Setting: </h3>

                        <FormGroup>
                            <Label required>ISO</Label>

                            <BaseSkeletonLoader style={{height: "46px"}}/>
                        </FormGroup>

                        <FormGroup>
                            <Label required>Shutter Speed</Label>

                            <BaseSkeletonLoader style={{height: "46px"}}/>
                        </FormGroup>

                        <FormGroup>
                            <Label required>Aperture</Label>

                            <BaseSkeletonLoader style={{height: "46px"}}/>
                        </FormGroup>
                    </div>
                </div>
            </CardBody>
            <CardFooter className="justify-end gap-3">
                <Button
                    type="button"
                    variant="plain"
                    color="secondary"
                    disabled
                >
                    Reset
                </Button>

                <Button type="submit" disabled>
                    Update
                </Button>
            </CardFooter>
        </CardRoot>
    )
}

export default DaydreamFormLoading;
