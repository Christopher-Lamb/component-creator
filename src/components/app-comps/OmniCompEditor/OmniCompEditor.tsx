import React, { useEffect, useState } from "react";
import { apiPost, apiGet } from "../../../utils/api";

interface OmniCompEditorProps {
  onClose: () => void;
}

interface OmniApiResponse {
  omniComponents: string[];
  files: string[];
}

const OmniCompEditor: React.FC<OmniCompEditorProps> = ({ onClose }) => {
  const [omniComps, setOmniComps] = useState<string[]>([]);
  const [otherFiles, setOtherFiles] = useState<string[]>([]);

  useEffect(() => {
    const initGroup = async () => {
      try {
        let val = await apiGet("/omni-comps/");
        const { omniComponents, files } = val as OmniApiResponse;
        setOmniComps(omniComponents);
        setOtherFiles(files);
      } catch {
        onClose();
      }
    };
    initGroup();
  }, []);

  const handleDelete = async (name: string) => {
    try {
      await apiPost("/omni-comps/delete", { name });
      const newOmniComps = omniComps.filter((item) => item !== name);
      setOmniComps(newOmniComps);
      setOtherFiles((prev) => [...prev, name]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdd = async (name: string) => {
    try {
      await apiPost("/omni-comps/add", { name });
      const newOmniComps = omniComps.filter((item) => item !== name);
      setOmniComps([...newOmniComps, name]);

      const newOtherFiles = otherFiles.filter((item) => item !== name);
      setOtherFiles(newOtherFiles);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white shadow-mac p-12 rounded border mx-auto min-h-[500px] max-h-[700px] w-[600px] mt-one relative z-[9999] overflow-auto">
      <div className="grid gap-2">
        <span className="inline-block border-b border-stone-600 mb-1">Omni Components</span>
        {omniComps.map((omniComp: string, i: number) => {
          return (
            <div className="flex justify-between items-center">
              <span className="inline-block text-[22px] text-stone-800">{omniComp}</span>
              <div className="border-b border-dotted border-b-2 border-stone-400 h-full w-full mx-2"></div>
              <div className="shrink-0 flex gap-4">
                <button className="bg-teal-500 text-white px-4 py-1 rounded hover:bg-teal-400 active:translate-y-px" onClick={() => handleAdd(omniComp)} title={`Add ${omniComp}`}>
                  Refresh
                </button>
                <button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-400 active:translate-y-px" onClick={() => handleDelete(omniComp)} title={`Delete ${omniComp}`}>
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="grid gap-2 mt-4">
        <span className="inline-block border-b border-stone-500 text-stone-500 mb-1">Other Components</span>
        {otherFiles.map((omniComp: string, i: number) => {
          return (
            <div className="flex justify-between items-center">
              <span className="inline-block text-[22px] text-stone-500">{omniComp}</span>
              <div className="border-b border-dotted border-b-2 border-stone-400 h-full w-full mx-2"></div>
              <div className="shrink-0 flex gap-4">
                <button className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-400 active:translate-y-px" onClick={() => handleAdd(omniComp)} title={`Add ${omniComp}`}>
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

export default OmniCompEditor;
