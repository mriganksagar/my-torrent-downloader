// import { FileInfo } from "../data-types";
import { webTorrentClient } from "../singleton";

export const loadFilesInfo = async ({ params }) => {
  return await webTorrentClient.get(params.id);
  // return torrent?.files?.map((file) => new FileInfo(file));
};
