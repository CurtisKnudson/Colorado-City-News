import * as React from "react";
import { useUserProfileContext } from "@providers/profile";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";

const Comments = ({ articleId }: any) => {
  const [comment, setComment] = useState("");
  const { data: session } = useSession();
  // Mediator call to get comments with Id's associted with articleId

  // Ability to add comments that are associated to the article Id and User

  //   Ability to upvote downvote comments

  // Ability to filter comments by user preference. Most Popular, Most Recent, Top Rated

  const handleChange = (e: any) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    if (!session) {
      toast.error("You must be logged in to comment");
      return;
    }
    toast("Wow you are logged in");
    //   Mediator call to add comment to article

    const submittedComment = {
      articleId,
      comment,
    };
  };

  //   UseEffect to make sure that when a comment is added it pulls the list of comments again associated with this article

  return (
    <div className=" mx-4 mt-4 mb-32">
      <div className="h3Headline mb-4">Comments</div>
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
        >
          children?
        </textarea>
        <img
          className="w-12 h-12 ml-2"
          src={session ? session.user!.image! : "/no-picture"}
          alt=""
        />
      </div>

      <div className="border-b-2 inline" onClick={handleSubmit}>
        Submit
      </div>
    </div>
  );
};

export default Comments;
