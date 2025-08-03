import type { NextApiRequest, NextApiResponse } from 'next';
import { courses } from '@/data/courses';

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse,
) {
  res.status(200).json(courses);
}
