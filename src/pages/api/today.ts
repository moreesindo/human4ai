import type { APIRoute } from 'astro';
import { getQuestion } from '../../lib/questions';

export const prerender = false;

export const GET: APIRoute = async ({ locals }) => {
  const question = getQuestion();
  const env = (locals as any).runtime?.env;

  let answers: { text: string }[] = [];
  let total = 0;

  if (env?.DB) {
    const result = await env.DB.prepare(
      'SELECT text FROM answers WHERE question_index = ? ORDER BY created_at DESC LIMIT 100'
    )
      .bind(question.index)
      .all();
    answers = result.results as { text: string }[];
    total = answers.length;
  }

  return new Response(
    JSON.stringify({ question: question.text, index: question.index, answers, total }),
    { headers: { 'Content-Type': 'application/json' } }
  );
};
