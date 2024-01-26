import { useState, useEffect } from "react";
import {ColumnDef} from  '@tanstack/react-table'
import type { Torrent } from "webtorrent";

function mapToTorrentInfo(torrent: Torrent): TorrentInfo{
    //something to implement late
    return {
        id: torrent.infoHash,
        title: torrent.name,
        

    }
}
class TorrentInfo {
    id: string;
    name: string;
    size: string;
    downloadSpeed: string;
    uploadSpeed: string;
    eta: string;
    totalFiles: number;
    status: "Downloading" | "Seeding" | "Paused";

    private _convertToMB(size:number):string{
        
    }

    private _getETA(){

    }

    constructor(torrent: Torrent){
        this.id = torrent.infoHash;
        this.title = torrent.name;

    }
}

const fakedata = [{},{},{},{}];
export const TorrentList = () =>{
  const[fake, setFake] = useState<boolean>(false);
  useEffect(()=>{
    const interval = setInterval(()=>{
      setFake((f)=>!f);
    },600);
    return(()=>{
      clearInterval(interval);
    })
  },[]);

  return (
    <Table></Table>
  );
}