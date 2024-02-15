import { webTorrentClient } from "../singleton";

export const loadFilesView = async ({ params }) => {
  return await webTorrentClient.get(params.id);
};
