import { getGuidesSitemapXml } from '@/utils/sitemapGenerator';

export const dynamic = 'force-static';
export const revalidate = 3600;

export async function GET() {
  const xml = await getGuidesSitemapXml();
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
