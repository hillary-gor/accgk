import Link from 'next/link';
import { getLegalPages } from '@/app/legal/actions';

export default async function LegalPages() {
  const pages = await getLegalPages();

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">
        📜 Legal Policies
      </h1>
      <p className="text-gray-600 text-lg text-center mb-6">
        Browse our policies to understand your rights and responsibilities.
      </p>
      
      <div className="bg-white shadow-lg rounded-lg p-6">
        <ul className="divide-y divide-gray-200">
          {pages.map((page) => (
            <li key={page.slug} className="py-4">
              <Link
                href={`/legal/${page.slug}`}
                className="flex items-center justify-between text-lg font-medium text-blue-600 hover:text-blue-800 transition duration-300"
              >
                <span>{page.title}</span>
                <span className="text-gray-400">&rarr;</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
