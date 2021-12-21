import React from "react";
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
    <Link href={`article/${featuredArticle.url}`} passHref>
      <div className="cursor-pointer">
        <Image
          src={featuredArticle.image}
          priority
          width="1800"
          height="1200"
          alt="Featured Article Header Image"
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
        src="/placeholder.jpg"
        priority
        width="1800"
        height="1200"
        alt="Placeholder image because article isnt rendering"
      />
      <div className="flex flex-col">
        <span className="font-lfBold text-sm my-2"></span>
        <span className="font-lfRegular text-4xl"></span>
      </div>
    </div>
  );
};
