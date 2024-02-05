import { TorrentFile } from "webtorrent";

enum Priority{
    Zero,
    Normal,
    High, 
    Maximum
}

export class FileInfo {
    #name: string;
    #size: number;
    #progress: number;//between 0 to 1
    #priority: Priority;

    constructor(file: TorrentFile)
}