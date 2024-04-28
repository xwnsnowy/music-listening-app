export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-bgElevatedBase to-black">
      {children}
    </div>
  );
}
