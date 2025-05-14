"use client"

import type React from "react"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type * as z from "zod"
import { cn } from "@/lib/utils"

interface FormValidationProps<T extends z.ZodType> {
  schema: T
  defaultValues?: z.infer<T>
  onSubmit: (values: z.infer<T>) => void
  children: (props: {
    register: ReturnType<typeof useForm<z.infer<T>>>["register"]
    formState: ReturnType<typeof useForm<z.infer<T>>>["formState"]
    errors: ReturnType<typeof useForm<z.infer<T>>>["formState"]["errors"]
    isSubmitting: boolean
    isDirty: boolean
    isValid: boolean
    handleSubmit: ReturnType<typeof useForm<z.infer<T>>>["handleSubmit"]
    reset: ReturnType<typeof useForm<z.infer<T>>>["reset"]
    watch: ReturnType<typeof useForm<z.infer<T>>>["watch"]
    setValue: ReturnType<typeof useForm<z.infer<T>>>["setValue"]
    getValues: ReturnType<typeof useForm<z.infer<T>>>["getValues"]
  }) => React.ReactNode
  className?: string
}

export function FormValidation<T extends z.ZodType>({
  schema,
  defaultValues,
  onSubmit,
  children,
  className,
}: FormValidationProps<T>) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const handleSubmit = async (values: z.infer<T>) => {
    setIsSubmitting(true)
    try {
      await onSubmit(values)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className={cn("space-y-6", className)}>
      {children({
        register: form.register,
        formState: form.formState,
        errors: form.formState.errors,
        isSubmitting,
        isDirty: form.formState.isDirty,
        isValid: form.formState.isValid,
        handleSubmit: form.handleSubmit,
        reset: form.reset,
        watch: form.watch,
        setValue: form.setValue,
        getValues: form.getValues,
      })}
    </form>
  )
}

export function FormError({ message }: { message: string }) {
  if (!message) return null

  return <p className="text-sm font-medium text-destructive mt-1">{message}</p>
}
