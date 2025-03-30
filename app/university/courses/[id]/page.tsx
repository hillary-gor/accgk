"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { getCourseById } from "../../actions";
import { useParams } from "next/navigation";

// ✅ TypeScript Interface for Strong Typing
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
}

export default function CourseDetail() {
  const id = useParams()?.id as string;
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
          className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
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
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Course Image with Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full h-[300px] sm:h-[400px] rounded-xl overflow-hidden shadow-2xl"
      >
        <Image
          src={course.image_url || "/default-course.jpg"}
          alt={course.name || "Course image"}
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Course Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="mt-8 bg-white/90 dark:bg-gray-900/80 backdrop-blur-md rounded-lg shadow-xl p-6 border border-gray-200 dark:border-gray-800"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          {course.name}
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mt-2">
          {course.course_type || "No type provided"}
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-600 dark:text-gray-400">
              <strong>⏳ Duration:</strong> {course.duration || "Unknown"}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <strong>🎓 Credits:</strong> {course.credits || "N/A"}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <strong>📖 Prerequisites:</strong> {course.prerequisites || "None"}
            </p>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400">
              <strong>🩺 Clinical Hours:</strong>{" "}
              {course.clinical_hours_required || "N/A"} hrs
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <strong>🔬 Research Component:</strong>{" "}
              {course.research_component ? "Yes" : "No"}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <strong>💰 Fee:</strong> ${course.fee || "N/A"}
            </p>
          </div>
        </div>

        {/* Fee Structure Link */}
        {course.fee_structure_url && (
          <a
            href={course.fee_structure_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-blue-600 dark:text-blue-400 font-semibold hover:underline transition-all"
          >
            View Fee Structure →
          </a>
        )}
      </motion.div>

      {/* Floating Apply Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        Apply Now 🚀
      </motion.button>
    </div>
  );
}
