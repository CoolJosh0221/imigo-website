import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  titleEn: text('title_en').notNull(),
  titleZh: text('title_zh').notNull(),
  excerptEn: text('excerpt_en').notNull().default(''),
  excerptZh: text('excerpt_zh').notNull().default(''),
  contentEn: text('content_en').notNull().default(''),
  contentZh: text('content_zh').notNull().default(''),
  author: text('author').notNull().default('iMigo Team'),
  date: text('date').notNull(), // YYYY-MM-DD
  category: text('category').notNull().default('announcement'), // announcement, news, story, guide
  image: text('image'),
  tags: text('tags').notNull().default('[]'), // JSON array as text
  status: text('status').notNull().default('draft'), // draft, published
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at').notNull().$defaultFn(() => new Date().toISOString()),
});

export const events = sqliteTable('events', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  titleEn: text('title_en').notNull(),
  titleZh: text('title_zh').notNull(),
  descriptionEn: text('description_en').notNull().default(''),
  descriptionZh: text('description_zh').notNull().default(''),
  contentEn: text('content_en').notNull().default(''),
  contentZh: text('content_zh').notNull().default(''),
  date: text('date').notNull(), // YYYY-MM-DD
  time: text('time').notNull().default(''),
  locationEn: text('location_en').notNull().default(''),
  locationZh: text('location_zh').notNull().default(''),
  category: text('category').notNull().default('community'), // volunteer, cultural, training, community
  image: text('image'),
  registrationLink: text('registration_link'),
  tags: text('tags').notNull().default('[]'), // JSON array as text
  status: text('status').notNull().default('draft'), // draft, published
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at').notNull().$defaultFn(() => new Date().toISOString()),
});

// Type helpers
export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
export type EventRow = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;
