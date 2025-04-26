import React, { useState, useEffect } from "react";
import { supabase } from "../client.js";
import { useUser } from "../../UserContext.jsx";
import { useParams } from "react-router-dom";
import "./Comments.css";

const Comments = () => {
  const params = useParams();
  const { user, setUser } = useUser();
  const [comment, setComment] = useState({
    text: "",
    post_id: params.postId,
    user_id: user.id,
  });

  const [comments, setComments] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setComment((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    console.log(name, value);
  };

  const addComment = async (event) => {
    event.preventDefault();
    await supabase
      .from("Replies")
      .insert({
        text: comment.text,
        post_id: params.postId,
        user_id: user.id,
      })
      .select();

    window.location = `/post/${params.postId}`;
  };

  useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from("Replies")
        .select()
        .eq("post_id", params.postId)
        .order("created_at", { ascending: false });

      console.log(data ? data : null);

      setComments(data);
    };

    fetchComments();
  }, []);

  return (
    <div>
      <div className="comment-section">
        <form className="form-style">
          <textarea
            id="text"
            name="text"
            placeholder="Leave a comment!"
            onChange={handleChange}
          ></textarea>
          <input type="submit" value="Comment" onClick={addComment} />
        </form>

        <div className="comments">
          {comments && comments.length > 0 ? (
            comments.map((comment, index) => {
              {
                console.log(comment);
              }
              return (
                <div className="comment" key={comment.reply_id}>
                  <h4>{comment.text}</h4>
                </div>
              );
            })
          ) : (
            <h2>{"No Comments"}</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comments;
