const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const users = {
  "APIKEY123": { limit: 30, used: 0 },
};

app.post("/chat", async (req, res) => {
  const apiKey = req.headers["x-api-key"];

  if (!users[apiKey]) {
    return res.status(403).json({ error: "API key tidak valid" });
  }

  if (users[apiKey].used >= users[apiKey].limit) {
    return res.status(429).json({ error: "Limit habis" });
  }

  try {
    users[apiKey].used++;

    const response = await axios.post(
      "https://us-central1-conquer-apps-2ad61.cloudfunctions.net/prod/api.live",
      req.body
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server jalan"));
