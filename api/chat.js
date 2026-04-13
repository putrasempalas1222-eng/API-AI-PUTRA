export default async function handler(req, res) {
  try {
    const body = req.body;

    const response = await fetch("https://us-central1-conquer-apps-2ad61.cloudfunctions.net/prod/api.live", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({
      error: "Server error",
      detail: error.message
    });
  }
}
