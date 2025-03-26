'use client'

export default function SuccessfullApplication() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 bg-white text-center animate-fadeIn">
      {/* 🎉 Emoji */}
      <div className="text-6xl mb-4 animate-bounce">🎉</div>

      {/* Title */}
      <h1 className="text-3xl font-extrabold text-blue-600 mb-2">
        Application Submitted!
      </h1>

      {/* Description */}
      <p className="text-gray-700 text-lg">
        Your application has been received and is under review.
      </p>
      <p className="text-gray-600 mt-1">
        You will receive an email once it is approved.
      </p>

      {/* Back to Dashboard Button */}
      <button
        className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow-md transition-all duration-300 hover:bg-green-700 hover:scale-105"
        onClick={() => window.location.href = "/dashboard"} 
      >
        Go to Dashboard
      </button>
    </div>
  );
}
