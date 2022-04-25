export type Todo = {
  id: string;
  description: string;
  dueDate: Date;
  status: 'upcoming' | 'completed';
};
