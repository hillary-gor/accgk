"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProcessTab from "./process-tab"
import StandardsTab from "./standards-tab"
import InstitutionsTab from "./institutions-tab"

export default function AccreditationTabs() {
  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold text-accgk-blue mb-8 text-center">Accreditation Information</h2>
      <Tabs defaultValue="process" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="process">Accreditation Process</TabsTrigger>
          <TabsTrigger value="standards">Accreditation Standards</TabsTrigger>
          <TabsTrigger value="institutions">Accredited Institutions</TabsTrigger>
        </TabsList>
        <TabsContent value="process">
          <ProcessTab />
        </TabsContent>
        <TabsContent value="standards">
          <StandardsTab />
        </TabsContent>
        <TabsContent value="institutions">
          <InstitutionsTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
