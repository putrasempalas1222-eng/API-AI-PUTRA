export default async function handler(req, res) {
  const API_KEY = "PUTRA_SECRET_123";

  // ambil header (fix semua kemungkinan)
  const clientKey =
    req.headers["x-api-key"] ||
    req.headers["X-API-KEY"] ||
    req.headers["x-api-Key"];

  if (clientKey !== API_KEY) {
    return res.status(403).json({
      error: "Forbidden - API KEY salah",
      yourKey: clientKey
    });
  }

  try {
    const response = await fetch("https://us-central1-conquer-apps-2ad61.cloudfunctions.net/prod/api.live", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
