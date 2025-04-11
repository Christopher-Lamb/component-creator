import React, { useEffect, useState } from "react";

interface DevWrapperProps {
  reloadTrigger: number;
  children: React.ReactNode;
}

const DevWrapper: React.FC<DevWrapperProps> = ({ reloadTrigger, children }) => {
  const [version, setVersion] = useState(0);

  useEffect(() => {
    setVersion((v) => v + 1); // bump internal version when reloadTrigger changes
  }, [reloadTrigger]);

  return <div key={version}>{children}</div>;
};

export default DevWrapper;
