import React, { createContext, useContext, useState } from "react";
import { DropResult } from "react-beautiful-dnd";

/**
 * Type for the Drag Context
 */
interface DragContextType {
  items: string[];
  setItems: React.Dispatch<React.SetStateAction<string[]>>;
  onDragEnd: (result: DropResult) => void;
}

/**
 * Create the Drag Context
 */
const DragContext = createContext<DragContextType | undefined>(undefined);

/**
 * Drag Provider Component
 */
export const DragProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<string[]>([]); // Initially empty

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedItems = [...items];
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);

    setItems(reorderedItems);
  };

  return <DragContext.Provider value={{ items, setItems, onDragEnd }}>{children}</DragContext.Provider>;
};

/**
 * Custom Hook to use Drag Context
 */
export const useDragContext = (): DragContextType => {
  const context = useContext(DragContext);
  if (!context) {
    throw new Error("useDragContext must be used within a DragProvider");
  }
  return context;
};
