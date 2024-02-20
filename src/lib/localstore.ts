import { LocalStorageKeys } from "@/global-constants";

export function storeTorrentToLocalStorage(magUrl: string) {
  const __urls = localStorage.getItem(LocalStorageKeys.TorrentIds);
  let torrentIds = []
  if (__urls) torrentIds = JSON.parse(__urls);
  torrentIds.push(magUrl);
  localStorage.setItem(LocalStorageKeys.TorrentIds, JSON.stringify(torrentIds))
}