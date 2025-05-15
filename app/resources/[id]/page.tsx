"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { BookOpen, Calendar, Download, FileText, Share2, ThumbsUp, Video } from "lucide-react"

export default function ResourceDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()
  const [resource, setResource] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLiked, setIsLiked] = useState(false)

  const resourceId = params.id as string

  useEffect(() => {
    if (!user) return

    const fetchResourceDetails = async () => {
      setIsLoading(true)
      try {
        // Fetch resource details
        const { data, error } = await supabase.from("resources").select("*").eq("id", resourceId).single()

        if (error) throw error
        setResource(data)

        // Check if user has liked this resource
        const { data: likeData, error: likeError } = await supabase
          .from("resource_likes")
          .select("*")
          .eq("resource_id", resourceId)
          .eq("user_id", user.id)
          .single()

        if (!likeError) {
          setIsLiked(true)
        }
      } catch (error) {
        console.error("Error fetching resource details:", error)
        toast({
          title: "Error",
          description: "Failed to fetch resource details",
          variant: "destructive",
        })
        router.push("/resources")
      } finally {
        setIsLoading(false)
      }
    }

    fetchResourceDetails()
  }, [user, resourceId, router, toast])

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileText className="h-8 w-8" />
      case "video":
        return <Video className="h-8 w-8" />
      case "guide":
        return <BookOpen className="h-8 w-8" />
      default:
        return <FileText className="h-8 w-8" />
    }
  }

  const handleDownload = () => {
    // In a real implementation, this would download the resource
    toast({
      title: "Download Started",
      description: `${resource.title} is being downloaded.`,
    })
  }

  const handleLike = async () => {
    try {
      if (isLiked) {
        // Unlike
        const { error } = await supabase
          .from("resource_likes")
          .delete()
          .eq("resource_id", resourceId)
          .eq("user_id", user?.id)

        if (error) throw error
        setIsLiked(false)
        toast({
          title: "Unliked",
          description: "You have removed your like from this resource.",
        })
      } else {
        // Like
        const { error } = await supabase.from("resource_likes").insert({
          resource_id: resourceId,
          user_id: user?.id,
          created_at: new Date().toISOString(),
        })

        if (error) throw error
        setIsLiked(true)
        toast({
          title: "Liked",
          description: "You have liked this resource.",
        })
      }
    } catch (error) {
      console.error("Error updating like status:", error)
      toast({
        title: "Error",
        description: "Failed to update like status",
        variant: "destructive",
      })
    }
  }

  const handleShare = () => {
    // In a real implementation, this would open a share dialog
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: "Link Copied",
      description: "Resource link has been copied to clipboard.",
    })
  }

  if (isLoading) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-64">
          <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        </div>
      </DashboardShell>
    )
  }

  if (!resource) {
    return (
      <DashboardShell>
        <Card>
          <CardHeader>
            <CardTitle>Resource Not Found</CardTitle>
            <CardDescription>The resource you are looking for does not exist or you don't have access.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => router.push("/resources")}>Back to Resources</Button>
          </CardFooter>
        </Card>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <Breadcrumbs
        className="mb-6"
        customSegments={{
          resources: "Resources",
          [resourceId]: resource.title,
        }}
      />

      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-start md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-start space-x-4">
            <div className="rounded-lg bg-primary/10 p-3 text-primary">{getResourceIcon(resource.type)}</div>
            <div>
              <CardTitle className="text-2xl">{resource.title}</CardTitle>
              <CardDescription className="mt-1 flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                Added on {new Date(resource.created_at).toLocaleDateString()}
              </CardDescription>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={handleLike}>
              <ThumbsUp className={`mr-2 h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
              {isLiked ? "Liked" : "Like"}
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="default" size="sm" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Description</h3>
            <p className="mt-2 text-muted-foreground whitespace-pre-line">{resource.description}</p>
          </div>

          <div>
            <h3 className="text-lg font-medium">Tags</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {resource.tags?.map((tag: string, index: number) => (
                <span key={index} className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {resource.type === "video" && resource.video_url && (
            <div>
              <h3 className="text-lg font-medium">Video</h3>
              <div className="mt-2 aspect-video overflow-hidden rounded-lg">
                <iframe
                  src={resource.video_url}
                  className="h-full w-full"
                  title={resource.title}
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          {resource.content && (
            <div>
              <h3 className="text-lg font-medium">Content</h3>
              <div className="mt-2 prose prose-sm max-w-none dark:prose-invert">
                <div dangerouslySetInnerHTML={{ __html: resource.content }} />
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push("/resources")}>
            Back to Resources
          </Button>
          <Button onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </CardFooter>
      </Card>
    </DashboardShell>
  )
}
