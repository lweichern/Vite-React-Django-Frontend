import axios from "axios";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEventStore } from "../lib/stateManagement";

function EventForm() {
  const [inputVal, setInputVal] = useState("");
  const fetchEvents = useEventStore((state) => state.fetchEvents);
  const changeEventName = useEventStore((state) => state.changeEventName);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
    changeEventName(e.target.value);
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInputVal("");
    await axios.post(`/api/events`, {
      name: inputVal,
      created_by: "John",
      tasksNotDone: 0,
    });
    changeEventName("");
    fetchEvents();
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <Input
        type="text"
        placeholder="Search event details..."
        value={inputVal}
        onChange={(e) => handleChange(e)}
      />
    </form>
  );
}

export default EventForm;
