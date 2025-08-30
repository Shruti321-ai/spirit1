import React from "react";
import { useNavigate } from "react-router-dom";

export default function StartPage() {
  const navigate = useNavigate();

  // ✅ Navigate to pages
  const handleGuide = () => navigate("/guide");  
  const handleLogin = () => navigate("/login");
  const handleSignUp = () => navigate("/signup");

  return (
    <div style={styles.container}>
      {/* Top Right Buttons */}
      <div style={styles.topRight}>
        <button style={styles.navButton} onClick={handleGuide}>Guide</button>
        <button style={styles.navButton} onClick={handleSignUp}>Sign Up</button>
        <button style={styles.navButton} onClick={handleLogin}>Login</button>
      </div>

      {/* Floating Stickers */}
      <div style={{ ...styles.sticker, top: "10%", left: "15%" }}>🎉</div>
      <div style={{ ...styles.sticker, top: "20%", right: "20%" }}>🚀</div>
      <div style={{ ...styles.sticker, bottom: "15%", left: "25%" }}>✨</div>
      <div style={{ ...styles.sticker, bottom: "20%", right: "15%" }}>📚</div>
      <div style={{ ...styles.sticker, top: "50%", left: "5%" }}>🎯</div>
      <div style={{ ...styles.sticker, top: "30%", left: "40%" }}>💡</div>
      <div style={{ ...styles.sticker, bottom: "40%", right: "30%" }}>🤖</div>
      <div style={{ ...styles.sticker, top: "70%", left: "60%" }}>🎵</div>
      <div style={{ ...styles.sticker, top: "15%", right: "10%" }}>🔥</div>
      <div style={{ ...styles.sticker, bottom: "10%", left: "10%" }}>🍕</div>
      <div style={{ ...styles.sticker, top: "60%", right: "5%" }}>⚡</div>
      <div style={{ ...styles.sticker, top: "80%", left: "50%" }}>⭐</div>

      {/* Center Content */}
      <div style={styles.content}>
        <h1 style={styles.title}>
          QUIZZZ <span>🥳</span>
        </h1>
        <p style={styles.subtitle}>Fun Stickers Everywhere 🎨 — Let’s Start!</p>
        <button style={styles.button} onClick={() => navigate("/home")}>
          🚀 Start Quiz
        </button>
      </div>
    </div>
  );
}

// Inline CSS
const styles = {
  container: {
    height: "100vh",
    width: "100%",
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Poppins', sans-serif",
  },
  topRight: {
    position: "absolute",
    top: "20px",
    right: "40px",
    display: "flex",
    gap: "15px",
    zIndex: 3,
  },
  navButton: {
    background: "#000",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "500",
    transition: "all 0.3s ease",
  },
  content: { textAlign: "center", zIndex: 2 },
  title: { fontSize: "3.5rem", fontWeight: "bold", color: "#333", marginBottom: "10px" },
  subtitle: { color: "#666", marginBottom: "25px" },
  button: {
    background: "linear-gradient(45deg, #ff416c, #ff4b2b)",
    color: "#fff",
    border: "none",
    padding: "15px 35px",
    borderRadius: "30px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "1.1rem",
    boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease",
  },
  sticker: {
    position: "absolute",
    fontSize: "2.5rem",
    animation: "float 6s infinite ease-in-out",
  },
};

// Animations
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-25px); }
  100% { transform: translateY(0px); }
}`, styleSheet.cssRules.length);

styleSheet.insertRule(`
button:hover {
  transform: scale(1.08);
  box-shadow: 0 8px 16px rgba(0,0,0,0.3);
}
`, styleSheet.cssRules.length);
