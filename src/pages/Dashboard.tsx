// import React from "react";
import { AddTorrent } from "@/components/AddTorrent";
import { TorrentList } from "@/components/TorrentList";

export function Dashboard(){
    // const list = [{name:"some1"},{name:"some2"}];
    return(<>
    <AddTorrent/>
    <TorrentList/>
    </>);
}