export default function Benefits() {
    return (
      <section className="py-12 px-6 bg-gray-100">
        <h2 className="text-3xl font-bold text-center text-gray-800">Membership Benefits</h2>
        <div className="mt-8 max-w-4xl mx-auto grid gap-6 md:grid-cols-2">
          <div className="p-6 bg-white shadow rounded-lg">
            <h3 className="text-xl font-semibold">For Caregivers</h3>
            <ul className="mt-2 text-gray-600 list-disc list-inside">
              <li>Official membership certificate</li>
              <li>Exclusive training and industry insights</li>
              <li>Priority access to networking events</li>
            </ul>
          </div>
          <div className="p-6 bg-white shadow rounded-lg">
            <h3 className="text-xl font-semibold">For Institutions</h3>
            <ul className="mt-2 text-gray-600 list-disc list-inside">
              <li>Accreditation and recognition</li>
              <li>Institutional visibility and promotion</li>
              <li>Recruitment access to top caregivers</li>
            </ul>
          </div>
        </div>
      </section>
    );
  }
  