// import React from "react";
import { AddTorrent } from "@/components/AddTorrent";
import { ListTorrents } from "@/components/ListTorrents";

export function Dashboard(){
    // const list = [{name:"some1"},{name:"some2"}];
    return(<>
    <AddTorrent/>
    <ListTorrents/>
    </>);
}