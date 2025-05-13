import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function TestimonialSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-teal-100 px-3 py-1 text-sm dark:bg-teal-800">Testimonials</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Hear from Our Certified Caregivers
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover how ACCK certification has transformed caregiving careers across Kenya.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage alt="Testimonial" src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>JM</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">Jane Muthoni</CardTitle>
                  <CardDescription>Certified Elder Care Specialist</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                "ACCK certification has opened doors for me professionally. The comprehensive training prepared me for
                real-world caregiving challenges, and employers recognize the value of my credentials."
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage alt="Testimonial" src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>DO</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">David Omondi</CardTitle>
                  <CardDescription>Pediatric Care Specialist</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                "The community aspect of ACCK has been invaluable. Being able to connect with other caregivers, share
                experiences, and learn from each other has made me a better caregiver."
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage alt="Testimonial" src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>SW</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">Sarah Wanjiku</CardTitle>
                  <CardDescription>Home Health Aide</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                "The online resources and continuing education opportunities through ACCK keep me updated on best
                practices. I feel confident in my ability to provide the highest quality care."
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
