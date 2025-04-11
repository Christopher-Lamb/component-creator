import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";

interface CloudinaryImageProps {
  publicId: string;
  className?: string;
  alt?: string;
}

interface CloudinaryNode {
  public_id: string;
  gatsbyImageData: any;
}

interface LocalNode {
  relativePath: string;
}

const CloudinaryImage: React.FC<CloudinaryImageProps> = ({ publicId, className, alt }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          images
        }
      }
      allCloudinaryMedia {
        nodes {
          gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, secure: true)
          public_id
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

  // Filter the image based on publicId
  const isLocal = data.site.siteMetadata.images === "local" ? true : false;
  let image: IGatsbyImageData | null | undefined = null;
  if (isLocal) {
    const hasExtension = /\.(png|jpe?g|webp|gif|svg)$/i.test(publicId);
    const finalPath = hasExtension ? publicId : `${publicId}.png`;

    const imageNode = data.allFile.nodes.find((node: LocalNode) => {
      return node.relativePath === finalPath;
    });
    image = imageNode ? getImage(imageNode.childImageSharp.gatsbyImageData) : null;
  } else {
    const node = data.allCloudinaryMedia.nodes.find((node: CloudinaryNode) => node.public_id === publicId);
    image = node ? getImage(node.gatsbyImageData) : null;
  }

  if (!image) {
    return <p className={className || ""}>No image found for {publicId}</p>;
  }

  return <GatsbyImage image={image} alt={alt || `Cloudinary image with public_id: ${publicId}`} loading="lazy" className={className || ""} />;
};

export default CloudinaryImage;
