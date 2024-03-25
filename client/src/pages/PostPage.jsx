import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Button, Spinner } from "flowbite-react";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";


const PostPage = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { slug } = useParams();
  const { currentUser } = useSelector((state) => state.auth);
  const [postData, setPostData] = useState(null);
  console.log(error, postData, slug, loading);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:3001/api/v1/post/getPosts?userId=${currentUser._id}&slug=${slug}`,
          {
            method: "GET",
            credentials: "include", // added this part
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        if (!res.ok || data.success === false) {
          setError(data.message);
          setLoading(false);
        }
        setPostData(data.posts[0]);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);
  return (
    <div >
      {loading ? (
        <div className="w-full min-h-screen flex justify-center items-center"><Spinner color="info" size={"xl"} className="text-5xl" /></div>
      ) : (
        <main className="p-3 min-h-screen flex flex-col max-w-6xl mx-auto">
          <h2 className="text-3xl mt-10  p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">{postData&&postData.title}</h2>
          <Link to={`/search?category=${postData&&postData.category}`} className="self-center mt-5">
           <Button color="blue" pill size="xs" className="">{postData&&postData.category}</Button>
          </Link>
          <img src={postData&&postData.image} alt={postData&&postData.title} className="w-full p-3 max-h-[600px] object-cover mt-10" />
          <div className="flex w-full justify-between border-b border-slate-300 p-3">
            <span>{postData&&new Date(postData.createdAt).toLocaleDateString()}</span>
            <span className="italic">{postData&&((postData.content.length)/1000).toFixed(0)} mins read</span>
          </div>
          <div className="p-3 max-w-2xl mx-auto w-full post_content" dangerouslySetInnerHTML={{__html:postData&&postData.content}}>
          </div>
          <div className="max-w-4xl mx-auto w-full">
            <CallToAction/>
          </div>
          <div className="max-w-2xl mx-auto w-full mt-5">
            <CommentSection postId={postData&&postData._id}/>
          </div>
        </main>
      )}
    </div>
  );
};

export default PostPage;
