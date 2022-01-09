import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../../config/Firebase";
import { setPhotos } from "../../store/Slices/PhotosSlice";
import AddComment from "./post/add-comment";
import Post from "./post";

export default function Timeline() {
  const dispatch = useDispatch();
  const { photos } = useSelector((state) => state.photos);
  React.useEffect(() => {
    onSnapshot(collection(db, "photos"), (snapshot) =>
      dispatch(setPhotos(snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))))
    );
  }, [dispatch]);

  return (
    <div>
      {navigator.onLine ? (
        photos.length === 0 ? (
          <>
            <p className="flex justify-center font-bold">
              Follow other people to see Photos
            </p>
          </>
        ) : photos ? (
          photos.map((content) => <Post key={content.id} content={content} />)
        ) : null
      ) : (
        <div className="loader-container">
          <p>You are in Offline Mode</p>
          <div class="loader"></div>
        </div>
      )}
    </div>
  );
}
