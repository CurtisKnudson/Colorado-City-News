import { ArticleComment } from "types/article";

const Comment = ({
  comment,
  index,
}: {
  comment: ArticleComment;
  index: number;
}) => {
  return (
    <div key={index} className="flex">
      <div>{comment.comment}</div>
      <img
        src={comment.image}
        alt="User profile picture"
        className="w-12 h-12"
      />
    </div>
  );
};

export default Comment;
