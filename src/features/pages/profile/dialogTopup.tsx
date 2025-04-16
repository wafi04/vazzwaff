import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface DialogTopUpProps {
    open : boolean
    headerText? : string
    subHeaderText? : string
    onOpen : () => void
    isMembership? : boolean
    onClose : ()  => void
}


export default function DialogTopUp({headerText,subHeaderText,onClose,onOpen,open} : DialogTopUpProps){
    return (
        <Dialog open={open}  onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{headerText}</DialogTitle>       
                    <DialogDescription>{subHeaderText}</DialogDescription>       
                </DialogHeader>
                <div>
                    
                </div>
            </DialogContent>
        </Dialog>
    )
}