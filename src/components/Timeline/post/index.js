import Header from "./header";
import Image from "./image";
import Actions from "./actions";
import Footer from "./footer";
import Comments from "./comments";

export default function Post({ content }) {
  return (
    <div className="insta-post">
      <Header username={content.username} />
      <Image src={content.imgSrc} caption={content.caption} />
      <Actions
        docId={content.id}
        likes={content.likes}
        comment={content.comments}
        content={content}
      />
      {/* <Footer caption={content.caption} username={content.username} /> */}
      <Comments
        docId={content.id}
        comments={content.comments}
        posted={content.dateCreated}
        content={content}
      />
    </div>
  );
}
