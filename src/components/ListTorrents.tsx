// import React from "react"
// import { LightContainer } from "./common";
import { Card, CardTitle, CardContent, CardHeader } from "@/shadui/ui/card";
import { webTorrentClient } from "@/singleton";
import type { Torrent } from "webtorrent";
import { DownloadCloud } from 'lucide-react';
import { useEffect, useState } from "react";
import { Table } from "@/shadui/ui/table";

const TorrentCard: React.FC<{torrent:Torrent}> = ({torrent})=>{  
  return (
  <Card>
    <CardHeader>
      <CardTitle>
        {torrent.name}
      </CardTitle>
    </CardHeader>
    <CardContent className="flex">
      <div>
        <DownloadCloud/>
        {torrent.downloadSpeed}
      </div>
      <div className="m-2">
      {torrent.downloaded}
      </div>
    </CardContent> 
  </Card>);
};

export const ListTorrents = () => {
  const[fake, setFake] = useState<boolean>(false);
  useEffect(()=>{
    const _interval = setInterval(()=>{
      setFake((f)=>!f);
    },600);
    return(()=>{
      clearInterval(_interval);
    })
  },[]);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>YOUR ADDED TORRENTS</CardTitle>
        </CardHeader>
        <CardContent>
        {webTorrentClient.torrents.map((torrent, index) => (
          <TorrentCard torrent={torrent} key={index}/>
        ))}
        </CardContent>
      </Card>
    </>
  );
};

