import Link from 'next/link';

export type Course = {
  id: string;
  title: string;
  description: string;
};

async function getCourse(id: string): Promise<Course> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/courses/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch course');
  }
  return res.json();
}

export default async function CoursePage({ params }: { params: { id: string } }) {
  const course = await getCourse(params.id);
  return (
    <main style={{ padding: '1rem' }}>
      <h1>{course.title}</h1>
      <p>{course.description}</p>
      <Link href="/courses">Back to courses</Link>
    </main>
  );
}
