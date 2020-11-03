import React, { useState } from "react";
import "./PreviewPost.scss";
import { Image } from "semantic-ui-react";
import ModalPost from "../../Modal/ModalPost";

export default function PreviewPost({ post }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="preview-post" onClick={() => setShowModal(true)}>
        <Image className="preview-post_image" src={post.file} />
      </div>
      <ModalPost show={showModal} setShow={setShowModal} post={post} />
    </>
  );
}
