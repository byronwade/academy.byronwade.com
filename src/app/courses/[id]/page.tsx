import Link from 'next/link';
import { getCourse } from '@/lib/courses';

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
