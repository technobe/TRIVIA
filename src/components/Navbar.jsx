// import { IconButton } from "@mui/material";
// import { Search, Person, Menu } from "@mui/icons-material";
// import variables from "../styles/variables.scss";
// import { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import "../styles/Navbar.scss";
// import { Link, useNavigate } from "react-router-dom";
// import { setLogout } from "../redux/state";


// const Navbar = () => {
//   const [dropdownMenu, setDropdownMenu] = useState(false);

//   const user = useSelector((state) => state.user);

//   const dispatch = useDispatch();

//   const [search, setSearch] = useState("")

//   const navigate = useNavigate()

//   return (
//     <div className="navbar">
//       <a href="/">
//         <img src="/assets/logo.png" alt="logo" />
//       </a>

//       <div className="navbar_search">
//         <input
//           type="text"
//           placeholder="Search ..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <IconButton disabled={search === ""}>
//           <Search
//             sx={{ color: variables.pinkred }}
//             onClick={() => {navigate(`/properties/search/${search}`)}}
//           />
//         </IconButton>
//       </div>

//       <div className="navbar_right">
//         {user ? (
//           <a href="/create-listing" className="host">
//             Become A Host
//           </a>
//         ) : (
//           <a href="/login" className="host">
//             Become A Host
//           </a>
//         )}

//         <button
//           className="navbar_right_account"
//           onClick={() => setDropdownMenu(!dropdownMenu)}
//         >
//           <Menu sx={{ color: variables.darkgrey }} />
//           {!user ? (
//             <Person sx={{ color: variables.darkgrey }} />
//           ) : (
//             <img
//               src={`http://localhost:3001/${user.profileImagePath.replace(
//                 "public",
//                 ""
//               )}`}
//               alt="profile photo"
//               style={{ objectFit: "cover", borderRadius: "50%" }}
//             />
//           )}
//         </button>

//         {dropdownMenu && !user && (
//           <div className="navbar_right_accountmenu">
//             <Link to="/login">Log In</Link>
//             <Link to="/register">Sign Up</Link>
//           </div>
//         )}

//         {dropdownMenu && user && (
//           <div className="navbar_right_accountmenu">
//             <Link to={`/${user._id}/trips`}>Trip List</Link>
//             <Link to={`/${user._id}/wishList`}>Wish List</Link>
//             <Link to={`/${user._id}/properties`}>Property List</Link>
//             <Link to={`/${user._id}/reservations`}>Reservation List</Link>
//             <Link to="/create-listing">Become A Host</Link>

//             <Link
//               to="/login"
//               onClick={() => {
//                 dispatch(setLogout());
//               }}
//             >
//               Log Out
//             </Link>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;
///////////////////////////////////////////////

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Search, Person, Menu } from "@mui/icons-material";
import "../styles/Navbar.scss";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase";

const Navbar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        setUser(user);
      } else {
        // No user is signed in.
        setUser(null);
      }
    });

    // Cleanup function
    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    try {
      // Perform logout logic here
      // For example, if using Firebase Auth:
      // await auth.signOut();
      setUser(null); // Update the user state
      navigate("/"); // Redirect to login page after logout
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
     
    <div className="navbar">
      <div className="navbar_search">
        <input
          type="text"
          placeholder="Search ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton disabled={search === ""}>
          <Search
            onClick={() => {
              navigate("/properties/search/:search");
            }}
          />
        </IconButton>
      </div>

      <div className="navbar_right">
        <Link to="/create-listing" className="host">
          Become A Host
        </Link>

        <button
          className="navbar_right_account"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        >
          <Menu />
          {!user ? <Person /> : <span>{user.email}</span>}
        </button>

        {dropdownMenu && (
          <div className="navbar_right_accountmenu">
            {user ? (
              <>
             <Link to="/userId/trips">Trip List</Link>
             <Link to="/userId/wishList">Wish List</Link>
             <Link to="/userId/properties">Property List</Link>
             <Link to={user ? `/${user.uid.trim()}/reservations` : "/"}>Reservation List</Link>
             <Link to="/create-listing">Become A Host</Link>
             <Link to="/login" onClick={handleLogout}>
               Log Out</Link>
              </>
            ) : (
              <>
                <Link to="/login">Log In</Link>
                <Link to="/register">Sign Up</Link>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;




