import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useCreateCabin() {
  const query = useQueryClient();
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: addEditCabin,
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("New Cabin created Successfully");
    },
    onError: () => {
      toast.error("Failed to add the cabin");
    },
  });

  return { createCabin, isCreating };
}
