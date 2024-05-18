// import React, { useState } from "react";
// import "../styles/Login.scss";
// import { setLogin } from "../redux/state"; // Make sure this path is correct
// import { useDispatch } from "react-redux"; // Import useDispatch
// import { useNavigate } from "react-router-dom"; // Import useNavigate



// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch("http://localhost:3001/auth/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({ email, password })
  //     });

  //     const loggedIn = await response.json();

  //     if (loggedIn) {
  //       dispatch(setLogin({
  //         user: loggedIn.user,
  //         token: loggedIn.token
  //       }));
  //       navigate("/");
  //     }
  //   } catch (err) {
  //     console.log("Login failed", err.message);
  //   }
  // };

//   return (
//     <div className="login">
//       <div className="content">
//         <form className="form" onSubmit={handleSubmit}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button type="submit">LOG IN</button>
//         </form>
//         <a href="/register">Don't have an account? Sign Up Here</a>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

//////////////////////////////////////////////////////////////////////////////////

// import React, { useState } from "react";
// import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
// import { app } from "../firebase";
// import { useDispatch } from "react-redux";
// import { setLogin } from "../redux/state";
// import { useNavigate } from "react-router-dom";
// import "../styles/Login.scss";

// const auth = getAuth(app);

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   //const [isSignIn, setIsSignIn] = useState(true); // State to toggle between sign-in and sign-up

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   try {
//   //     if (isSignIn) {
//   //       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//   //       const user = userCredential.user;

//   //       // Handle successful sign-in
//   //       console.log("User signed in:", user.uid);
//   //       navigate("/");
//   //     } else {
//   //       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//   //       const user = userCredential.user;

//   //       // Handle successful sign-up
//   //       console.log("User signed up:", user.uid);
//   //       navigate("/login"); // Redirect to login page after sign-up
//   //     }
//   //   } catch (err) {
//   //     console.log("Authentication failed", err.message);
//   //   }
//   // };


//   const handleSubmit = () => {
//     signInWithEmailAndPassword(auth, email, password)
//       .then((value) => alert("SignIn Success"))
//       .catch((err) => alert("Incorrect email or password"));
//   };

//   return (
//     <div className="login">
//       <div className="content">
//         <form className="form" >
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           {/* <button onClick={handleSubmit}>{isSignIn ? "LOG IN" : "SIGN UP"}</button> */}
//           <button onClick={handleSubmit}>LOG IN</button>
//         </form>
//         {/* {isSignIn ? (
//           <p>
//             Don't have an account?{" "}
//             <span onClick={() => setIsSignIn(false)}>Sign Up Here</span>
//           </p>
//         ) : (
//           <p>
//             Already have an account?{" "}
//             <span onClick={() => setIsSignIn(true)}>Log In Here</span>
//           </p>
//         )} */}
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
//////////////////////////////////////////////////////////////////////////

// import React, { useState } from "react";
// import "../styles/Login.scss";
// import { setLogin } from "../redux/state";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:3001/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ email, password })
//       });

//       const loggedIn = await response.json();

//       if (loggedIn) {
//         // Dispatch the login action to update the Redux state
//         dispatch(setLogin({
//           user: loggedIn.user,
//           token: loggedIn.token
//         }));

//         // Redirect to the homepage
//         navigate("/");
//       }
//     } catch (err) {
//       console.log("Login failed", err.message);
//     }
//   };

//   return (
//     <div className="login">
//       <div className="content">
//         <form className="form" onSubmit={handleSubmit}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button type="submit">LOG IN</button>
//         </form>
//         <a href="/register">Don't have an account? Sign Up Here</a>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;



///////////////////////////////////////////////////////////////////////////

// components/LoginPage.js

// import React, { useState } from "react";
// import "../styles/Login.scss";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setLogin } from "../redux/state";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import { app } from "../firebase";

// const auth = getAuth(app);

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const user = userCredential.user;
//       console.log(user);
//       localStorage.setItem("user",user);
//       // Get the authentication token
//       const idToken = await user.getIdToken();
      
//       // Dispatch action to store user information including the token
//       dispatch(
//         setLogin({
//           uid: user.uid,
//           email: user.email,
//           token: idToken
//         })
//       );

//       // Redirect or navigate to the desired page
//       alert("SignIn Success");
//       navigate("/");
//     } catch (error) {
//       console.error("Login failed", error.message);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     handleLogin();
//   };

//   return (
//     <div className="login">
//       <div className="content">
//         <form className="form" onSubmit={handleSubmit}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button type="submit">LOG IN</button>
//         </form>
//         <Link to="/register">Don't have an account? Sign Up Here</Link>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
/////////////////////////////////////

import React, { useState } from "react";
import "../styles/Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";

const auth = getAuth(app);

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const idToken = await user.getIdToken();

      localStorage.setItem("user", JSON.stringify({ uid: user.uid, email: user.email }));
      localStorage.setItem("token", idToken);

      // Redirect or navigate to the desired page
      navigate("/");
    } catch (error) {
      console.error("Login failed", error.message);
      setError(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="login">
      <div className="content">
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">LOG IN</button>
        </form>
        <p>{error}</p>
        <Link to="/register">Don't have an account? Sign Up Here</Link>
      </div>
    </div>
  );
};

export default LoginPage;


