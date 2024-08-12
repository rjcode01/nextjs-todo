import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { pgTable, serial, text, boolean } from 'drizzle-orm/pg-core';

const pool = new Pool({
  connectionString: process.env.NEON_DB_URL,
});

export const db = drizzle(pool);

export const todoTable = pgTable('todos', {
  id: serial('id').primaryKey(),
  task: text('task').notNull(),
  completed: boolean('completed').default(false),
});
