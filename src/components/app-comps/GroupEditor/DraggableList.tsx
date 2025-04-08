import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { MdClose } from "react-icons/md";

import { useDragContext } from "./DragContext";

const DraggableList: React.FC = () => {
  const { items, onDragEnd, setItems } = useDragContext();

  const handleRemoveItem = (name: string) => {
    setItems((prev) => prev.filter((i) => i !== name));
  };
  // <div className="w-[25px]" style={{ background: groupState.color }}></div>;
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef} className="p-4 rounded-md w-full">
            {items.map((item, index) => (
              <Draggable key={item} draggableId={item} index={index}>
                {(provided) => (
                  <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="bg-white w-full p-2 mb-2 flex justify-between rounded-md shadow cursor-pointer">
                    {item}
                    <button className="flex justify-center items-center" onClick={() => handleRemoveItem(item)}>
                      <MdClose className="flex items-center justify-center size-[20px] stroke-2" />
                    </button>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableList;
