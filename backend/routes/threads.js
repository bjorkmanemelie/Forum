
const express = require("express");
const router = express.Router();
const db = require("../db/db");

// Hämta alla trådar
router.get("/", (req, res) => {
  try {
    const threads = db
      .prepare("SELECT * FROM threads ORDER BY created_at DESC")
      .all();
    res.json(threads);
    //Körs om allt går bra
  } catch (error) {
    //Körs om nått går fel
    res.status(500).json({ error: error.message });
  }
});

// Hämta en specifik tråd med dess svar
router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;

    // Hämta tråden
    const thread = db.prepare("SELECT * FROM threads WHERE id = ?").get(id);

    if (!thread) {
      return res.status(404).json({ error: "Tråden kunde inte hittas" });
    }

    // Hämta alla svar till tråden
    const replies = db
      .prepare(
        "SELECT * FROM replies WHERE thread_id = ? ORDER BY created_at ASC"
      )
      .all(id);

    res.json({ thread, replies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Skapa en ny tråd
router.post("/", (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Titel och innehåll krävs" });
    }

    const result = db
      .prepare("INSERT INTO threads (title, content) VALUES (?, ?)")
      .run(title, content);

    const newThread = db
      .prepare("SELECT * FROM threads WHERE id = ?")
      .get(result.lastInsertRowid);

    res.status(201).json(newThread);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Skapa ett svar på en tråd
router.post("/:id/replies", (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: "Innehåll krävs" }); //Skrivs ut om man ej fyller i något
    }

    // Kontrollera att tråden finns
    const thread = db.prepare("SELECT * FROM threads WHERE id = ?").get(id);

    if (!thread) {
      return res.status(404).json({ error: "Tråden kunde inte hittas" });
    }

    const result = db
      .prepare("INSERT INTO replies (thread_id, content) VALUES (?, ?)")
      .run(id, content);

    const newReply = db
      .prepare("SELECT * FROM replies WHERE id = ?")
      .get(result.lastInsertRowid);

    res.status(201).json(newReply);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
