import { cn } from "@/lib/utils";
import { ReactNode } from "react";
export const LightContainer: React.FC<{children:ReactNode, className?:string}> = ({children, className})=>{
    const classes = cn("flex", "border-solid", "bg-rose-50", "p-4", "rounded-xl", "border-rose-100", "border-2", className); 
    return (
        <div className={classes}>{children}</div>
    )
}