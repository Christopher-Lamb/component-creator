import React from "react";
import CloudinaryImage from "../../../components/CloudinaryImage";

interface LambPictureTextProps {}

/**
 * LambPictureText Component
 *
 * @param {LambPictureTextProps} props - The props for the component.
 */

const LambPictureText: React.FC<LambPictureTextProps> = () => {
  return (
    <>
      {/* containerClass */}
      <div className="bg-orange-100 py-20">
        {/* wrapperClass */}
        <div className="grid grid-cols-5 gap-6">
          {/* imgContainerClass */}
          <div className="col-span-2">
            {/* imgClass */}
            <CloudinaryImage publicId="2_1.png" className="w-full object-cover" />
          </div>
          {/* htmlClass */}
          <div className="col-span-3 max-w-four">
            {/* contentDiv */}
            <h2 className="text-med">Something title</h2>
            <p>
              Eu cupidatat ullamco minim culpa ut qui qui elit duis ut voluptate amet ullamco dolore. Eiusmod laborum sint tempor est cupidatat in deserunt aliqua tempor tempor incididunt. Labore
              tempor amet nisi labore laborum reprehenderit ex dolore occaecat est nostrud quis tempor sit. Dolore excepteur deserunt consectetur officia cillum nulla consequat duis in consequat.
              Tempor magna aute consequat laborum proident cillum cillum.
            </p>
            <br />
            <p>
              Eu cupidatat ullamco minim culpa ut qui qui elit duis ut voluptate amet ullamco dolore. Eiusmod laborum sint tempor est cupidatat in deserunt aliqua tempor tempor incididunt. Labore
              tempor amet nisi labore laborum reprehenderit ex dolore occaecat est nostrud quis tempor sit. Dolore excepteur deserunt consectetur officia cillum nulla consequat duis in consequat.
              Tempor magna aute consequat laborum proident cillum cillum.
            </p>
            {/* buttonContainerClass */}
            <div>renderButtons</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LambPictureText;
