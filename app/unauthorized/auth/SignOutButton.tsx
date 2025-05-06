'use client'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogOverlay,
  DialogPortal,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useTransition, useState } from 'react'
import { LogOut } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function SignOutButton() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [open, setOpen] = useState(false)

  const handleConfirm = () => {
    startTransition(async () => {
      const res = await fetch('/auth/signout', { method: 'POST' })
      if (res.redirected) {
        setOpen(false)
        router.push(res.url)
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-sm font-medium text-gradient-to-r from-[#3F96E6] to-[#AB056A] hover:underline transition-all"
        >
          <LogOut className="w-4 h-4 text-[#AB056A]" />
          Sign out
        </Button>
      </DialogTrigger>

      <DialogPortal forceMount>
        <AnimatePresence>
          {open && (
            <>
              <DialogOverlay asChild>
                <motion.div
                  className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </DialogOverlay>

              <DialogContent className="z-50 max-w-sm sm:rounded-2xl p-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="flex flex-col items-center text-center"
                >
                  <LogOut className="w-8 h-8 text-[#AB056A] mb-3" />

                  <DialogHeader className="flex flex-col items-center space-y-2">
                    <DialogTitle className="text-lg font-semibold text-center bg-gradient-to-r from-[#3F96E6] to-[#AB056A] bg-clip-text text-transparent">
                      Are you sure you want to sign out?
                    </DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground text-center">
                      You’ll be redirected to the login page.
                    </DialogDescription>
                  </DialogHeader>

                  <DialogFooter className="mt-6 flex justify-center gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setOpen(false)}
                      disabled={isPending}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleConfirm}
                      disabled={isPending}
                    >
                      {isPending ? (
                        <span className="flex items-center gap-1">
                          <svg
                            className="animate-spin w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v8z"
                            />
                          </svg>
                          Signing out…
                        </span>
                      ) : (
                        'Yes, sign me out'
                      )}
                    </Button>
                  </DialogFooter>
                </motion.div>
              </DialogContent>
            </>
          )}
        </AnimatePresence>
      </DialogPortal>
    </Dialog>
  )
}
