import { DataTable } from "./common/DataTable";
import { webTorrentClient } from "@/singleton";
import { TorrentListColumns } from "./columns";
import { TorrentInfo } from "@/lib/data-types";
import { useRefresher } from "@/hooks/useRefresher";

export function TorrentList() {
  useRefresher();

  const torrentInfoList = webTorrentClient.torrents.map((torrent)=> {
    console.log("torrent is ", torrent);

    const __x =  new TorrentInfo(torrent);
    console.log("torrent info is ", __x);
    return __x;
  });
  return (
    <DataTable columns={TorrentListColumns} data={torrentInfoList}/>
    // <div>basf</div>
  );
}
