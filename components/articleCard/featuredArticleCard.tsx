import React, { useEffect } from "react";
import Image from "next/image";

import { Article } from "../../types/article";
import Link from "next/link";

interface FeaturedArticle extends Article {
  image: string;
}

export const FeaturedArticleCard = ({
  featuredArticle,
}: {
  featuredArticle: FeaturedArticle;
}) => {
  if (!featuredArticle) {
    return <GhostFeaturedArticleCard />;
  }
  return (
    <Link href={`article/${featuredArticle.url}`}>
      <div className="cursor-pointer">
        <Image
          src={featuredArticle.image}
          priority
          width="1800"
          height="1200"
        />
        <div className="flex flex-col">
          <span className="font-lfBold text-sm my-2">World</span>
          <span className="font-lfRegular text-4xl">
            {featuredArticle.title}
          </span>
        </div>
      </div>
    </Link>
  );
};

export const GhostFeaturedArticleCard = () => {
  return (
    <div>
      <Image
        src="https://picsum.photos/1080/1080"
        priority
        width="1080"
        height="1080"
      />
      <div className="flex flex-col">
        <span className="font-lfBold text-sm my-2"></span>
        <span className="font-lfRegular text-4xl"></span>
      </div>
    </div>
  );
};
