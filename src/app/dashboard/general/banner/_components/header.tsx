import { Button } from "@/components/ui/button";
import { useState } from "react";
import DialogBanner from "./dialogBanner";

export function HeaderBanner() {
    const [open,setOpen]  = useState<boolean>(false)
    return (
      <>
    <div className="flex justify-between items-center py-4">
      <h1 className="text-2xl font-semibold">Banners</h1>
      <Button onClick={()  => setOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
        Create Banner
      </Button>
            </div>
            {
                open && (
                    <DialogBanner onClose={() => setOpen(false)} open={open}
                        title="Create Banner"
                       subTitle="Create Banner Transaction"
                    />
                )
            }
      </>
      
  );
}