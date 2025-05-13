"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"
import { PageHeader } from "@/components/page-header"
import { ResponsiveGrid } from "@/components/responsive-grid"
import { SkeletonCard } from "@/components/ui/skeleton-card"
import { EmptyState } from "@/components/ui/empty-state"
import { BookOpen, Download, FileText, Search, Video } from "lucide-react"

export default function ResourcesPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [resources, setResources] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [resourceType, setResourceType] = useState("all")

  useEffect(() => {
    if (!user) return

    const fetchResources = async () => {
      setIsLoading(true)
      try {
        // Fetch resources
        let query = supabase.from("resources").select("*")

        if (resourceType !== "all") {
          query = query.eq("type", resourceType)
        }

        const { data, error } = await query.order("created_at", { ascending: false })

        if (error) throw error
        setResources(data || [])
      } catch (error) {
        console.error("Error fetching resources:", error)
        toast({
          title: "Error",
          description: "Failed to fetch resources",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchResources()
  }, [user, toast, resourceType])

  const filteredResources = resources.filter((resource) => {
    if (!searchQuery) return true

    const query = searchQuery.toLowerCase()
    return (
      resource.title.toLowerCase().includes(query) ||
      resource.description.toLowerCase().includes(query) ||
      resource.tags?.some((tag: string) => tag.toLowerCase().includes(query))
    )
  })

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileText className="h-6 w-6" />
      case "video":
        return <Video className="h-6 w-6" />
      case "guide":
        return <BookOpen className="h-6 w-6" />
      default:
        return <FileText className="h-6 w-6" />
    }
  }

  const handleDownload = (resource: any) => {
    // In a real implementation, this would download the resource
    toast({
      title: "Download Started",
      description: `${resource.title} is being downloaded.`,
    })
  }

  return (
    <DashboardShell>
      <PageHeader
        title="Resource Library"
        description="Access educational materials, guides, and professional development resources"
      />

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search resources..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setResourceType}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="document">Documents</TabsTrigger>
            <TabsTrigger value="video">Videos</TabsTrigger>
            <TabsTrigger value="guide">Guides</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {isLoading ? (
        <ResponsiveGrid cols={{ default: 1, sm: 2, lg: 3 }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} hasHeader hasFooter contentItems={2} />
          ))}
        </ResponsiveGrid>
      ) : filteredResources.length === 0 ? (
        <EmptyState
          icon={<FileText className="h-12 w-12 text-muted-foreground" />}
          title="No resources found"
          description={
            searchQuery
              ? "No resources match your search criteria. Try a different search term."
              : "There are no resources available in this category yet."
          }
        />
      ) : (
        <ResponsiveGrid cols={{ default: 1, sm: 2, lg: 3 }}>
          {filteredResources.map((resource) => (
            <Card key={resource.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    {getResourceIcon(resource.type)}
                    <CardTitle>{resource.title}</CardTitle>
                  </div>
                  <div className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
                    {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                  </div>
                </div>
                <CardDescription>{resource.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex flex-wrap gap-1">
                  {resource.tags?.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/resources/${resource.id}`}>View Details</Link>
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDownload(resource)}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </CardFooter>
            </Card>
          ))}
        </ResponsiveGrid>
      )}
    </DashboardShell>
  )
}
