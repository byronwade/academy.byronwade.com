import type { Course } from '@/data/courses';
import { courses } from "@/data/courses";
import CourseDetails from "../CourseDetails";
import { notFound } from "next/navigation";

export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const course = courses.find((c) => c.id === id);

	if (!course) {
		notFound();
	}

	return <CourseDetails course={course} />;
}
