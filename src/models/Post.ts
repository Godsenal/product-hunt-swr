export type Post = {
  day: string;
  id: number;
  name: string;
  created_at: string;
  votes_count: number;
  tagline: string;
  slug: string;
  thumbnail: {
    id: number;
    media_type: string;
    image_url: string;
  };
};
