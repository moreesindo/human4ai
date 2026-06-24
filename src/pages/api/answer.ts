import type { APIRoute } from 'astro';
import { getQuestion } from '../../lib/questions';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  const bad = (msg: string) =>
    new Response(JSON.stringify({ error: msg }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });

  let body: { text?: string };
  try {
    body = await request.json();
  } catch {
    return bad('invalid json');
  }

  const text = String(body.text ?? '').trim();
  if (!text) return bad('empty');
  if (text.length > 280) return bad('too long');

  const env = (locals as any).runtime?.env;
  if (!env?.DB) {
    // No database connected yet — return ok so the UI still works in preview
    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { index } = getQuestion();
  await env.DB.prepare('INSERT INTO answers (question_index, text) VALUES (?, ?)')
    .bind(index, text)
    .run();

  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
