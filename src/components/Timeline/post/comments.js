import { useState } from "react";
import { formatDistance } from "date-fns";
// import { Link } from "react-router-dom";
import AddComment from "./add-comment";

export default function Comments({
  docId,
  comments: allComments,
  posted,
  content,
}) {
  const [comments, setComments] = useState(allComments);
  const [commentsSlice, setCommentsSlice] = useState(3);

  const showNextComments = () => {
    setCommentsSlice(commentsSlice + 3);
  };

  return (
    <>
      <div className="post-comments">
        {comments.slice(0, commentsSlice).map((item, index) => (
          <p key={`${index}-${item.displayName}`} className="post-comment">
            <span className="mr-1 font-bold"> {item.displayName} </span>
            <span> {item.comment} </span>
          </p>
        ))}
        {comments.length >= 3 && commentsSlice < comments.length && (
          <button
            className="view-all"
            type="button"
            onClick={showNextComments}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                showNextComments();
              }
            }}
          >
            View all {comments.length}
            comments
          </button>
        )}
        {/* <p className="text-gray-base uppercase text-xs mt-2">
                                {formatDistance(posted, new Date())} ago
                            </p> */}
      </div>
      <AddComment
        docId={docId}
        comments={comments}
        setComments={setComments}
        content={content}
      />
    </>
  );
}
