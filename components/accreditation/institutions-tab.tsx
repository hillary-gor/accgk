import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, MapPin, Calendar, GraduationCap } from "lucide-react"

const accreditedInstitutions = [
  {
    name: "Kenya Medical Training College - Nairobi",
    location: "Nairobi County",
    accreditationDate: "January 15, 2022",
    programs: ["Basic Caregiving Certificate", "Advanced Geriatric Care Diploma", "Pediatric Care Specialization"],
    website: "https://example.com/kmtc",
  },
  {
    name: "Mombasa Institute of Healthcare",
    location: "Mombasa County",
    accreditationDate: "March 8, 2022",
    programs: ["Professional Caregiver Certificate", "Home Healthcare Diploma", "Palliative Care Training"],
    website: "https://example.com/mih",
  },
  {
    name: "Kisumu Caregiving Academy",
    location: "Kisumu County",
    accreditationDate: "May 22, 2022",
    programs: ["Elderly Care Certificate", "Disability Support Diploma", "Community Health Worker Training"],
    website: "https://example.com/kca",
  },
  {
    name: "Eldoret Healthcare Training Institute",
    location: "Uasin Gishu County",
    accreditationDate: "August 10, 2022",
    programs: ["Basic Caregiving Certificate", "Chronic Disease Management", "Mental Health Support Training"],
    website: "https://example.com/ehti",
  },
  {
    name: "Nakuru Caregivers College",
    location: "Nakuru County",
    accreditationDate: "October 5, 2022",
    programs: [
      "Professional Caregiver Diploma",
      "Maternal and Child Health Certificate",
      "First Aid and Emergency Care",
    ],
    website: "https://example.com/ncc",
  },
  {
    name: "Nyeri Institute of Health Sciences",
    location: "Nyeri County",
    accreditationDate: "December 18, 2022",
    programs: ["Comprehensive Caregiving Diploma", "Specialized Elderly Care", "Healthcare Administration"],
    website: "https://example.com/nihs",
  },
]

export default function InstitutionsTab() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 mb-6">
        The following institutions have successfully completed ACCGK's rigorous accreditation process and are recognized
        for meeting our high standards of caregiving education and training.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {accreditedInstitutions.map((institution, index) => (
          <Card key={index} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="bg-gray-50 border-b border-gray-100">
              <h3 className="text-xl font-semibold text-[color:var(--accgk-blue)]">{institution.name}</h3>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-[color:var(--accgk-pink)] mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{institution.location}</span>
              </div>
              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-[color:var(--accgk-pink)] mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Accredited since: {institution.accreditationDate}</span>
              </div>
              <div className="flex items-start">
                <GraduationCap className="h-5 w-5 text-[color:var(--accgk-pink)] mr-2 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700 font-medium mb-1">Accredited Programs:</p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    {institution.programs.map((program, idx) => (
                      <li key={idx}>{program}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-gray-100 pt-4">
              <Button variant="outline" className="w-full text-[color:var(--accgk-blue)] border-[color:var(--accgk-blue)] hover:bg-[color:var(--accgk-blue)]/5">
                <ExternalLink className="h-4 w-4 mr-2" />
                Visit Website
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
