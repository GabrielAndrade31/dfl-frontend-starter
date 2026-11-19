import TaskList from "@/components/tasks/TaskList";
import { Button } from "@/components/ui/Button";
import { useDeleteTask } from "@/hooks/useDeleteTask";
import { useGetTasks } from "@/hooks/useGetTasks";
import { useUpdateTaskStatus } from "@/hooks/useUpdateTaskStatus";
import { proximoStatus } from "@/utils/task.utils";
import { ArrowLeftIcon, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function TaskQueryPage() {
  const { data: tasks = [], isPending, isError, refetch } = useGetTasks();
  const updateStatusMutation = useUpdateTaskStatus();
  const deleteMutation = useDeleteTask();

  return (
    <main className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Tarefas (React Query)
        </h1>
        <Link to="/">
          <Button variant="neutral" className="gap-2">
            <ArrowLeftIcon className="h-4 w-4" />
            Voltar
          </Button>
        </Link>
      </div>

      {isPending ? (
        <div className="flex h-full items-center justify-center gap-1">
          <Loader2 className="h-4 w-4 animate-spin" />
          <p className="text-gray-500">Carregando...</p>
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-red-500">Erro ao carregar tarefas</p>
          <Button onClick={() => void refetch()}>Tentar de novo</Button>
        </div>
      ) : tasks.length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <p className="text-gray-500">Nenhuma tarefa encontrada</p>
        </div>
      ) : (
        <TaskList
          tasks={tasks}
          onConcluir={(task) =>
            updateStatusMutation.mutate({
              id: task.id,
              status: proximoStatus(task.status),
            })
          }
          onExcluir={(id) => deleteMutation.mutate(id)}
        />
      )}
    </main>
  );
}