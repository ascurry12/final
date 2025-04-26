import React from "react";
import { supabase } from "../src/client";
import { useState, useRef } from "react";
import { useUser } from "../UserContext.jsx";

const CreateView = () => {
  const { user, setUser } = useUser();
  const fileInputRef = useRef(null);
  const [newPost, setNewPost] = useState({
    title: "",
    likes: 0,
    text: "",
    user_id: user.id,
    image: "",
  });

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

  const submitPost = async (event) => {
    event.preventDefault();
    const imageFile = fileInputRef.current.files[0];
    console.log(imageFile);
    const { data, error } = await supabase.storage
      .from("images")
      .upload(`public/${newPost.title}-${user.id}.png`, imageFile, {
        cacheControl: "3600",
        upsert: false,
      });

    console.log(error);

    await supabase
      .from("Posts")
      .insert({
        title: newPost.title,
        likes: newPost.likes,
        text: newPost.text,
        user_id: user.id,
        image: `public/${newPost.title}-${user.id}.png`,
      })
      .select();

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

        <div>
          <label htmlFor="image">
            <strong> Image</strong>
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/png, image/jpeg"
            ref={fileInputRef}
          />
        </div>
        <input type="submit" value="Post" onClick={submitPost} />
      </form>
    </div>
  );
};

export default CreateView;
