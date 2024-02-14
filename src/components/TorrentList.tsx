import { DataTable } from "./common/DataTable";
import { webTorrentClient } from "@/lib/singleton";
import { TorrentListColumns } from "./columns";
import { TorrentInfo } from "@/lib/data-types";
import { useRefresher } from "@/hooks/useRefresher";
import { EmptyContent } from "./EmptyContent";
import { cn } from "@/lib/utils";

export function TorrentList() {
	useRefresher();
	const torrentInfoList = webTorrentClient.torrents.map(
		(torrent) => new TorrentInfo(torrent),
	);

	return (
		<>
			{torrentInfoList.length ? (
				<>
					<h1
						className={cn(
							"text-3xl",
							"font-bold",
							"text-center",
							"mt-4",
							"text-blue-950",
						)}
					>
						Your Added Torrents
					</h1>
					<DataTable columns={TorrentListColumns} data={torrentInfoList} />
				</>
			) : (
				<EmptyContent />
			)}
		</>
	);
}
