import { LocalStorageKeys } from "./global-constants";
import { webTorrentClient } from "./lib/singleton";

function startTorrentsFromLocalStorage() {
  const __torrentIds = localStorage.getItem(LocalStorageKeys.TorrentIds);
  let torrentIdsList: string[] = [];
  if (__torrentIds) torrentIdsList = JSON.parse(__torrentIds);
  for (const torrentId of torrentIdsList) {
    console.log("torrent id from init ", torrentId);
    webTorrentClient.add(torrentId);
  }
}

export function init() {
  // startTorrentsFromLocalStorage();
  //not starting torrents from local storage because problem in storing and parsing the url, it skips some part of string 
  // shall look into coverting into utf 8 string maybe and then 
}