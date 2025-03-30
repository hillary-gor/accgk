"use server";

import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Zod schema for course validation
const CourseSchema = z.object({
  id: z.string(),
  name: z.string(),
  duration: z.string().optional(),
  image_url: z.string().url().optional(),
  course_type: z.string().optional(),
  credits: z.number().optional(),
  prerequisites: z.string().optional(),
  clinical_hours_required: z.number().optional(),
  research_component: z.boolean().optional(),
  fee: z.number().optional(),
  fee_structure_url: z.string().url().optional(),
});

// Fetch all courses
export async function getCourses() {
  try {
    const { data, error } = await supabase
      .from("code_blue_courses")
      .select("id, name, duration, image_url, course_type");

    if (error) throw error;

    return data.map((course) => CourseSchema.partial().parse(course));
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
}

// Fetch a single course by ID
export async function getCourseById(id: string) {
  try {
    const { data, error } = await supabase
      .from("code_blue_courses")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return CourseSchema.parse(data);
  } catch (error) {
    console.error("Error fetching course:", error);
    return null;
  }
}
