import React, { useState, ComponentType, FC, useEffect } from "react";
import type { HeadFC, PageProps } from "gatsby";
import * as ComponentDir from "../components/groups";
import { TiArrowBack } from "react-icons/ti";
import { ImOmega } from "react-icons/im";
import { TbFishHook } from "react-icons/tb";

import { allJson } from "../json/json";
import ErrorBoundary from "../components/ErrorBoundary";
import { apiPost } from "../utils/api";
import { GroupEditor, PortalOverlay, OmniCompEditor, HooksEditor } from "../components/app-comps";

// Define a type for the components
type ComponentMap = {
  [key: string]: { [key: string]: React.ComponentType<any> };
};

// Ensure ComponentDir is of type ComponentMap
const components: ComponentMap = ComponentDir as ComponentMap;

// Define the type for groupState
type GroupState = keyof typeof components;

const updateSearchParam = (key: string, value: string): void => {
  // Get the current URL
  const url = new URL(window.location.href);

  if (value === "") {
    // Delete the search parameter if the value is an empty string
    url.searchParams.delete(key);
  } else {
    // Update the search parameter
    url.searchParams.set(key, value);
  }

  // Update the URL in the address bar without reloading the page
  window.history.pushState({}, "", url);
};

const getCurrentUrlState = (): { [key: string]: string } => {
  // Get the current URL
  const url = new URL(window.location.href);

  // Create an object to store the key-value pairs
  const params: { [key: string]: string } = {};

  // Iterate through the search parameters and add them to the object
  url.searchParams.forEach((value, key) => {
    params[key] = value;
  });

  return params;
};

