import { courses } from "@/data/courses";
import { enhancedCourses } from "@/data/enhanced-courses";
import LearnInterface from "./LearnInterface";
import { notFound } from "next/navigation";

export default async function LearnPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	let course: any;

	if (id === "plumbing-beginner") {
		course = enhancedCourses.find((c) => c.id === "plumbing-enhanced");
	} else {
		course = enhancedCourses.find((c) => c.id === id) || courses.find((c) => c.id === id);
	}

	if (!course) {
		notFound();
	}

	return <LearnInterface course={course} />;
}
