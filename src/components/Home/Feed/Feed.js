import React, { useState, useEffect } from "react";
import "./Feed.scss";
import { map } from "lodash";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Image } from "semantic-ui-react";
import { GET_POSTS_FOLLOWEDS, GET_RECOMMENDED_POSTS } from "../../../gql/post";
import ImageNotFound from "../../../assets/png/avatar.png";
import Actions from "../../Modal/ModalPostMovil/Actions";
import CommentForm from "../../Modal/ModalPost/CommentForm";
import ModalPost from "../../Modal/ModalPost";

export default function Feed() {
  const [showModal, setShowModal] = useState(false);
  const [postSelected, setPostSelected] = useState(null);

  //QUERY DE POST DE SEGUIDOS
  const { data, loading, startPolling, stopPolling } = useQuery(
    GET_POSTS_FOLLOWEDS
  );

  //QUERY DE RECOMENDADOS
  const {
    data: dataRecommended,
    loading: loadingRecommended,
    startPolling: startPollingRecommended,
    stopPolling: stopPollingRecommended,
  } = useQuery(GET_RECOMMENDED_POSTS);

  useEffect(() => {
    startPolling(10000);
    startPollingRecommended(10000);
    return () => {
      stopPolling();
      stopPollingRecommended();
    };
  }, [
    startPolling,
    stopPolling,
    startPollingRecommended,
    stopPollingRecommended,
  ]);
  if (loading || loadingRecommended) return null;
  if (data === undefined || dataRecommended === undefined) return null;
  const { getPostFolloweds } = data;
  const { getRecommendedPosts } = dataRecommended;

  //mapear el recommended post para agregarle una propiedad "ad"
  const recommendedTyped = getRecommendedPosts.map((post) => ({
    ...post,
    ad: true,
  }));

  //Juntar los posts para poder mostrar todos
  const allPosts = getPostFolloweds.concat(recommendedTyped);

  const openPost = (post) => {
    setPostSelected(post);
    setShowModal(true);
  };

  return (
    <>
      <div className="feed">
        {map(allPosts, (post, index) => (
          <div key={index} className="feed__box">
            <Link to={`/${post.idUser.username}`}>
              <div className="feed__box-user">
                <Image src={post.idUser.avatar || ImageNotFound} avatar />
                <span>{post.idUser.name}</span>
                {/* // Aquí un span que diga si es publicidad */}
                {!post.ad && (
                  <p
                    style={{
                      fontSize: 10,
                      marginLeft: 43,
                      marginTop: -5,
                      color: "gray",
                    }}
                  >
                    Recomendado para ti
                  </p>
                )}
              </div>
            </Link>

            <div
              className="feed__box-photo"
              style={{ backgroundImage: `url("${post.file}")` }}
              onClick={() => openPost(post)}
            />
            {post.text ? (
              <div className="feed__box-text">
                <span>{post.idUser.username}: </span>
                {post.text}
              </div>
            ) : null}
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
