async function kirimPesan(pesan) {
  const res = await fetch("https://punya-kamu.vercel.app/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      n: 1,
      prompt: `Kamu adalah Putra Bot 🤖...

User: ${pesan}
AI:`,
      temperature: 0.7,
      top_p: 0.9
    })
  });

  const data = await res.json();
  return data;
}

// contoh pakai
kirimPesan("Halo bro").then(res => {
  console.log(res);
});
