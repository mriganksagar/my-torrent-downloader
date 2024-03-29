import type { Torrent } from "webtorrent";
import prettyMilliSeconds from "pretty-ms";
// import { format } from "date-fns";
import { TorrentStatus as Status } from "./TorrentStatus";
import { formatBytesToBigBytes as convertBytes, formatDownloadingProgress as formatProgress } from "@/lib/utils";

// type DateAdded = {
//   date: Date;
//   formattedDate: string;
//   time: string;
// };

export class TorrentInfo {
  #_id: string;
  #_name: string;
  #_size: number;
  #_downloadSpeed: number;
  #_downloaded: number;
  #_uploadSpeed: number;
  #_uploaded: number;
  #_eta: number;
  #_totalFiles: number;
  #_status: Status;
  #_progress: number;
  // #_dateAdded: Date;

  get id() {
    return this.#_id;
  }
  get name() {
    return this.#_name;
  }
  get size() {
    return convertBytes(this.#_size);
  }
  get downloadSpeed() {
    return convertBytes(this.#_downloadSpeed, true);
  }
  get uploadSpeed() {
    return convertBytes(this.#_uploadSpeed, true);
  }
  get downloaded() {
    return convertBytes(this.#_downloaded);
  }
  get uploaded() {
    return convertBytes(this.#_uploaded);
  }
  get eta() {
    return this.#_getETA();
  }
  get totalFiles() {
    if(Number.isNaN(this.#_totalFiles)) return "...";
    return this.#_totalFiles;
  }
  get status() {
    return this.#_status;
  }
  get progress() {
    return formatProgress(this.#_progress);
  }

  // private _formatDateAndTime(date: Date): DateAdded {
  //   const _x = format(date, "dd/MM/yy HH:mm").split(" ");
  //   return {
  //     date: date,
  //     formattedDate: _x[0],
  //     time: _x[1],
  //   };
  // }
  #_getETA(): string {
    // make time ramaining readable
    if(this.#_eta === Infinity || isNaN(this.#_eta)) return "Infinity";
    return prettyMilliSeconds(this.#_eta, { compact: true, verbose: true });
  }

  #_getStatus(torrent: Torrent): Status {
    let status: Status;
    status = torrent.ready ? Status.Downloading : Status.Waiting;
    if (torrent.progress == 1) status = Status.Seeding;
    if (torrent.paused) status = Status.Paused;
    return status;
  }

  constructor(torrent: Torrent) {
    this.#_id = torrent.infoHash;
    this.#_name = torrent.name;
    this.#_size = torrent.length;
    this.#_downloadSpeed = torrent.downloadSpeed;
    this.#_downloaded = torrent.downloaded;
    this.#_uploadSpeed = torrent.uploadSpeed;
    this.#_uploaded = torrent.uploaded;
    this.#_eta = torrent.timeRemaining;
    this.#_totalFiles = torrent.files.length;
    this.#_status = this.#_getStatus(torrent);
    this.#_progress = torrent.progress;
  }
}
