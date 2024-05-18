// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/Register.scss";

// const RegisterPage = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     profileImage: null,
//   });

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData({
//       ...formData,
//       [name]: name === "profileImage" ? files[0] : value,
//     });
//   };

//   const [passwordMatch, setPasswordMatch] = useState(true);

//   useEffect(() => {
//     setPasswordMatch(
//       formData.password === formData.confirmPassword || formData.confirmPassword === ""
//     );
//   }, [formData.password, formData.confirmPassword]);

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const registerForm = new FormData();

//       for (const key in formData) {
//         registerForm.append(key, formData[key]);
//       }

//       const response = await fetch("http://localhost:3001/auth/register", {
//         method: "POST",
//         body: registerForm,
//       });

//       if (response.ok) {
//         navigate("/login");
//       }
//     } catch (err) {
//       console.log("Registration failed", err.message);
//     }
//   };

//   return (
//     <div className="register">
//       <div className="content">
//         <form className="form" onSubmit={handleSubmit}>
//           <input
//             placeholder="First Name"
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleChange}
//             required
//           />
//           <input
//             placeholder="Last Name"
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleChange}
//             required
//           />
//           <input
//             placeholder="Email"
//             name="email"
//             type="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//           <input
//             placeholder="Password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             type="password"
//             required
//           />
//           <input
//             placeholder="Confirm Password"
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             type="password"
//             required
//           />

//           {!passwordMatch && <p style={{ color: "red" }}>Passwords do not match!</p>}

//           <input
//             id="image"
//             type="file"
//             name="profileImage"
//             accept="image/*"
//             style={{ display: "none" }}
//             onChange={handleChange}
//           />
//           <label htmlFor="image">
//             <img src="/assets/addImage.png" alt="add profile photo" />
//             <p>Upload Your Photo</p>
//           </label>

//           {formData.profileImage && (
//             <img
//               src={URL.createObjectURL(formData.profileImage)}
//               alt="profile"
//               style={{ maxWidth: "80px" }}
//             />
//           )}
//           <button type="submit" disabled={!passwordMatch}>
//             REGISTER
//           </button>
//         </form>
//         <p>
//           <a href="/login">Already have an account? Log In Here</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;

//////////////////////////////////////////////////////////////////////////////////////////

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// //import firebase from "firebase/app";
// //import "firebase/auth";
// import "../styles/Register.scss";
// //import {auth } from ".././firebase";
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';


// const RegisterPage = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     profileImage: null,
//   });

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData({
//       ...formData,
//       [name]: name === "profileImage" ? files[0] : value,
//     });
//   };

//   const [passwordMatch, setPasswordMatch] = useState(true);

//   useEffect(() => {
//     setPasswordMatch(
//       formData.password === formData.confirmPassword || formData.confirmPassword === ""
//     );
//   }, [formData.password, formData.confirmPassword]);

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password);
      
//       // You can update user profile information if needed
      
//       navigate("/login");
//     } catch (err) {
//       console.log("Registration failed", err.message);
//       // Handle registration error
//     }
//   };

//   return (
//     <div className="register">
//       <div className="content">
//         <form className="form" onSubmit={handleSubmit}>
//           <input
//             placeholder="First Name"
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleChange}
//             required
//           />
//           <input
//             placeholder="Last Name"
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleChange}
//             required
//           />
//           <input
//             placeholder="Email"
//             name="email"
//             type="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//           <input
//             placeholder="Password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             type="password"
//             required
//           />
//           <input
//             placeholder="Confirm Password"
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             type="password"
//             required
//           />

//           {!passwordMatch && <p style={{ color: "red" }}>Passwords do not match!</p>}

//           <input
//             id="image"
//             type="file"
//             name="profileImage"
//             accept="image/*"
//             style={{ display: "none" }}
//             onChange={handleChange}
//           />
//           <label htmlFor="image">
//             <img src="/assets/addImage.png" alt="add profile photo" />
//             <p>Upload Your Photo</p>
//           </label>

//           {formData.profileImage && (
//             <img
//               src={URL.createObjectURL(formData.profileImage)}
//               alt="profile"
//               style={{ maxWidth: "80px" }}
//             />
//           )}
//           <button type="submit" disabled={!passwordMatch}>
//             REGISTER
//           </button>
//         </form>
//         <p>
//           <a href="/login">Already have an account? Log In Here</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;


///////////////////////////////////////////////////////////////////////////////////
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/Register.scss";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { app } from "../firebase";

// const auth = getAuth(app);

// const RegisterPage = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
//       const user = userCredential.user;
//       console.log("User registered:", user.uid);
//       // Redirect the user to the login page after successful registration
//       navigate("/login");
//     } catch (err) {
//       console.log("Registration failed", err.message);
//       // Handle registration error
//     }
//   };

//   return (
//     <div className="register">
//       <div className="content">
//         <form className="form" onSubmit={handleSubmit}>
//           <input
//             placeholder="Email"
//             name="email"
//             type="email"
//             value={formData.email}
//             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//             required
//           />
//           <input
//             placeholder="Password"
//             name="password"
//             value={formData.password}
//             onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//             type="password"
//             required
//           />
//           <button type="submit">REGISTER</button>
//         </form>
//         <p>
//           <a href="/login">Already have an account? Log In Here</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;

///////////////////////////////////////////////////////////////////////////////////////////

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../firebase";
import "../styles/Register.scss";

const auth = getAuth(app);
const db = getFirestore(app);

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
   // profileImage: null,
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Add additional user information to Firestore
      await addDoc(collection(db, "users"), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        // You need to store the image URL, not the file
        //profileImage: formData.profileImage,
      });

      console.log("User registered:", user.uid);

      // Redirect the user to the login page after successful registration
      navigate("/login");
    } catch (err) {
      console.log("Registration failed", err.message);
      // Handle registration error
    }
  };

  return (
    <div className="register">
      <div className="content">
        <form className="form" onSubmit={handleSubmit}>
          <input
            placeholder="First Name"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            required
          />
          <input
            placeholder="Last Name"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            required
          />
          <input
            placeholder="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            type="password"
            required
          />
          {/* Input for profile image upload */}
          {/* <input
            type="file"
            accept="image/*"
            onChange={(e) => setFormData({ ...formData, profileImage: e.target.files[0] })}
          /> */}
          <button type="submit">REGISTER</button>
        </form>
        <p>
          <a href="/login">Already have an account? Log In Here</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
