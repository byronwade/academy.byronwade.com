import { Box } from '@chakra-ui/react';
import CourseContent from '@/components/CourseContent';
import type { Course } from '@/data/courses';

async function getCourse(id: string): Promise<Course> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/courses/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch course');
  }
  return res.json();
}

export default async function CoursePage({
  params,
}: {
  params: { id: string };
}) {
  const course = await getCourse(params.id);
  return (
    <Box p={8} maxW="3xl" mx="auto">
      <CourseContent course={course} />
    </Box>
  );
}
