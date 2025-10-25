"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EducationForm from "./EducationForm";

export default function AddEducationDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Education</Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Education Details</DialogTitle>
        </DialogHeader>
        <EducationForm />
      </DialogContent>
    </Dialog>
  );
}
