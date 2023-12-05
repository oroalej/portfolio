"use client";

import {
  Button,
  CardBody,
  CardFooter,
  CardHeader,
  CardRoot,
  CardTitle,
  FormGroup,
  InputGroup,
  Label,
  PopoverContent,
  PopoverRoot,
  SearchableSelect,
} from "@/components";
import { InputField } from "@/components/Form/InputField";
import { RiSearch2Line } from "react-icons/ri";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { useQueryState } from "next-usequerystate";
import { VscSettings } from "react-icons/vsc";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { number, object } from "zod";
import { FormEvent, useEffect, useState } from "react";
import { YEARS } from "@/features/daydreams/data";
import * as Popover from "@radix-ui/react-popover";

const DAYDREAM_FILTER_DEFAULT_VALUES = {
  year: -1,
};

interface DaydreamFilterParams {
  year?: number;
}

const DaydreamTableFilterSchema = object({
  year: number().optional(),
});

const DaydreamTableFilters = () => {
  const [, setQuerySearch] = useQueryState("q", { shallow: false });
  const [year, setYear] = useQueryState("year", {
    shallow: false,
    parse: parseInt,
  });
  const [, setPage] = useQueryState("page", {
    parse: parseInt,
    shallow: false,
  });

  const [search, setSearch] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const {
    handleSubmit,
    formState: { isDirty, isValid, isSubmitting, isLoading },
    control,
    getValues,
    reset,
    setValue,
  } = useForm<DaydreamFilterParams>({
    mode: "onChange",
    defaultValues: DAYDREAM_FILTER_DEFAULT_VALUES,
    resolver: zodResolver(DaydreamTableFilterSchema),
  });

  useEffect(() => {
    if (!!year) setValue("year", year, { shouldDirty: true });
  }, []);

  const onFilterHandler = async () => {
    if (!!getValues("year")) await setYear(getValues("year") as number);

    await setPage(1);

    setIsFilterOpen(false);
  };

  const onClearHandler = async () => {
    await setYear(null);
    reset();
  };

  return (
    <CardRoot rounded className="mb-2">
      <CardHeader className="flex justify-between">
        <CardTitle icon={<BsFillMoonStarsFill />}>All Daydreams</CardTitle>

        <div className="flex gap-3">
          <InputGroup>
            <InputField
              placeholder="Search description.."
              prependIcon={RiSearch2Line}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onBlur={async () => {
                await setQuerySearch(search);
              }}
              onKeyPress={async (event) => {
                if (event.key.toLowerCase() === "enter") {
                  await setQuerySearch(search);
                }
              }}
            />

            <PopoverRoot
              open={isFilterOpen}
              onOpenChange={() => setIsFilterOpen((prevState) => !prevState)}
            >
              <Popover.Trigger
                type="button"
                className="border border-neutral-200 hover:bg-neutral-100 transition-colors pl-2.5 pr-3.5 h-full inline-flex items-center justify-center cursor-pointer rounded-e-md active:bg-neutral-200/50 open:bg-neutral-100 open:ring-2 open:ring-neutral-800 open:z-[1]"
                data-tooltip-id="admin-tooltip"
                data-tooltip-content="Filters"
                data-tooltip-place="bottom"
              >
                <VscSettings className="text-lg text-neutral-600 hover:text-neutral-800" />
              </Popover.Trigger>
              <PopoverContent>
                <form
                  method="post"
                  onSubmit={(event: FormEvent) =>
                    handleSubmit(onFilterHandler)(event)
                  }
                >
                  <fieldset disabled={isLoading || isSubmitting}>
                    <CardHeader className="pb-0">
                      <CardTitle>Filters</CardTitle>
                    </CardHeader>
                    <CardBody>
                      <FormGroup>
                        <Label>Year</Label>

                        <Controller
                          name="year"
                          control={control}
                          defaultValue={DAYDREAM_FILTER_DEFAULT_VALUES.year}
                          render={({ field: { onChange, value } }) => (
                            <SearchableSelect
                              value={value ?? null}
                              options={YEARS}
                              onChange={onChange}
                              defaultValue={DAYDREAM_FILTER_DEFAULT_VALUES.year}
                            />
                          )}
                        />
                      </FormGroup>
                    </CardBody>
                    <CardFooter className="items-center justify-end pt-0">
                      <Button
                        rounded
                        type="reset"
                        size="small"
                        variant="text"
                        color="secondary"
                        disabled={!isDirty}
                        onClick={onClearHandler}
                      >
                        Clear
                      </Button>
                      <Button
                        rounded
                        type="submit"
                        size="small"
                        disabled={!isValid || !isDirty}
                        isLoading={isSubmitting}
                      >
                        Filter
                      </Button>
                    </CardFooter>
                  </fieldset>
                </form>
              </PopoverContent>
            </PopoverRoot>
          </InputGroup>
          <Button rounded size="small" href="/admin/daydreams/create">
            Add New Dream
          </Button>
        </div>
      </CardHeader>
    </CardRoot>
  );
};

export default DaydreamTableFilters;
