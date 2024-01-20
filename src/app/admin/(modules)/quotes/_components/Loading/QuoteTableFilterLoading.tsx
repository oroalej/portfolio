import {
  Button,
  CardHeader,
  CardRoot,
  CardTitle,
  InputGroup,
} from "@/components";
import { BiSolidQuoteLeft } from "react-icons/bi";
import { InputField } from "@/components/Form/InputField";
import { RiSearch2Line } from "react-icons/ri";
import { VscSettings } from "react-icons/vsc";

const QuoteTableFilterLoading = () => (
  <CardRoot rounded className="mb-2">
    <CardHeader className="flex justify-between">
      <CardTitle icon={<BiSolidQuoteLeft />}>All Quotes</CardTitle>

      <div className="flex gap-3">
        <InputGroup>
          <InputField
            prependIcon=<RiSearch2Line />
            placeholder="Search content"
            disabled
          />
          <button
            className="border border-neutral-200 enabled:hover:bg-neutral-100 transition-colors pl-2.5 pr-3.5 h-full inline-flex items-center justify-center cursor-pointer rounded-e-md disabled:cursor-not-allowed"
            data-tooltip-id="admin-tooltip"
            disabled
          >
            <VscSettings className="text-lg text-neutral-600 enabled:hover:text-neutral-800" />
          </button>
        </InputGroup>

        <Button rounded size="small" disabled>
          Add New Quote
        </Button>
      </div>
    </CardHeader>
  </CardRoot>
);

export default QuoteTableFilterLoading;
