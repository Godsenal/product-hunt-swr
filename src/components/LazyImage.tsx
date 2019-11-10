import React, { HTMLProps, useRef, useEffect, memo } from "react";

type Props = HTMLProps<HTMLImageElement>;

const LazyImage: React.FC<Props> = ({ src = "", ...imageProps }) => {
  const img = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = img.current;
    if (!el) {
      return;
    }
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          el.src = src;
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => {
      observer.unobserve(el);
    };
  }, [src]);

  return <img ref={img} {...imageProps} crossOrigin={"" as const} />;
};

export default memo(LazyImage);
