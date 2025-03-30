"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Add Router for redirection
import Image from "next/image";
import { motion } from "framer-motion";
import { getCourseById } from "../../actions";
import { useParams } from "next/navigation";
import Navbar from "@/app/components/Navbar";

interface Course {
  id: string;
  name: string;
  duration?: string;
  image_url?: string;
  course_type?: string;
  credits?: number;
  prerequisites?: string;
  clinical_hours_required?: number;
  research_component?: boolean;
  fee?: number;
  fee_structure_url?: string;
  start_date?: string;
}

export default function CourseDetail() {
  const id = useParams()?.id as string;
  const router = useRouter(); // ✅ Use Next.js Router for navigation
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    async function fetchCourse() {
      try {
        const data = await getCourseById(id);
        setCourse(data);
      } catch (error) {
        console.error("Failed to load course:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <motion.div
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-center text-red-500 text-xl font-semibold">
          Course not found.
        </p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div>
        {/* Split Header with Image on Right */}
        <header className="relative bg-gradient-to-r from-blue-600 to-teal-500 text-white py-20 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Left Side - Course Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center md:text-left"
            >
              <h1 className="text-4xl sm:text-5xl font-bold">{course.name}</h1>
              <p className="mt-2 text-lg">{course.course_type || "No type provided"}</p>

              {/* Course Summary */}
              <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4 text-lg">
                <span className="bg-white/20 px-4 py-2 rounded-lg">⏳ {course.duration || "Unknown"}</span>
                <span className="bg-white/20 px-4 py-2 rounded-lg">📅 {course.start_date || "TBD"}</span>
                <span className="bg-white/20 px-4 py-2 rounded-lg">💰 ${course.fee || "N/A"}</span>
                <span className="bg-white/20 px-4 py-2 rounded-lg">🎓 {course.credits || "N/A"} Credits</span>
              </div>
            </motion.div>

            {/* Right Side - Course Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-lg"
            >
              <Image
                src={course.image_url || "/default-course.jpg"}
                alt={course.name || "Course image"}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </div>
        </header>

        {/* Course Details Section */}
        <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
          {/* What You’ll Learn */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">What You’ll Learn:</h2>
              <ul className="mt-4 space-y-3 text-gray-700 dark:text-gray-300">
                {course.prerequisites ? (
                  <li>✅ {course.prerequisites}</li>
                ) : (
                  <li>✅ Foundational & advanced front-end techniques</li>
                )}
                <li>✅ Hands-on experience with React, Next.js, and Tailwind CSS</li>
                <li>✅ Mastering UI/UX best practices</li>
                <li>✅ {course.research_component ? "Includes research-based learning" : "Project-based learning"}</li>
              </ul>
            </motion.div>
          </section>

          {/* Additional Course Details */}
          <section className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Additional Information</h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300">
              <p><strong>🩺 Clinical Hours:</strong> {course.clinical_hours_required || "N/A"} hrs</p>
              <p><strong>🔬 Research Component:</strong> {course.research_component ? "Yes" : "No"}</p>
              {course.fee_structure_url && (
                <a
                  href={course.fee_structure_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                >
                  View Fee Structure →
                </a>
              )}
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <p className="text-gray-800 dark:text-gray-300 text-lg">📅 Deadline: <strong>April 28, 2025</strong></p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push(`/university/apply?courseId=${course.id}`)} // ✅ Redirect with course ID
              className="mt-4 bg-green-500 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-green-600 transition-all"
            >
              Apply Now 🚀
            </motion.button>
          </section>
        </div>
      </div>
    </>
  );
}
