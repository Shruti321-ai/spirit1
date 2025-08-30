import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Confetti from "react-confetti";

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total, categoryName, categoryId } = location.state || {};

  const [recentScores, setRecentScores] = useState([]);
  const [showPopup, setShowPopup] = useState(true);
  const [showConfetti, setShowConfetti] = useState(true);
  const [scoreSaved, setScoreSaved] = useState(false); // ✅ prevent duplicates
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;

    const fetchScores = () => {
      axios
        .get(`http://localhost:5000/scores/user/${user.id}`)
        .then((res) => setRecentScores(res.data))
        .catch((err) => console.error(err));
    };

    // ✅ Save score only once
    if (!scoreSaved && score !== undefined && total !== undefined && categoryId !== undefined) {
      axios
        .post("http://localhost:5000/scores", {
          user_id: user.id,
          category_id: categoryId,
          score: score,
          total_questions: total,
        })
        .then(() => {
          setScoreSaved(true); // mark as saved
          fetchScores();
        })
        .catch((err) => console.error(err));
    } else {
      fetchScores();
    }

    // auto close popup + confetti after 5s
    const timer = setTimeout(() => {
      setShowPopup(false);
      setShowConfetti(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [score, total, categoryId, user, scoreSaved]); // 👈 added flag

  const percentage = total ? Math.round((score / total) * 100) : 0;

  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      {/* 🎉 Falling Confetti */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
        />
      )}

      {/* Popup celebration */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            padding: "30px 40px",
            borderRadius: 16,
            boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
            textAlign: "center",
            zIndex: 999,
            fontSize: 22,
            fontWeight: "bold",
          }}
        >
          {percentage >= 70 ? "🎉 Great Job! 🎊" : "🤔 You can do better! 💪"}
        </div>
      )}

      {/* Main content card */}
      <div
        style={{
          maxWidth: 700,
          margin: "40px auto",
          padding: 24,
          borderRadius: 12,
          background: "#f9fafb",
          position: "relative",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          zIndex: 1,
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>
          {categoryName || "Quiz"} – Result
        </h2>

        {/* Score Card */}
        {score !== undefined && total !== undefined ? (
          <div
            style={{
              textAlign: "center",
              padding: "30px 20px",
              borderRadius: 16,
              background: "linear-gradient(135deg, #6EE7B7, #3B82F6)",
              color: "white",
              fontSize: 22,
              fontWeight: "bold",
              marginBottom: 24,
              boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
            }}
          >
            You scored <br />
            <span style={{ fontSize: 40 }}>{score}</span> / {total}
            <div
              style={{
                marginTop: 10,
                height: 12,
                width: "100%",
                background: "rgba(255,255,255,0.3)",
                borderRadius: 6,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${percentage}%`,
                  background: "white",
                  borderRadius: 6,
                }}
              ></div>
            </div>
            <p style={{ marginTop: 6 }}>{percentage}%</p>
          </div>
        ) : (
          <p style={{ textAlign: "center" }}>No result to show.</p>
        )}

        {/* Back Button */}
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <button
            onClick={() => navigate("/")}
            style={{
              background: "#3B82F6",
              color: "white",
              border: "none",
              padding: "10px 18px",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            ⬅ Back to Home
          </button>
        </div>

        {/* Recent Scores */}
        <h3 style={{ marginBottom: 10 }}>📊 My Recent Scores</h3>
        {recentScores.length === 0 ? (
          <p>No scores yet.</p>
        ) : (
          <div style={{ display: "grid", gap: 12 }}>
            {recentScores.slice(0, 5).map((s) => (
              <div
                key={s.id}
                style={{
                  padding: "12px 16px",
                  borderRadius: 10,
                  background: "#fff",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                }}
              >
                <b>{s.category_name || "Unknown Category"}</b>
                <br />
                Score: {s.score}/{s.total_questions}
                <br />
                <small style={{ color: "#555" }}>
                  {new Date(s.created_at).toLocaleString()}
                </small>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultPage;
