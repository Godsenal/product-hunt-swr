import React, { memo } from "react";
import qs from "query-string";
import { LazyImage } from "components";
import { Post } from "models/Post";

import styles from "styles/postItem.module.css";

type Props = Post & {
  index: number;
};

const PostItem: React.FC<Props> = ({
  id,
  name,
  thumbnail,
  votes_count,
  tagline,
  index,
  slug
}) => {
  let { url, query } = qs.parseUrl(thumbnail.image_url);
  query.w = query.h = "80px";
  return (
    <div
      key={id}
      className={`${styles.postItem} ${index === 0 ? styles.isFirstItem : ""}`}
    >
      <div className={styles.postThumbnail}>
        <LazyImage
          src={`${url}?${qs.stringify(query)}`}
          width="100%"
          height="100%"
        />
      </div>
      <div className={styles.postInfo}>
        <h3>
          <a
            href={`https://producthunt.com/posts/${slug}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            {name}
          </a>
        </h3>
        <p>{tagline}</p>
      </div>
      <div className={styles.postCount}>
        <span>
          <i className="fas fa-caret-up"></i> {votes_count}
        </span>
      </div>
    </div>
  );
};

export default memo(PostItem);
