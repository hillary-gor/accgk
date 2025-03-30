import { fetchCourses, Course } from "../actions/actions";

export default async function CoursesPage() {
  const courses: Course[] = await fetchCourses();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Available Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course.id} className="bg-white shadow-md rounded-lg p-4 border">
              <h2 className="text-xl font-semibold">{course.name}</h2>
              <p className="text-gray-600">Credits: {course.credits}</p>
              <p className="text-gray-600">Type: {course.course_type}</p>
              <p className="text-gray-600">Fee: ${course.fee ?? "N/A"}</p>
              <a
                href={`/university/courses/${course.id}`}
                className="mt-4 block text-blue-500 hover:underline"
              >
                View Details
              </a>
            </div>
          ))
        ) : (
          <p>No courses available.</p>
        )}
      </div>
    </div>
  );
}
