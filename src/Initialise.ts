import { LocalStorageKeys } from "./globalContants";
import { webTorrentClient } from "./lib/singleton";

function startTorrentsFromLocalStorage() {
  const __torrentIds = localStorage.getItem(LocalStorageKeys.TorrentIds);
  let torrentIdsList: string[] = [];
  if (__torrentIds) torrentIdsList = JSON.parse(__torrentIds);
  for (const torrentId of torrentIdsList) {
    webTorrentClient.add(torrentId);
  }
}

export function init() {
  startTorrentsFromLocalStorage();
}