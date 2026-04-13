export default async function handler(req, res) {
  try {
    const response = await fetch("https://us-central1-conquer-apps-2ad61.cloudfunctions.net/prod/api.live", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
}
