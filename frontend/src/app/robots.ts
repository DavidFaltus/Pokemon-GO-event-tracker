import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/private/'],
      },
      {
        userAgent: [
          'OAI-SearchBot',
          'ChatGPT-User',
          'GPTBot',
          'Claude-SearchBot',
          'Claude-User',
          'ClaudeBot',
          'Claude-Web',
          'PerplexityBot',
          'Perplexity-User',
          'Google-Extended',
          'Applebot-Extended',
          'Amazonbot',
          'Mediapartners-Google',
        ],
        allow: ['/', '/api/agent/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/admin', '/api/private/'],
      },
    ],
    sitemap: [
      'https://pogoevents.app/sitemap.xml',
    ],
  };
}
