"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Check, X, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import type { Course, Question } from "@/data/courses";
import QuestionRenderer from "@/components/questions/QuestionRenderer";

interface LearnInterfaceProps {
	course: Course;
}

interface UserAnswer {
	questionId: string;
	answer: string | number;
	isCorrect: boolean;
}

export default function LearnInterface({ course }: LearnInterfaceProps) {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
	const [showExplanation, setShowExplanation] = useState(false);
	const [isAnswered, setIsAnswered] = useState(false);
	const [isCompleteOpen, setIsCompleteOpen] = useState(false);

	// Flatten all questions from all chapters
	const allQuestions: Question[] = course.chapters.flatMap((chapter) => chapter.questions);
	const currentQuestion: any = allQuestions[currentQuestionIndex];
	const totalQuestions = allQuestions.length;
	const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

	// Check if current question is already answered
	useEffect(() => {
		if (currentQuestion) {
			const existingAnswer = userAnswers.find((a) => a.questionId === currentQuestion.id);
			setIsAnswered(!!existingAnswer);
			setShowExplanation(!!existingAnswer);
		}
	}, [currentQuestionIndex, userAnswers, currentQuestion]);

	const handlePrevious = useCallback(() => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex((prev) => prev - 1);
			setShowExplanation(false);
			setIsAnswered(false);
		}
	}, [currentQuestionIndex]);

	const handleNext = useCallback(() => {
		if (currentQuestionIndex < totalQuestions - 1) {
			setCurrentQuestionIndex((prev) => prev + 1);
			setShowExplanation(false);
			setIsAnswered(false);
		} else {
			// Course completed
			setIsCompleteOpen(true);
		}
	}, [currentQuestionIndex, totalQuestions]);

	// Keyboard navigation for large question sets
	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			// Only handle navigation when not typing in inputs
			if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
				return;
			}

			switch (event.key) {
				case "ArrowLeft":
					event.preventDefault();
					handlePrevious();
					break;
				case "ArrowRight":
					event.preventDefault();
					if (isAnswered) handleNext();
					break;
				case "PageUp":
					event.preventDefault();
					if (totalQuestions > 50) {
						const jumpTo = Math.max(0, currentQuestionIndex - 10);
						setCurrentQuestionIndex(jumpTo);
						setShowExplanation(false);
						setIsAnswered(false);
					}
					break;
				case "PageDown":
					event.preventDefault();
					if (totalQuestions > 50) {
						const jumpTo = Math.min(totalQuestions - 1, currentQuestionIndex + 10);
						setCurrentQuestionIndex(jumpTo);
						setShowExplanation(false);
						setIsAnswered(false);
					}
					break;
				case "Home":
					event.preventDefault();
					setCurrentQuestionIndex(0);
					setShowExplanation(false);
					setIsAnswered(false);
					break;
				case "End":
					event.preventDefault();
					setCurrentQuestionIndex(totalQuestions - 1);
					setShowExplanation(false);
					setIsAnswered(false);
					break;
			}
		};

		window.addEventListener("keydown", handleKeyPress);
		return () => window.removeEventListener("keydown", handleKeyPress);
	}, [currentQuestionIndex, totalQuestions, isAnswered, handleNext, handlePrevious]);

	const handleAnswer = (answer: any) => {
		if (!currentQuestion || isAnswered) return;

		let isCorrect = false;
		if ("correctAnswer" in currentQuestion) {
			isCorrect = (currentQuestion as any).correctAnswer === answer;
		}
		// For advanced types we rely on renderer to set correctness via answer object
		if (typeof answer === "object" && "__isCorrect" in answer) {
			isCorrect = !!answer.__isCorrect;
		}
		const newAnswer: UserAnswer = {
			questionId: currentQuestion.id,
			answer,
			isCorrect,
		};

		setUserAnswers((prev) => [...prev.filter((a) => a.questionId !== currentQuestion.id), newAnswer]);
		setIsAnswered(true);
		setShowExplanation(true);
	};

	const getCurrentAnswer = () => {
		return userAnswers.find((a) => a.questionId === currentQuestion?.id);
	};

	const getCorrectAnswers = () => {
		return userAnswers.filter((a) => a.isCorrect).length;
	};

	const getScorePercentage = () => {
		if (userAnswers.length === 0) return 0;
		return Math.round((getCorrectAnswers() / userAnswers.length) * 100);
	};

	if (!currentQuestion) {
		return (
			<div className="h-screen flex items-center justify-center">
				<div className="text-center space-y-4">
					<p className="text-xl">No questions available for this course.</p>
					<Button asChild>
						<Link href={`/courses/${course.id}`}>Back to Course</Link>
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col">
			{/* Custom Toolbar - Full Screen Learning Interface */}
			<header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-4 md:px-6 py-3 md:py-4 shadow-sm">
				<div className="flex justify-between items-center">
					<div className="flex items-center space-x-4">
						<Button asChild variant="ghost" size="sm" className="hover:bg-gray-100">
							<Link href={`/courses/${course.id}`}>
								<ArrowLeft className="mr-2 h-4 w-4" />
								Exit
							</Link>
						</Button>
						<div className="h-6 w-px bg-gray-300" />
						<span className="font-semibold text-gray-700">{course.title}</span>
					</div>

					<div className="flex-1 flex items-center justify-center max-w-2xl space-x-4">
						<span className="text-sm font-medium text-gray-600 whitespace-nowrap">
							Question {currentQuestionIndex + 1} of {totalQuestions}
						</span>
						<div className="flex-1 flex flex-col space-y-1">
							<Progress value={progress} className="h-3 bg-gray-200" />
							{/* Mini-map for large question sets */}
							{totalQuestions > 20 && (
								<div className="flex justify-center">
									<div className="flex space-x-px max-w-xs overflow-hidden">
										{Array.from({ length: Math.min(50, totalQuestions) }, (_, i) => {
											const actualIndex = Math.floor((i / Math.min(50, totalQuestions)) * totalQuestions);
											const answered = userAnswers.find((a) => a.questionId === allQuestions[actualIndex]?.id);
											const isCurrent = Math.abs(actualIndex - currentQuestionIndex) <= Math.floor(totalQuestions / Math.min(50, totalQuestions)) / 2;
											return (
												<div
													key={i}
													className={`w-1 h-2 cursor-pointer transition-all duration-200 ${isCurrent ? "bg-primary" : answered ? (answered.isCorrect ? "bg-green-400" : "bg-red-400") : "bg-gray-300"}`}
													onClick={() => {
														setCurrentQuestionIndex(actualIndex);
														setShowExplanation(false);
														setIsAnswered(false);
													}}
													title={`Jump to question ${actualIndex + 1}`}
												/>
											);
										})}
									</div>
								</div>
							)}
						</div>
						<span className="text-sm font-medium text-primary whitespace-nowrap">{Math.round(progress)}%</span>
					</div>

					<div className="flex items-center space-x-4">
						<div className="text-right">
							<div className="text-sm font-medium text-gray-700">
								Score: {getCorrectAnswers()}/{userAnswers.length}
							</div>
							{userAnswers.length > 0 && <div className="text-xs text-gray-500">{getScorePercentage()}% correct</div>}
						</div>
					</div>
				</div>
			</header>

			{/* Main content */}
			<div className="flex-1 flex flex-col">
				<div className="flex-1 overflow-y-auto flex items-center justify-center p-4 md:p-8">
					<Card className="w-full max-w-4xl md:min-h-[400px]">
						<CardContent className="p-8">
							<div className="space-y-8 h-full flex flex-col">
								<div className="text-center">
									<div className="mb-6 space-y-2 text-center">
										<h1 className="text-2xl font-bold leading-relaxed">{currentQuestion.title ?? currentQuestion.question ?? "Untitled Question"}</h1>
										{currentQuestion.description && <p className="text-muted-foreground max-w-2xl mx-auto">{currentQuestion.description}</p>}
									</div>
								</div>

								<QuestionRenderer question={currentQuestion} onAnswer={handleAnswer} isAnswered={isAnswered} userAnswer={getCurrentAnswer()?.answer} showFeedback={showExplanation} />

								{showExplanation && (
									<Alert variant={getCurrentAnswer()?.isCorrect ? "default" : "destructive"}>
										{getCurrentAnswer()?.isCorrect ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
										<AlertTitle>{getCurrentAnswer()?.isCorrect ? "Correct!" : "Incorrect"}</AlertTitle>
										<AlertDescription>{currentQuestion.explanation}</AlertDescription>
									</Alert>
								)}
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Enhanced Navigation Bar */}
				<div className="sticky bottom-0 z-30 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-4 md:p-6 shadow-lg">
					<div className="flex justify-between items-center">
						<Button onClick={handlePrevious} disabled={currentQuestionIndex === 0} variant="outline" className="min-w-[100px] disabled:opacity-50">
							<ArrowLeft className="mr-2 h-4 w-4" />
							Previous
						</Button>

						{/* Enhanced Progress Indicators */}
						<div className="flex flex-col items-center space-y-2">
							<div className="text-xs text-gray-500 font-medium">Progress Overview</div>
							<div className="flex items-center space-x-4">
								{/* Segmented Progress Bar for Large Question Sets */}
								{totalQuestions > 50 ? (
									<div className="flex flex-col items-center space-y-1">
										<div className="flex space-x-1">
											{Array.from({ length: Math.min(20, Math.ceil(totalQuestions / 10)) }, (_, segmentIndex) => {
												const segmentStart = segmentIndex * Math.ceil(totalQuestions / Math.min(20, Math.ceil(totalQuestions / 10)));
												const segmentEnd = Math.min(segmentStart + Math.ceil(totalQuestions / Math.min(20, Math.ceil(totalQuestions / 10))), totalQuestions);
												const segmentQuestions = allQuestions.slice(segmentStart, segmentEnd);
												const segmentAnswered = segmentQuestions.filter((q) => userAnswers.find((a) => a.questionId === q.id));
												const segmentCorrect = segmentAnswered.filter((a) => userAnswers.find((ua) => ua.questionId === a.id)?.isCorrect);
												const isCurrentSegment = currentQuestionIndex >= segmentStart && currentQuestionIndex < segmentEnd;

												let segmentColor = "bg-gray-300";
												if (segmentAnswered.length === segmentQuestions.length) {
													// All answered - show based on correctness ratio
													const correctRatio = segmentCorrect.length / segmentQuestions.length;
													segmentColor = correctRatio >= 0.8 ? "bg-green-500" : correctRatio >= 0.5 ? "bg-yellow-500" : "bg-red-500";
												} else if (segmentAnswered.length > 0) {
													segmentColor = "bg-blue-400"; // Partially answered
												}

												return (
													<div
														key={segmentIndex}
														className={`w-3 h-8 rounded-sm cursor-pointer transition-all duration-200 hover:scale-110 ${isCurrentSegment ? `${segmentColor} ring-2 ring-primary/50 ring-offset-1` : segmentColor}`}
														onClick={() => {
															setCurrentQuestionIndex(segmentStart);
															setShowExplanation(false);
															setIsAnswered(false);
														}}
														title={`Questions ${segmentStart + 1}-${segmentEnd} (${segmentAnswered.length}/${segmentQuestions.length} answered)`}
													/>
												);
											})}
										</div>
										<div className="text-xs text-gray-500">Segments ({Math.ceil(totalQuestions / Math.min(20, Math.ceil(totalQuestions / 10)))} questions each)</div>
									</div>
								) : (
									/* Individual dots for smaller question sets */
									<div className="flex space-x-1 overflow-x-auto max-w-md">
										{Array.from({ length: totalQuestions }, (_, i) => {
											const answered = userAnswers.find((a) => a.questionId === allQuestions[i]?.id);
											return (
												<div
													key={i}
													className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-200 hover:scale-110 ${i === currentQuestionIndex ? "bg-primary ring-2 ring-primary/50 ring-offset-1" : answered ? (answered.isCorrect ? "bg-green-500" : "bg-red-500") : "bg-gray-300 hover:bg-gray-400"}`}
													onClick={() => {
														setCurrentQuestionIndex(i);
														setShowExplanation(false);
														setIsAnswered(false);
													}}
													title={`Question ${i + 1}${answered ? ` - ${answered.isCorrect ? "Correct" : "Incorrect"}` : ""}`}
												/>
											);
										})}
									</div>
								)}

								{/* Quick Navigation for Large Sets */}
								{totalQuestions > 50 && (
									<div className="flex items-center space-x-2">
										<Button
											variant="outline"
											size="sm"
											onClick={() => {
												const jumpTo = Math.max(0, currentQuestionIndex - 10);
												setCurrentQuestionIndex(jumpTo);
												setShowExplanation(false);
												setIsAnswered(false);
											}}
											disabled={currentQuestionIndex < 10}
											className="text-xs px-2 py-1"
										>
											-10
										</Button>
										<span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">
											{currentQuestionIndex + 1}/{totalQuestions}
										</span>
										<Button
											variant="outline"
											size="sm"
											onClick={() => {
												const jumpTo = Math.min(totalQuestions - 1, currentQuestionIndex + 10);
												setCurrentQuestionIndex(jumpTo);
												setShowExplanation(false);
												setIsAnswered(false);
											}}
											disabled={currentQuestionIndex > totalQuestions - 11}
											className="text-xs px-2 py-1"
										>
											+10
										</Button>
									</div>
								)}
							</div>
						</div>

						<Button onClick={handleNext} disabled={!isAnswered} className="min-w-[100px] disabled:opacity-50">
							{currentQuestionIndex === totalQuestions - 1 ? "Finish" : "Next"}
							<ArrowRight className="ml-2 h-4 w-4" />
						</Button>
					</div>
				</div>
			</div>

			{/* Completion Dialog */}
			<Dialog open={isCompleteOpen} onOpenChange={setIsCompleteOpen}>
				<DialogContent className="sm:max-w-lg">
					<DialogHeader className="text-center space-y-4">
						<div className="mx-auto">
							<CheckCircle className="h-16 w-16 text-green-500" />
						</div>
						<DialogTitle className="text-2xl">Course Complete!</DialogTitle>
						<DialogDescription className="text-lg">Congratulations! You&apos;ve completed {course.title}</DialogDescription>
					</DialogHeader>
					<div className="space-y-6 text-center">
						<div className="space-y-2">
							<p className="text-2xl font-bold">Final Score: {getScorePercentage()}%</p>
							<p className="text-muted-foreground">
								{getCorrectAnswers()} correct out of {userAnswers.length} questions
							</p>
						</div>
						<div className="flex space-x-4 w-full">
							<Button asChild variant="outline" className="flex-1">
								<Link href={`/courses/${course.id}`}>Back to Course</Link>
							</Button>
							<Button asChild className="flex-1">
								<Link href="/dashboard">Dashboard</Link>
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
