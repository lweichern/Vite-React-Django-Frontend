import { useEffect } from "react";
import Event from "./Event";
import { useEventStore } from "@/lib/stateManagement";
import { TaskType } from "./TaskList";

export type EventType = {
  id: number;
  name: string;
  tasksNotDone: number;
  tasks: TaskType[];
  description: string;
};

function EventList() {
  const events = useEventStore((state) => state.events);
  const fetchEvents = useEventStore((state) => state.fetchEvents);
  const eventName = useEventStore((state) => state.eventName);

  useEffect(() => {
    fetchEvents();
  }, []);

  const eventList = events.filter((event) => {
    return (
      event.name.toLowerCase().includes(eventName.toLowerCase()) ||
      event.description?.toLowerCase().includes(eventName.toLowerCase())
    );
  });

  return (
    <div className=" flex flex-col gap-3">
      {eventList.map((event) => (
        <Event key={event.id} event={event} />
      ))}
    </div>
  );
}

export default EventList;
