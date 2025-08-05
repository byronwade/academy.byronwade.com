import type { Course } from '@/data/courses';
import { courses } from "@/data/courses";
import CoursesList from './CoursesList';

export default function CoursesPage() {
	return <CoursesList courses={courses} />;
}
