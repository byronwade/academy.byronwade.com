"use client";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Play, BookOpen, Clock, Users, Star, ArrowLeft, ExternalLink } from "lucide-react";
import type { Course } from "@/data/courses";

// Mock progress data - in real app this would come from user state/database
const getUserProgress = (courseId: string) => {
	const progressData: Record<string, { overallProgress: number; completedChapters: number[] }> = {
		"plumbing-beginner": { overallProgress: 30, completedChapters: [0] },
		"hvac-ce": { overallProgress: 10, completedChapters: [] },
		"electrical-master": { overallProgress: 0, completedChapters: [] },
	};
	return progressData[courseId] || { overallProgress: 0, completedChapters: [] };
};

export default function CourseDetails({ course }: { course: Course }) {
	const userProgress = getUserProgress(course.id);
	const isStarted = userProgress.overallProgress > 0;
	const totalQuestions = course.chapters.reduce((sum, chapter) => sum + chapter.questions.length, 0);

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Full-Width Header Navigation - Consistent with Learn Page */}
			<header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 px-6 py-4 shadow-sm">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-4">
						<Button asChild variant="ghost" size="sm" className="hover:bg-gray-100">
							<Link href="/courses">
								<ArrowLeft className="mr-2 h-4 w-4" />
								Courses
							</Link>
						</Button>
						<div className="h-6 w-px bg-gray-300" />
						<h1 className="text-xl font-semibold text-gray-700">{course.title}</h1>
					</div>
					<div className="flex items-center space-x-3">
						<Badge variant={isStarted ? "default" : "secondary"} className="text-xs">
							{isStarted ? "In Progress" : "Not Started"}
						</Badge>
						<Button asChild size="sm">
							<Link href={`/courses/${course.id}/learn`}>
								<Play className="mr-2 h-4 w-4" />
								{isStarted ? "Continue" : "Start Course"}
							</Link>
						</Button>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<div className="p-6">
				<div className="max-w-7xl mx-auto">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
						{/* Left Column - Course Details */}
						<div className="lg:col-span-2 space-y-6">
							{/* Course Info Card */}
							<Card className="bg-white border border-gray-200 shadow-sm">
								<CardContent className="p-6">
									<div className="space-y-6">
										{/* Title Section */}
										<div>
											<div className="flex items-center justify-between mb-3">
												<h2 className="text-lg font-medium text-gray-900">Course Information</h2>
												<Badge variant="outline" className="text-green-700 bg-green-50 border-green-200">
													${course.price.toFixed(2)}
												</Badge>
											</div>
											<div className="space-y-4">
												<div>
													<label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
													<div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md border">{course.title}</div>
												</div>
												<div>
													<label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
													<div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md border min-h-[80px]">{course.description}</div>
												</div>
											</div>
										</div>

										{/* Course Details */}
										<div>
											<h3 className="text-sm font-medium text-gray-700 mb-3">Course Details</h3>
											<div className="bg-gray-50 px-3 py-3 rounded-md border">
												<p className="text-sm text-gray-700 leading-relaxed">{course.details}</p>
											</div>
										</div>

										{/* Course Stats */}
										<div>
											<h3 className="text-sm font-medium text-gray-700 mb-3">Course Statistics</h3>
											<div className="grid grid-cols-3 gap-4">
												<div className="text-center p-3 bg-gray-50 rounded-md border">
													<BookOpen className="h-5 w-5 text-gray-400 mx-auto mb-1" />
													<div className="text-lg font-medium text-gray-900">{course.chapters.length}</div>
													<div className="text-xs text-gray-500">Chapters</div>
												</div>
												<div className="text-center p-3 bg-gray-50 rounded-md border">
													<Clock className="h-5 w-5 text-gray-400 mx-auto mb-1" />
													<div className="text-lg font-medium text-gray-900">{totalQuestions}</div>
													<div className="text-xs text-gray-500">Questions</div>
												</div>
												<div className="text-center p-3 bg-gray-50 rounded-md border">
													<Star className="h-5 w-5 text-gray-400 mx-auto mb-1" />
													<div className="text-lg font-medium text-gray-900">4.8</div>
													<div className="text-xs text-gray-500">Rating</div>
												</div>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>

							{/* Curriculum Card */}
							<Card className="bg-white border border-gray-200 shadow-sm">
								<CardContent className="p-6">
									<div className="flex items-center justify-between mb-4">
										<h2 className="text-lg font-medium text-gray-900">Course Curriculum</h2>
										<Badge variant="secondary" className="text-xs">
											{course.chapters.length} chapters
										</Badge>
									</div>
									<div className="space-y-3">
										{course.chapters.map((chapter, idx) => {
											const isCompleted = userProgress.completedChapters.includes(idx);
											return (
												<div key={idx} className={`p-4 rounded-lg border transition-colors ${isCompleted ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200 hover:bg-gray-100"}`}>
													<div className="flex items-start justify-between">
														<div className="flex-1">
															<div className="flex items-center gap-3 mb-2">
																<span className="flex items-center justify-center w-6 h-6 rounded-full bg-white border border-gray-300 text-xs font-medium text-gray-700">{idx + 1}</span>
																<h3 className="font-medium text-gray-900 text-sm">{chapter.title}</h3>
																{isCompleted && <CheckCircle className="h-4 w-4 text-green-600" />}
															</div>
															<p className="text-xs text-gray-600 ml-9 mb-2">{chapter.description}</p>
															<div className="flex items-center gap-2 ml-9">
																<Badge variant="outline" className="text-xs h-5 px-1.5">
																	{chapter.questions.length} questions
																</Badge>
																<Badge variant={isCompleted ? "default" : "secondary"} className="text-xs h-5 px-1.5">
																	{isCompleted ? "Completed" : "Not Started"}
																</Badge>
															</div>
														</div>
													</div>
												</div>
											);
										})}
									</div>
								</CardContent>
							</Card>
						</div>

						{/* Right Column - Progress & Actions */}
						<div className="space-y-6">
							{/* Progress Card */}
							<Card className="bg-white border border-gray-200 shadow-sm">
								<CardContent className="p-6">
									<h3 className="text-lg font-medium text-gray-900 mb-4">Your Progress</h3>
									<div className="space-y-4">
										<div>
											<div className="flex justify-between items-center mb-2">
												<span className="text-sm font-medium text-gray-700">Overall Progress</span>
												<span className="text-sm text-gray-500">{userProgress.overallProgress}%</span>
											</div>
											<Progress value={userProgress.overallProgress} className="h-2 bg-gray-200" />
										</div>
										<div className="pt-2 border-t border-gray-100">
											<div className="text-sm text-gray-600 space-y-1">
												<div>
													Completed: {userProgress.completedChapters.length} of {course.chapters.length} chapters
												</div>
												<div>
													Questions answered: {Math.round((userProgress.overallProgress / 100) * totalQuestions)} of {totalQuestions}
												</div>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>

							{/* Actions Card */}
							<Card className="bg-white border border-gray-200 shadow-sm">
								<CardContent className="p-6">
									<h3 className="text-lg font-medium text-gray-900 mb-4">Actions</h3>
									<div className="space-y-3">
										<Button asChild className="w-full justify-start">
											<Link href={`/courses/${course.id}/learn`}>
												<Play className="mr-2 h-4 w-4" />
												{isStarted ? "Continue Learning" : "Start Course"}
											</Link>
										</Button>
										<Button asChild variant="outline" className="w-full justify-start">
											<Link href="/dashboard">
												<Users className="mr-2 h-4 w-4" />
												Back to Dashboard
											</Link>
										</Button>
										<Button asChild variant="outline" className="w-full justify-start">
											<Link href="/courses">
												<ExternalLink className="mr-2 h-4 w-4" />
												View All Courses
											</Link>
										</Button>
									</div>
								</CardContent>
							</Card>

							{/* Course Info Card */}
							<Card className="bg-white border border-gray-200 shadow-sm">
								<CardContent className="p-6">
									<h3 className="text-lg font-medium text-gray-900 mb-4">Course Details</h3>
									<div className="space-y-3 text-sm">
										<div className="flex justify-between">
											<span className="text-gray-600">Price</span>
											<span className="font-medium text-green-600">${course.price.toFixed(2)}</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600">Duration</span>
											<span className="text-gray-900">Self-paced</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600">Level</span>
											<span className="text-gray-900">{course.id.includes("beginner") ? "Beginner" : course.id.includes("master") ? "Advanced" : "Intermediate"}</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600">Certificate</span>
											<span className="text-gray-900">Included</span>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
