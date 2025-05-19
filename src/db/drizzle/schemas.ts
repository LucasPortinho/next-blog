import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { InferInsertModel, InferSelectModel } from 'drizzle-orm'

export const postsTable = sqliteTable('posts', {
    id: text('id').primaryKey(),
    slug: text('slug').notNull().unique(),
    title: text('title').notNull(),
    author: text('author').notNull(),
    excerpt: text('excerpt').notNull(),
    content: text('content').notNull(),
    coverImageUrl: text('cover_image_url').notNull(),
    published: integer('published', { mode: 'boolean' }).notNull(),
    createdAt: text('created_at').notNull(),
    updatedAt: text('updated_at').notNull(),
})

export type PostsTableSelectMode = InferSelectModel<typeof postsTable>
export type PostsTableInsertMode = InferInsertModel<typeof postsTable>
