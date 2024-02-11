import { useRefresher } from "@/hooks/useRefresher"
import { DataTable } from "./common/DataTable";
import { FileInfo } from "@/lib/data-types";
import { FileListColumns } from "./columns/FileListColumns";
import { useLoaderData, useParams } from "react-router-dom";
import { Torrent } from "webtorrent";
import { Button } from "@/shadui/ui/button";
import { cn } from "@/lib/utils";

export const FilesList = () =>{
    const torrent = useLoaderData();
    const files = torrent?.files?.map(file=> new FileInfo(file));
    useRefresher();
    return (<>
        <FilesView/>
        <DataTable columns={FileListColumns} data={files}/>
    </>)
}


export const FilesView = () =>{
    const torrent:Torrent = useLoaderData();
    return (
        <div className={cn("flex","justify-start","items-center" ,"gap-8" ,"mt-10", "border-4", "p-4")}>
            <Button>Go back to Torrents List</Button>
            <h2>{torrent?.name}</h2>
        </div>
    )
}