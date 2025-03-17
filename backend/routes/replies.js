
const express = require("express");
const router = express.Router();
const db = require("../db/db");

// Hämta alla svar
router.get("/", (req, res) => {
  try {
    const replies = db
      .prepare("SELECT * FROM replies ORDER BY created_at ASC") //SQL Query vad den hämtar.
      .all();
    res.json(replies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Hämta ett specifikt svar. Detta är en GET request / endpoint
router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const reply = db.prepare("SELECT * FROM replies WHERE id = ?").get(id);

    if (!reply) {
      return res.status(404).json({ error: "Svaret kunde inte hittas" });
    }

    res.json(reply);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
