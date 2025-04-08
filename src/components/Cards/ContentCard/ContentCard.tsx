import React from "react";
import { graphql, useStaticQuery } from "gatsby";
const { getCSS, addClassesToElements } = require("../../../utils/tailwind-to-css/index.js");
import { IGatsbyImageData } from "gatsby-plugin-image";

interface ContentCardProps {
  cardArray: string;
}

const testProps = {
  containerClass: "mt-16",
  wrapperClass: "flex justify-center gap-8",
  wrapperContentClass: "",
  content: "<h1>Pricing</h1>",
  cardContainerClass: "px-8 py-12 bg-black rounded-lg border border-black w-fit shadow-[0_0_10px_10px_10] hover:shadow-black transition",
  htmlContainerClass: "w-two text-center",
  cardArray: {
    objects: { card: { content: "" } },
    array: [
      { content: "<h1>$450</h1><h2>Basic Plan</h2><ul><li>5 Pages Total</li><li>SEO</li><li>Home, Contact, About</li><li>2 misc. Pages</li></ul><a>Get Started</a>" },
      { content: "<h1>$750</h1><h2>Basic Plan</h2><ul><li>10 Pages Total</li><li>SEO</li><li>Home, Contact, About</li><li>2 misc. Pages</li></ul><a>Get Started</a>" },
      { content: "<h1>$1600</h1><h2>High Content Plan</h2><ul><li>10+ Pages Total</li><li>SEO</li><li>Home, Contact, About</li><li>2 misc. Pages</li></ul><a>Get Started</a>" },
    ],
  },
  imgForList: "check.png",
  h1Class: "text-[61px] leading-[1] font-bold",
  h2Class: "text-[29px]",
  h3Class: "",
  pClass: "",
  ulClass: "text-left mt-4",
  liClass: "ml-8",
  aClass: "bg-stone-600 text-white rounded-[1rem] w-full block h-16 flex items-center justify-center text-[25px] font-semibold mt-16 cursor-pointer hover:bg-stone-400",
  strongClass: "",
};

interface CardObj {
  content: string;
}

const ContentCard: React.FC<ContentCardProps> = (props) => {
  const { cardArray, content, imgForList, ...otherCSS } = testProps;
  const { array: cards } = cardArray as { array: CardObj[] };

  const { cssString, css } = getCSS(otherCSS);

  const listStyleImage = useListStyle(imgForList);

  return (
    <div className={css["containerClass"]}>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString || "" }} />
      <div className={css["wrapperClass"]}>
        <div dangerouslySetInnerHTML={{ __html: content }} className={css["wrapperContentClass"]} />
        {cards.map(({ content }: { content: string }, i: number) => {
          const html = addClassesToElements(content, css, listStyleImage);
          return (
            <div className={css["cardContainerClass"]} key={i}>
              <div dangerouslySetInnerHTML={{ __html: html }} className={css["htmlContainerClass"]} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface ImageQueryData {
  site: { siteMetadata: { images: string } };
  allFile: { nodes: { relativePath: string; publicURL: string }[] };
  allCloudinaryMedia: { nodes: { public_id: string; gatsbyImageData: IGatsbyImageData }[] };
}
const useListStyle = (imgId: string): string => {
  const data = useStaticQuery<ImageQueryData>(
    graphql`
      query {
        site {
          siteMetadata {
            images
          }
        }
        allFile(filter: { sourceInstanceName: { eq: "images" } }) {
          nodes {
            relativePath
            publicURL
          }
        }
        allCloudinaryMedia {
          nodes {
            public_id
            gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, secure: true)
          }
        }
      }
    `
  );
  const isLocal = data.site.siteMetadata.images === "local";
  if (isLocal) {
    const images = data.allFile.nodes;
    const image = images.find((img) => img.relativePath === imgId + ".png");
    return image?.publicURL ? `url(${image.publicURL})` : "none";
  } else {
    const images = data.allCloudinaryMedia.nodes;
    const node = images.find((img: any) => img.public_id === imgId);
    return node?.gatsbyImageData.images.sources ? `url('${node?.gatsbyImageData.images.sources[0].srcSet}')` : "none";
  }
};
export default ContentCard;
