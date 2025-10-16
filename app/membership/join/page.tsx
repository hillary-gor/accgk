import PageLayout from "@/components/page-layout";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, Building, Briefcase } from "lucide-react";

export default function MembershipJoinPage() {
  return (
    <PageLayout
      title="Become a Member"
      description="Choose the membership type that best suits your professional or institutional needs."
    >
      <div className="max-w-6xl mx-auto">
        {/* Membership Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Caregiver Membership */}
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserPlus className="h-8 w-8 text-[color:var(--accgk-blue)]" />
              </div>
              <CardTitle className="text-2xl font-bold text-[color:var(--accgk-blue)]">
                Caregiver Membership
              </CardTitle>
              <CardDescription className="text-base">
                For individual healthcare professionals providing caregiving
                services.
              </CardDescription>
            </CardHeader>

            <CardContent className="text-center">
              <ul className="text-left space-y-2 mb-6">
                <li>
                  <span className="text-[color:var(--accgk-blue)] mr-2">•</span>
                  Professional certification and recognition
                </li>
                <li>
                  <span className="text-[color:var(--accgk-blue)] mr-2">•</span>
                  Access to continuing education and training
                </li>
                <li>
                  <span className="text-[color:var(--accgk-blue)] mr-2">•</span>
                  Networking with fellow caregivers
                </li>
                <li>
                  <span className="text-[color:var(--accgk-blue)] mr-2">•</span>
                  Career advancement opportunities
                </li>
              </ul>

              <p className="text-sm text-muted-foreground mb-4">
                Annual Fee: <span className="font-semibold">KES 6,000</span>
                <br />
                First Time Application:{" "}
                <span className="font-semibold">KES 10,000</span>
                <br />
              </p>
              <p>
                <strong>
                  Total: <span className="font-semibold">KES 16,000</span>
                </strong>
              </p>
            </CardContent>

            <CardFooter>
              <Button asChild className="w-full bg-primary hover:bg-primary/90">
                <Link href="/membership/register-caregiver">
                  Register as a Caregiver
                </Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Institutional Membership */}
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="h-8 w-8 text-[color:var(--accgk-blue)]" />
              </div>
              <CardTitle className="text-2xl font-bold text-[color:var(--accgk-blue)]">
                Institutional Membership
              </CardTitle>
              <CardDescription className="text-base">
                For healthcare facilities, training institutions, and caregiving
                agencies.
              </CardDescription>
            </CardHeader>

            <CardContent className="text-center">
              <ul className="text-left space-y-2 mb-6">
                <li>
                  <span className="text-[color:var(--accgk-blue)] mr-2">•</span>
                  Institutional accreditation and recognition
                </li>
                <li>
                  <span className="text-[color:var(--accgk-blue)] mr-2">•</span>
                  Access to certified caregivers database
                </li>
                <li>
                  <span className="text-[color:var(--accgk-blue)] mr-2">•</span>
                  Discounted group certification for staff
                </li>
                <li>
                  <span className="text-[color:var(--accgk-blue)] mr-2">•</span>
                  Participation in setting industry standards
                </li>
              </ul>

              <p className="text-sm text-muted-foreground mb-4">
                Annual Fee: <span className="font-semibold">KES 50,000</span>
              </p>
            </CardContent>

            <CardFooter>
              <Button asChild className="w-full bg-primary hover:bg-primary/90">
                <Link href="/membership/register-institution">
                  Register Your Institution
                </Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Employer / Recruitment Partner Membership */}
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-[color:var(--accgk-blue)]" />
              </div>
              <CardTitle className="text-2xl font-bold text-[color:var(--accgk-blue)]">
                Employer / Recruitment Partner
              </CardTitle>
              <CardDescription className="text-base">
                For organizations or agencies hiring certified caregivers
                through ACCGK.
              </CardDescription>
            </CardHeader>

            <CardContent className="text-center">
              <ul className="text-left space-y-2 mb-6">
                <li>
                  <span className="text-[color:var(--accgk-blue)] mr-2">•</span>
                  Access to verified caregiver profiles
                </li>
                <li>
                  <span className="text-[color:var(--accgk-blue)] mr-2">•</span>
                  Post job openings directly on the ACCGK portal
                </li>
                <li>
                  <span className="text-[color:var(--accgk-blue)] mr-2">•</span>
                  Employer dashboard for managing applicants
                </li>
                <li>
                  <span className="text-[color:var(--accgk-blue)] mr-2">•</span>
                  Brand visibility and recruitment support
                </li>
              </ul>

              <p className="text-sm text-muted-foreground mb-4">
                Annual Fee: <span className="font-semibold">KES 10,000</span>
              </p>
            </CardContent>

            <CardFooter>
              <Button asChild className="w-full bg-primary hover:bg-primary/90">
                <Link href="/membership/register-employer">
                  Register as an Employer
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Help Section */}
        <div className="bg-muted/30 rounded-lg p-6 border border-muted text-center">
          <h3 className="text-lg font-semibold mb-2">
            Not sure which membership type is right for you?
          </h3>
          <p className="text-muted-foreground mb-4 max-w-2xl mx-auto">
            Contact our membership team for guidance on selecting the right
            membership category for your needs.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
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
  );
}
