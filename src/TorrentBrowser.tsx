import { useState } from "react";
import { Button, Input } from "@mui/material";
import styles from './styles.module.css';
import { webTorrentClient } from "./singleton";
import { Torrent } from "webtorrent";
export function TorrentBrowser (){

    const [magnetUrl, setMagnetUrl] = useState<string>('');
    // const [files, setFiles] = useState<TorrentFile[]>([]);
    let torrent: Torrent;
    const addtorrenthandler=()=>{
        torrent = webTorrentClient.add(magnetUrl, { path: '/home/mrig/Downloads/' },(torrent)=>{
            torrent.files.forEach((file)=>{
                console.log(file.name);
            })
        })
    }
    const listtorrents = ()=>{
        console.log("list torrent is hit");
        console.log(webTorrentClient.torrents.length);
        // forEach((torrent)=>console.log(torrent.name));
        webTorrentClient.torrents.at(0);
        console.log(webTorrentClient.torrents.at(0));
    };

    const torrentnotworking = ()=>{
        torrent.on('infoHash', function(){
            console.log("infor hash pata chal gya");
        });
        torrent.on('metadata', ()=>{
            console.log("metadata aa gya hai bhai");
        });
    };

    return (
        <>  
            <Button onClick={torrentnotworking}>torrent not wokring</Button>
            <Button onClick={listtorrents}> get torrents names</Button>
            <div className={styles.container_search_and_go}>
                <Input value={magnetUrl} onChange={(e)=>{setMagnetUrl(e.target.value)}}/>
                <Button onClick={addtorrenthandler}>Add Torrent</Button>
            </div>
        </>
    );
}