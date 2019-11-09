import React from "react";
import { Link } from "react-router-dom";
import qs from "query-string";
import LazyImage from "components/LazyImage";
import { Post } from "models/Post";

type Props = {
  year: number;
  month: number;
  posts: Post[];
};
const PostList: React.FC<Props> = ({ posts, year, month }) => {
  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <h2>
        {year}.{month}
      </h2>
      {posts.map(({ id, name, thumbnail }) => {
        let { url, query } = qs.parseUrl(thumbnail.image_url);
        query.w = query.h = "80px";
        return (
          <div
            key={id}
            style={{ display: "inline-block", margin: 10, textAlign: "center" }}
          >
            <div
              style={{
                display: "inline-block",
                width: 80,
                height: 80
              }}
            >
              <LazyImage
                src={`${url}?${qs.stringify(query)}`}
                width="100%"
                height="100%"
              />
            </div>
            <div>
              <Link to={`/post/${name}`}>{name}</Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostList;
