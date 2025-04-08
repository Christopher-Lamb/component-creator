import React, { useMemo, useRef, useState } from "react";
import CloudinaryImage from "../../CloudinaryImage";
import CarouselGallery, { CarouselRef } from "react-gallery-carousel";
import "react-gallery-carousel/dist/index.css";
const { getCSS, generateCSSMaps } = require("../../../utils/tailwind-to-css/");

import { useStaticQuery, graphql } from "gatsby";

interface GalleryProps {}

/**
 * Gallery Component
 *
 * @param {GalleryProps} props - The props for the component.
 */

interface CloudinaryNode {
  public_id: string;
  gatsbyImageData: any;
}

interface LocalNode {
  relativePath: string;
}

const props = {
  imageGroup: [
    "placeholder.png",
    "placeholder.png",
    "3_1.png",
    "placeholder.png",
    "2_1.png",
    "placeholder.png",
    "2_1.png",
    "3_1.png",
    "placeholder.png",
    "placeholder.png",
    "2_1.png",
    "placeholder.png",
    "3_1.png",
    "placeholder.png",
    "placeholder.png",
  ],
  containerClass: "w-full",
  wrapperClass: "flex mt-med flex-wrap w-full justify-center gap-2 max-w-four mx-auto",
  imageContainerClass: "shrink-0 w-two cursor-pointer transition hover:scale-105",
  imageClass: "w-two h-two object-cover",
};

//pattern
//repeat pattern

const Gallery: React.FC<GalleryProps> = () => {
  const { imageGroup, ...otherCSS } = props;

  const { cssString, css } = getCSS(otherCSS);

  // const data = useStaticQuery(graphql`
  //   query {
  //     site {
  //       siteMetadata {
  //         images
  //       }
  //     }
  //     allCloudinaryMedia {
  //       nodes {
  //         gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, secure: true)
  //         public_id
  //       }
  //     }
  //     allFile(filter: { sourceInstanceName: { eq: "images" } }) {
  //       nodes {
  //         relativePath
  //         childImageSharp {
  //           gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
  //         }
  //       }
  //     }
  //   }
  // `);
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          images
        }
      }
      allFile(filter: { sourceInstanceName: { eq: "images" } }) {
        nodes {
          relativePath
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
          }
        }
      }
    }
  `);

  const images = useMemo(() => {
    // Filter the image based on publicId
    const isLocal = data.site.siteMetadata.images === "local" ? true : false;
    const arr = imageGroup
      .map((publicId) => {
        if (isLocal) {
          const imageNode = data.allFile.nodes.find((node: LocalNode) => {
            return node.relativePath === publicId;
          });

          return imageNode ? imageNode.childImageSharp.gatsbyImageData.images.fallback.src : null;
        } else {
          const node = data.allCloudinaryMedia.nodes.find((node: CloudinaryNode) => node.public_id === publicId);
          return node ? node.gatsbyImageData.images.fallback.src : null;
        }
      })
      .filter(Boolean);
    const transformedImages = arr.map((image) => {
      return {
        src: image,
        width: 1,
        height: 1,
      };
    });
    return transformedImages;
  }, []);

  const carouselRef = useRef<CarouselRef>(null);

  const handleMaximize = (index: number) => {
    carouselRef.current?.maximize();
    carouselRef.current?.goToIndex(index);
  };

  return (
    <div className={css["containerClass"]}>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString }} />

      <div className={css["wrapperClass"]}>
        {imageGroup.map((publicId, i) => {
          return (
            <div key={i} onClick={() => handleMaximize(i)} className={css["imageContainerClass"]}>
              <CloudinaryImage publicId={publicId} className={css["imageClass"]} />
            </div>
          );
        })}
      </div>
      <CarouselGallery
        ref={carouselRef}
        shouldMinimizeOnClick
        index={0}
        shouldLazyLoad={true}
        canAutoPlay={false}
        images={images}
        style={{ height: "600px", maxWidth: "50rem", display: "none" }}
        className="border"
      />
    </div>
  );
};

export default Gallery;
