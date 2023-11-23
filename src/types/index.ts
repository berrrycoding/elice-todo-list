export type TodoItem = {
  id: string;
  content: string;
  isDone: boolean;
  createdAt: string; // yyyy-MM-dd
};

export type InputMode = {
  type: "add" | "edit" | "default";
  item?: TodoItem;
};
