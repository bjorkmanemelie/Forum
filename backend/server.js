
const express = require("express");
const cors = require("cors");
const threadRoutes = require("./routes/threads");
const replyRoutes = require("./routes/replies");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware (kind of a software)
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/threads", threadRoutes);
app.use("/api/replies", replyRoutes);

// Starta servern
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
