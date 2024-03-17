import { DataTable } from "./common/DataTable";
import { webTorrentClient } from "@/lib/singleton";
import { TorrentListColumns } from "./columns";
import { TorrentInfo } from "@/lib/data-types";
import { useRefresher } from "@/hooks/useRefresher";
import { EmptyContent } from "./EmptyContent";
import { cn } from "@/lib/utils";
import { useFilterSortDataTable } from "@/hooks/useFilterSortDataTable";

export function TorrentList2() {
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
							"text-2xl",
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

export function TorrentList() {
	useRefresher();
	const data = webTorrentClient.torrents.map(
		(torrent) => new TorrentInfo(torrent),
	);
	const table = useFilterSortDataTable({ data, columns: TorrentListColumns });

	return (
		<>
			{data.length ? (
				<>
					<h1
						className={cn(
							"text-2xl",
							"font-bold",
							"text-center",
							"mt-4",
							"text-blue-950",
						)}
					>
						Your Added Torrents
					</h1>
					<DataTable table={table} />
				</>
			) : (
				<EmptyContent />
			)}
		</>
	);
}
