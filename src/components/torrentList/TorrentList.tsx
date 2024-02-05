import { DataTable } from "./DataTable";
import { webTorrentClient } from "@/singleton";
import { ColumnsForTorrentList } from "./columns";
import { TorrentInfo } from "@/lib/data-types";
import { useState, useEffect } from "react";

export function TorrentList() {
  const [fake, setFake] = useState<boolean>(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setFake((f:boolean) => !f);
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const torrentInfoList = webTorrentClient.torrents.map((torrent)=> new TorrentInfo(torrent));
  return (
    <DataTable columns={ColumnsForTorrentList} data={torrentInfoList}/>
    // <div>basf</div>
  );
}
