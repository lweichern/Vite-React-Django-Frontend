import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Plus } from "lucide-react";
import { EventType } from "./EventList";
import { useState } from "react";
import axios from "axios";
import { DialogClose } from "@radix-ui/react-dialog";
import { useEventStore } from "@/lib/stateManagement";

export function EventModal({
  event,
  type,
}: {
  event?: EventType;
  type: string;
}) {
  const fetchEvents = useEventStore((state) => state.fetchEvents);
  const [inputVal, setInputVal] = useState(event?.name);
  const [inputValDesc, setInputValDesc] = useState(event?.description);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  };

  const handleDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValDesc(e.target.value);
  };

  const editEvent = async () => {
    await axios.put(`/api/events/${event?.id}`, {
      name: inputVal,
      description: inputValDesc,
    });
    fetchEvents();
  };

  const addEvent = async () => {
    setInputVal("");
    await axios.post(`/api/events`, {
      name: inputVal,
      created_by: "John",
      tasksNotDone: 0,
      description: inputValDesc,
    });
    fetchEvents();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {type === "add" ? (
          <Button className="w-12 h-12 rounded-full bg-orange-600 flex justify-center items-center absolute bottom-4 right-4 text-white cursor-pointer hover:bg-orange-700">
            <Plus />
          </Button>
        ) : (
          <Button variant="outline" className="p-2">
            <Pencil />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-orange-600 text-2xl">
            {type === "add" ? "Add" : "Edit"} Event
          </DialogTitle>
          <DialogDescription>
            {type === "add"
              ? "Enter event details here. Click Add when you're done."
              : "Make changes to your event here. Click Save when you're done."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={inputVal}
              className="col-span-3"
              onChange={handleChange}
              autoComplete="off"
            />

            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              value={inputValDesc}
              className="col-span-3"
              onChange={handleDescChange}
              autoComplete="off"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button
              className="bg-orange-600"
              onClick={type === "add" ? addEvent : editEvent}
            >
              {type === "add" ? "Add" : "Save changes"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
