import type { Course } from '@/data/courses';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';

export async function getCourses(): Promise<Course[]> {
  const res = await fetch(`${baseUrl}/api/courses`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch courses');
  }
  return res.json();
}

export async function getCourse(id: string): Promise<Course> {
  const res = await fetch(`${baseUrl}/api/courses/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch course');
  }
  return res.json();
}

