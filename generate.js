import OpenAI from "openai";

export default async function handler(req, res) {
  if(req.method !== "POST"){
    return res.status(405).json({error:"Metodo non consentito"});
  }

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const { prompt } = req.body;

    const result = await openai.images.generate({
      model:"gpt-image-1",
      prompt:prompt,
      size:"512x512"
    });

    res.status(200).json({ image: result.data[0].url });
  } catch (err) {
    console.error(err);
    res.status(500).json({error:"Errore generazione immagine"});
  }
}
