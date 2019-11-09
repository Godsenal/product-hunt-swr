export type Post = {
  day: string;
  id: number;
  name: string;
  created_at: string;
  thumbnail: {
    id: number;
    media_type: string;
    image_url: string;
  };
};
