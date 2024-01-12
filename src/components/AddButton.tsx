import { Plus } from "lucide-react";
import React from "react";
import { EventModal } from "./EventModal";

function AddButton() {
  return (
    <div>
      <EventModal type="add" />
    </div>
  );
}

export default AddButton;
