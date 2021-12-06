import Link from "next/link";
import React, { useState } from "react";
import { ArticleComment, Article } from "types/article";

interface ArticleCommentsRecentActivity extends ArticleComment {
  type?: string;
}
interface ArticleRecentActivity extends Article {
  type?: string;
}
interface RecentActivityProps {
  viewOnly?: boolean;
  publishedArticles?: ArticleRecentActivity[];
  comments?: ArticleCommentsRecentActivity[];
}

enum SORT {
  TOP,
  RECENT,
}

const ACTIVITYTYPE = {
  COMMENT: "comment",
  ARTICLE: "article",
};

const RecentActivity = ({
  viewOnly,
  publishedArticles,
  comments,
}: RecentActivityProps) => {
  const getRecentActivity = (sortParams = SORT.RECENT) => {
    const sort = (activityArray: any[]) => {
      switch (sortParams) {
        case SORT.TOP:
          return activityArray.sort((a, b) => b.likes - a.likes);
        case SORT.RECENT:
          return activityArray.sort(
            // @ts-ignore
            (a, b) => new Date(b.date) - new Date(a.date)
          );
      }
    };

    if (publishedArticles && comments) {
      const newPublishedArticles = publishedArticles.map((article) => {
        const o = Object.assign({}, article);
        o.type = ACTIVITYTYPE.ARTICLE;
        return o;
      });
      const newComments = comments.map((comment) => {
        const o = Object.assign({}, comment);
        o.type = ACTIVITYTYPE.COMMENT;
        return o;
      });

      // @ts-ignore
      const mixedArray = newPublishedArticles.concat(newComments);

      return sort(mixedArray);
    }
    if (publishedArticles) {
      const newPublishedArticles = publishedArticles.map((article) => {
        const o = Object.assign({}, article);
        o.type = ACTIVITYTYPE.ARTICLE;
        return o;
      });
      return sort(newPublishedArticles);
    }
    if (comments) {
      const newComments = comments.map(
        (comment: ArticleCommentsRecentActivity) => {
          const o = Object.assign({}, comment);
          o.type = ACTIVITYTYPE.COMMENT;
          return o;
        }
      );
      return sort(newComments);
    }
    return [];
  };
  const recentActivity = getRecentActivity();

  return (
    <div className="mb-8">
      <div>
        <h3 className=" my-4 h4Headline">Recent Activity</h3>
        {/* TODO: Add a dropdown for sort functionalty that holds state with enum */}
      </div>
      {recentActivity.length ? (
        <div>
          {recentActivity.map((activity, index) => {
            switch (activity.type) {
              case ACTIVITYTYPE.ARTICLE:
                // @ts-ignore
                return <RecentActivityArticle key={index} article={activity} />;
              case ACTIVITYTYPE.COMMENT:
                // @ts-ignore
                return <RecentActivityComment key={index} comment={activity} />;
            }
          })}
        </div>
      ) : (
        <div>
          {viewOnly
            ? "There is no recent activity for this user"
            : "You have no recent activity"}
        </div>
      )}
    </div>
  );
};

export const RecentActivityComment = ({
  comment,
}: {
  comment: ArticleCommentsRecentActivity;
}) => {
  return (
    <div className="flex flex-col my-2">
      <Link href={`/article/${comment.article.url}`}>
        <div>
          <span className="text-gray-500 body2 underline cursor-pointer">
            {comment.article.title}
          </span>
          <div className="flex w-10/12 ">{comment.comment}</div>
        </div>
      </Link>
      <hr className="my-2"></hr>
    </div>
  );
};

export const RecentActivityArticle = ({
  article,
}: {
  article: ArticleRecentActivity;
}) => {
  return (
    <div className="my-2">
      <Link href={`/article/${article.url}`}>
        <div className="flex">
          <div className="w-10/12">{article.title}</div>
          <img className="w-14 h-14" src={article.image} alt="" />
        </div>
      </Link>
    </div>
  );
};

export default RecentActivity;
