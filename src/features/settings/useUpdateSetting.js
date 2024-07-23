import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingAPI } from "../../services/apiSettings";
import toast from "react-hot-toast";

export default function UseUpdateSetting() {
  const query = useQueryClient();
  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettingAPI,
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: ["settings"],
      });
      toast.success("Updated settings successfully");
    },
    onError: () => {
      toast.error("Failed to update the settings");
    },
  });
  return { updateSetting, isUpdating };
}
