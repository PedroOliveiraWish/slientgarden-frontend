"use client";

// app/layout.tsx
import { useEffect, useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/sidebar/Sidebar";
import "../globals.css"; // Make sure your global styles are imported

const paths = [
  { title: "journal", path: "/journal" },
  { title: "quotes", path: "/quotes" },
  { title: "garden", path: "/garden" },
  { title: "logout", path: "/logout" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<{ id: number; username: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);


  return (
    <html lang="en">
      <body className="bg-gray-100 w-full h-screen">
        <SidebarProvider>
          <AppSidebar paths={paths} user={user} />
          <main
            className="flex flex-col items-center justify-center w-full h-full"
            style={{ padding: "1rem 1rem 1rem 0" }}
          >
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
