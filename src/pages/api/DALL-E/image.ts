import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req: any, res: any) {
    try {
        let body = req.body;
        console.log(body, 'body');
        const { prompt } = body || {};
        console.log(prompt, 'prompt');

        const response = await openai.createImage({
            prompt,
            n: 1,
            size: "1024x1024",
        });

        console.log(`Response: ${JSON.stringify(response.data.data[0].url)}}`);

        res.status(200).json({
            image: response.data.data[0].url,
        });
    } catch (e: any) {
        console.log(`Failed to create Pokémon image: ${e.message}`);
        res.status(500).json({
            error: e.message,
        });
    }
}
