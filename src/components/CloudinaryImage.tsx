import React, { CSSProperties } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";

interface CloudinaryImageProps {
  publicId: string;
  objectFit?: CSSProperties["objectFit"];
  objectPosition?: CSSProperties["objectPosition"];
  className?: string;
}

interface CloudinaryNode {
  public_id: string;
  gatsbyImageData: any;
}

interface LocalNode {
  relativePath: string;
}

const CloudinaryImage: React.FC<CloudinaryImageProps> = ({ publicId, objectFit, objectPosition, className }) => {
  const data = useStaticQuery(graphql`
    query {
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

  // Filter the image based on publicId
  let image: IGatsbyImageData | null | undefined = null;
  const imageNode = data.allFile.nodes.find((node: LocalNode) => {
    return node.relativePath === publicId;
  });
  image = imageNode ? getImage(imageNode.childImageSharp.gatsbyImageData) : null;

  if (!image) {
    return <p>No image found for {publicId}</p>;
  }

  return <GatsbyImage image={image} alt={`image with public_id: ${publicId}`} className={className || ""} objectFit={objectFit} objectPosition={objectPosition} loading="lazy" />;
};

export default CloudinaryImage;
