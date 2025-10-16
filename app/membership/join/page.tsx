import PageLayout from "@/components/page-layout"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserPlus, Building } from "lucide-react"

export default function MembershipJoinPage() {
  return (
    <PageLayout
      title="Become a Member"
      description="Choose the membership type that best suits your professional needs."
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Caregiver Membership Card */}
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserPlus className="h-8 w-8 text-[color:var(--accgk-blue)]" />
              </div>
              <CardTitle className="text-2xl font-bold text-[color:var(--accgk-blue)]">Caregiver Membership</CardTitle>
              <CardDescription className="text-base">
                For individual healthcare professionals providing caregiving services
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <ul className="text-left space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-[color:var(--accgk-blue)] mr-2">•</span>
                  <span>Professional certification and recognition</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[color:var(--accgk-blue)] mr-2">•</span>
                  <span>Access to continuing education and training</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[color:var(--accgk-blue)] mr-2">•</span>
                  <span>Networking with fellow caregivers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[color:var(--accgk-blue)] mr-2">•</span>
                  <span>Career advancement opportunities</span>
                </li>
              </ul>
              <p className="text-sm text-muted-foreground mb-4">
                Annual Membership Fee: <span className="font-semibold">KES 6,000</span><br/>
                Firt Time Application Fee: <span className="font-semibold">KES 10,000</span><br/>
              </p>
              <p>
                <strong>Total: <span className="font-semibold">KES 16,000</span></strong>
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-primary hover:bg-primary/90">
                <Link href="/membership/register-caregiver">Register as a Caregiver</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Institutional Membership Card */}
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="h-8 w-8 text-[color:var(--accgk-blue)]" />
              </div>
              <CardTitle className="text-2xl font-bold text-[color:var(--accgk-blue)]">Institutional Membership</CardTitle>
              <CardDescription className="text-base">
                For healthcare facilities, training institutions, and caregiving agencies
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <ul className="text-left space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-[color:var(--accgk-blue)] mr-2">•</span>
                  <span>Institutional accreditation and recognition</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[color:var(--accgk-blue)] mr-2">•</span>
                  <span>Access to certified caregivers database</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[color:var(--accgk-blue)] mr-2">•</span>
                  <span>Discounted group certification for staff</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[color:var(--accgk-blue)] mr-2">•</span>
                  <span>Participation in setting industry standards</span>
                </li>
              </ul>
              <p className="text-sm text-muted-foreground mb-4">
                Annual Membership Fee: <span className="font-semibold">KES 50,000</span>
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-primary hover:bg-primary/90">
                <Link href="/membership/register-institution">Register Your Institution</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="bg-muted/30 rounded-lg p-6 border border-muted">
          <h3 className="text-lg font-semibold mb-2">Not sure which membership type is right for you?</h3>
          <p className="text-muted-foreground mb-4">
            Contact our membership team for guidance on selecting the appropriate membership category for your specific
            situation.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button variant="link" asChild>
              <Link href="/membership">View Membership Benefits</Link>
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
