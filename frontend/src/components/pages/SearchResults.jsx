import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../../main"; // Assuming mode is provided by Context

const SearchResults = () => {
  const location = useLocation();
  const { searchResults } = location.state || {}; // Access the passed searchResults data
  const posts = searchResults?.posts || []; // Safely access the posts array
  const { mode } = useContext(Context); // Get mode from Context

  return (
    <section
      className={`blogs ${mode === "dark" ? "dark-bg" : "light-bg"}`}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start", // Ensures content starts from top
        minHeight: "100vh", // Ensures section takes full height
        width: "100%",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <h3 className={mode === "dark" ? "dark-text" : "light-text"}>Search Results</h3>
      <div className="container" style={{ display: "flex", flexWrap: "wrap", gap: "20px", width: "100%" }}>
        {posts.length > 0 ? (
          posts.map((element) => (
            <Link
              to={`/blog/${element._id}`}
              className="card"
              key={element._id}
              style={{
                backgroundColor: mode === "dark" ? "#1e1e1e" : "#f9f9f9",
                color: mode === "dark" ? "#ffffff" : "#000000",
              }}
            >
              <img src={element.mainImage.url} alt="blog" />
              <span className="category">{element.category}</span>
              <h4>{element.title}</h4>
              <div className="writer_section">
                <div className="author">
                  <img src={element.authorAvatar} alt="author_avatar" />
                  <p>{element.authorName}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </section>
  );
};

export default SearchResults;
