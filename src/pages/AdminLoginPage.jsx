import React, { useState } from "react";
import "../styles/Login.scss";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";

const auth = getAuth(app);

const AdminLoginPage = () => {
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

      localStorage.setItem("admin", JSON.stringify({ uid: user.uid, email: user.email }));
      localStorage.setItem("adminToken", idToken);

      // Redirect or navigate to the admin page
      navigate("/admin");
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
            placeholder="Admin ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">ADMIN LOG IN</button>
        </form>
        <p>{error}</p>
      </div>
    </div>
  );
};

export default AdminLoginPage;
