import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import qs from "query-string";
import { ProductHuntApi } from "constants/api";
import { Post } from "models/Post";
import { ReactComponent as Loading } from "assets/loading.svg";
import { PostItem } from "components";

const DefaultQuery = {
  sort_by: "votes_count",
  order: "desc"
};

const Month = () => {
  const { year, month } = useParams();
  const query = {
    ...DefaultQuery,
    "search[featured_month]": month,
    "search[featured_year]": year
  };
  const { data, error } = useSWR<{ posts: Post[] }>(
    `${ProductHuntApi.GET_POSTS}?${qs.stringify(query)}`
  );

  if (error) {
    return <div>에러 발생!</div>;
  }
  if (!data) {
    return <Loading />;
  }
  return (
    <>
      {data.posts.map((post, i) => (
        <PostItem key={post.id} index={i} {...post} />
      ))}
    </>
  );
};

export default Month;
