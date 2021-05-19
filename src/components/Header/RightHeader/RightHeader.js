import React, { useState } from "react";
import { Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../../gql/user";
import useAuth from "../../../hooks/useAuth";
import ImageNotFound from "../../../assets/png/avatar.png";
import "./RightHeader.scss";
import ModalUpload from "../../Modal/ModalUpload";

export default function RightHeader() {
  const [showModal, setShowModal] = useState(false);

  const { auth } = useAuth();
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { username: auth.username },
  });

  if (loading || error) return null;
  const { getUser } = data;

  return (
    <>
      <div className="right-header">
        <Link to="/">
          <Icon name="home">
            <span class="tooltiptext">Inicio</span>
          </Icon>
        </Link>
        <Icon name="plus" onClick={() => setShowModal(true)}>
          <span class="tooltiptext">Publicar</span>
        </Icon>
        <Link to={`/${auth.username}`} className="link-avatar">
          <Image src={getUser.avatar ? getUser.avatar : ImageNotFound} avatar />
          <span class="tooltiptext">Cuenta</span>
        </Link>
      </div>
      <ModalUpload show={showModal} setShow={setShowModal} />
    </>
  );
}
