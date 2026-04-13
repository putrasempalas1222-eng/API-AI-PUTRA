export default async function handler(req, res) {
  const apiKey = req.headers["x-api-key"];

  if (apiKey !== "APIKEY123") {
    return res.status(403).json({ error: "API key tidak valid" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method tidak diizinkan" });
  }

  try {
    // 🔥 FIX BODY (ini penting)
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const response = await fetch(
      "https://us-central1-conquer-apps-2ad61.cloudfunctions.net/prod/api.live",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      error: "Server error",
      detail: err.message
    });
  }
}
