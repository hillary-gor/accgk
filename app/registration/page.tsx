"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";

export default function RegistrationSelectionPage() {
  const router = useRouter();

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Choose Your Registration Type
      </h1>
      <p className="text-gray-600 text-center mb-6">
        Select the category that best describes you to proceed with
        registration.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Caregiver Registration */}
        <div className="p-4 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Caregiver</h2>
          <p className="text-gray-500 mb-4 text-sm">
            For individuals offering professional caregiving services, such as
            home nurses, elderly caregivers, and disability care providers.
          </p>
          <ul className="text-sm text-gray-600 mb-4 list-disc pl-4">
            <li>Must have a valid caregiving certification.</li>
            <li>Minimum 18 years old.</li>
            <li>Experience in caregiving (preferred).</li>
          </ul>
          <Button
            className="w-full"
            onClick={() => router.push("/registration/caregiver")}
          >
            Register as a Caregiver
          </Button>
        </div>

        {/* Institution Registration */}
        <div className="p-4 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Institution</h2>
          <p className="text-gray-500 mb-4 text-sm">
            For organizations such as hospitals, training centers, and nursing
            homes seeking to register on the platform.
          </p>
          <ul className="text-sm text-gray-600 mb-4 list-disc pl-4">
            <li>Must provide a valid registration number.</li>
            <li>Accreditation details required.</li>
            <li>Authorized representative must complete registration.</li>
          </ul>
          <Button
            className="w-full"
            onClick={() => router.push("/registration/institution")}
          >
            Register as an Institution
          </Button>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Frequently Asked Questions
        </h2>
        <div className="border rounded-lg p-4 bg-gray-50">
          <details className="mb-4">
            <summary className="font-semibold cursor-pointer">
              What happens after I register?
            </summary>
            <p className="text-sm text-gray-600 mt-2">
              After registration, your application will be reviewed. You will
              receive a Magic Link via email for verification. Once approved,
              you will be granted access to your respective dashboard.
            </p>
          </details>

          <details className="mb-4">
            <summary className="font-semibold cursor-pointer">
              How long does the approval process take?
            </summary>
            <p className="text-sm text-gray-600 mt-2">
              The approval process typically takes 24-48 hours. If additional
              documents are required, you will be notified via email.
            </p>
          </details>

          <details className="mb-4">
            <summary className="font-semibold cursor-pointer">
              Can I update my information after registration?
            </summary>
            <p className="text-sm text-gray-600 mt-2">
              Yes. Once approved, you can log in to your dashboard and update
              your profile details.
            </p>
          </details>

          <details className="mb-4">
            <summary className="font-semibold cursor-pointer">
              What should I do if my application is rejected?
            </summary>
            <p className="text-sm text-gray-600 mt-2">
              If your application is rejected, you will receive a reason via
              email. You may appeal or resubmit your application with the
              required corrections.
            </p>
          </details>

          <details>
            <summary className="font-semibold cursor-pointer">
              I need help with registration. Who do I contact?
            </summary>
            <p className="text-sm text-gray-600 mt-2">
              You can contact our support team at{" "}
              <a
                href="mailto:support@example.com"
                className="text-blue-500 underline"
              >
                support@example.com
              </a>
              .
            </p>
          </details>
        </div>
      </div>
    </div>
  );
}
