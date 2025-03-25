import { ReactNode } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
