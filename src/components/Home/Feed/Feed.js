import React, { useState, useEffect } from "react";
import "./Feed.scss";
import { map } from "lodash";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Image } from "semantic-ui-react";
import { GET_POSTS_FOLLOWEDS } from "../../../gql/post";
import ImageNotFound from "../../../assets/png/avatar.png";
import Actions from "../../Modal/ModalPost/Actions";
import CommentForm from "../../Modal/ModalPost/CommentForm";
import ModalPost from "../../Modal/ModalPost";

export default function Feed() {
  const [showModal, setShowModal] = useState(false);
  const [postSelected, setPostSelected] = useState(null);

  const { data, loading, startPolling, stopPolling } = useQuery(
    GET_POSTS_FOLLOWEDS
  );

  useEffect(() => {
    startPolling(2000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (loading) return null;
  const { getPostFolloweds } = data;

  const openPost = (post) => {
    setPostSelected(post);
    setShowModal(true);
  };

  return (
    <>
      <div className="feed">
        {map(getPostFolloweds, (post, index) => (
          <div key={index} className="feed__box">
            <Link to={`/${post.idUser.username}`}>
              <div className="feed__box-user">
                <Image src={post.idUser.avatar || ImageNotFound} avatar />
                <span>{post.idUser.name}</span>
              </div>
            </Link>
            <div
              className="feed__box-photo"
              style={{ backgroundImage: `url("${post.file}")` }}
              onClick={() => openPost(post)}
            />
            <div className="feed__box-actions">
              <Actions post={post} />
            </div>
            <div className="feed__box-form">
              <CommentForm post={post} />
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <ModalPost
          show={showModal}
          setShow={setShowModal}
          post={postSelected}
        />
      )}
    </>
  );
}
