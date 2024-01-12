import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { EventType } from "./EventList";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

function EventDetails() {
  const { eventId } = useParams();
  const [event, setEvent] = useState<EventType>();

  const getEvent = async () => {
    const eventData = (await axios.get(`/api/events/${eventId}`)).data;
    setEvent(eventData);
  };

  useEffect(() => {
    getEvent();
  }, []);
  return (
    <div>
      {!event ? (
        <div>
          <p>Ooops... No data found</p>
          <p>
            Back to <Link to={"/"}>Home page</Link>
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="flex items-center w-full justify-between">
            <a href="/">
              <ArrowLeft className="text-orange-600 font-bold" />
            </a>
            <div>
              <motion.h1
                className="text-3xl font-semibold justify-self-center text-white"
                layoutId={event.name}
              >
                {event.name}
              </motion.h1>
              <motion.p className="text-slate-300" layoutId={event.description}>
                {event.description}
              </motion.p>
            </div>
            <div></div>
          </div>
          <TaskForm />

          <TaskList />
        </div>
      )}
    </div>
  );
}

export default EventDetails;
