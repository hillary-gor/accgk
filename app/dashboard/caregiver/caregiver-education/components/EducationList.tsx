"use client";

import { useTransition, useState } from "react";
import { toast } from "sonner";
import { useDeleteStorageFile } from "@/hooks/useDeleteStorageFile";
import { deleteEducationRecord } from "../actions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileText, GraduationCap, Calendar, Trash2, Edit3 } from "lucide-react";

type FileRecord = {
  id: string;
  file_name: string;
  file_url: string;
};

type EducationRecord = {
  id: string;
  level: string;
  institution_name: string;
  qualification_obtained: string;
  start_year: number;
  end_year: number;
  grade_or_score: string;
  caregiver_education_files?: FileRecord[];
};

type Props = {
  records: EducationRecord[];
  onEdit?: (record: EducationRecord) => void;
};

export default function EducationList({ records, onEdit }: Props) {
  const { deleteFile } = useDeleteStorageFile("caregiver_education_files");
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [dialogRecord, setDialogRecord] = useState<EducationRecord | null>(
    null
  );
  const [isPending, startTransition] = useTransition();

  if (!records?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <GraduationCap className="w-12 h-12 mb-3 text-gray-400" />
        <p>No education records added yet.</p>
      </div>
    );
  }

  async function handleDelete(record: EducationRecord) {
    startTransition(async () => {
      try {
        setPendingId(record.id);

        // Delete associated files in Supabase storage
        if (record.caregiver_education_files?.length) {
          for (const file of record.caregiver_education_files) {
            const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/caregiver_education_files/${file.file_url}`;
            await deleteFile(publicUrl);
          }
        }

        // Delete record in DB
        const res = await deleteEducationRecord(record.id);
        if (res.success) {
          toast.success("Education record deleted successfully!");
        } else {
          toast.error(res.message || "Failed to delete education record.");
        }
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : typeof err === "string"
            ? err
            : "Unexpected error occurred.";
        toast.error(message);
      } finally {
        setPendingId(null);
        setDialogRecord(null);
      }
    });
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {records.map((edu) => (
          <Card
            key={edu.id}
            className="border border-gray-200 hover:shadow-lg transition-all duration-200"
          >
            <CardHeader className="flex flex-col space-y-1.5">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {edu.institution_name}
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    {edu.qualification_obtained}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit?.(edu)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDialogRecord(edu)}
                    disabled={pendingId === edu.id || isPending}
                    className="text-red-600 hover:text-red-800 disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span>
                  {edu.start_year} - {edu.end_year}
                </span>
              </div>
              <p>
                <strong>Level:</strong> {edu.level}
              </p>
              <p>
                <strong>Grade:</strong> {edu.grade_or_score}
              </p>

              {edu.caregiver_education_files?.length ? (
                <div className="mt-3 border-t pt-3">
                  <p className="font-medium text-gray-800 flex items-center gap-2 mb-1">
                    <FileText className="w-4 h-4 text-gray-500" /> Files
                  </p>
                  <ul className="space-y-1">
                    {edu.caregiver_education_files.map((file) => (
                      <li key={file.id}>
                        <a
                          href={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/caregiver_education_files/${file.file_url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline wrap-break-word"
                        >
                          {file.file_name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!dialogRecord} onOpenChange={() => setDialogRecord(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Education Record</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-medium">
                {dialogRecord?.institution_name}
              </span>{" "}
              and all its attached files? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setDialogRecord(null)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => dialogRecord && handleDelete(dialogRecord)}
              disabled={isPending || pendingId === dialogRecord?.id}
            >
              {isPending && pendingId === dialogRecord?.id
                ? "Deleting..."
                : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
