export default async function handler(req, res) {
  // 🔐 ambil API KEY
  const apiKey = req.headers["x-api-key"];

  if (apiKey !== "APIKEY123") {
    return res.status(403).json({
      error: "API key tidak valid"
    });
  }

  // hanya izinkan POST
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method tidak diizinkan"
    });
  }

  try {
    // 🔥 parsing body (fix untuk n8n)
    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body)
        : req.body;

    // validasi isi
    if (!body || !body.message) {
      return res.status(400).json({
        error: "Message wajib diisi"
      });
    }

    // 🔥 kirim ke API asli (DISINI YANG PENTING)
    const response = await fetch(
      "https://us-central1-conquer-apps-2ad61.cloudfunctions.net/prod/api.live",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        // ⚠️ SESUAIKAN FORMAT INI JIKA PERLU
        body: JSON.stringify({
          prompt: body.message
        }),
      }
    );

    // ambil response
    const data = await response.json();

    // kirim balik ke n8n
    return res.status(200).json({
      success: true,
      result: data
    });

  } catch (err) {
    return res.status(500).json({
      error: "Server error",
      detail: err.message
    });
  }
}
