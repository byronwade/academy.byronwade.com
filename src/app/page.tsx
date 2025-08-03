import Link from 'next/link';
import { getCourses } from '@/lib/courses';

export default async function Home() {
  const courses = await getCourses();
  return (
    <main style={{ padding: '1rem' }}>
      <section style={{ marginBottom: '2rem' }}>
        <h1>Welcome to the Academy</h1>
        <p>Interactive courses to sharpen your skills.</p>
        <Link href="/courses">Browse all courses</Link>
      </section>
      <section>
        <h2>Featured Courses</h2>
        <ul>
          {courses.map((course) => (
            <li key={course.id}>
              <Link href={`/courses/${course.id}`}>{course.title}</Link>
              <p>{course.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
