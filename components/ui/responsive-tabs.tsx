"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface Tab {
  value: string
  label: string
  content: React.ReactNode
}

interface ResponsiveTabsProps {
  tabs: Tab[]
  defaultValue?: string
  className?: string
  tabsListClassName?: string
  tabsContentClassName?: string
}

export function ResponsiveTabs({
  tabs,
  defaultValue,
  className,
  tabsListClassName,
  tabsContentClassName,
}: ResponsiveTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue || tabs[0]?.value)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  return (
    <div className={className}>
      {isMobile ? (
        <div className="space-y-4">
          <Select value={activeTab} onValueChange={handleTabChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select a tab" />
            </SelectTrigger>
            <SelectContent>
              {tabs.map((tab) => (
                <SelectItem key={tab.value} value={tab.value}>
                  {tab.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className={tabsContentClassName}>{tabs.find((tab) => tab.value === activeTab)?.content}</div>
        </div>
      ) : (
        <Tabs defaultValue={activeTab} onValueChange={handleTabChange}>
          <TabsList className={cn("w-full", tabsListClassName)}>
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="flex-1">
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className={tabsContentClassName}>
            {tabs.map((tab) => (
              <TabsContent key={tab.value} value={tab.value}>
                {tab.content}
              </TabsContent>
            ))}
          </div>
        </Tabs>
      )}
    </div>
  )
}
