
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { Context } from "../../main";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  


  const handleNavbar = () => {
    setShow(!show);
  };

  const isDashboard = useLocation(`${import.meta.env.VITE_FRONTEND_URI}/dashboard`);

  const { mode, setMode, isAuthenticated, user, setIsAuthenticated } = useContext(Context);

  const navigateTo = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/api/v1/user/logout`,
        { withCredentials: true }
      );
      setIsAuthenticated(false);
      toast.success(data.message);
      navigateTo("/"); // Redirect to homepage after logout
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const encodedQuery = encodeURIComponent(searchQuery); // Ensure the query is URL encoded
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/api/v1/blog/search?q=${encodedQuery}`
      );
      //setSearchResults(data); // Assuming the response contains the search results
      navigateTo("/search", { state: { searchResults: data } }); // Pass data as state
    } catch (error) {
      toast.error("Error fetching search results");
      console.error("Error during search:", error); // Logs error details to console
    }
  };
  
  

  return (
    <section className={isDashboard.pathname === "/dashboard" ? "hideNavbar" : mode === "light" ? "header light-navbar" : "header dark-navbar"}>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px", flexWrap: "wrap" }}>
        <div className="logo">
          CarSavvy<span></span>
        </div>
        <div className={show ? "links show" : "links"} style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <ul style={{ listStyleType: "none", display: "flex", gap: "15px", margin: 0 }}>
            <li>
              <Link to={"/"} onClick={handleNavbar} style={{ textDecoration: "none", fontSize: "16px", padding: "0.5rem" }}>
                HOME
              </Link>
            </li>
            <li>
              <Link to={"/blogs"} onClick={handleNavbar} style={{ textDecoration: "none", fontSize: "16px", padding: "0.5rem" }}>
                POST
              </Link>
            </li>
            <li>
              <Link to={"/authors"} onClick={handleNavbar} style={{ textDecoration: "none", fontSize: "16px", padding: "0.5rem" }}>
                DEALERS
              </Link>
            </li>
            <li>
              <Link to={"/about"} onClick={handleNavbar} style={{ textDecoration: "none", fontSize: "16px", padding: "0.5rem" }}>
                ABOUT
              </Link>
            </li>

            {/* Search Bar */}
            <form onSubmit={handleSearch} style={{ textDecoration: "none", fontSize: "16px", padding: "0.5rem" }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search blogs..."
                style={{
                  padding: "0.5rem",
                  marginRight: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  height: "35px",
                  outline: "none",
                  width: "200px",
                }}
              />
              <button type="submit" style={{ padding: "0.5rem 1rem", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px" }}>
                Search
              </button>
            </form>
          </ul>

          <div className="btns">
            <button onClick={() => setMode(mode === "light" ? "dark" : "light")} className={mode === "light" ? "mode-btn light-mode" : "mode-btn dark-mode"}>
              {mode === "light" ? <CiLight className="light-icon" /> : <MdDarkMode className="dark-icon" />}
            </button>
            {isAuthenticated && user.role === "Author" && (
              <Link to={"/dashboard"} onClick={handleNavbar} className="dashboard-btn" style={{ textDecoration: "none", fontSize: "16px", padding: "0.5rem" }}>
                DASHBOARD
              </Link>
            )}
            {!isAuthenticated ? (
              <Link to={"/login"} onClick={handleNavbar} className="login-btn" style={{ textDecoration: "none", fontSize: "16px", padding: "0.5rem" }}>
                LOGIN
              </Link>
            ) : (
              <div>
                <button className="logout-btn" onClick={handleLogout} style={{ textDecoration: "none", fontSize: "16px", padding: "0.5rem" }}>
                  LOGOUT
                </button>
              </div>
            )}
          </div>
        </div>

        <RxHamburgerMenu className="hamburger" onClick={handleNavbar} />
      </nav>
    </section>
  );
};

export default Navbar;
