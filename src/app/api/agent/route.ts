import { NextRequest, NextResponse } from 'next/server';

// POST /api/agent
// Body: { question: string, history: Session[] }
// Returns: { reply: string }

interface Exercise {
  name: string;
  sets: string;
  reps: string;
  kg: string;
}

interface Session {
  dayLabel: string;
  date: string;
  exercises: Exercise[];
  rating?: number;
  notes?: string;
}

interface AgentRequestBody {
  question: string;
  history?: Session[];
}

const SPLIT = [
  'Day 1: Chest + Tris',
  'Day 2: Back + Bis',
  'Day 3: Shoulders',
  'Day 4: Bis + Tris',
  'Day 5: Legs',
];

function buildSystemPrompt(history: Session[]): string {
  const recentText = history.length
    ? history
        .slice(-6)
        .map(
          (s) =>
            `${s.dayLabel} (${s.date}): ` +
            s.exercises.map((e) => `${e.name} ${e.sets}×${e.reps} @${e.kg}kg`).join(', ') +
            ` | Feel: ${['', 'Brutal', 'OK', 'Great'][s.rating ?? 0] ?? '?'}` +
            ` | Notes: ${s.notes || 'none'}`,
        )
        .join('\n')
    : 'No previous sessions logged yet.';

  return `You are a concise, knowledgeable hypertrophy-focused personal training coach inside the AM-GYM app.

Athlete profile:
- Goal: Build muscle (hypertrophy)
- Training 5 days/week
- Split: ${SPLIT.join(', ')}

Recent session history:
${recentText}

Rules:
- Keep responses practical and short — 3 to 6 bullet points max
- Reference their actual logged weights, sets, and reps when relevant
- Focus on progressive overload, muscle recovery, and technique
- No generic filler — every point must be actionable
- Respond in the same language the athlete uses (Arabic or English)`;
}

export async function POST(request: NextRequest) {
  try {
    const body: AgentRequestBody = await request.json();
    const { question, history = [] } = body;

    if (!question?.trim()) {
      return NextResponse.json({ error: 'Missing question' }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'ANTHROPIC_API_KEY not set in environment variables.' },
        { status: 500 },
      );
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1000,
        system: buildSystemPrompt(history),
        messages: [{ role: 'user', content: question }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error?.message ?? `Anthropic API error ${response.status}` },
        { status: response.status },
      );
    }

    const reply =
      data.content?.find((b: { type: string }) => b.type === 'text')?.text ?? 'No response.';

    return NextResponse.json({ reply });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
