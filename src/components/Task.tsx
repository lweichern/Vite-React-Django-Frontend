import React, { useState } from "react";
import { TaskType } from "./TaskList";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import axios from "axios";
import { useTaskStore } from "@/lib/stateManagement";

function Task({ task }: { task: TaskType }) {
  const [isChecked, setIsChecked] = useState(task.isDone);

  const fetchTasks = useTaskStore((state) => state.fetchTasks);

  const deleteTask = async () => {
    await axios.delete(`/api/tasks/${task.id}/`);
    fetchTasks(task.event);
  };

  const updateTask = (checked: boolean) => {
    axios.patch(`/api/tasks/${task.id}/`, {
      isDone: checked,
    });
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);

    updateTask(e.target.checked);
  };
  return (
    <div className="flex justify-between items-center bg-blue-400 p-3 rounded-sm text-white text-xl">
      <div className="flex gap-2 items-center">
        <input
          type="checkbox"
          id={`task${task.id}`}
          name={`task${task.id}`}
          className="bg-white w-5 h-5"
          checked={isChecked}
          onChange={(e) => handleCheckbox(e)}
        />
        <label htmlFor="tasks">
          {isChecked ? <s>{task.name}</s> : <>{task.name}</>}
        </label>
      </div>

      <Button className="bg-red-600 p-2 hover:bg-red-700" onClick={deleteTask}>
        <Trash />
      </Button>
    </div>
  );
}

export default Task;
