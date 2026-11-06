import { NavLink, useLocation } from "react-router-dom";
import "../Page/Home.css";
import { useState } from "react";
import Signup from "./Signup";
import { useDispatch, useSelector } from "react-redux";
import { setsearch } from "../redux/Conterslice";
import { logout } from "../redux/APIdata";
// import signup from "./Signup"
function Navbar() {
  const location = useLocation();
  const [show, setshow] = useState(false);
  const seen = location.pathname === "/dashboard";
  const dispatch = useDispatch();
const SearchFilter= useSelector((e)=>e.constructer.SearchFilter)||"";
 const {isAuthenticate}= useSelector(s=>s.constructer)
 
  return (
    <>
      <Signup show={show} handleClose={() => setshow(false)} />
      <nav className="navbar navbar-expand-lg jt-navbar sticky-top">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            Job Tracker
          </NavLink>
          {seen && (
            <form className="hstack gap-2" role="search" onSubmit={(e) => e.preventDefault}>
              <input
                className="form-control"
                type="text"
                placeholder="Search"
                value={SearchFilter}
                onChange={(e) => dispatch(setsearch(e.target.value))}
              />
              <button
                class="btn btn-primary"
                type="submit"
               
              >
                search
              </button>
            </form>
          )}

          <ul className="navbar-nav mx-auto flex-row gap-2">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/dashboard">
                Dashboard
              </NavLink>
            </li>
          </ul>
          {isAuthenticate ? (
            <button
              className="btn btn-warning"
              type="submit"
              onClick={()=>dispatch(logout()) }
             >
              logout
            </button>
           ):(
            <button
              className="btn btn-primary"
              type="submit"
              onClick={() => setshow(true)}
            >
              Signup
            </button>
          )
          }
        </div>
      </nav>
    </>
  );
}

export default Navbar;
