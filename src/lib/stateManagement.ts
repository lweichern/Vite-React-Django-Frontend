import { EventType } from "@/components/EventList";
import { TaskType } from "@/components/TaskList";
import axios from "axios";
import { create } from "zustand";

type EventState = {
  events: EventType[];
  eventName: string;
  changeEventName: (name: string) => void;
  fetchEvents: () => void;
};

type TaskState = {
  tasks: TaskType[];
  taskName: string;
  changeTaskName: (name: string) => void;
  fetchTasks: (eventId: string | undefined) => void;
};

const useEventStore = create<EventState>((set) => ({
  events: [],
  eventName: "",
  changeEventName: (name) => set(() => ({ eventName: name })),
  fetchEvents: async () => {
    const eventData = (await axios.get("/api/events")).data;
    set(() => ({ events: eventData }));
  },
}));

const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  taskName: "",
  changeTaskName: (name) => set(() => ({ taskName: name })),
  fetchTasks: async (eventId) => {
    const taskData = (await axios.get(`/api/events/${eventId}/tasks`)).data;
    set(() => ({ tasks: taskData }));
  },
}));

export { useEventStore, useTaskStore };
