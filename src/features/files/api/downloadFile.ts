import { supabase } from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";
import { durationInMinutes } from "@/utils";
import { FileAPIDataStructure } from "@/features/files/types";

interface downloadFile {
  bucket_name: string;
  pathname: string;
}

export const getFileBlob = ({ bucket_name, pathname }: downloadFile) => {
  return supabase.storage.from(bucket_name).download(pathname);
};

export const useDownloadFile = (params: downloadFile) => {
  return useQuery({
    staleTime: durationInMinutes(2),

    queryKey: ["file", params],
    queryFn: async () => {
      const { data } = await getFileBlob(params);

      if (data === null) throw new Error("File not found.");

      return data as unknown as FileAPIDataStructure;
    },
  });
};
