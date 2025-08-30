const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "shruti@123",
    database: "quiz_app1"
});

db.connect(err => {
    if (err) {
        console.log("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL database");
    }
});

// ✅ API 1: Fetch categories
app.get('/categories', (req, res) => {
    db.query('SELECT * FROM categories1', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// ✅ API 2: Fetch questions by category
app.get('/questions/:category_id', (req, res) => {
    const categoryId = req.params.category_id;
    db.query('SELECT * FROM questions1 WHERE category_id = ?', [categoryId], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// ✅ SIGNUP API
app.post("/signup", (req, res) => {
    const { name, email, password } = req.body;
    console.log("📩 Signup request received:", req.body);

    if (!name || !email || !password || name.trim() === "" || email.trim() === "" || password.trim() === "") {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const checkSql = "SELECT id FROM users1 WHERE email = ?";
    db.query(checkSql, [email], (err, results) => {
        if (err) return res.status(500).json({ success: false, message: "Database error" });
        if (results.length > 0) {
            return res.json({ success: false, message: "User already exists with this email" });
        }

        const sql = "INSERT INTO users1 (name, email, password) VALUES (?, ?, ?)";
        db.query(sql, [name, email, password], (err, result) => {
            if (err) return res.status(500).json({ success: false, message: "Error creating user" });
            res.json({ success: true, message: "User registered successfully!" });
        });
    });
});

// ✅ LOGIN API
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const sql = "SELECT id, name, email FROM users1 WHERE email = ? AND password = ?";
    db.query(sql, [email, password], (err, results) => {
        if (err) return res.status(500).json({ success: false, message: "Server error" });
        if (results.length > 0) {
            res.json({ success: true, message: "Login successful", user: results[0] });
        } else {
            res.json({ success: false, message: "Invalid email or password" });
        }
    });
});

// ✅ SAVE SCORE
app.post("/scores", (req, res) => {
  console.log("📩 /scores payload:", req.body);

  const { user_id, category_id, score, total_questions } = req.body;
  const sql = `
    INSERT INTO scores (user_id, category_id, score, total_questions, created_at)
    VALUES (?, ?, ?, ?, NOW())
  `;

  db.query(sql, [user_id, category_id, score, total_questions], (err, result) => {
    if (err) {
      console.error("❌ Error inserting score:", err);
      return res.status(500).json({ success: false, message: "Failed to save score", error: err });
    }
    console.log("✅ Inserted score id:", result.insertId);
    res.status(201).json({ success: true, id: result.insertId });
  });
});

// ✅ GET ALL SCORES (for testing or "Scores" page)
app.get("/scores", (req, res) => {
  const sql = `
    SELECT s.id, s.score, s.total_questions, s.created_at,
           u.name AS user_name,
           c.name AS category_name
    FROM scores s
    JOIN users1 u ON u.id = s.user_id
    JOIN categories1 c ON c.id = s.category_id
    ORDER BY s.created_at DESC
  `;

  db.query(sql, (err, rows) => {
    if (err) {
      console.error("❌ Error fetching all scores:", err);
      return res.status(500).json({ success: false, message: "Failed to fetch scores" });
    }
    console.log("📤 /scores -> rows:", rows.length);
    res.json(rows);
  });
});

// ✅ GET USER SCORE HISTORY
app.get('/scores/user/:userId', (req, res) => {
  const { userId } = req.params;
  const sql = `
    SELECT s.id, s.score, s.total_questions, s.created_at,
           c.name AS category_name
    FROM scores s
    JOIN categories1 c ON c.id = s.category_id
    WHERE s.user_id = ?
    ORDER BY s.created_at DESC
  `;
  db.query(sql, [userId], (err, rows) => {
    if (err) {
      console.error("❌ Error fetching scores:", err);
      return res.status(500).json({ success: false, message: "Failed to fetch scores" });
    }
    console.log("📤 /scores/user -> rows:", rows.length);
    res.json(rows);
  });
});

// ✅ GET HIGHEST SCORES PER CATEGORY
app.get("/highscores", (req, res) => {
  const sql = `
    SELECT c.name AS category, MAX(s.score) AS highest_score, MAX(s.total_questions) AS total_questions
    FROM scores s
    JOIN categories1 c ON s.category_id = c.id
    GROUP BY c.id
    ORDER BY c.id;
  `;
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching high scores:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(result);
  });
});

// ✅ Start server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
