import type { NextApiRequest, NextApiResponse } from 'next';
import { courses } from '@/data/courses';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query;
  const course = courses.find((c) => c.id === id);
  if (course) {
    res.status(200).json(course);
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
}
