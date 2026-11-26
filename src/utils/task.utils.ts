import { Priority, TaskStatus } from "@/types/task.types";

export function corDaPrioridade(p: Priority): string {
  switch (p) {
    case Priority.ALTA:
      return "red";
    case Priority.MEDIA:
      return "yellow";
    case Priority.BAIXA:
      return "green";
  }
}

const ORDEM_STATUS = [
  TaskStatus.A_fazer,
  TaskStatus.Fazendo,
  TaskStatus.Em_Revisao,
  TaskStatus.Feito,
];

export function proximoStatus(atual: TaskStatus): TaskStatus {
  const indiceAtual = ORDEM_STATUS.indexOf(atual);
  return ORDEM_STATUS[(indiceAtual + 1) % ORDEM_STATUS.length];
}