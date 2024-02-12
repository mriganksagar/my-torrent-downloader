import { webTorrentClient } from "../singleton";

export const loadFilesInfo = async ({ params }) => {
  return await webTorrentClient.get(params.id);
};
