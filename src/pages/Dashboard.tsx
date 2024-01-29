// import React from "react";
import { AddTorrent } from "@/components/AddTorrent";
import { ListTorrents } from "@/components/ListTorrents";
import { TorrentList } from "@/components/torrentList/TorrentList";
import { DownloadLogo } from "@/assets";
export function Dashboard(){
    // const list = [{name:"some1"},{name:"some2"}];
    return(<>
    <AddTorrent/>
    <TorrentList/>
    </>);
}