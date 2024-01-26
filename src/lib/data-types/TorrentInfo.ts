import type { Torrent } from "webtorrent";
import prettySeconds from "pretty-seconds";


export class TorrentInfo {
  id: string;
  name: string;
  size: string;
  downloadSpeed: string;
  uploadSpeed: string;
  eta: string;
  totalFiles: number;
  status: "Waiting"|"Downloading" | "Seeding" | "Paused";

  private _convertToBigB(size: number): string {
    // this convert the size from bytes to bigger Units
    //size is in Bytes
    enum SizeUnit {
      B,
      KB,
      MB,
      GB,
      TB,
      PB,
    }
    let sizeUnit = SizeUnit.B;
    while (size >= 1000) {
      size = size / 1024;
      sizeUnit++;
    }
    let sizeFormated = size.toFixed(1);
    sizeFormated = sizeFormated.replace(/\.0$/, "");
    const SizeUnitKeys = Object.keys(SizeUnit);
    return sizeFormated + " " + SizeUnitKeys[sizeUnit];
  }

  private _getETA(torrent: Torrent): string {
    const secondsRemaining = (torrent.length- torrent.downloaded) / torrent.downloadSpeed;
    return prettySeconds(secondsRemaining, {compact:true, verbose: true});
  }

  private _getStatus(torrent: Torrent): string{
    let status: string;
    status = torrent.ready? 
  }

  constructor(torrent: Torrent) {
    this.id = torrent.infoHash;
    this.name = torrent.name;
    this.size = this._convertToBigB(torrent.length);
    this.downloadSpeed = this._convertToBigB(torrent.downloadSpeed);
    this.uploadSpeed = this._convertToBigB(torrent.uploadSpeed);
    this.eta = this._getETA(torrent);
    this.totalFiles = torrent.files.length;
    this.status = this._getStatus(torrent);
  }
}
