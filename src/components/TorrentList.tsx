import { DataTable } from "./common/DataTable";
import { webTorrentClient } from "@/lib/singleton";
import { TorrentListColumns } from "./columns";
import { TorrentInfo } from "@/lib/data-types";
import { useRefresher } from "@/hooks/useRefresher";
import { EmptyContent } from "./EmptyContent";

export function TorrentList() {
  useRefresher();

  const torrentInfoList = webTorrentClient.torrents.map(torrent => new TorrentInfo(torrent));
  
  return (
    <>
      {torrentInfoList.length? <DataTable columns={TorrentListColumns} data={torrentInfoList}/> : <EmptyContent/>}
      {/* <DataTable columns={TorrentListColumns} data={torrentInfoList} /> */}
    </>
  );
}
