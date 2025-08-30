export default function GuidePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #89f7fe, #66a6ff)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #ffffff, #f9f9f9)",
          padding: "40px 50px",
          borderRadius: "20px",
          boxShadow: "8px 8px 0px #007bff, -8px -8px 0px #66a6ff", // ✅ Sticker shadow (same as StartPage)
          maxWidth: "650px",
          textAlign: "center",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.03)";
          e.currentTarget.style.boxShadow =
            "12px 12px 0px #007bff, -12px -12px 0px #66a6ff"; // stronger shadow on hover
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow =
            "8px 8px 0px #007bff, -8px -8px 0px #66a6ff"; // reset to normal sticker shadow
        }}
      >
        <h2
          style={{
            fontSize: "28px",
            marginBottom: "15px",
            color: "#222",
            fontWeight: "700",
          }}
        >
          📘 Quiz Guide
        </h2>

        <p style={{ fontSize: "16px", marginBottom: "20px", color: "#444" }}>
          Welcome to the Quiz App! Follow these steps:
        </p>

        <ol
          style={{
            textAlign: "left",
            fontSize: "16px",
            lineHeight: "1.8",
            margin: "0 auto 20px",
            maxWidth: "450px",
            color: "#333",
          }}
        >
          <li>Choose a quiz category.</li>
          <li>Answer all questions carefully.</li>
          <li>
            Click <b>"Submit"</b> to see your score.
          </li>
          <li>
            Check <b>"My Scores"</b> to track your progress.
          </li>
        </ol>

        <button
          onClick={() => window.history.back()}
          style={{
            marginTop: "10px",
            padding: "10px 25px",
            fontSize: "16px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            transition: "0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.background = "#0056b3")}
          onMouseOut={(e) => (e.target.style.background = "#007bff")}
        >
          ⬅ Back
        </button>
      </div>
    </div>
  );
}
