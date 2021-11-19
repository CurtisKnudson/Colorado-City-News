import * as React from "react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useMediator } from "@mediator/providers/mediators/mediatorProvider";
import { useAsyncValue } from "@mediator/observables/hooks";
import { v4 as uuidv4 } from "uuid";
import { ArticleComment } from "types/article";
import Comment from "./comment";

const Comments = ({ articleId }: { articleId: string }) => {
  const [comment, setComment] = useState("");
  const { data: session } = useSession();
  const mediator = useMediator();
  const comments: ArticleComment[] | null = useAsyncValue(
    mediator.articleComments
  );

  const handleChange = (e: any) => {
    setComment(e.target.value);
  };

  const handleSubmit = async () => {
    if (!session) {
      toast.error("You must be logged in to comment");
      return;
    }
    const commentData: ArticleComment = {
      articleId,
      id: uuidv4(),
      date: new Date(),
      author: session.user?.name ? session.user!.name! : session.user!.email!,
      comment,
      image: session.user?.image ? session.user.image : "/no-picture.jpeg",
    };

    toast.promise(mediator.addCommentToArticle(commentData), {
      pending: "Please wait...",
      success: "Your comment has been added succesfully!",
      error:
        "There was an error 🤯.  If the problem persists contact admin@coloradocity.news",
    });
    setComment("");
  };

  useEffect(() => {
    mediator.getArticleCommentsByArticleId(articleId);
  }, [mediator]);

  return (
    <div className=" mx-4 mt-4 mb-32">
      <div className="h3Headline mb-4">Comments</div>
      <>
        {comments ? (
          comments.map((comment, index) => {
            return <Comment key={comment.id} comment={comment} index={index} />;
          })
        ) : (
          <div>There are no comments to be displayed!</div>
        )}
      </>
      <div className="mt-4">
        {session && (
          <span className="text-gray-500 subtitle2">
            {" "}
            Commenting as{" "}
            {session.user?.name ? session.user.name : session.user!.email}
          </span>
        )}
        <div className="flex items-center">
          <textarea
            placeholder={
              session
                ? "Add Comment..."
                : "You cannot comment unless you have created an account"
            }
            className="w-full border focus:border-gray-500 rounded p-2 h-auto outline-none"
            value={comment}
            onChange={handleChange}
          ></textarea>
          <img
            className="w-12 h-12 ml-2"
            src={session ? session.user!.image! : "/no-picture.jpeg"}
            alt=""
          />
        </div>

        <div className="border-b-2 inline" onClick={handleSubmit}>
          Submit
        </div>
      </div>
    </div>
  );
};

export default Comments;
