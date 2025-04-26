import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser } from "../UserContext.jsx";
import { supabase } from "../src/client";
import Card from "../src/Components/Card.jsx";
import Filters from "../src/Components/Filters.jsx";

const FeedView = (props) => {
  const params = useParams();
  const { user, setUser } = useUser();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("Posts")
        .select()
        .order("created_at", { ascending: false });

      setPosts(data);
    };

    setPosts(props.data);
    fetchPosts();
  }, [props]);

  return (
        <div>
          <Filters posts={posts} setPosts={setPosts} />
          {user.id ? (
            <Link to="/post/create" className="button">
              Create Post
            </Link>
          ) : null}
          <div className="feed-posts">
            {posts && posts.length > 0 ? (
              posts.map((post, index) => {
                {
                  console.log(post);
                }
                return (
                  <Link to={`/post/${post.post_id}`} key={post.post_id}>
                    <Card
                      poster={post.user_id}
                      text={post.text}
                      image={post.image}
                      likes={post.likes}
                      title={post.title}
                      created_at={post.created_at}
                    />
                  </Link>
                );
              })
            ) : (
              <h2>{"No Posts"}</h2>
            )}
          </div>
    </div>
  );
};

export default FeedView;
