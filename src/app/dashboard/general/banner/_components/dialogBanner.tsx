import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import FormBanner from "./formBanner";

interface DialogBannerProps {
    title: string
    subTitle: string
    open: boolean
    onClose : ()  => void
}

export default function DialogBanner({title,subTitle,open,onClose} : DialogBannerProps) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
         <DialogHeader>
                    <DialogTitle>
                    {title}
                    </DialogTitle>
                    <DialogDescription>
                        {subTitle}
                    </DialogDescription>
                </DialogHeader>
                <FormBanner />
            </DialogContent>
        </Dialog>
    )
}