import React from "react";
import { supabase } from "../src/client";
import { useState, useEffect } from "react";
import { useUser } from "../UserContext.jsx";
import { useParams } from "react-router-dom";

const EditView = () => {
  const params = useParams();
  const { user, setUser } = useUser();
  const [currentInfo, setCurrentInfo] = useState({
    title: null,
    text: null,
  });
  const [newPost, setNewPost] = useState({
    title: "",
    poster: "",
    text: "",
    likes: "",
    created_at: "",
    image: "",
  });

  useEffect(() => {
    const fetchPost = async () => {
        const { data, error } = await supabase
          .from("Posts")
          .select()
          .eq("post_id", params.postId);
    
        console.log(data ? data : null);
    
        setNewPost((prev) => {
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

        setCurrentInfo((prev) => {
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

      fetchPost();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    console.log(name, value);
  };

  const updatePost = async (event) => {
    event.preventDefault();

    await supabase
      .from("Posts")
      .update({
        title: newPost.title != "" ? newPost.title : currentInfo.title,
        text: newPost.text != "" ? newPost.text : currentInfo.text,
      })
      .eq("post_id", params.postId);

    window.location = `/feed`;
  };

  return (
    <div>
      <form className="universal-form">
        <div>
          <label htmlFor="title">
            <strong> Title</strong>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            autoComplete="off"
            onChange={handleChange}
          />
        </div>
        <div>
          <div>
            <label htmlFor="text">
              <strong>Content</strong>
            </label>
          </div>
          <div>
            <textarea
              id="text"
              name="text"
              autoComplete="off"
              rows={5}
              onChange={handleChange}
            />
          </div>
        </div>
        <input type="submit" value="Update" onClick={updatePost} />
      </form>
    </div>
  );
};

export default EditView;
