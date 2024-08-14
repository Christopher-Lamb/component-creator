import React, { useState, ComponentType, FC } from "react";
import type { HeadFC, PageProps } from "gatsby";
import * as ComponentDir from "../components";
import { TiArrowBack } from "react-icons/ti";
import { allJson } from "../json/json";
import ErrorBoundary from "../components/ErrorBoundary";

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
  const [groupState, setGroupState] = useState<GroupState | "">("");
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

  React.useEffect(() => {
    const urlState = getCurrentUrlState();

    if (urlState.group) {
      setGroupState(urlState.group as GroupState);
    }
    if (urlState.component) {
      setComponentState(urlState.component);
    }
    console.log(components["Navbars"]);
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

  return (
    <main>
      <div className="px-small py-3xsmall flex justify-between">
        <button onClick={handleBack} className="text-primary hover:text-secondary">
          <TiArrowBack size={"1.7rem"} />
        </button>
        <button
          className={`border px-4 py-2 transition w-[150px] ${canScroll ? "bg-green-400 font-semibold text-white rounded" : "bg-red-400 text-black"} `}
          onClick={() => setCanScroll((prev) => !prev)}
        >
          {canScroll ? "Can Scroll" : "Can't Scroll"}
        </button>
      </div>
      <div className="flex flex-wrap gap-4 px-4">
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
      {canScroll && <div className="w-full h-screen"></div>}
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
      className="h-one px-small min-w-one border border-secondary rounded cursor-pointer hover:scale-110 transition-all bg-accent flex items-center justify-center text-med text-wrap"
    >
      <span>{name}</span>
    </button>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home</title>;
