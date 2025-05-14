import { Award, BookOpen, Users, FileText, Calendar, Shield } from "lucide-react"

export function FeatureSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-teal-100 px-3 py-1 text-sm dark:bg-teal-800">Our Services</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Comprehensive Caregiving Solutions
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We provide a complete ecosystem for caregiver certification, education, and community support.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <Award className="h-12 w-12 text-teal-600" />
            <h3 className="text-xl font-bold">Certification</h3>
            <p className="text-center text-muted-foreground">
              Nationally recognized certification programs for caregivers at all levels
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <BookOpen className="h-12 w-12 text-teal-600" />
            <h3 className="text-xl font-bold">Training Courses</h3>
            <p className="text-center text-muted-foreground">
              Comprehensive curriculum covering essential caregiving skills and knowledge
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <Users className="h-12 w-12 text-teal-600" />
            <h3 className="text-xl font-bold">Community</h3>
            <p className="text-center text-muted-foreground">
              Connect with fellow caregivers for support, mentorship, and knowledge sharing
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <FileText className="h-12 w-12 text-teal-600" />
            <h3 className="text-xl font-bold">Resources</h3>
            <p className="text-center text-muted-foreground">
              Access to guides, templates, and educational materials for caregivers
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <Calendar className="h-12 w-12 text-teal-600" />
            <h3 className="text-xl font-bold">Events</h3>
            <p className="text-center text-muted-foreground">
              Workshops, webinars, and networking opportunities for professional development
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <Shield className="h-12 w-12 text-teal-600" />
            <h3 className="text-xl font-bold">Verification</h3>
            <p className="text-center text-muted-foreground">
              Employer verification system to confirm caregiver credentials
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
