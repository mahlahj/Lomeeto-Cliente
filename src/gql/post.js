import { gql } from "@apollo/client";

export const PUBLISH = gql`
  mutation publish($file: Upload) {
    publish(file: $file) {
      status
      urlFile
    }
  }
`;

export const GET_POSTS = gql`
  query getPosts($username: String!) {
    getPosts(username: $username) {
      id
      idUser
      file
      typeFile
    }
  }
`;

export const GET_POSTS_FOLLOWEDS = gql`
  query getPostFolloweds {
    getPostFolloweds {
      id
      idUser {
        name
        username
        avatar
      }
      file
      typeFile
      createAt
    }
  }
`;
