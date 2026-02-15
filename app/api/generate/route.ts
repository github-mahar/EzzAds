import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { openai, AD_SYSTEM_PROMPT, buildUserPrompt } from '@/lib/openai';

// Input validation schema (Zod per techstack.md §8)
const GenerateAdSchema = z.object({
    productName: z.string().min(1, 'Product name is required').max(200),
    targetAudience: z.string().min(1, 'Target audience is required').max(500),
    platform: z.enum(['META', 'GOOGLE', 'TIKTOK', 'YOUTUBE', 'LINKEDIN']),
    offer: z.string().max(300).optional(),
    tone: z.enum(['BOLD', 'EMOTIONAL', 'PROFESSIONAL', 'AGGRESSIVE']),
    goal: z.enum(['SALES', 'LEADS', 'AWARENESS', 'CLICKS']),
});

// Rate limiting - simple in-memory store (will move to Supabase)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const FREE_LIMIT = 5;

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const record = rateLimitMap.get(ip);

    if (!record || now > record.resetAt) {
        // Reset: new day window (24h)
        rateLimitMap.set(ip, { count: 1, resetAt: now + 86400000 });
        return true;
    }

    if (record.count >= FREE_LIMIT) {
        return false;
    }

    record.count++;
    return true;
}

export async function POST(request: NextRequest) {
    try {
        // Rate limiting
        const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? 'unknown';
        if (!checkRateLimit(ip)) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'RATE_LIMIT_EXCEEDED',
                    message: 'Daily generation limit reached. Upgrade to OPERATOR tier for unlimited access.',
                    timestamp: new Date().toISOString(),
                },
                { status: 429 }
            );
        }

        const body = await request.json();

        // Validate input
        const parsed = GenerateAdSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'VALIDATION_FAILED',
                    details: parsed.error.flatten(),
                    timestamp: new Date().toISOString(),
                },
                { status: 400 }
            );
        }

        const { productName, targetAudience, platform, offer, tone, goal } = parsed.data;

        // Call OpenAI API (Server-side ONLY per architecture-lock.md)
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: AD_SYSTEM_PROMPT,
                },
                {
                    role: 'user',
                    content: buildUserPrompt({
                        productName,
                        targetAudience,
                        platform,
                        offer,
                        tone,
                        goal,
                    }),
                },
            ],
            temperature: 0.8, // Creative variation per techstack.md
            max_tokens: 2000,
            response_format: { type: 'json_object' },
        });

        const rawContent = completion.choices[0]?.message?.content;

        if (!rawContent) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'GENERATION_EMPTY',
                    message: 'The AI engine returned no output. Please retry.',
                    timestamp: new Date().toISOString(),
                },
                { status: 502 }
            );
        }

        // Parse the AI response
        let aiOutput: Record<string, unknown>;
        try {
            aiOutput = JSON.parse(rawContent);
        } catch {
            return NextResponse.json(
                {
                    success: false,
                    error: 'PARSE_FAILURE',
                    message: 'Failed to parse AI output. Retrying may resolve this.',
                    timestamp: new Date().toISOString(),
                },
                { status: 502 }
            );
        }

        // Structure the response
        const generationId = `EZZ-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

        const structuredOutput = {
            id: generationId,
            platform,
            performanceRating: aiOutput.performanceRating ?? 'HIGH',
            frameworkUsed: aiOutput.frameworkUsed ?? 'AIDA',
            blocks: [
                {
                    type: 'HEADLINE',
                    label: 'HEADLINE_VARIANTS',
                    items: Array.isArray(aiOutput.headlines) ? aiOutput.headlines : ['No headlines generated'],
                },
                {
                    type: 'HOOK',
                    label: 'HOOK_VARIANTS',
                    items: Array.isArray(aiOutput.hooks) ? aiOutput.hooks : ['No hooks generated'],
                },
                {
                    type: 'PRIMARY_TEXT',
                    label: 'PRIMARY_TEXT_VARIANTS',
                    items: Array.isArray(aiOutput.primaryText) ? aiOutput.primaryText : ['No primary text generated'],
                },
                {
                    type: 'CTA',
                    label: 'CTA_SUGGESTION',
                    items: [typeof aiOutput.cta === 'string' ? aiOutput.cta : 'No CTA generated'],
                },
                {
                    type: 'CREATIVE_DIRECTION',
                    label: 'CREATIVE_DIRECTION',
                    items: [typeof aiOutput.creativeDirection === 'string' ? aiOutput.creativeDirection : 'No creative direction generated'],
                },
                {
                    type: 'VIDEO_SCRIPT',
                    label: 'VIDEO_SCRIPT_15S',
                    items: [typeof aiOutput.videoScript === 'string' ? aiOutput.videoScript : 'No video script generated'],
                },
            ],
            input: parsed.data,
            generatedAt: new Date().toISOString(),
            tokensUsed: completion.usage?.total_tokens ?? 0,
        };

        return NextResponse.json(
            {
                success: true,
                data: structuredOutput,
                timestamp: new Date().toISOString(),
            },
            { status: 200 }
        );
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        console.error('[GENERATION_ENGINE_ERROR]', message);

        return NextResponse.json(
            {
                success: false,
                error: 'INTERNAL_ENGINE_FAILURE',
                message: 'The generation engine encountered an error. Please retry.',
                timestamp: new Date().toISOString(),
            },
            { status: 500 }
        );
    }
}
