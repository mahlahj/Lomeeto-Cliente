import React from "react";
import "./UsersNotFolloweds.scss";
import { Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { map } from "lodash";
import { useQuery } from "@apollo/client";
import { GET_NOT_FOLLOWEDS } from "../../../gql/follow";
import ImageNotFound from "../../../assets/png/avatar.png";

export default function UsersNotFolloweds() {
  const { data, loading } = useQuery(GET_NOT_FOLLOWEDS);

  if (loading) return null;
  if (data === undefined) return null;
  const { getNotFolloweds } = data;

  console.log(getNotFolloweds);

  return (
    <div className="users-not-followeds">
      <h3>Lomeetos en tu ciudad que no sigues</h3>

      {map(getNotFolloweds, (user, index) => (
        <Link
          key={index}
          to={`/${user.username}`}
          className="users-not-followeds__user"
        >
          <Image src={user.avatar || ImageNotFound} avatar />
          <span>{user.name}</span>
        </Link>
      ))}
    </div>
  );
}
