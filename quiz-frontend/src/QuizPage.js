import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";

function QuizPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const categoryName = location.state?.categoryName || "Quiz";

  const [questions, setQuestions] = useState([]);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/questions/${categoryId}`)
      .then((res) => setQuestions(res.data))
      .catch((err) => {
        console.error(err);
        alert("Could not load questions");
      })
      .finally(() => setLoading(false));
  }, [categoryId]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading questions...</p>;
  if (questions.length === 0) return <p style={{ textAlign: "center" }}>No questions found.</p>;

  const q = questions[idx];

  const select = (letter) => {
    setAnswers((prev) => ({ ...prev, [q.id]: letter }));
  };

  const next = () => {
    if (idx < questions.length - 1) {
      setIdx(idx + 1);
    } else {
      // ✅ Calculate score
      let score = 0;
      questions.forEach((qq) => {
        if (answers[qq.id] === qq.correct_option) score += 1;
      });

      // ✅ Save score in DB
      axios
        .post("http://localhost:5000/scores", {
          user_id: 1, // later replace with logged-in user id
          category_id: categoryId,
          score: score,
          total_questions: questions.length,
        })
        .then((res) => {
          console.log("Score saved:", res.data);
        })
        .catch((err) => {
          console.error("Error saving score:", err);
        });

      // ✅ Navigate to result page with full info
      navigate("/result", {
        state: {
          score,
          total: questions.length,
          categoryId, // Pass ID also
          categoryName,
        },
      });
    }
  };

  const selected = answers[q.id];

  return (
    <div style={{ maxWidth: 700, margin: "30px auto", padding: 16 }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>{categoryName} Quiz</h2>
      <p style={{ textAlign: "center", marginBottom: "20px" }}>
        Question {idx + 1} of {questions.length}
      </p>

      {/* Question Card with Stickers */}
      <div
        style={{
          position: "relative",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "12px",
          background: "#fff",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          marginBottom: "20px",
          overflow: "hidden",
        }}
      >
        {/* Stickers */}
        <span style={{ position: "absolute", top: "10px", left: "10px", fontSize: "28px", opacity: 0.2 }}>🎯</span>
        <span style={{ position: "absolute", top: "10px", right: "10px", fontSize: "28px", opacity: 0.2 }}>💡</span>
        <span style={{ position: "absolute", bottom: "10px", left: "10px", fontSize: "28px", opacity: 0.2 }}>🤔</span>
        <span style={{ position: "absolute", bottom: "10px", right: "10px", fontSize: "28px", opacity: 0.2 }}>📚</span>

        {/* Question Text */}
        <p
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            marginBottom: "16px",
            position: "relative",
            zIndex: 1,
          }}
        >
          {q.question}
        </p>

        {/* Options */}
        {[
          { letter: "A", text: q.option_a },
          { letter: "B", text: q.option_b },
          { letter: "C", text: q.option_c },
          { letter: "D", text: q.option_d },
        ].map((opt) => (
          <label
            key={opt.letter}
            style={{
              display: "block",
              padding: "10px 15px",
              margin: "10px 0",
              border: selected === opt.letter ? "2px solid #4CAF50" : "1px solid #ccc",
              borderRadius: "8px",
              cursor: "pointer",
              background: selected === opt.letter ? "#e8f5e9" : "#fafafa",
              transition: "0.3s",
              position: "relative",
              zIndex: 1,
            }}
          >
            <input
              type="radio"
              name={`q-${q.id}`}
              value={opt.letter}
              checked={selected === opt.letter}
              onChange={() => select(opt.letter)}
              style={{ marginRight: 10 }}
            />
            <strong>{opt.letter}.</strong> {opt.text}
          </label>
        ))}
      </div>

      {/* Buttons */}
      <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between" }}>
        <button
          onClick={() => setIdx(Math.max(0, idx - 1))}
          disabled={idx === 0}
          style={{
            padding: "8px 16px",
            border: "none",
            borderRadius: "8px",
            background: "#f0f0f0",
            cursor: idx === 0 ? "not-allowed" : "pointer",
          }}
        >
          Previous
        </button>

        <button
          onClick={next}
          disabled={!selected}
          style={{
            padding: "8px 16px",
            border: "none",
            borderRadius: "8px",
            background: selected ? "#4CAF50" : "#ccc",
            color: "#fff",
            cursor: selected ? "pointer" : "not-allowed",
          }}
        >
          {idx === questions.length - 1 ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
}

export default QuizPage;
