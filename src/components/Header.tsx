import { cn } from "@/lib/utils";
import { PirateLogo } from "@/assets";
import { AddTorrent } from "./AddTorrentNew";

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
                "p-4"
            )}
        >
            <PirateLogo className={cn("sm:size-20", "xsm:size-10")}/>
            <h1 className={cn("text-2xl","font-bold" , "text-sky-100")}>
                Torrent Downloader
            </h1>
            <AddTorrent />
        </div>
    );
};
