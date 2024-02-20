import { useRefresher } from "@/hooks/useRefresher"
import { DataTable } from "./common/DataTable";
import { FileInfo } from "@/lib/data-types";
import { FileListColumns } from "./columns/FileListColumns";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Torrent } from "webtorrent";
import { Button } from "@/shadui/ui/button";
import { cn } from "@/lib/utils";
import { useCallback } from "react";
import { ChevronLeftIcon } from "lucide-react";

export const FilesList = ({torrent}) =>{
    useRefresher();
    const files = torrent?.files?.map(file=> new FileInfo(file));
    return <DataTable columns={FileListColumns} data={files}/>;
} 

export const FilesView = () =>{
    const navigate = useNavigate();
    const torrent: Torrent = useLoaderData();
    const navigateToTorrentsView = useCallback(()=>{
        navigate("/dashboard");
    },[navigate])

    return (
        <>
        <div className={cn("flex","justify-items-start","items-center" , "my-4")}>
            <Button className={cn(
                "bg-blue-700",
                "hover:bg-blue-600",
                "text-white",
                "font-semibold"
              )} 
              onClick={navigateToTorrentsView}
            >
                <ChevronLeftIcon/>
                 Torrents List
            </Button>
            <h1 className={cn("font-bold", "text-3xl", "text-blue-950", "text-center", "flex-1")}>{torrent?.name}</h1>
        </div>
        <FilesList torrent={torrent}/>
        </>
    )
}