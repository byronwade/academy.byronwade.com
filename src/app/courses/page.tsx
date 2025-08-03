import Link from 'next/link';

export type Course = {
  id: string;
  title: string;
  description: string;
};

async function getCourses(): Promise<Course[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/courses`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch courses');
  }
  return res.json();
}

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
