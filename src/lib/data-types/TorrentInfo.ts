import type { Torrent } from "webtorrent";
import prettyMilliSeconds from "pretty-ms";
import { format } from 'date-fns';
import { TorrentStatus as Status } from "./TorrentStatus";

type DateAdded = {
    date: Date
    formattedDate: string
    time: string
}

export class TorrentInfo {
  id: string;
  name: string;
  size: string;
  downloadSpeed: string;
  downloaded: string;
  uploadSpeed: string;
  uploaded: string;
  eta: string;
  totalFiles: number;
  status: Status;
  progress: string;
  dateCreated: DateAdded;

  private _convertToBigBytes(size: number, speed: boolean = false): string {
    // this convert the size from bytes to bigger Units such as KB , MB, GB to make it readable
    enum SizeUnit {
      B,
      KB,
      MB,
      GB,
      TB,
    }
    let sizeUnit = SizeUnit.B;
    while (size >= 1000) {
      size = size / 1024;
      sizeUnit++;
    }
    let sizeFormated = size.toFixed(1);
    sizeFormated = sizeFormated.replace(/\.0$/, "");
    const SizeUnitKeys = Object.values(SizeUnit);
    let formattedBytes = sizeFormated + " " + SizeUnitKeys[sizeUnit];
    if(speed) formattedBytes += "/s";
    return formattedBytes;
  }

  private _formatDateAndTime(date: Date): DateAdded {
    const _x = format(date, "dd/MM/yy HH:mm").split(" ");
    return {
        date: date,
        formattedDate: _x[0],
        time: _x[1],
    }
  }
  private _getETA(timeRemaining: number): string {
    // make time ramaining readable
    return prettyMilliSeconds(timeRemaining, { compact: true, verbose: true });
  }

  private _getStatus(torrent: Torrent): Status {
    let status: Status;
    status = torrent.ready ? Status.Downloading : Status.Waiting;
    if (torrent.downloaded) status = Status.Seeding;
    if (torrent.paused) status = Status.Paused;
    return status;
  }

  private _getProgress(progress: number): string {
    // make progress a readable string
    return (progress * 100).toFixed(2).replace(/\.00$/, "") + "% Downloaded";
  }
  constructor(torrent: Torrent) {
    this.id = torrent.infoHash;
    this.name = torrent.name;
    this.size = this._convertToBigBytes(torrent.length);
    this.downloadSpeed = this._convertToBigBytes(torrent.downloadSpeed, true);
    this.downloaded = this._convertToBigBytes(torrent.downloaded);
    this.uploadSpeed = this._convertToBigBytes(torrent.uploadSpeed, true);
    this.uploaded = this._convertToBigBytes(torrent.uploaded);
    this.eta = this._getETA(torrent.timeRemaining);
    this.totalFiles = torrent.files.length;
    this.status = this._getStatus(torrent);
    this.progress = this._getProgress(torrent.progress);
    this.dateCreated = this._formatDateAndTime(torrent.created);
  }
}
