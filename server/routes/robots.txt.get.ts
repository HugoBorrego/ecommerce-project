export default defineEventHandler((event) => {
  setResponseHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  const siteUrl = useRuntimeConfig(event).public.siteUrl
  return siteUrl
    ? `User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${new URL('/sitemap.xml', siteUrl).href}\n`
    : 'User-agent: *\nDisallow: /\n'
})
