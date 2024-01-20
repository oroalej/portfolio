import {
  Button,
  CardHeader,
  CardRoot,
  CardTitle,
  InputGroup,
} from "@/components";
import { InputField } from "@/components/Form/InputField";
import { RiSearch2Line } from "react-icons/ri";
import { VscSettings } from "react-icons/vsc";
import { BsFillMoonStarsFill } from "react-icons/bs";

const DaydreamTableFilterLoading = () => (
  <CardRoot rounded className="mb-2">
    <CardHeader className="flex justify-between">
      <CardTitle icon={<BsFillMoonStarsFill />}>All Daydreams</CardTitle>

      <div className="flex gap-3">
        <InputGroup>
          <InputField
            prependIcon=<RiSearch2Line />
            placeholder="Search description.."
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

        <Button rounded size="small">
          Add New Dream
        </Button>
      </div>
    </CardHeader>
  </CardRoot>
);

export default DaydreamTableFilterLoading;
