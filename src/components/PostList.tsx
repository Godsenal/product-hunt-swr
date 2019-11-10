import React from "react";
import { Post } from "models/Post";
import { PostItem } from "components";

type Props = {
  year: number;
  month: number;
  posts: Post[];
};
const PostList: React.FC<Props> = ({ posts, year, month }) => {
  return (
    <div>
      <h2>
        {year}.{month}
      </h2>
      {posts.map((post, i) => (
        <PostItem key={post.id} {...post} index={i} />
      ))}
    </div>
  );
};

export default PostList;
