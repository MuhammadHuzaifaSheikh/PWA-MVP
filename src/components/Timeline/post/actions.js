import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDoc, doc } from "firebase/firestore";
import { setLikes } from "../../../store/Slices/PhotosSlice";
import { db } from "../../../config/Firebase";
import { ContactsRounded } from "@mui/icons-material";

export default function Actions({ likes, comment, docId, content }) {
  const dispatch = useDispatch();
  const { photos } = useSelector((state) => state.photos);
  const [comments, setComments] = useState(comment);
  const [isLikeByUser, setIsLikeByUser] = useState(false);

  React.useEffect(() => {
    for (let i = 0; i < likes.length; i++) {
      if (likes[i].userId === localStorage.getItem("userID")) {
        setIsLikeByUser(true);
        break;
      }
    }
  }, [isLikeByUser]);

  const likesLength = kFormatter(likes.length);
  const commentsLength = kFormatter(comments.length);

  const handleLikeClick = () => {
    let newContent = {};
    if (isLikeByUser) {
      setIsLikeByUser(!isLikeByUser);
      const index = photos?.findIndex((photo) => photo.id === docId);
      let photo = photos.filter((photo) => {
        return photo.id === docId;
      });
      const likes = photo[0].likes.filter(
        (like) => like.userId !== localStorage.getItem("userID")
      );
      newContent = { ...content, likes };
      dispatch(setLikes({ newContent, index, photos }));
    } else {
      setIsLikeByUser(!isLikeByUser);
      const userId = localStorage.getItem("userID");
      const index = photos.findIndex((photo) => photo.id === docId);
      let photo = photos.filter((photo) => {
        return photo.id === docId;
      });
      const likes = [...photo[0].likes, { userId }];
      newContent = { ...content, likes };
      dispatch(setLikes({ newContent, index, photos }));
    }
    const docRef = doc(db, "photos", content.id);
    setDoc(docRef, newContent);
  };

  return (
    <>
      <div className="">
        <div className="post-acions">
          <div className="likes-container" onClick={handleLikeClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={"none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
              tabIndex={0}
              className={`w-8 action-icons select-none cursor-pointer focus:outline-none ${
                isLikeByUser ? "fill-red text-red-primary" : "text-black-light"
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span className="text">{`${likesLength} `}</span>
          </div>
          <div className="likes-container">
            <svg
              className="w-8 action-icons text-black-light select-none cursor-pointer focus:outline-none"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              tabIndex={0}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span className="text">{`${commentsLength} `}</span>
          </div>
        </div>
      </div>
    </>
  );
}
const kFormatter = (num) => {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
    : Math.sign(num) * Math.abs(num);
};
