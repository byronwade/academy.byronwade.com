import Link from 'next/link';
import { getCourses } from '@/lib/courses';

export default async function CoursesPage() {
  const courses = await getCourses();
  return (
    <main style={{ padding: '1rem' }}>
      <h1>Courses</h1>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <Link href={`/courses/${course.id}`}>{course.title}</Link>
            <p>{course.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
