import axios from "axios";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import { useTaskStore } from "@/lib/stateManagement";

function TaskForm() {
  const { eventId } = useParams();
  const [inputVal, setInputVal] = useState("");
  const fetchTasks = useTaskStore((state) => state.fetchTasks);
  const changeTaskName = useTaskStore((state) => state.changeTaskName);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
    changeTaskName(e.target.value);
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInputVal("");
    await axios.post(`/api/tasks/`, {
      name: inputVal,
      event: eventId,
    });
    changeTaskName("");
    fetchTasks(eventId);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        placeholder="Enter task name..."
        value={inputVal}
        onChange={(e) => handleChange(e)}
      />

      <Button type="submit" className="bg-orange-600">
        Add
      </Button>
    </form>
  );
}

export default TaskForm;
