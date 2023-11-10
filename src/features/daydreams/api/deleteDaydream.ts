import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useDeleteFileMutation } from "@/features/files/api";
import supabase from "@/utils/supabase";
import { DaydreamAPIDataStructure } from "@/features/daydreams/types";
import { dataWithPagination } from "@/utils/pagination";
import { getDaydreamListParams } from "@/features/daydreams/api/getDaydreamList";

export type DaydreamQueryKey = [string, getDaydreamListParams];
export const deleteDaydream = (id: string) => {
  return supabase.from("daydreams").delete().eq("id", id).throwOnError();
};

export const useDeleteDaydreamMutation = () => {
  const deleteFileMutation = useDeleteFileMutation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (item: DaydreamAPIDataStructure): Promise<void> => {
      try {
        await deleteFileMutation.mutateAsync({
          id: item.file.id,
          pathname: item.file.storage_file_path,
          bucket_name: "images",
        });

        toast.dismiss(item.file.id);
        toast.loading("Deleting information in daydreams table...", {
          id: item.id,
        });

        await deleteDaydream(item.id);
      } catch (error) {
        throw error;
      }
    },
    onSuccess: async (data, variables) => {
      toast.success("Your data has been successfully deleted!", {
        id: variables.id,
      });

      queryClient.removeQueries({
        queryKey: ["daydream", variables.id],
        exact: true,
        type: "active",
      });

      const cacheQuery = queryClient.getQueryCache().find({
        queryKey: ["daydreams"],
        exact: false,
      });

      if (cacheQuery) {
        const { pagination } =
          cacheQuery.state as unknown as dataWithPagination<DaydreamAPIDataStructure>;

        if (pagination.last_page !== pagination.current_page) {
          queryClient.removeQueries({
            queryKey: cacheQuery.queryKey,
            exact: true,
            type: "active",
          });
        } else {
          queryClient.setQueryData(
            cacheQuery.queryKey,
            (oldValue: DaydreamAPIDataStructure[]) => {
              if (oldValue) {
                return oldValue.filter(
                  (daydream) => daydream.id !== variables.id
                );
              }
            }
          );
        }
      }
    },
    onError: (error, variables) => {
      toast.error(error.message, { id: variables.id });
    },
  });
};
