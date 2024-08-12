import { NextApiRequest, NextApiResponse } from 'next';
import { db, todoTable } from '../../../.drizzle/config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const todos = await db.select().from(todoTable).execute();
  res.status(200).json(todos);
}
