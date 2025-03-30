import { fetchCourseById, Course } from "../../actions/actions";
import { notFound } from "next/navigation";
import Link from "next/link";

interface CoursePageProps {
  params: { id: string };
}

export default async function CourseDetailsPage({ params }: CoursePageProps) {
  const course: Course | null = await fetchCourseById(params.id);

  if (!course) return notFound();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">{course.name}</h1>
      <p className="text-gray-500">{course.course_type} | Credits: {course.credits}</p>
      <p className="text-gray-600 text-lg mt-2">{course.highlights || "No highlights available."}</p>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Programme Requirements</h2>
        <p className="text-gray-700 mt-2">{course.program_requirements || "Not specified."}</p>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold">What You’ll Learn</h2>
        <p className="text-gray-700 mt-2">{course.what_you_will_learn || "Details coming soon."}</p>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Fee Structure</h2>
        <p className="text-gray-800 font-medium mt-2">
          {course.fee ? `$${course.fee.toFixed(2)}` : "Contact us for pricing details."}
        </p>
        {course.fee_structure_url && (
          <a
            href={course.fee_structure_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            Download Fee Structure
          </a>
        )}
      </div>

      <div className="mt-8">
        <Link
          href="/university/application"
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
        >
          Apply for this Course
        </Link>
      </div>
    </div>
  );
}
