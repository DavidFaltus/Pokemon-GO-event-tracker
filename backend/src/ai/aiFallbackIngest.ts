import * as cheerio from 'cheerio';
import { SpecialEventDetails } from '../types';

export interface ConfidenceEvaluation {
  confidenceScore: number; // 0.0 to 1.0
  triggersFallback: boolean;
  reasons: string[];
}

export function evaluateParsingConfidence(
  details: SpecialEventDetails,
  totalSectionsCount: number = 0,
  rawHtml?: string
): ConfidenceEvaluation {
  const reasons: string[] = [];
  let score = 1.0;

  const bonusesCount = details.bonuses?.length || 0;
  const spawnsCount = details.spawns?.length || 0;
  const debutsCount = details.debuts?.length || 0;
  const raidsCount = details.raids?.length || 0;
  const eggsCount = details.eggs?.length || 0;
  const researchCount = details.research?.length || 0;

  const totalItems = bonusesCount + spawnsCount + debutsCount + raidsCount + eggsCount + researchCount;

  // 1. Low Extraction Yield on Major Event
  const isMajorEvent = (details.eventID || '').includes('fest') || (details.eventID || '').includes('tour') || (details.eventID || '').includes('season');
  if (isMajorEvent && totalItems < 3) {
    score -= 0.4;
    reasons.push('Low extraction yield on major event structure');
  }

  // 2. No items extracted at all
  if (totalItems === 0) {
    score -= 0.6;
    reasons.push('Zero items parsed from document');
  }

  // 3. Novel Game Mechanics Detection
  if (rawHtml) {
    const rawLower = rawHtml.toLowerCase();
    const novelKeywords = [
      'gigantamax max battle',
      'fusion energy',
      'city-wide stamp rally',
      'twitch drops timed research',
      'branching special research',
      'adventure effects'
    ];

    for (const kw of novelKeywords) {
      if (rawLower.includes(kw)) {
        reasons.push(`Detected novel gameplay mechanic: "${kw}"`);
      }
    }
  }

  const confidenceScore = Math.max(0.0, Math.min(1.0, score));
  const triggersFallback = confidenceScore < 0.75;

  return {
    confidenceScore,
    triggersFallback,
    reasons
  };
}

/**
 * Preprocesses raw HTML by stripping ads, scripts, nav, footer, styles.
 */
export function cleanHtmlForAiIngest(rawHtml: string): string {
  const $ = cheerio.load(rawHtml);
  $('script, style, nav, footer, header, iframe, noscript, svg, .ad, .ads, .advertisement').remove();
  return $('main, article, .event-container, body').html() || '';
}

/**
 * AI structured extraction client (Gemini Flash fallback).
 */
export async function runAiFallbackExtraction(
  rawHtml: string,
  eventID: string,
  apiKey?: string
): Promise<SpecialEventDetails | null> {
  const key = apiKey || process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_KEY;
  if (!key) {
    return null;
  }

  try {
    const cleaned = cleanHtmlForAiIngest(rawHtml);
    const prompt = `
You are an expert Pokémon GO event data extraction engine.
Analyze the following event HTML and return a strictly valid JSON object matching the SpecialEventDetails schema:
{
  "eventID": "${eventID}",
  "bonuses": [{ "text": { "en": "...", "cs": "..." }, "icon": "🎁|✨|🍬|🥚|🎟️|⚡" }],
  "debuts": [{ "name": "...", "image": "", "description": { "en": "...", "cs": "..." } }],
  "spawns": [{ "name": "...", "image": "", "isShinyAvailable": true/false, "isHighPriority": true/false, "habitat": { "en": "...", "cs": "..." } }],
  "eggs": [{ "distance": "7km", "contents": [{ "name": "...", "image": "", "isShinyAvailable": true/false }] }],
  "research": [{ "task": { "en": "...", "cs": "..." }, "reward": "...", "image": "", "isShinyAvailable": true/false }],
  "featuredAttacks": [{ "pokemonName": "...", "moveName": "...", "isEliteMove": true }]
}

Event HTML:
${cleaned.slice(0, 15000)}
`;

    // Perform API request if available
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json' }
      })
    });

    if (!response.ok) return null;
    const json = await response.json();
    const rawText = json.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) return null;

    const parsed: SpecialEventDetails = JSON.parse(rawText);
    parsed.eventID = eventID;
    parsed.sourcesMerged = ['AIFallback'];
    return parsed;
  } catch (err: any) {
    console.warn(`[runAiFallbackExtraction] AI extraction failed: ${err.message}`);
    return null;
  }
}
