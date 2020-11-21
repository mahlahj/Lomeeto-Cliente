import React from "react";
import "./ModalPostMovil.scss";
import { Modal, Grid } from "semantic-ui-react";
import CommentForm from "./CommentForm";
import Comments from "./Comments";
import Actions from "./Actions";
import Text from "../ModalPost/Text";

export default function ModalPostMovil({ show, setShow, post }) {
  const onClose = () => {
    setShow(false);
  };

  return (
    <Modal open={show} onClose={onClose} className="modal-post-movil">
      <Grid>
        <Grid.Row
          className="modal-post-movil__top"
          style={{ backgroundImage: `url("${post.file}")` }}
        ></Grid.Row>
        <Grid.Row className="modal-post-movil__bottom">
          <Text post={post} />
          <Actions post={post} />
          <Comments post={post} />

          <CommentForm post={post} />
        </Grid.Row>
      </Grid>
    </Modal>
  );
}
