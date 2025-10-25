// app/dashboard/caregiver/education/page.tsx
import { getCaregiverEducationRecords } from "./actions";
import EducationList from "./components/EducationList";
import AddEducationDialog from "./components/AddEducationDialog";

export default async function CaregiverEducationPage() {
  const { success, data, message } = await getCaregiverEducationRecords();

  return (
    <div className="flex flex-col min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-100">
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-8 md:py-12 space-y-10">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-4 sticky top-0 bg-white/80 backdrop-blur-md z-10">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight">
              Education Records
            </h1>
            <p className="text-gray-600 text-sm md:text-base mt-1">
              Add, manage, and view your educational background.
            </p>
          </div>

          {/* Floating Add button on small screens */}
          <div className="flex justify-end">
            <AddEducationDialog />
          </div>
        </div>

        {/* Records Section */}
        <section className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 p-5 sm:p-8">
          {!success ? (
            <p className="text-gray-500 text-center">{message}</p>
          ) : (
            <EducationList records={data || []} />
          )}
        </section>
      </main>
      
    </div>
  );
}
