import { DataTable } from "./common/DataTable";
import { webTorrentClient } from "@/lib/singleton";
import { TorrentListColumns } from "./columns";
import { TorrentInfo } from "@/lib/data-types";
import { useRefresher } from "@/hooks/useRefresher";

// const torrentInfoList = webTorrentClient.torrents.map(
//   (torrent) => new TorrentInfo(torrent)
// );
// const torrents = webTorrentClient.torrents;
export function TorrentList() {
  useRefresher();

  const torrentInfoList = webTorrentClient.torrents.map(torrent => new TorrentInfo(torrent));
  // const torrentInfoList = torrents.map(torrent=>new TorrentInfo(torrent))
  return (
    <DataTable columns={TorrentListColumns} data={torrentInfoList} />
  );
}
