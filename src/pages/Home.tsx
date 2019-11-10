import React, { useRef, useEffect } from "react";
import useSWR, { useSWRPages } from "swr";
import qs from "query-string";
import { ReactComponent as Loading } from "assets/loading.svg";
import { ProductHuntApi } from "constants/api";
import PostList from "components/PostList";
import { Post } from "models/Post";

const CDate = new Date();
const CYear = CDate.getFullYear();
const CMonth = CDate.getMonth() + 1;
const DefaultQuery = {
  sort_by: "votes_count",
  order: "desc",
  per_page: 10
};

const Home: React.FC = () => {
  const hitEl = useRef<HTMLDivElement>(null);
  const { pages, isLoadingMore, isReachingEnd, loadMore } = useSWRPages<
    { CYear: number; CMonth: number } | null,
    { posts: Post[] },
    any
  >(
    "monthlyPosts",
    ({ offset = { CYear, CMonth }, withSWR }) => {
      const year = offset ? offset.CYear : CYear;
      const month = offset ? offset.CMonth : CMonth;
      const query = {
        ...DefaultQuery,
        "search[featured_month]": month,
        "search[featured_year]": year
      };
      const { data } = withSWR(
        // 훅을 콜백안에서 사용
        // eslint-disable-next-line
        useSWR(`${ProductHuntApi.GET_POSTS}?${qs.stringify(query)}`)
      );
      const { posts } = data || {};

      if (!posts) {
        return null;
      }

      return <PostList year={year} month={month} posts={posts} />;
    },
    ({ data }) => {
      const { posts } = data || {};
      if (!posts || !posts.length) {
        return null;
      }
      const day = new Date(posts[0].day);
      const year = day.getFullYear();
      const month = day.getMonth() + 1;
      const isPrevYear = month <= 1;
      return {
        CYear: year - Number(isPrevYear),
        CMonth: isPrevYear ? 12 : month - 1
      };
    },
    []
  );
  useEffect(() => {
    const el = hitEl.current;
    if (!el) {
      return;
    }
    const io = new IntersectionObserver(
      entries => {
        if (!isLoadingMore && entries[0].isIntersecting) {
          loadMore();
        }
      },
      {
        threshold: 0.2
      }
    );
    io.observe(el);

    return () => {
      io.unobserve(el);
    };
  }, [loadMore, isLoadingMore]);
  return (
    <div>
      <h1>Month hunt</h1>
      {pages}
      {!isReachingEnd && (
        <div ref={hitEl} style={{ height: 60, textAlign: "center" }}>
          {isLoadingMore && <Loading width={100} />}
        </div>
      )}
    </div>
  );
};

export default Home;