const IndexPage: FC<PageProps> = () => {
  const [canScroll, setCanScroll] = useState(false);
  const [scrollHeight, setScrollHeight] = useState<string>("100px");
  const [groupState, setGroupState] = useState<string>("");

  const [isGroupEditor, setIsGroupEditor] = useState(false);
  const [isOmniCompEditor, setIsOmniCompEditor] = useState(false);
  const [isHooksEditor, setIsHooksEditor] = useState(false);

  const [componentState, setComponentState] = useState<string>("");
  const [componentsList, setComponentsList] = useState<ComponentType<any>[]>([]);

  const handleGroupSelect = (name: GroupState) => {
    if (typeof name === "string") {
      updateSearchParam("group", name);
      setGroupState(name);
    }
  };

  const handleComponentSelect = (name: string) => {
    updateSearchParam("component", name);
    setComponentState(name);
    if (groupState && groupState in components) {
      const selectedComponents = components[groupState];
      if (selectedComponents && name in selectedComponents) {
        setComponentsList(Object.values(selectedComponents));
      }
    }
  };

  useEffect(() => {
    const urlState = getCurrentUrlState();

    if (urlState.group) {
      setGroupState(urlState.group as string);
    }
    if (urlState.component) {
      setComponentState(urlState.component);
    }
  }, []);

  const handleBack = () => {
    if (groupState && !componentState) {
      setGroupState("");
      updateSearchParam("group", "");
    } else if (groupState && componentState) {
      setComponentState("");
      updateSearchParam("component", "");
    }
  };

  const renderComponent = () => {
    try {
      if (groupState && componentState) {
        const SelectedComponent = components[groupState][componentState];
        if (SelectedComponent) {
          return (
            <ErrorBoundary fallback={<div className="text-med font-semibold px-small py-3xsmall border">Component Failed to Render...</div>}>
              <SelectedComponent {...allJson} />
            </ErrorBoundary>
          );
        }
      }
      return null;
    } catch (error) {
      console.error("Error rendering component:", error);
      return <div>Error loading component</div>;
    }
  };

  const onDeleteComponent = async () => {
    apiPost("delete-component", { group: groupState, component: componentState });
  };
  const onAddComponent = async () => {
    apiPost("add-component", { group: groupState, component: componentState });
  };

  const handleScrollHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setScrollHeight(val);
  };

  const handleClickScrollBtn = (e: React.UIEvent<HTMLButtonElement>) => {
    setCanScroll((prev) => !prev);
  };

  return (
    <main className="relative">
      {isGroupEditor && (
        <PortalOverlay overlayClick={() => setIsGroupEditor(false)} className="bg-black absolute top-0 z-[999] opacity-20 w-full h-[100vh]">
          <GroupEditor group={groupState} onClose={() => setIsGroupEditor(false)} />
        </PortalOverlay>
      )}

      {isOmniCompEditor && (
        <PortalOverlay overlayClick={() => setIsOmniCompEditor(false)} className="bg-black absolute top-0 z-[999] opacity-20 w-full h-[100vh]">
          <OmniCompEditor onClose={() => setIsOmniCompEditor(false)} />
        </PortalOverlay>
      )}
      {isHooksEditor && (
        <PortalOverlay overlayClick={() => setIsHooksEditor(false)} className="bg-black absolute top-0 z-[999] opacity-20 w-full h-[100vh]">
          <HooksEditor onClose={() => setIsHooksEditor(false)} />
        </PortalOverlay>
      )}

      <div className="px-small py-3xsmall flex justify-between">
        <div className="flex gap-2">
          <button onClick={handleBack} className="text-primary hover:text-secondary">
            <TiArrowBack size={"1.7rem"} />
          </button>
          <button className="hover:scale-105" onClick={() => setIsOmniCompEditor(true)} title="Omni Components">
            <ImOmega size={"1.3rem"} />
          </button>
          <button className="hover:scale-105" onClick={() => setIsHooksEditor(true)} title="Hooks">
            <TbFishHook size={"1.7rem"} />
          </button>
        </div>

        <div className="w-full flex justify-around">
          <div>
            {groupState && (
              <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded" onClick={() => setIsGroupEditor(true)}>
                Open Group
              </button>
            )}
          </div>
          <div className="inline mr-24 flex gap-2">
            {componentState && (
              <>
                <button onDoubleClick={onDeleteComponent} className={`rounded bg-red-100 hover:bg-red-200 text-stone-700 px-4 py-2 transition `}>
                  Delete Component
                </button>
                <button onDoubleClick={onAddComponent} className={`rounded bg-green-200 hover:bg-green-300 text-stone-700 px-4 py-2 transition `}>
                  Add Component
                </button>
              </>
            )}
          </div>
          {componentState && (
            <button className={`border px-4 py-2 transition w-[150px] ${canScroll ? "bg-green-400 font-semibold rounded" : "bg-stone-400 text-stone-700"} `} onClick={handleClickScrollBtn}>
              <input value={scrollHeight} onChange={handleScrollHeight} className="w-full focus:text-left text-center text-white bg-transparent focus:bg-white focus:text-black" />
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-wrap px-4 max-w-five mx-auto">
        {!groupState &&
          Object.keys(components).map((itemName) => {
            return <PageItem key={itemName} name={itemName} onClick={() => handleGroupSelect(itemName as GroupState)} />;
          })}
        {groupState &&
          !componentState &&
          Object.keys(components[groupState]).map((name) => {
            return <PageItem key={name} name={name} onClick={() => handleComponentSelect(name)} />;
          })}
      </div>
      {renderComponent()}
      {canScroll && componentState && <div className="w-full" style={{ height: scrollHeight }}></div>}
    </main>
  );
};

interface PageItemProps {
  name: string;
  onClick: () => void;
}

const PageItem: React.FC<PageItemProps> = ({ name, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="py-1 px-small w-full border-t even:bg-[#aad1ff] bg-blue-300 border-blue-500 cursor-pointer transition-all text-[#253240] text-med text-wrap flex items-start hover:scale-[1.01] hover:bg-blue-300 even:hover:bg-blue-200 hover:border-0 hover:mt-[.09px] active:scale-[1.005]"
    >
      <span>{name}</span>
    </button>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home</title>;
