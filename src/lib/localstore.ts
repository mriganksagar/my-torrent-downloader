import { LocalStorageKeys } from "@/globalContants";

export function storeTorrentToLocalStorage(torrentId: string) {
  const __torrentIdsUnparsed = localStorage.get(LocalStorageKeys.TorrentIds);
  let torrentIds = []
  if (__torrentIdsUnparsed) torrentIds = JSON.parse(__torrentIdsUnparsed);
  torrentIds.push(torrentId);
  localStorage.set(LocalStorageKeys.TorrentIds, JSON.stringify(torrentIds))
}