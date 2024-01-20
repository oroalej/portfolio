"use client";

import { RiSearch2Line } from "react-icons/ri";
import { VscSettings } from "react-icons/vsc";
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
} from "@/components";
import { BiSolidQuoteLeft } from "react-icons/bi";
import { InputField } from "@/components/Form/InputField";
import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  parseAsString,
  useQueryState,
  useQueryStates,
} from "next-usequerystate";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string } from "zod";
import { removeEmptyValues } from "@/utils";
import * as Popover from "@radix-ui/react-popover";
import CategorySearchableSelect from "@/app/admin/(modules)/quotes/_components/Select/CategorySearchableSelect";
import SourceSearchableSelect from "@/app/admin/(modules)/quotes/_components/Select/SourceSearchableSelect";
import MediaDetailSearchableSelect from "@/app/admin/(modules)/quotes/_components/Select/MediaDetailSearchableSelect";

const QUOTE_TABLE_FILTER_DEFAULT_VALUES = {
  category_id: "",
  source_id: "",
  media_detail_id: "",
};

interface QuoteTableFilterParams {
  category_id?: string;
  source_id?: string;
  media_detail_id?: string;
}

const QuoteTableFilterSchema = object({
  category_id: string().trim().min(1, "Category field is required"),
  source_id: string().trim().optional(),
  media_detail_id: string().trim().optional(),
});

const QuoteTableFilter = () => {
  const searchParams = useSearchParams();

  const [, setPage] = useQueryState("page", { shallow: false });
  const [, setQuerySearch] = useQueryState("q", { shallow: false });
  const [filters, setFilters] = useQueryStates(
    {
      category_id: parseAsString.withDefault(""),
      media_detail_id: parseAsString.withDefault(""),
      source_id: parseAsString.withDefault(""),
    },
    { scroll: false, shallow: false }
  );

  const [search, setSearch] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const {
    handleSubmit,
    formState: { isDirty, isValid, isSubmitting, isLoading },
    control,
    getValues,
    reset,
    resetField,
    watch,
    setValue,
  } = useForm<QuoteTableFilterParams>({
    mode: "onChange",
    defaultValues: QUOTE_TABLE_FILTER_DEFAULT_VALUES,
    resolver: zodResolver(QuoteTableFilterSchema),
  });

  const onClearHandler = async () => {
    await setFilters({
      category_id: null,
      source_id: null,
      media_detail_id: null,
    });

    reset();
  };

  useEffect(() => {
    for (const [key, value] of Object.entries(filters)) {
      if (!!value) {
        setValue(key as keyof QuoteTableFilterParams, value, {
          shouldDirty: true,
        });
      }
    }
  }, []);

  const onFilterHandler = async () => {
    await setFilters({
      category_id: null,
      source_id: null,
      media_detail_id: null,
      ...removeEmptyValues(getValues()),
    });

    await setPage("1");

    setIsFilterOpen(false);
  };

  return (
    <CardRoot rounded className="mb-2">
      <CardHeader className="flex justify-between">
        <CardTitle icon={<BiSolidQuoteLeft />}>All Quotes</CardTitle>

        <div className="flex gap-3">
          <InputGroup>
            <InputField
              prependIcon=<RiSearch2Line />
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onBlur={async () => {
                await setQuerySearch(search);
              }}
              placeholder="Search content"
              onKeyPress={async (event) => {
                if (event.key.toLowerCase() === "enter") {
                  await setQuerySearch(event.currentTarget.value);
                }
              }}
            />

            <Popover.Root
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
              <Popover.Portal>
                <Popover.Content align="end" sideOffset={8}>
                  <CardRoot className="drop-shadow-xl w-80 border border-neutral-100 rounded-lg">
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
                            <Label>Category</Label>
                            <Controller
                              name="category_id"
                              control={control}
                              defaultValue={
                                QUOTE_TABLE_FILTER_DEFAULT_VALUES.category_id
                              }
                              render={({ field: { onChange, value } }) => (
                                <CategorySearchableSelect
                                  value={value ?? null}
                                  defaultValue={
                                    QUOTE_TABLE_FILTER_DEFAULT_VALUES.category_id
                                  }
                                  onClear={reset}
                                  onChange={(value) => {
                                    onChange(value);
                                    resetField("source_id");
                                    resetField("media_detail_id");
                                  }}
                                />
                              )}
                            />
                          </FormGroup>

                          <FormGroup>
                            <Label>Source</Label>

                            <Controller
                              name="source_id"
                              control={control}
                              defaultValue={
                                QUOTE_TABLE_FILTER_DEFAULT_VALUES.source_id
                              }
                              render={({ field: { onChange, value } }) => (
                                <SourceSearchableSelect
                                  categoryId={watch("category_id") as string}
                                  value={value ?? null}
                                  defaultValue={
                                    QUOTE_TABLE_FILTER_DEFAULT_VALUES.source_id
                                  }
                                  onClear={() => {
                                    resetField("media_detail_id");
                                    resetField("source_id");
                                  }}
                                  onChange={(value) => {
                                    onChange(value);
                                    resetField("media_detail_id");
                                  }}
                                  disabled={!watch("category_id")}
                                />
                              )}
                            />
                          </FormGroup>

                          <FormGroup>
                            <Label>Media Detail</Label>
                            <Controller
                              name="media_detail_id"
                              control={control}
                              defaultValue={
                                QUOTE_TABLE_FILTER_DEFAULT_VALUES.media_detail_id
                              }
                              render={({ field: { onChange, value } }) => (
                                <MediaDetailSearchableSelect
                                  disabled={!watch("source_id")}
                                  sourceId={watch("source_id") as string}
                                  value={value ?? null}
                                  defaultValue={
                                    QUOTE_TABLE_FILTER_DEFAULT_VALUES.media_detail_id
                                  }
                                  onClear={() => {
                                    resetField("media_detail_id");
                                  }}
                                  onChange={onChange}
                                />
                              )}
                            />
                          </FormGroup>
                        </CardBody>
                        <CardFooter className="items-center justify-end pt-0">
                          <Button
                            type="reset"
                            size="small"
                            variant="text"
                            color="secondary"
                            rounded
                            onClick={onClearHandler}
                            disabled={!isDirty}
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
                  </CardRoot>
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          </InputGroup>

          <Button
            size="small"
            rounded
            href={`/admin/quotes?${searchParams.toString()}`}
          >
            Add Quote
          </Button>
        </div>
      </CardHeader>
    </CardRoot>
  );
};

export default QuoteTableFilter;
