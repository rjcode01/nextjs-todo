import { NextApiRequest, NextApiResponse } from 'next';
import { db, todoTable } from '../../../.drizzle/config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, task, completed } = req.body;

  try {
    const updatedTask = await db.update(todoTable).set({ task, completed }).where(id).returning().execute();
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
}
