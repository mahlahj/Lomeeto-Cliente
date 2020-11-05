import React, { useState } from "react";
import "./PreviewPost.scss";
import { Image } from "semantic-ui-react";
import ModalPost from "../../Modal/ModalPost";
import ModalPostMovil from "../../Modal/ModalPostMovil";
import { useMediaQuery } from "react-responsive";

export default function PreviewPost({ post }) {
  const isMovil = useMediaQuery({ query: "(max-width: 600px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 601px) and (max-width: 1099px)",
  });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1100px)",
  });

  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {isTablet && (
        <div className="preview-post_tablet" onClick={() => setShowModal(true)}>
          <Image className="preview-post_image" src={post.file} />
        </div>
      )}

      {isMovil && (
        <div className="preview-post_movil" onClick={() => setShowModal(true)}>
          <Image className="preview-post_image" src={post.file} />
        </div>
      )}

      {isDesktopOrLaptop && (
        <div className="preview-post" onClick={() => setShowModal(true)}>
          <Image className="preview-post_image" src={post.file} />
        </div>
      )}

      {isMovil ? (
        <ModalPostMovil show={showModal} setShow={setShowModal} post={post} />
      ) : (
        <ModalPost show={showModal} setShow={setShowModal} post={post} />
      )}
    </>
  );
}
