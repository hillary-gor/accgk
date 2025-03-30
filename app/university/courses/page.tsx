"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getCourses } from "../actions";

// ✅ Type Definition for Courses
interface Course {
  id: string;
  name: string;
  duration?: string;
  image_url?: string;
  course_type?: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadCourses() {
      try {
        const data = await getCourses();
        const validCourses = data
          .filter((course) => course.id)
          .map((course) => ({
            id: course.id ?? "",
            name: course.name ?? "Untitled Course",
            duration: course.duration ?? "Duration not available",
            image_url: course.image_url,
            course_type: course.course_type ?? "Unknown Type",
          }));
        setCourses(validCourses);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    }
    loadCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      </div>
    );
  }

  if (courses.length === 0) {
    return <p className="text-center text-gray-500">No courses available.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
        Explore Our Courses
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="relative bg-white shadow-xl rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105"
          >
            <Link href={`/university/courses/${course.id}`} className="block">
              {/* Course Image */}
              <div className="relative w-full h-52">
                <Image
                  src={
                    course.image_url?.startsWith("https")
                      ? course.image_url
                      : "https://rzprmsavgqeghpnmparg.supabase.co/storage/v1/object/public/staticimages/default.jpg"
                  }
                  alt={course.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Course Details */}
              <div className="p-5 bg-white">
                <h2 className="text-xl font-semibold text-gray-900">
                  {course.name}
                </h2>
                <p className="text-gray-600 mt-1">{course.duration}</p>

                {/* Course Type Badge */}
                <span className="inline-block mt-3 bg-blue-100 text-blue-600 text-xs font-medium px-3 py-1 rounded-full">
                  {course.course_type}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
