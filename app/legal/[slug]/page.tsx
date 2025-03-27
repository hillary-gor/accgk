import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { getLegalPages, getLegalPageBySlug } from "@/app/legal/actions";

// Define TypeScript types
interface LegalPageProps {
  params: { slug: string };
}

interface LegalPageData {
  title: string;
  content: string;
}

interface LegalPageItem {
  title: string;
  slug: string;
}

export default async function LegalPage({ params }: LegalPageProps) {
  if (!params?.slug) notFound();

  // Fetch data in parallel
  const [pages, page]: [LegalPageItem[], LegalPageData | null] = await Promise.all([
    getLegalPages(),
    getLegalPageBySlug(params.slug),
  ]);

  if (!page) notFound();

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row lg:space-x-8">
        {/* Sidebar */}
        <aside className="lg:w-1/4 border-r pr-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Legal Policies</h2>
          <nav>
            <ul className="space-y-2">
              {pages.map((policy) => (
                <li key={policy.slug}>
                  <Link
                    href={`/legal/${policy.slug}`}
                    className={`block p-2 rounded-md transition ${
                      policy.slug === params.slug
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

        {/* Main Content */}
        <main className="lg:w-3/4">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6">{page.title}</h1>

          {/* Markdown Content */}
          <article className="prose prose-lg text-gray-800 leading-relaxed max-w-none">
            <ReactMarkdown
              components={{
                h2: ({ children }) => <h2 className="text-2xl font-bold text-gray-900 mt-6">{children}</h2>,
                h3: ({ children }) => <h3 className="text-xl font-semibold text-gray-800 mt-5">{children}</h3>,
                p: ({ children }) => <p className="text-gray-700 text-lg leading-7 mt-3">{children}</p>,
                ul: ({ children }) => <ul className="list-disc pl-6 mt-3">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal pl-6 mt-3">{children}</ol>,
                a: ({ href, children }) => (
                  <a href={href} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                    {children}
                  </a>
                ),
              }}
            >
              {page.content}
            </ReactMarkdown>
          </article>
        </main>
      </div>
      <Footer />
    </>
  );
}
