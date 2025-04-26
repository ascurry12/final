import React, { useState, useEffect } from "react";
import { supabase } from "../src/client";
import { useUser } from "../UserContext.jsx";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Comments from "../src/Components/Comments.jsx";
import moment from "moment";

const PostView = () => {
  const params = useParams();
  const { user, setUser } = useUser();

  const [post, setPost] = useState({
    title: null,
    poster: null,
    likes: null,
    text: null,
    createdat: null,
    image: null,
  });

  useEffect(() => {
    fetchPost();
    console.log(user);
  }, []);

  const fetchPost = async () => {
    const { data, error } = await supabase
      .from("Posts")
      .select()
      .eq("post_id", params.postId);

    console.log(data ? data : null);

    setPost((prev) => {
      return {
        ...prev,
        title: data[0].title,
        poster: data[0].user_id,
        likes: data[0].likes,
        text: data[0].text,
        created_at: data[0].created_at,
        image: data[0].image,
      };
    });
  };

  const getImage = () => {
    const { data } = supabase.storage.from("images").getPublicUrl(post.image);

    return data.publicUrl;
  };

  const deletePost = async (event) => {
    event.preventDefault();

    await supabase.from("Posts").delete().eq("post_id", params.postId);
    window.location = `/feed/${user.id}`;
  };

  const updateUpvote = async (event) => {
    event.preventDefault();

    await supabase
      .from("Posts")
      .update({
        likes: post.likes + 1,
      })
      .eq("post_id", params.postId);

    setPost((prev) => {
      return {
        ...prev,
        likes: prev.likes + 1,
      };
    });
  };

  return (
    <div className="post-view">
      <div className="post-info">
        <p>
          Posted{" "}
          {moment.utc(post.created_at).local().startOf("seconds").fromNow()}
        </p>
        <h3>{post.title}</h3>
        <p>{post.text}</p>
        <img src={getImage()}></img>
        <p className="upvote" onClick={updateUpvote}>
          ⭐ {post.likes} upvotes
        </p>
      </div>

      <div className="user-options">
        {post.poster == user.id ? (
          <div>
            <Link to={`/post/edit/${params.postId}`} className="button">
              Edit
            </Link>
            <Link
              onClick={deletePost}
              className="button"
              to={`/feed`}
            >
              Delete
            </Link>
          </div>
        ) : null}
      </div>

      {user.id ? <Comments /> : null}
    </div>
  );
};

export default PostView;
