import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { keywords, style } = await request.json();

        if (!keywords) {
            return NextResponse.json({ error: 'Keywords are required' }, { status: 400 });
        }

        const apiKey = process.env.OPENROUTER_API_KEY || process.env.PROXY_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
        }

        const systemPrompt = `You are an expert prompt engineer for "Nano Banana Pro", a text-to-image AI model.
    Your goal is to generate detailed, artistic, and weird prompts based on the user's keywords and the selected style.
    
    Style: ${style === 'liminal' ? 'Liminal Space (Backrooms, empty, eerie, nostalgic, dreamcore)' : 'Brutalism (Concrete, heavy, monolithic, sharp structural edges, raw materials)'}
    
    Instructions:
    1. Expand the keywords into a rich visual description.
    2. Focus on lighting, texture, camera angles, and atmosphere.
    3. For Liminal: emphasized emptiness, fluorescent buzz, infinite transition zones.
    4. For Brutalism: emphasized concrete textures, massive scale, oppressive geometry.
    5. Return ONLY the prompt text, no explanations.
    `;

        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://nanobanana.com', // Optional, required by OpenRouter
                'X-Title': 'Nano Banana Generator',
            },
            body: JSON.stringify({
                "model": "openai/gpt-4o-mini",
                "messages": [
                    { "role": "system", "content": systemPrompt },
                    { "role": "user", "content": `Keywords: ${keywords}` }
                ]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('OpenRouter Error:', errorData);
            // Fallback or just return error
            return NextResponse.json({ error: 'Failed to generate prompt' }, { status: response.status });
        }

        const data = await response.json();
        const generatedText = data.choices[0]?.message?.content || 'No text generated.';

        return NextResponse.json({ prompt: generatedText });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
