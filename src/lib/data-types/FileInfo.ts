import { TorrentFile } from "webtorrent";
// enum Priority{
//     Zero,
//     Normal,
//     High, 
//     Maximum
// }
import { formatBytesToBigBytes, formatDownloadingProgress } from "../utils";
export class FileInfo {
    #_name: string;
    #_size: number;
    #_downloaded: number;
    #_progress: number;//between 0 to 1
    // #_priority: Priority;
    #_path: string;
    #_type: string;
    constructor(file: TorrentFile){
        this.#_name = file.name;
        this.#_size = file.length;
        this.#_downloaded = file.downloaded;
        this.#_progress = file.progress;
        this.#_path = file.path;
        this.#_type = file.type;
    }

    get name(){
        return this.#_name;
    }
    get size(){
        return formatBytesToBigBytes(this.#_size);
    }
    get downloaded(){
        return formatBytesToBigBytes(this.#_downloaded);
    }
    get progress(){
        return formatDownloadingProgress(this.#_progress);
    }
    get path(){
        return this.#_path;
    }
    get type(){
        return this.#_type;
    }
}