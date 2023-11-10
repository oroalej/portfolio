import { SearchableSelect, SearchableSelectProps } from "@/components";
import { useCallback } from "react";
import {
  useGetMediaDetailListBySourceId,
  useStoreMediaDetailMutation,
} from "@/features/media_details/api";
import { useQueryClient } from "@tanstack/react-query";

interface SelectProps
  extends Omit<SearchableSelectProps<string>, "options" | "onCreate" | "name"> {
  sourceId: string;
}

const MediaDetailSearchableSelect = ({
  sourceId,
  onChange,
  ...props
}: SelectProps) => {
  const mediaDetailListQuery = useGetMediaDetailListBySourceId(sourceId);
  const storeMediaDetailMutation = useStoreMediaDetailMutation();

  const onCreateHandler = useCallback(
    async (value: string) => {
      await storeMediaDetailMutation.mutateAsync({
        name: value,
        source_id: sourceId,
      });
    },
    [sourceId]
  );

  return (
    <SearchableSelect
      name="media_detail"
      {...props}
      options={
        mediaDetailListQuery.data?.map((media) => ({
          text: media.name,
          value: media.id,
        })) || []
      }
      onChange={onChange}
      onCreate={onCreateHandler}
    />
  );
};

export default MediaDetailSearchableSelect;
