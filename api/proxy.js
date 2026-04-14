export default async function handler(req, res) {
  // Hanya izinkan metode POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Ambil data dari Environment Variables
  const TARGET_URL = process.env.TARGET_EXTERNAL_API;
  const SECRET_KEY = process.env.MY_PROXY_SECRET_KEY;

  // Validasi: Cek apakah API Key dari Frontend (Header) cocok
  const clientApiKey = req.headers["x-api-key"];

  if (!clientApiKey || clientApiKey !== SECRET_KEY) {
    return res.status(401).json({ error: "Unauthorized: API Key salah atau tidak ada." });
  }

  try {
    const response = await fetch(TARGET_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    
    // Kirim hasil kembali ke Frontend
    return res.status(response.status).json(data);

  } catch (err) {
    return res.status(500).json({
      error: "Proxy error",
      detail: err.message,
    });
  }
}
