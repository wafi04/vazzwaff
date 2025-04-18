import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FormMethods } from "./form-methods"
import { CreateMethod } from "@/schemas/methods"

interface DialogMethodsProps {
    open: boolean
    onClose: () => void
    title: string
    description: string
    onSubmit: (data : CreateMethod) => void
}
export default function DialogMethods({open,onClose,title,description,onSubmit} : DialogMethodsProps) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
                    <DialogDescription className="flex flex-col gap-4">
                       {description}
                    </DialogDescription>
                </DialogHeader>
                <FormMethods onSubmit={onSubmit}/>
            </DialogContent>
        </Dialog>
    )
}