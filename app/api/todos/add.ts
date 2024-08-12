import { NextApiRequest, NextApiResponse } from 'next';
import { db, todoTable } from '../../../.drizzle/config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { task } = req.body;

  try {
    const newTask = await db.insert(todoTable).values({ task }).returning().execute();
    res.status(200).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add task' });
  }
}
