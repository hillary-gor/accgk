"use server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

/** Define Course Type */
export type Course = {
  id: string;
  code: string;
  name: string;
  credits: number;
  department_id: string;
  prerequisites: string | null;
  course_type: "Lecture" | "Lab" | "Clinical Rotation";
  created_at: string;
  program_requirements: string | null;
  what_you_will_learn: string | null;
  highlights: string | null;
  fee: number | null;
  fee_structure_url: string | null;
};

/** Fetch all courses from Supabase */
export async function fetchCourses(): Promise<Course[]> {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
  .schema("university")
  .from("courses")
  .select("id, code, name, credits, course_type, created_at, fee");

  if (error) {
    console.error("❌ Error fetching courses:", error.message);
    return [];
  }

  return data as Course[];
}

/** Fetch a single course by ID */
export async function fetchCourseById(courseId: string): Promise<Course | null> {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("university.courses")
    .select(
      "id, code, name, credits, course_type, created_at, program_requirements, what_you_will_learn, highlights, fee, fee_structure_url"
    )
    .eq("id", courseId)
    .single();

  if (error) {
    console.error(`Error fetching course ${courseId}:`, error.message);
    return null;
  }

  return data as Course;
}
