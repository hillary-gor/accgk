"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, X, FileText, ImageIcon, File } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  onUpload: (files: File[]) => Promise<void>
  accept?: string
  multiple?: boolean
  maxSize?: number // in MB
  className?: string
  buttonText?: string
  dragActiveText?: string
  dragInactiveText?: string
}

export function FileUpload({
  onUpload,
  accept = "*",
  multiple = false,
  maxSize = 5, // 5MB default
  className,
  buttonText = "Upload File",
  dragActiveText = "Drop files here",
  dragInactiveText = "Drag and drop files here, or click to browse",
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [progress, setProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const validateFiles = (fileList: FileList | File[]) => {
    const validFiles: File[] = []
    const maxSizeBytes = maxSize * 1024 * 1024 // Convert MB to bytes

    Array.from(fileList).forEach((file) => {
      if (file.size > maxSizeBytes) {
        setError(`File "${file.name}" exceeds the maximum size of ${maxSize}MB`)
        return
      }

      if (accept !== "*") {
        const acceptTypes = accept.split(",").map((type) => type.trim())
        const fileType = file.type || `application/${file.name.split(".").pop()}`

        const isAccepted = acceptTypes.some((type) => {
          if (type.endsWith("/*")) {
            const category = type.replace("/*", "")
            return fileType.startsWith(category)
          }
          return type === fileType
        })

        if (!isAccepted) {
          setError(`File "${file.name}" is not an accepted file type`)
          return
        }
      }

      validFiles.push(file)
    })

    return validFiles
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    setError(null)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const validFiles = validateFiles(e.dataTransfer.files)
      if (validFiles.length > 0) {
        if (multiple) {
          setFiles((prev) => [...prev, ...validFiles])
        } else {
          setFiles(validFiles.slice(0, 1))
        }
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    if (e.target.files && e.target.files.length > 0) {
      const validFiles = validateFiles(e.target.files)
      if (validFiles.length > 0) {
        if (multiple) {
          setFiles((prev) => [...prev, ...validFiles])
        } else {
          setFiles(validFiles.slice(0, 1))
        }
      }
    }
  }

  const handleUpload = async () => {
    if (files.length === 0) return

    setIsUploading(true)
    setProgress(0)

    try {
      // Simulate progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            clearInterval(interval)
            return 95
          }
          return prev + 5
        })
      }, 100)

      await onUpload(files)

      clearInterval(interval)
      setProgress(100)

      // Reset after successful upload
      setTimeout(() => {
        setFiles([])
        setProgress(0)
      }, 1000)
    } catch (error) {
      setError("Upload failed. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const getFileIcon = (file: File) => {
    const type = file.type

    if (type.startsWith("image/")) {
      return <ImageIcon className="h-5 w-5" />
    } else if (type.includes("pdf")) {
      return <FileText className="h-5 w-5" />
    } else {
      return <File className="h-5 w-5" />
    }
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
          isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-muted-foreground/50",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
        />
        <div className="flex flex-col items-center gap-2">
          <Upload className="h-10 w-10 text-muted-foreground" />
          <p className="text-sm font-medium">{isDragging ? dragActiveText : dragInactiveText}</p>
          <p className="text-xs text-muted-foreground">Maximum file size: {maxSize}MB</p>
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Selected Files:</p>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li key={index} className="flex items-center justify-between rounded-md border p-2 text-sm">
                <div className="flex items-center gap-2">
                  {getFileIcon(file)}
                  <span className="truncate max-w-[200px]">{file.name}</span>
                  <span className="text-xs text-muted-foreground">({(file.size / 1024 / 1024).toFixed(2)}MB)</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFile(index)
                  }}
                  disabled={isUploading}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove file</span>
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isUploading && (
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-right text-muted-foreground">{progress}% uploaded</p>
        </div>
      )}

      {files.length > 0 && !isUploading && (
        <Button onClick={handleUpload} className="w-full">
          {buttonText}
        </Button>
      )}
    </div>
  )
}
