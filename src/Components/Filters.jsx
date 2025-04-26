import React, { useState, useEffect } from "react";
import { supabase } from "../client";
import './Filters.css'

const Filters = ({posts, setPosts}) => {
  const [filter, setFilter] = useState({
    search: "",
    drop: "newest",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilter((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    console.log(name, value);
  };

  useEffect(() => {
    const fetchPosts = async () => {
        let query = supabase
        .from("Posts")
        .select()

        if (filter.search.trim() !== "") {
            query = query.ilike("title", `%${filter.search}%`);
          }

      if (filter.drop == "newest") {
        query = query.order("created_at", { ascending: false });
      } else if (filter.drop == "popularity") {
        query = query.order("likes", { ascending: false });
      }

      const { data, error } = await query;
      console.log("filter error:", error)
      setPosts(data);
    };

    fetchPosts();
  }, [filter]);

  return (
    <div className="filters">
        <input
          id="search"
          type="search"
          name="search"
          placeholder="Search for a Post"
          onChange={handleChange}
        ></input>
        <select id="drop" name="drop" onChange={handleChange}>
          <option value="newest">Newest</option>
          <option value="popularity">Most Popular</option>
        </select>
    </div>
  );
};

export default Filters;
