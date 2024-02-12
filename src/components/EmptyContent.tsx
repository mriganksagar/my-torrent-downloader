import { cn } from "@/lib/utils"
import { FrameLogo } from "@/assets"

export const EmptyContent = () =>{
    return <div className={cn("bg-slate-100", "flex-1", "rounded-lg", "m-12", "flex", "flex-col", "items-center", "justify-center")}>
        No Files Found!
        <FrameLogo/>
    </div>
}