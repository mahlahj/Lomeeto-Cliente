import React from "react";
import "./ModalPost.scss";
import { Modal, Grid } from "semantic-ui-react";
import CommentForm from "./CommentForm";
import Comments from "./Comments";
import Actions from "./Actions";

export default function ModalPost({ show, setShow, post }) {
  const onClose = () => {
    setShow(false);
  };

  return (
    <Modal open={show} onClose={onClose} className="modal-post">
      <Grid>
        <Grid.Column
          className="modal-post__left"
          width={10}
          style={{ backgroundImage: `url("${post.file}")` }}
        ></Grid.Column>
        <Grid.Column className="modal-post__right" width={6}>
          <Comments post={post} />
          <Actions post={post} />
          <CommentForm post={post} />
        </Grid.Column>
      </Grid>
    </Modal>
  );
}
