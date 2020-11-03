import React from "react";
import "./Post.scss";
import { map } from "lodash";
import { Grid } from "semantic-ui-react";
import PreviewPost from "./PreviewPost";

export default function Posts({ getPosts }) {
  return (
    <div className="posts">
      <h1>Posts</h1>
      <Grid columns={4}>
        {map(getPosts, (post, index) => (
          <Grid.Column key={index}>
            <PreviewPost post={post} />
          </Grid.Column>
        ))}
      </Grid>
    </div>
  );
}
