/**
 * PrismaFlow — Sanity Blog Post Seeder
 *
 * Run with:
 *   npx tsx scripts/seed-sanity.ts
 *
 * Prerequisites:
 *   1. Set SANITY_API_TOKEN in .env.local (needs write access — use an Editor or Admin token)
 *   2. Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET in .env.local
 *
 * The script uses createOrReplace, so it is safe to run multiple times.
 * Existing documents with the same _id will be overwritten with fresh data.
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import * as path from 'path'
import { seedPosts } from '../src/data/seed-posts'

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
const token = process.env.SANITY_API_TOKEN

if (!projectId) {
  console.error('❌  NEXT_PUBLIC_SANITY_PROJECT_ID is not set in .env.local')
  process.exit(1)
}

if (!token) {
  console.error('❌  SANITY_API_TOKEN is not set in .env.local')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
})

function toPortableText(text: string) {
  // Convert a plain markdown-ish string to a minimal Sanity Portable Text array.
  // Each paragraph / heading becomes one block.
  return text
    .split(/\n{2,}/)
    .filter((p) => p.trim().length > 0)
    .map((paragraph) => {
      const trimmed = paragraph.trim()

      // Detect heading levels
      const h2Match = trimmed.match(/^## (.+)$/)
      const h3Match = trimmed.match(/^### (.+)$/)

      if (h2Match) {
        return {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: h2Match[1].trim() }],
          markDefs: [],
        }
      }
      if (h3Match) {
        return {
          _type: 'block',
          style: 'h3',
          children: [{ _type: 'span', text: h3Match[1].trim() }],
          markDefs: [],
        }
      }

      // Strip leading bold markers used for sub-headings (**Step 1 — ...**)
      const cleaned = trimmed.replace(/^\*\*(.+?)\*\*/, '$1')

      return {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: cleaned }],
        markDefs: [],
      }
    })
}

async function seed() {
  console.log(`\n🌱  Seeding ${seedPosts.length} blog posts into Sanity…`)
  console.log(`    Project: ${projectId} | Dataset: ${dataset}\n`)

  for (const post of seedPosts) {
    const docId = `blogPost-${post.slug}`

    const doc = {
      _id: docId,
      _type: 'post',
      title: post.title,
      slug: { current: post.slug },
      excerpt: post.excerpt,
      publishedAt: post.publishedAt,
      author: post.author,
      categories: post.categories,
      body: {
        en: toPortableText(post.body.en),
        ar: toPortableText(post.body.ar),
      },
    }

    try {
      await client.createOrReplace(doc)
      console.log(`  ✅  ${post.slug}`)
    } catch (err) {
      console.error(`  ❌  Failed to seed "${post.slug}":`, err)
    }
  }

  console.log('\n✨  Seeding complete.\n')
}

seed().catch((err) => {
  console.error('Fatal error during seeding:', err)
  process.exit(1)
})
