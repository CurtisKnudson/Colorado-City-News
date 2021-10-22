import React, { useEffect } from "react";
import Image from "next/image";
import { useMediator } from "@mediator/providers/mediators/mediatorProvider";
import { useAsyncValue } from "@mediator/observables/hooks";
import { Article } from "../../types/article";
import Link from "next/link";

interface FeaturedArticle {
  featuredArticle: Article;
  name: string;
  image: string;
}

export const FeaturedArticleCard = () => {
  const mediator = useMediator();
  const featuredArticle: FeaturedArticle = useAsyncValue(
    mediator.featuredArticle
  );

  useEffect(() => {
    mediator.getFeaturedArticle();
  }, [mediator]);

  if (!featuredArticle) {
    return <GhostFeaturedArticleCard />;
  }

  return (
    <Link href={`/article/${featuredArticle.featuredArticle.url}`}>
      <div className="cursor-pointer">
        <Image
          src={featuredArticle.featuredArticle.image}
          priority
          width="1800"
          height="1200"
        />
        <div className="flex flex-col">
          <span className="font-lfBold text-sm my-2">World</span>
          <span className="font-lfRegular text-4xl">
            {featuredArticle.featuredArticle.title}
          </span>
        </div>
      </div>
    </Link>
  );
};

export const GhostFeaturedArticleCard = () => {
  return (
    <div>
      v
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
