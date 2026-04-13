export default async function handler(req, res) {
  // ✅ hanya POST
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method tidak diizinkan"
    });
  }

  // 🔐 API KEY
  const apiKey = req.headers["x-api-key"];
  if (apiKey !== "APIKEY123") {
    return res.status(403).json({
      error: "API key tidak valid"
    });
  }

  try {
    // 🔥 parsing body (fix n8n)
    let body;
    try {
      body =
        typeof req.body === "string"
          ? JSON.parse(req.body)
          : req.body;
    } catch {
      body = {};
    }

    const message = body?.message || "halo";

    // 🔗 REQUEST KE API ASLI
    const response = await fetch(
      "https://us-central1-conquer-apps-2ad61.cloudfunctions.net/prod/api.live",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt: message
        })
      }
    );

    let data;
    try {
      data = await response.json();
    } catch {
      data = { error: "Response bukan JSON" };
    }

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
