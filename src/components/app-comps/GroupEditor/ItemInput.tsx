import React, { useState } from "react";
import { useDragContext } from "./DragContext";

const ItemInput: React.FC = () => {
  const { setItems } = useDragContext();
  const [input, setInput] = useState<string>("");

  const handleSetItems = () => {
    const itemsArray = input
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== ""); // Remove empty values
    setItems(itemsArray);
    setInput("");
  };

  return (
    <div className="mb-4">
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter items, comma-separated" className="border p-2 rounded w-64" />
      <button onClick={handleSetItems} className="bg-blue-500 text-white px-4 py-2 ml-2 rounded">
        Set Items
      </button>
    </div>
  );
};

export default ItemInput;
