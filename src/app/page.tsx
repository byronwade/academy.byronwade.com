import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ padding: '1rem' }}>
      <h1>Welcome to the Academy</h1>
      <Link href="/courses">Browse Courses</Link>
    </main>
  );
}
