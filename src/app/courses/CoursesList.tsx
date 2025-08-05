"use client";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Course } from "@/data/courses";

export default function CoursesList({ courses }: { courses: Course[] }) {
	return (
		<div className="max-w-4xl mx-auto">
			<h1 className="text-4xl font-bold mb-6">Courses</h1>
			<div className="space-y-6">
				{courses.map((course) => (
					<Card key={course.id} className="hover:shadow-lg transition-shadow">
						<CardHeader>
							<CardTitle>
								<Link href={`/courses/${course.id}`} className="text-primary hover:underline">
									{course.title}
								</Link>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground mb-4">{course.description}</p>
							<p className="text-2xl font-bold text-green-600">${course.price.toFixed(2)}</p>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
