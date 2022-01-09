import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setComments } from "../../../store/Slices/PhotosSlice";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../../config/Firebase";

export default function AddComment({ docId, comments, content }) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const { photos } = useSelector((state) => state.photos);
  const { username } = useSelector((state) => state.user);

  const handleSubmitComment = (event) => {
    event.preventDefault();

    let index;
    let newContent = {};
    for (let i = 0; i < photos.length; i++) {
      if (photos[i].id === docId) {
        index = i;
      }
    }
    let photo = photos.filter((photo) => {
      return photo.id === docId;
    });
    const comments = [
      ...photo[0].comments,
      { comment: comment, displayName: username },
    ];

    newContent = { ...content, comments };
    dispatch(setComments({ newContent, index, photos }));
    const docRef = doc(db, "photos", content.id);
    setDoc(docRef, newContent);
  };

  return (
    <div className=" border-gray-primary cmnt-container">
      <img
        src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
        className="cmnt-avatar"
      />
      <form
        className="flex justify-between pl-0 pr-5 cmnt-form"
        method="POST"
        onSubmit={(event) =>
          comment.length >= 1
            ? handleSubmitComment(event)
            : event.preventDefault()
        }
      >
        <input
          aria-label="Add a comment"
          autoComplete="off"
          className="text-sm text-gray-base w-full mr-3"
          type="text"
          name="add-comment"
          placeholder="Add a comment..."
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button
          className={`cmnt-btn`}
          type="button"
          disabled={comment.length < 1}
          onClick={handleSubmitComment}
        >
          Post
        </button>
      </form>
    </div>
  );
}
