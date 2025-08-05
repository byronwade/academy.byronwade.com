"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<div className="text-center">
			<div className="flex flex-col items-center space-y-6 max-w-2xl mx-auto">
				<h1 className="text-5xl font-bold tracking-tight">Contractor Training Academy</h1>
				<p className="text-xl text-muted-foreground leading-relaxed">Upgrade your skills with interactive courses designed for licensed contractors. Earn continuing education credits and stay up to date with the latest codes and safety practices.</p>
				<Button asChild size="lg" className="text-lg px-8 py-6 h-auto">
					<Link href="/courses">Browse Courses</Link>
				</Button>
			</div>
		</div>
	);
}