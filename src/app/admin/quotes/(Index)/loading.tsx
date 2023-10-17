import RowLoading from "@/app/admin/quotes/_components/RowLoading";
import {BaseSkeletonLoader, Button, CardBody, CardHeader, CardRoot, CardTitle, FormGroup, Label} from "@/components";

const AdminQuoteListPage = () => (
    <div className="max-w-screen-2xl mx-auto py-14">
        <div className="flex justify-end mb-4">
            <Button href="/admin/quotes/create">
                Add Quote
            </Button>
        </div>

        <div className="flex flex-row gap-8">
            <CardRoot className="w-72 shrink-0">
                <CardHeader>
                    <CardTitle>Filter</CardTitle>
                </CardHeader>
                <CardBody className="flex flex-col">
                    <FormGroup>
                        <Label>Category</Label>
                        <BaseSkeletonLoader style={{height: "40px"}}/>
                    </FormGroup>

                    <FormGroup>
                        <Label>Source</Label>
                        <BaseSkeletonLoader style={{height: "40px"}}/>
                    </FormGroup>

                    <FormGroup>
                        <Label>Other</Label>
                        <BaseSkeletonLoader style={{height: "40px"}}/>
                    </FormGroup>
                </CardBody>
            </CardRoot>

            <CardRoot className="grow">
                <table className="border-b border-neutral-200">
                    <thead>
                    <tr>
                        <th className="w-28">Category</th>
                        <th className="">Quote</th>
                        <th className="w-56">Source</th>
                        <th className="w-56">Media Detail</th>
                        <th className="w-28"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {[...Array(2)].map((_, index) => (
                        <RowLoading key={`quote-list-${index}`}/>
                    ))}
                    </tbody>
                </table>
            </CardRoot>
        </div>
    </div>
)

export default AdminQuoteListPage
