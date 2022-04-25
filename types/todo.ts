export type Todo = {
  id: string;
  description: string;
  // TODO due date
  status: 'upcoming' | 'completed';
};
