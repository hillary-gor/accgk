"use client"; // ✅ Required for Client Components

import Link from "next/link";

interface LegalPageItem {
  title: string;
  slug: string;
}

interface LegalSidebarProps {
  pages: LegalPageItem[];
  currentSlug: string;
}

export default function LegalSidebar({ pages, currentSlug }: LegalSidebarProps) {
  return (
    <aside className="lg:w-1/4 border-r pr-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Legal Policies</h2>
      <nav>
        <ul className="space-y-2">
          {pages.map((policy) => (
            <li key={policy.slug}>
              <Link
                href={`/legal/${policy.slug}`}
                className={`block p-2 rounded-md transition ${
                  policy.slug === currentSlug
                    ? "bg-blue-600 text-white font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {policy.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
