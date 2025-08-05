"use client";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { courses } from "@/data/courses";

const userProgress: Record<string, number> = {
	"plumbing-beginner": 30,
	"hvac-ce": 10,
	"electrical-master": 0,
};

export default function DashboardPage() {
	return (
		<div className="max-w-6xl mx-auto">
			<h1 className="text-4xl font-bold mb-8">My Learning Dashboard</h1>
			<div className="space-y-6">
				{courses.map((course) => {
					const progress = userProgress[course.id] ?? 0;
					const isStarted = progress > 0;

					return (
						<Card key={course.id} className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30">
							<CardContent className="p-6">
								<div className="flex justify-between items-start mb-4">
									<div className="flex-1">
										<div className="flex items-center gap-3 mb-2">
											<h2 className="text-xl font-semibold">{course.title}</h2>
											<Badge variant={isStarted ? "default" : "secondary"}>{isStarted ? "In Progress" : "Not Started"}</Badge>
										</div>
										<p className="text-muted-foreground mb-3">{course.description}</p>
										<p className="text-lg font-semibold text-green-600">${course.price}</p>
									</div>
									<div className="min-w-[200px] ml-6">
										<div className="flex justify-between items-center mb-2">
											<span className="text-sm font-medium">Progress</span>
											<span className="text-sm text-muted-foreground">{progress}%</span>
										</div>
										<Progress value={progress} className="h-2" />
									</div>
								</div>
								<div className="flex justify-between items-center pt-2">
									<p className="text-sm text-muted-foreground">{course.chapters.length} chapters</p>
									<Button asChild variant={isStarted ? "default" : "outline"} size="sm">
										<Link href={`/courses/${course.id}`}>{isStarted ? "Continue Learning" : "Start Course"}</Link>
									</Button>
								</div>
							</CardContent>
						</Card>
					);
				})}
			</div>
		</div>
	);
}