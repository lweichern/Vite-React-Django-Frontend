import "./App.css";
import AddButton from "./components/AddButton";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";
import { LayoutGroup } from "framer-motion";

function App() {
  return (
    <>
      <LayoutGroup>
        <div className="flex flex-col gap-6 h-full relative">
          <h1 className=" text-3xl font-semibold text-white">Event Manager</h1>
          <EventForm />
          <EventList />
          <AddButton />
        </div>
      </LayoutGroup>
    </>
  );
}

export default App;
