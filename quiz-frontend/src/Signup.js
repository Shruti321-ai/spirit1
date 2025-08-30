import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("⚠️ Please fill in all fields before signing up.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/signup", {
        name,
        email,
        password,
      });

      if (res.data.success) {
        alert(res.data.message || "🎉 Sign Up Successful!");
        navigate("/"); // ✅ back to StartPage
      } else {
        alert(res.data.message || "Signup failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error signing up. Please try again.");
    }
  };

  // ✅ Styles
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "#fff",
      fontFamily: "'Poppins', sans-serif",
      position: "relative",
      overflow: "hidden",
    },
    box: {
      background: "#fff",
      padding: "2.5rem",
      borderRadius: "20px",
      boxShadow: "0px 6px 18px rgba(0,0,0,0.1)",
      textAlign: "center",
      width: "350px",
      zIndex: 2,
    },
    heading: {
      marginBottom: "1.5rem",
      fontSize: "1.8rem",
      color: "#222",
    },
    input: {
      width: "100%",
      padding: "12px",
      margin: "10px 0",
      borderRadius: "10px",
      border: "1px solid #ddd",
      outline: "none",
      fontSize: "1rem",
      transition: "0.3s",
    },
    button: {
      width: "100%",
      background: "#ff4f5a",
      color: "#fff",
      padding: "12px",
      marginTop: "15px",
      border: "none",
      borderRadius: "30px",
      fontSize: "1rem",
      cursor: "pointer",
      transition: "0.3s",
    },
    sticker: {
      position: "absolute",
      fontSize: "2rem",
      opacity: 0.9,
    },
  };

  // Stickers positions
  const stickers = [
    { emoji: "🎉", top: "10%", left: "15%" },
    { emoji: "🚀", top: "20%", right: "20%" },
    { emoji: "⭐", bottom: "15%", left: "10%" },
    { emoji: "🎵", bottom: "20%", right: "25%" },
    { emoji: "📚", top: "30%", left: "70%" },
    { emoji: "🔥", bottom: "10%", right: "15%" },
  ];

  return (
    <div style={styles.container}>
      {/* Floating Stickers */}
      {stickers.map((s, i) => (
        <span
          key={i}
          style={{ ...styles.sticker, ...s }}
        >
          {s.emoji}
        </span>
      ))}

      {/* Signup Box */}
      <div style={styles.box}>
        <h2 style={styles.heading}>Sign Up 🚀</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) =>
              (e.currentTarget.style.background = "#ff2a39")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.background = "#ff4f5a")
            }
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
