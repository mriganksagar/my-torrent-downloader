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
import { useFilterSortDataTable } from "@/hooks/useFilterSortDataTable";

const FileList = ({torrent}:{torrent: Torrent}) =>{
    useRefresher();
    const data = torrent?.files?.map(file=> new FileInfo(file));
    return <FileListDataTable data={data}/>;
} 

const FileListDataTable = ({data}: {data: FileInfo[]}) =>{
    const table = useFilterSortDataTable({ data: data, columns: FileListColumns });
    return <DataTable table={table}/>;
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
            <Button 
              variant="link"
              className={cn(
                "hover:bg-blue-50",
                "text-blue-950",
                "font-semibold",
                "text-left",
                "pl-0",
                "hover:no-underline"
              )} 
              onClick={navigateToTorrentsView}
            >
                <ChevronLeftIcon/>
                 Torrents List
            </Button>
            <h1 className={cn("font-bold", "text-xl", "sm:text-2xl", "sm:absolute", "sm:left-1/2", "sm:-translate-x-1/2", "text-blue-950", "text-center", "flex-1")}>{torrent?.name}</h1>
        </div>
        <FileList torrent={torrent}/>
        </>
    )
}