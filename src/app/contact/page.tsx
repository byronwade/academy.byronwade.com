"use client";

export default function ContactPage() {
	return (
		<div className="max-w-3xl mx-auto">
			<h1 className="text-4xl font-bold mb-6">Contact Us</h1>
			<div className="space-y-4 text-lg leading-relaxed">
				<p>Have questions about courses or enterprise plans? Reach out and we will get back to you shortly.</p>
				<p>
					Email us at{" "}
					<a href="mailto:support@contractoracademy.test" className="text-primary hover:underline">
						support@contractoracademy.test
					</a>
				</p>
			</div>
		</div>
	);
}
