import React, { useEffect, useState } from "react";
import apiPost from "../../../utils/api";
import { DraggableList, DragProvider, useDragContext } from "./";
interface GroupEditorProps {
  group: string;
  onClose: () => void;
}

/**
 * GroupEditor Component
 *
 * Description
 *
 * Props:
 * -
 *
 * @param {GroupEditorProps} props - The props for the component.
 */

interface Group {
  id: string;
  name: string;
  color: string;
  componentIds: string[];
}

const GroupEditor: React.FC<GroupEditorProps> = ({ group, onClose }) => {
  const [groupState, setGroupState] = useState<Group>({ id: "", name: "", color: "", componentIds: [] });
  const [inputState, setInputState] = useState("");
  const { setItems, items } = useDragContext();

  const { id, name, color, componentIds } = groupState;

  useEffect(() => {
    const initGroup = async () => {
      console.log(group);
      try {
        let val = await apiPost("get-group", { group: group });
        const { componentIds } = val as Group;
        setGroupState(val as Group);
        setItems(componentIds);
      } catch {
        onClose();
      }
    };
    initGroup();
  }, []);

  useEffect(() => {
    setGroupState((prev) => ({ ...prev, componentIds: items }));
  }, [items]);

  const handleSave = async () => {
    try {
      await apiPost("update-group", { group: group, color: groupState.color, componentIds: groupState.componentIds });
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputSubmit = () => {
    if (inputState) {
      setItems((prev) => [...prev, inputState]);
      setInputState("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputState(val);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setGroupState((prev) => ({ ...prev, color: val }));
  };

  return (
    <div className="max-w-four flex bg-gray-100 px-8 py-5 w-full min-h-one rounded border mx-auto mt-one relative z-[9999]">
      <div className="w-full">
        <span className="text-[49px]">{name}</span>
        <div className="flex w-full mb-2">
          <input value={groupState.color} onChange={handleColorChange} className="bg-transparent w-full py-[1px] focus:outline-none mb-[2px] focus:mb-0 focus:border-b-2 focus:border-gray-400" />
        </div>
        <div className="w-full flex">
          <input onChange={handleInputChange} value={inputState} className="w-full border border-black px-2 py-1 focus:outline-none" type="text"></input>
          <button onClick={handleInputSubmit} className="px-2 w-full basis-1/4 border-y border-r border-black">
            Insert
          </button>
        </div>
        <DraggableList />
        <button onClick={handleSave} className="py-2 px-4 w-full bg-gray-200 border border-stone-600 text-[18px] tracking-wide text-stone-700 rounded">
          Save
        </button>
      </div>
      <div className="w-full flex items-start justify-center">
        <div className="size-one mt-[40px] border border-black" style={{ background: groupState.color }}></div>
      </div>
    </div>
  );
};

const ProvidedGroupEditor: React.FC<GroupEditorProps> = (props) => {
  return (
    <DragProvider>
      <GroupEditor {...props} />
    </DragProvider>
  );
};
export default ProvidedGroupEditor;
