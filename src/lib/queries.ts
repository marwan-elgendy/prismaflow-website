export const homePageQuery = `*[_type == "homePage"][0]{
  hero{ headline, subheadline, primaryCTA, secondaryCTA },
  problemSection{ headline, body },
  processSection{ headline, steps[]{ number, title, description } },
  socialProof{ headline, testimonials[]->{ name, company, quote, avatar } },
  seo
}`

export const aboutPageQuery = `*[_type == "aboutPage"][0]{
  heroHeadline, heroSubtext, storyHeadline, storyBody,
  philosophyQuote, philosophyCTA, seo
}`

export const servicesPageQuery = `*[_type == "servicesPage"][0]{
  headline, subheadline,
  services[]{ title, problem, solution, result, icon },
  seo
}`

export const applyPageQuery = `*[_type == "applyPage"][0]{
  headline, exclusionText, ctaLabel, seo
}`

export const landingPageQuery = `*[_type == "landingPage"][0]{
  headline, subheadline, bulletPoints, ctaLabel
}`

export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  siteName, tagline, logoUrl,
  navLinks[]{ label, href },
  footerText,
  socialLinks{ instagram, linkedin, facebook, whatsapp }
}`

export const allPostsQuery = `*[_type == "post"] | order(publishedAt desc){
  title, "slug": slug.current, excerpt,
  mainImage{ "asset": { "url": asset->url }, alt },
  publishedAt, author, categories
}`

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0]{
  title, "slug": slug.current, excerpt,
  mainImage{ "asset": { "url": asset->url }, alt },
  publishedAt, author, body, categories, seo
}`

export const recentPostsQuery = `*[_type == "post"] | order(publishedAt desc)[0..2]{
  title, "slug": slug.current, excerpt,
  mainImage{ "asset": { "url": asset->url }, alt },
  publishedAt, author, categories
}`
