import { toast } from "sonner"
import { useRevokeAllSessions, useRevokeSession } from "../api/sesssion"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Loader2 } from "lucide-react"

interface DialogRevokeSessionProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  message: string
  sessionId?: string
}

export default function DialogRevokeSession({
  message,
  open,
  onOpenChange,
  title,
  sessionId
}: DialogRevokeSessionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const revokeSession = useRevokeSession()
  
  const revokeAllSession = useRevokeAllSessions()

  const handleRevoke = () => {
    setIsSubmitting(true)
    
    if (sessionId) {
      revokeSession.mutate(sessionId)
    } else {
      revokeAllSession.mutate()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#001d58] border border-blue-900 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">{title}</DialogTitle>
          <DialogDescription className="text-blue-200 mt-2">
            {message}
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="mt-6 flex gap-3 sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-blue-700 bg-transparent text-blue-100 hover:bg-[#002966] hover:text-white"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleRevoke}
            disabled={isSubmitting}
            className="bg-red-900/80 text-white hover:bg-red-800 focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-[#001d58]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Revoking...
              </>
            ) : (
              'Revoke'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}