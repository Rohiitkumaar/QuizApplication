import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());

const API_URL = "https://api.jsonserve.com/Uw5CrX";

app.get("/api/quiz", async (req, res) => {
  try {
    const response = await axios.get(API_URL);
    res.json(response.data.questions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch quiz data" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
