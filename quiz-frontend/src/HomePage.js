import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => {
        console.error(err);
        alert("Could not load categories");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <p style={{ textAlign: "center", color: "#333", marginTop: 50 }}>
        Loading categories...
      </p>
    );

  // 🎨 Custom colors for each category
  const categoryColors = {
    HTML: "#E34F26",
    CSS: "#2965f1",
    JavaScript: "#f0db4f",
    SQL: "#00758F",
  };

  // 🟢 Stable emoji icons instead of logos
  const categoryEmojis = {
    HTML: "🌐",
    CSS: "🎨",
    JavaScript: "⚡",
    SQL: "🗄️",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
        backgroundImage: `url("/quiz-bg.png")`, // ✅ optional, can remove
        backgroundRepeat: "repeat",
        backgroundSize: "250px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "#333",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "40px", marginBottom: 10 }}>WELCOME TO QUIZZ 🎉</h1>
      <h3 style={{ marginBottom: 5 }}>Let’s Test Your Knowledge</h3>
      <p style={{ marginBottom: 30, fontSize: 18 }}>
        Select a Category and Start a Quiz
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 20,
          maxWidth: "900px",
        }}
      >
        {categories.map((c) => {
          const color = categoryColors[c.name] || "#888";
          const emoji = categoryEmojis[c.name] || "❓";

          return (
            <div
              key={c.id}
              onClick={() =>
                navigate(`/quiz/${c.id}`, { state: { categoryName: c.name } })
              }
              style={{
                backgroundColor: "#fff",
                border: `3px solid ${color}`,
                color: "#333",
                padding: "20px 25px",
                borderRadius: "16px",
                cursor: "pointer",
                fontSize: "20px",
                fontWeight: "bold",
                minWidth: "160px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-7px)";
                e.currentTarget.style.boxShadow =
                  "0 15px 30px rgba(0,0,0,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 8px 20px rgba(0,0,0,0.15)";
              }}
            >
              <span style={{ fontSize: 50, marginBottom: 10 }}>{emoji}</span>
              {c.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;
