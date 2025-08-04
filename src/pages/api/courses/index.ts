import type { NextApiRequest, NextApiResponse } from 'next';
import { courses, Course } from '@/data/courses';

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Course[]>,
) {
  res.status(200).json(courses);
}
