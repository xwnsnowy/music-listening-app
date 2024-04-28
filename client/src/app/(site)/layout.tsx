import MainContent from "@/components/MainContent/MainContent";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MainContent> {children}</MainContent>;
}
