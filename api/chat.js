export default async function handler(req, res) {
  // hanya izinkan POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // ambil body dari user
    const body = req.body;

    // kirim ke API asli kamu
    const response = await fetch("https://us-central1-conquer-apps-2ad61.cloudfunctions.net/prod/api.live", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    // kirim balik ke user
    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({
      error: "Proxy error",
      detail: error.message
    });
  }
}
