/**
 * Migration script: reads existing markdown files from /content/ and inserts them into Turso DB.
 *
 * Usage:
 *   npx tsx scripts/migrate-content.ts
 *
 * Requires TURSO_DATABASE_URL (and optionally TURSO_AUTH_TOKEN) in .env.local
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from '../db/schema';

// Load env
import { config } from 'dotenv';
config({ path: '.env.local' });

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const db = drizzle(client, { schema });

function toDateString(val: unknown): string {
  if (val instanceof Date) return val.toISOString().split('T')[0];
  return String(val || '');
}

async function createTables() {
  await client.execute(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      title_en TEXT NOT NULL,
      title_zh TEXT NOT NULL,
      excerpt_en TEXT NOT NULL DEFAULT '',
      excerpt_zh TEXT NOT NULL DEFAULT '',
      content_en TEXT NOT NULL DEFAULT '',
      content_zh TEXT NOT NULL DEFAULT '',
      author TEXT NOT NULL DEFAULT 'iMigo Team',
      date TEXT NOT NULL,
      category TEXT NOT NULL DEFAULT 'announcement',
      image TEXT,
      tags TEXT NOT NULL DEFAULT '[]',
      status TEXT NOT NULL DEFAULT 'draft',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      title_en TEXT NOT NULL,
      title_zh TEXT NOT NULL,
      description_en TEXT NOT NULL DEFAULT '',
      description_zh TEXT NOT NULL DEFAULT '',
      content_en TEXT NOT NULL DEFAULT '',
      content_zh TEXT NOT NULL DEFAULT '',
      date TEXT NOT NULL,
      time TEXT NOT NULL DEFAULT '',
      location_en TEXT NOT NULL DEFAULT '',
      location_zh TEXT NOT NULL DEFAULT '',
      category TEXT NOT NULL DEFAULT 'community',
      image TEXT,
      registration_link TEXT,
      tags TEXT NOT NULL DEFAULT '[]',
      status TEXT NOT NULL DEFAULT 'draft',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `);

  console.log('Tables created.');
}

async function migrateBlogPosts() {
  const blogDir = path.join(process.cwd(), 'content/blog');
  if (!fs.existsSync(blogDir)) {
    console.log('No content/blog directory found, skipping.');
    return;
  }

  const files = fs.readdirSync(blogDir);
  const enFiles = files.filter((f) => f.endsWith('.en.md'));

  for (const enFile of enFiles) {
    const match = enFile.match(/^(\d+)-(.+)\.en\.md$/);
    if (!match) continue;

    const [, , slugPart] = match;
    const id = match[1];
    const zhFile = files.find((f) => f.startsWith(`${id}-`) && f.endsWith('.zh.md'));
    if (!zhFile) {
      console.log(`  Skipping ${enFile} — no ZH counterpart`);
      continue;
    }

    const enContent = fs.readFileSync(path.join(blogDir, enFile), 'utf8');
    const zhContent = fs.readFileSync(path.join(blogDir, zhFile), 'utf8');

    const enMatter = matter(enContent);
    const zhMatter = matter(zhContent);

    const now = new Date().toISOString();

    await db.insert(schema.posts).values({
      slug: slugPart,
      titleEn: String(enMatter.data.title || ''),
      titleZh: String(zhMatter.data.title || ''),
      excerptEn: String(enMatter.data.excerpt || ''),
      excerptZh: String(zhMatter.data.excerpt || ''),
      contentEn: enMatter.content,
      contentZh: zhMatter.content,
      author: String(enMatter.data.author || 'iMigo Team'),
      date: toDateString(enMatter.data.date),
      category: String(enMatter.data.category || 'announcement'),
      image: enMatter.data.image ? String(enMatter.data.image) : null,
      tags: JSON.stringify(enMatter.data.tags || []),
      status: 'published',
      createdAt: now,
      updatedAt: now,
    });

    console.log(`  Migrated blog post: ${slugPart}`);
  }
}

async function migrateEvents() {
  const eventsDir = path.join(process.cwd(), 'content/events');
  if (!fs.existsSync(eventsDir)) {
    console.log('No content/events directory found, skipping.');
    return;
  }

  const files = fs.readdirSync(eventsDir);
  const enFiles = files.filter((f) => f.endsWith('.en.md'));

  for (const enFile of enFiles) {
    const match = enFile.match(/^(\d+)-(.+)\.en\.md$/);
    if (!match) continue;

    const [, , slugPart] = match;
    const id = match[1];
    const zhFile = files.find((f) => f.startsWith(`${id}-`) && f.endsWith('.zh.md'));
    if (!zhFile) {
      console.log(`  Skipping ${enFile} — no ZH counterpart`);
      continue;
    }

    const enContent = fs.readFileSync(path.join(eventsDir, enFile), 'utf8');
    const zhContent = fs.readFileSync(path.join(eventsDir, zhFile), 'utf8');

    const enMatter = matter(enContent);
    const zhMatter = matter(zhContent);

    const now = new Date().toISOString();

    await db.insert(schema.events).values({
      slug: slugPart,
      titleEn: String(enMatter.data.title || ''),
      titleZh: String(zhMatter.data.title || ''),
      descriptionEn: String(enMatter.data.description || ''),
      descriptionZh: String(zhMatter.data.description || ''),
      contentEn: enMatter.content,
      contentZh: zhMatter.content,
      date: toDateString(enMatter.data.date),
      time: String(enMatter.data.time || ''),
      locationEn: String(enMatter.data.location || ''),
      locationZh: String(zhMatter.data.location || ''),
      category: String(enMatter.data.category || 'community'),
      image: enMatter.data.image ? String(enMatter.data.image) : null,
      registrationLink: enMatter.data.registrationLink ? String(enMatter.data.registrationLink) : null,
      tags: JSON.stringify(enMatter.data.tags || []),
      status: 'published',
      createdAt: now,
      updatedAt: now,
    });

    console.log(`  Migrated event: ${slugPart}`);
  }
}

async function main() {
  console.log('Creating tables...');
  await createTables();

  console.log('\nMigrating blog posts...');
  await migrateBlogPosts();

  console.log('\nMigrating events...');
  await migrateEvents();

  console.log('\nDone! All content migrated to Turso.');
}

main().catch(console.error);
