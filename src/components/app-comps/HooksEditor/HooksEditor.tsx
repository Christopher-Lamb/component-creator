import React, { useState, useEffect } from "react";
import { apiPost, apiGet } from "../../../utils/api";

interface HooksEditorProps {
  onClose: () => void;
}

interface HooksApiResponse {
  hooks: string[];
  files: string[];
}

const HooksEditor: React.FC<HooksEditorProps> = ({ onClose }) => {
  const [hooks, setHooks] = useState<string[]>([]);
  const [otherFiles, setOtherFiles] = useState<string[]>([]);

  useEffect(() => {
    const initGroup = async () => {
      try {
        let val = await apiGet("/hooks/");
        const { hooks, files } = val as HooksApiResponse;
        setHooks(hooks);
        setOtherFiles(files);
      } catch {
        onClose();
      }
    };
    initGroup();
  }, []);

  const handleDelete = async (name: string) => {
    try {
      await apiPost("/hooks/delete", { name });
      const newOmniComps = hooks.filter((item) => item !== name);
      setHooks(newOmniComps);
      setOtherFiles((prev) => [...prev, name]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdd = async (name: string) => {
    try {
      await apiPost("/hooks/add", { name });
      const newOmniComps = hooks.filter((item) => item !== name);
      setHooks([...newOmniComps, name]);

      const newOtherFiles = otherFiles.filter((item) => item !== name);
      setOtherFiles(newOtherFiles);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white shadow-mac p-12 rounded border mx-auto min-h-[500px] max-h-[700px] w-[600px] mt-one relative z-[9999] overflow-auto">
      <div className="grid gap-2">
        <span className="inline-block border-b border-stone-600 mb-1">Hooks</span>
        {hooks.map((hook: string, i: number) => {
          return (
            <div className="flex justify-between items-center">
              <span className="inline-block text-[22px] text-stone-800">{hook}</span>
              <div className="border-b border-dotted border-b-2 border-stone-400 h-full w-full mx-2"></div>
              <div className="shrink-0 flex gap-4">
                <button className="bg-teal-500 text-white px-4 py-1 rounded hover:bg-teal-400 active:translate-y-px" onClick={() => handleAdd(hook)} title={`Add ${hook}`}>
                  Refresh
                </button>
                <button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-400 active:translate-y-px" onClick={() => handleDelete(hook)} title={`Delete ${hook}`}>
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="grid gap-2 mt-4">
        <span className="inline-block border-b border-stone-500 text-stone-500 mb-1">Other Hooks</span>
        {otherFiles.map((hook: string, i: number) => {
          return (
            <div className="flex justify-between items-center">
              <span className="inline-block text-[22px] text-stone-500">{hook}</span>
              <div className="border-b border-dotted border-b-2 border-stone-400 h-full w-full mx-2"></div>
              <div className="shrink-0 flex gap-4">
                <button className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-400 active:translate-y-px" onClick={() => handleAdd(hook)} title={`Add ${hook}`}>
                  Add
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HooksEditor;
