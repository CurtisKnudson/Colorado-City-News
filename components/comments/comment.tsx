import { ArticleComment } from "types/article";

const Comment = ({
  comment,
  index,
}: {
  comment: ArticleComment;
  index: number;
}) => {
  return (
    <div key={index} className="flex items-center justify-between my-2">
      <div>{comment.comment}</div>
      <a href={`/user/${comment.authorProfileUrl}`}>
        <img
          src={comment.authorImage}
          alt="User profile picture"
          className="w-12 h-12"
        />
      </a>
    </div>
  );
};

export default Comment;
