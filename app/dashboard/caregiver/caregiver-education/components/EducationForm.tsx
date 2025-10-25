"use client";

import { useState } from "react";
import { toast } from "sonner";
import { addCaregiverEducation } from "../actions";

export default function EducationForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    try {
      setLoading(true);
      const result = await addCaregiverEducation(formData);

      if (result?.success) {
        toast.success("Education record saved!");
      } else {
        toast.error("Failed to save education details.");
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : typeof err === "string"
          ? err
          : "An unexpected error occurred.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      action={handleSubmit}
      className="space-y-3 border p-4 rounded-lg bg-white shadow-sm"
    >
      {/* Level */}
      <div>
        <label className="block text-sm font-medium mb-1">Level</label>
        <select
          name="level"
          required
          className="w-full border rounded-md p-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="">Select level</option>
          <option value="Primary">Primary</option>
          <option value="Secondary">Secondary</option>
          <option value="College">College</option>
          <option value="University">University</option>
          <option value="Postgraduate">Postgraduate</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Institution Name */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Institution Name
        </label>
        <input
          name="institution_name"
          required
          placeholder="Enter name of institution"
          className="w-full border rounded-md p-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {/* Qualification Obtained */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Qualification Obtained
        </label>
        <select
          name="qualification_obtained"
          required
          className="w-full border rounded-md p-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="">Select qualification</option>
          <option value="Certificate">Certificate</option>
          <option value="Diploma">Diploma</option>
          <option value="Advanced Diploma">Advanced Diploma</option>
          <option value="Degree">Degree</option>
          <option value="Postgraduate Diploma">Postgraduate Diploma</option>
          <option value="Masters">Masters</option>
          <option value="PhD">PhD</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Start/End Year */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium mb-1">Start Year</label>
          <input
            type="number"
            name="start_year"
            required
            min="1900"
            max={new Date().getFullYear() + 1}
            placeholder="e.g. 2020"
            className="w-full border rounded-md p-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">End Year</label>
          <input
            type="number"
            name="end_year"
            required
            min="1900"
            max={new Date().getFullYear() + 5}
            placeholder="e.g. 2024"
            className="w-full border rounded-md p-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
      </div>

      {/* Grade / Score */}
      <div>
        <label className="block text-sm font-medium mb-1">Grade / Score</label>
        <select
          name="grade_or_score"
          required
          className="w-full border rounded-md p-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="">Select grade / score</option>
          <option value="Distinction">Distinction</option>
          <option value="Credit">Credit</option>
          <option value="Pass">Pass</option>
          <option value="First Class">First Class</option>
          <option value="Second Class Upper">Second Class Upper</option>
          <option value="Second Class Lower">Second Class Lower</option>
          <option value="Third Class">Third Class</option>
          <option value="Merit">Merit</option>
          <option value="Fail">Fail</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* File Upload */}
      <div>
        <label className="block text-sm font-medium mb-1">Upload Files</label>
        <input
          type="file"
          name="files"
          multiple
          accept=".pdf,.jpg,.jpeg,.png"
          className="w-full text-sm"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Education"}
      </button>
    </form>
  );
}
