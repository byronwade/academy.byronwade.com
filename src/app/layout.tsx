import "./globals.css";
import RecoilProvider from "@/components/providers/RecoilProvider";
import ConditionalLayout from "@/components/layout/ConditionalLayout";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head />
			<body>
				<RecoilProvider>
					<ConditionalLayout>{children}</ConditionalLayout>
				</RecoilProvider>
			</body>
		</html>
	);
}
