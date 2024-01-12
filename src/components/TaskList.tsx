import { useEffect } from "react";
import Task from "./Task";
import { useParams } from "react-router-dom";
import { useTaskStore } from "@/lib/stateManagement";

export type TaskType = {
  id: number;
  name: string;
  isDone: boolean;
  event: string;
};

function TaskList() {
  const { eventId } = useParams();
  const tasks = useTaskStore((state) => state.tasks);
  const fetchTasks = useTaskStore((state) => state.fetchTasks);
  const taskName = useTaskStore((state) => state.taskName);

  useEffect(() => {
    fetchTasks(eventId);
  }, []);

  const taskList = tasks.filter((task) => {
    return task.name.toLowerCase().includes(taskName.toLowerCase());
  });

  return (
    <div className="flex flex-col gap-3">
      {tasks.length == 0 ? (
        <p className="text-white">No tasks created yet...</p>
      ) : (
        taskList.map((task) => <Task task={task} key={task.id} />)
      )}
    </div>
  );
}

export default TaskList;
