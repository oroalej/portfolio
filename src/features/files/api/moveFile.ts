import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/utils/supabase";
import { Toaster } from "@/types";

interface moveFileProps extends Toaster {
  bucket_name: string;
  fromPath: string;
  toPath: string;
}

export const moveFile = ({ bucket_name, fromPath, toPath }: moveFileProps) => {
  return supabase.storage.from(bucket_name).move(fromPath, toPath);
};

const toasterId = crypto.randomUUID();

export const useMoveFileMutation = () =>
  useMutation({
    mutationFn: async (params: moveFileProps): Promise<void> => {
      toast.loading(`transferring file`, { id: toasterId });

      await moveFile(params);
    },
    onSuccess: () => {
      toast.success("Your file has been successfully transferred!", {
        id: toasterId,
      });
    },
    onError: (error) => {
      toast.error(error.message, { id: toasterId });
    },
  });
