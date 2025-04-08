import React from "react";
import ReactDOM from "react-dom";

const PortalOverlay: React.FC<{ children: React.ReactNode; className?: string; overlayClick: () => void }> = ({ children, className, overlayClick }) => {
  // Use a ref to ensure the same div is used for the portal container
  const elRef = React.useRef(document.createElement("div"));

  React.useEffect(() => {
    const portalRoot = document.getElementById("portal-root");
    if (!portalRoot) return;
    portalRoot.appendChild(elRef.current);

    // Cleanup function to remove the appended child
    return () => {
      portalRoot.removeChild(elRef.current);
    };
  }, []);

  const handleOverlayClick = () => {
    overlayClick && overlayClick();
  };
  return ReactDOM.createPortal(
    <div className={`overlay top-0 z-[9999]`} style={{ position: "fixed", width: "100vw", height: "100vh" }}>
      <div className={`absolute z-[9999] ${className}`} onClick={handleOverlayClick}></div>
      {children}
    </div>,
    elRef.current
  );
};

export default PortalOverlay;
