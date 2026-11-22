import { fleet } from '../../features/Vehicles/data/fleet'

export default defineEventHandler((event) => {
  const base = useRuntimeConfig(event).public.siteUrl
  if (!base) throw createError({ statusCode: 404, message: 'Sitemap indisponível neste ambiente.' })
  const routes = ['/', '/vehicles', '/about', '/contact', '/gallery', '/blog', '/faq', '/privacy', ...fleet.map(car => `/vehicles/${car.id}`)]
  const escape = (value: string) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;')
  setResponseHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(route => `<url><loc>${escape(new URL(route, base).href)}</loc></url>`).join('')}</urlset>`
})
