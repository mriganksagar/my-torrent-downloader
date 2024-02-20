import { cn } from "@/lib/utils";
import { PirateLogo } from "@/assets";
import { AddTorrent } from "./AddTorrent";

export const Header = () => {
    return (
        <div
            className={cn(
                "h-24",
                "w-screen",
                "bg-blue-950",
                "flex",
                "justify-between",
                "items-center",
                "p-4",
                "gap-2"
            )}
        >
            <PirateLogo className={cn("sm:size-20", "xsm:size-10")}/>
            <h1 className={cn("sm:text-2xl","xsm:text-lg","font-bold", "text-center", "text-sky-100")}>
                Torrent Downloader
            </h1>
            <AddTorrent />
        </div>
    );
};
