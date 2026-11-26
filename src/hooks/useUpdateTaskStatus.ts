import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { updateTaskStatus } from "@/services/task.service";
import { TaskStatus } from "@/types/task.types";

interface UpdateTaskStatusVariables {
  id: string;
  status: TaskStatus;
}

export function useUpdateTaskStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: UpdateTaskStatusVariables) =>
      updateTaskStatus(id, status),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.tasks.all });
    },
  });
}