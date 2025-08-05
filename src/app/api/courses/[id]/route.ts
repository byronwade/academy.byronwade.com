import { NextRequest, NextResponse } from 'next/server';
import { courses } from '@/data/courses';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const course = courses.find((c) => c.id === id);
  
  if (course) {
    return NextResponse.json(course);
  } else {
    return NextResponse.json({ message: 'Course not found' }, { status: 404 });
  }
}