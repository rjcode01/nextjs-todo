import { NextApiRequest, NextApiResponse } from 'next';
import { db, todoTable } from '../../../.drizzle/config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.body;

  try {
    await db.delete(todoTable).where(id).execute();
    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
}
