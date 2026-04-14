export default async function handler(req, res) {
  const API_KEY = "PUTRA_SECRET_123";

  // ambil semua kemungkinan header
  const clientKey =
    req.headers["x-api-key"] ||
    req.headers["authorization"] ||
    req.headers["apikey"];

  console.log("HEADERS:", req.headers);
  console.log("KEY TERBACA:", clientKey);

  if (!clientKey || clientKey.trim() !== API_KEY) {
    return res.status(403).json({
      error: "API key tidak valid",
      received: clientKey
    });
  }

  try {
    const response = await fetch(
      "https://us-central1-conquer-apps-2ad61.cloudfunctions.net/prod/api.live",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      }
    );

    const data = await response.json();
    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
