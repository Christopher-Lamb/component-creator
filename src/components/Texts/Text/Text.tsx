import React from "react";
const { getCSS } = require("../../../utils/tailwind-to-css/index.js");
import { Typewriter } from "react-simple-typewriter";

interface ComponentNameProps {}

const testProps = {
  mainClass: "",
  containerClass: "",
  wrapperClass: "",
};

const ComponentName: React.FC<ComponentNameProps> = (props) => {
  const {} = props;
  const { ...otherCSS } = testProps;
  const { cssString, css } = getCSS(otherCSS);

  return (
    <div className={css["mainClass"]}>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString || "" }} />
      <div className={css["containerClass"]}>
        <div className={css["wrapperClass"]}>
          <div className="flex items-center justify-center text-large">
            <Typewriter cursor cursorBlinking={false}  words={["Penski","Wenski","Put her ass in a nemski"]} loop={3} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentName;
