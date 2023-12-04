import { AddTask } from "./AddTask";
import { TaskList } from "./TaskList";

/**
 * Todoコンポーネント
 */
export const Todo = () => {
  return (
    <>
      <main className="flex">
        <h1>TODOLIST</h1>
        <AddTask />
        <TaskList />
      </main>
    </>
  );
};
