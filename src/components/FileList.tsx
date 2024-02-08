import { useRefresher } from "@/hooks/useRefresher"
import { DataTable } from "./common/DataTable";
import { FileInfo } from "@/lib/data-types";
import { FileListColumns } from "./columns/FileListColumns";
import { webTorrentClient } from "@/singleton";
FileListColumns
export const FileList = (torrentId) =>{
    useRefresher();
    const file = webTorrentClient.get(torrentId).then()
    return <DataTable columns={FileListColumns} data={}/>
}