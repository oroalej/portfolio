"use client";

import { useState } from "react";
import {
  Button,
  CardBody,
  CardFooter,
  CardHeader,
  CardRoot,
  CardTitle,
  FormGroup,
  Label,
} from "@/components";
import CategorySearchableSelect from "@/app/admin/quotes/_components/CategorySearchableSelect";
import SourceSearchableSelect from "@/app/admin/quotes/_components/SourceSearchableSelect";
import MediaDetailSearchableSelect from "@/app/admin/quotes/_components/MediaDetailSearchableSelect";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { removeEmptyValues } from "@/utils";

const TableFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [categoryId, setCategoryId] = useState<string>(
    searchParams.get("category_id") || ""
  );
  const [sourceId, setSourceId] = useState<string>(
    searchParams.get("source_id") || ""
  );
  const [mediaDetailId, setMediaDetailId] = useState<string>(
    searchParams.get("media_detail_id") || ""
  );

  const onFilterHandler = () => {
    const params = new URLSearchParams(
      removeEmptyValues({
        category_id: categoryId,
        source_id: sourceId,
        media_detail_id: mediaDetailId,
        per_page: searchParams.get("per_page"),
        page: searchParams.get("page"),
      })
    );

    router.push(`${pathname}?${params.toString()}`);
  };

  const onClearHandler = () => {
    const params = new URLSearchParams(
      removeEmptyValues({
        per_page: searchParams.get("per_page"),
        page: searchParams.get("page"),
      })
    );

    setCategoryId("");
    setSourceId("");
    setMediaDetailId("");

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <CardRoot className="w-72 shrink-0">
      <CardHeader>
        <CardTitle>Filter</CardTitle>
      </CardHeader>
      <CardBody className="flex flex-col grow">
        <FormGroup>
          <Label>Category</Label>
          <CategorySearchableSelect
            value={categoryId}
            onChange={(value) => {
              setCategoryId(value);
              setSourceId("");
              setMediaDetailId("");
            }}
          />
        </FormGroup>

        <FormGroup>
          <Label>Source</Label>
          <SourceSearchableSelect
            categoryId={categoryId}
            value={sourceId}
            onChange={(value) => {
              setSourceId(value);
              setMediaDetailId("");
            }}
            disabled={!categoryId}
          />
        </FormGroup>

        <FormGroup>
          <Label>Media Detail</Label>
          <MediaDetailSearchableSelect
            sourceId={sourceId}
            value={mediaDetailId}
            onChange={setMediaDetailId}
            disabled={!sourceId}
          />
        </FormGroup>
      </CardBody>
      <CardFooter className="justify-between">
        <Button
          rounded
          size="small"
          variant="text"
          color="secondary"
          onClick={onClearHandler}
        >
          Clear
        </Button>

        <Button rounded size="small" onClick={onFilterHandler}>
          Filter
        </Button>
      </CardFooter>
    </CardRoot>
  );
};

export default TableFilter;
