export interface Task {
  id: number | string;
  columnId: number | string;
  name: string;
  description: string;
  status: string;
  priority: string;
  endDate?: string;
}

export interface Column {
  id: string;
  columnTitle: string;
  tasks: Task[];
}
