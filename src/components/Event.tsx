import { Link } from "react-router-dom";
import { EventType } from "./EventList";
import { EventModal } from "./EventModal";
import { Check, Trash } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { useEventStore } from "@/lib/stateManagement";
import { motion } from "framer-motion";

function Event({ event }: { event: EventType }) {
  const fetchEvents = useEventStore((state) => state.fetchEvents);
  const deleteEvent = async () => {
    await axios.delete(`/api/events/${event.id}`);
    fetchEvents();
  };

  const tasksUndone = event.tasks.filter((task) => {
    return !task.isDone;
  });

  console.log("count: ", tasksUndone.length);
  return (
    <div className=" bg-slate-900 rounded-md hover:bg-slate-950 flex gap-3 justify-center items-center p-4">
      <Link
        to={`events/${event.id}`}
        className="flex gap-3 flex-1 items-center"
      >
        <p
          className={`${
            tasksUndone.length !== 0 ? "bg-red-600" : "bg-green-600"
          } w-8 h-8 rounded-full flex justify-center items-center text-md text-white`}
        >
          {tasksUndone.length !== 0 ? tasksUndone.length : <Check />}
        </p>
        <div className=" text-left">
          <motion.h3 className="text-2xl text-white" layoutId={event.name}>
            {event.name}
          </motion.h3>
          <motion.p className=" text-slate-300" layoutId={event.description}>
            {event.description}
          </motion.p>
        </div>
      </Link>
      <EventModal event={event} type="edit" />
      <Button className="bg-red-600 p-2 hover:bg-red-700" onClick={deleteEvent}>
        <Trash />
      </Button>
    </div>
  );
}

export default Event;
