
import axios from 'axios';
import { type NextRequest, NextResponse } from 'next/server';
import { env } from '~/env';

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json() as { message: string };

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4', // Use 'gpt-3.5-turbo' if you have access to GPT-3.5
        messages: [
            { role: 'user', content: message },
            { role: 'system', content: 'Hey there, I\'m channeling my inner Mark Messier today, so we can chat over some tips and tricks for improving your hockey skills. We\'re going to focus on your strengths and what you can do to enhance them, as well as talking about some opportunities for improvement and how to tackle them, just like we used to do back with the NY Rangers. Let\'s lace up those skates and hit the ice  Please try and keep your responses short and easy to understand.' },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${env.OPENAI_API_KEY}`,
        },
      }
    );

    const responseObject = response.data as { choices: { message: { content: string } }[] };
    if (!responseObject.choices[0]) {
      return NextResponse.json({ error: 'No response from OpenAI' }, { status: 500 });
    }
    const chatResponse = responseObject.choices[0].message.content;

    // const chatResponse = (response.data.choices[0].message.content as string) || 'No response';

    return NextResponse.json({ response: chatResponse }, { status: 200 });
  } catch (error) {
    console.error('Error fetching OpenAI response:', error);
    return NextResponse.json({ error: 'Error fetching OpenAI response' }, { status: 500 });
  }
}