/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import { Torrent } from "webtorrent";
import { webTorrentClient } from "@/lib/singleton";
import { createColumnHelper } from "@tanstack/react-table";
import { TorrentInfo, TorrentStatus as Status } from "@/lib/data-types";
import { Checkbox } from "@/shadui/ui/checkbox";
import {
	ClockLogo,
	DownloadLogo,
	FilesLogo,
	PauseLogo,
	ResumeLogo,
	TimerLogo,
	TrashLogo,
	UploadLogo,
} from "@/assets";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { FilesIcon, MoreHorizontal } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/shadui/ui/dropdown-menu";
import { CellContainer, HeaderContainer } from "./DivContainers";
import { useNavigate } from "react-router-dom";
import { Button } from "@/shadui/ui/button";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTrigger,
	AlertDialogTitle,
	AlertDialogCancel,
	AlertDialogDescription,
} from "@/shadui/ui/alert-dialog";
import { cn } from "@/lib/utils";

const columnHelper = createColumnHelper<TorrentInfo>();

const StatusCell: React.FC<{ status: Status; progress: string }> = ({
	status,
	progress,
}) => {
	switch (status) {
		case Status.Waiting: {
			return <p className="text-orange-500">...Waiting</p>;
		}
		case Status.Downloading: {
			return (
				<>
					<p className="text-green-500">Downloading...</p>
					<p>{progress}</p>
				</>
			);
		}
		case Status.Paused: {
			return (
				<>
					<p className="text-yellow-500">Paused</p>
					<p>{progress}</p>
				</>
			);
		}
		case Status.Seeding: {
			return <p className="text-blue-500">Seeding...</p>;
		}
		case Status.Finished: {
			return <p className="text-purple-500">Download Finished</p>;
		}
	}
};

const onPauseTorrent = async (torrentId: string) => {
	const torrent: Torrent | void = await webTorrentClient.get(torrentId);
	if (torrent) {
		torrent.deselect(0, torrent.pieces.length - 1, 0);
		torrent.pause();
	}
};

const onResumeTorrent = async (torrentId: string) => {
	const torrent: Torrent | void = await webTorrentClient.get(torrentId);
	if (torrent) {
		torrent.select(0, torrent.pieces.length - 1, 0);
		torrent.resume();
	}
};

const onRemoveTorrent = async (torrentId: string) => {
	const torrent: Torrent | void = await webTorrentClient.get(torrentId);
	if (torrent) {
		torrent.destroy({ destroyStore: true });
	}
};

const ActionsCell: React.FC<{ torrentId: string }> = ({ torrentId }) => {
	const navigate = useNavigate();
	const [isDropdownOpen, setIsDropDownOpen] = useState<boolean>(false);
	return (
		<DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropDownOpen}>
			<DropdownMenuTrigger asChild>
				<MoreHorizontal />
			</DropdownMenuTrigger>
			<DropdownMenuContent className="min-w-fit">
				<DropdownMenuItem
					onClick={() => onPauseTorrent(torrentId)}
					className="gap-2"
				>
					<PauseLogo className="size-4" />
					Pause
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => onResumeTorrent(torrentId)}
					className="gap-2"
				>
					<ResumeLogo className="size-4" />
					Resume
				</DropdownMenuItem>
				<DropdownMenuItem
					className="gap-2"
					onSelect={(event) => event.preventDefault()}
				>
					<AlertDialog>
						<TrashLogo className="size-4" />
						<AlertDialogTrigger>Remove</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Are you sure?</AlertDialogTitle>
								<AlertDialogDescription>
									Doing this action will remove this Torrent and delete all the
									downloaded data
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel onClick={() => setIsDropDownOpen(false)}>
									Cancel
								</AlertDialogCancel>
								<AlertDialogAction
									className={cn("bg-red-400", "hover:bg-red-500", "text-black")}
									onClick={() => {
										onRemoveTorrent(torrentId);
										setIsDropDownOpen(false);
									}}
								>
									Remove
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => navigate(`/torrents/${torrentId}/files`)}
					className="gap-2"
				>
					<FilesIcon className="text-indigo-600 size-4" />
					Show Files
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export const TorrentListColumns = [
	columnHelper.display({
		id: "select",
		header({ table }) {
			return (
				<Checkbox
					checked={
						table.getIsAllRowsSelected() ||
						(table.getIsSomeRowsSelected() && "indeterminate")
					}
					onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
					aria-label="Select all"
				/>
			);
		},
		cell({ row }) {
			return (
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aira-label="Select row"
				/>
			);
		},
		enableHiding: false,
	}),
	columnHelper.accessor("name", {
		id: "title",
		header({ column }) {
			return (
				<HeaderContainer>
					<Button
						variant="ghost"
						className="p-0 font-semibold"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Title
						<CaretSortIcon className="ml-2 h-4 w-4" />
					</Button>
				</HeaderContainer>
			);
		},
		cell({ cell }) {
			return <CellContainer>{cell.getValue()}</CellContainer>;
		},
		enableHiding: false,
		enableSorting: true,
	}),
	columnHelper.accessor("downloaded", {
		id: "downloaded",
		header() {
			return (
				<HeaderContainer>
					<DownloadLogo />
					<p>Downloaded</p>
				</HeaderContainer>
			);
		},
		cell({ row, cell }) {
			return (
				<CellContainer>
					<p>{cell.getValue()}</p>
					<p>{row.original.downloadSpeed}</p>
				</CellContainer>
			);
		},
	}),
	columnHelper.accessor("uploaded", {
		id: "uploaded",
		header() {
			return (
				<HeaderContainer>
					<UploadLogo />
					<p>Uploaded</p>
				</HeaderContainer>
			);
		},
		cell({ row, cell }) {
			return (
				<CellContainer>
					<p>{cell.getValue()}</p>
					<p>{row.original.uploadSpeed}</p>
				</CellContainer>
			);
		},
	}),
	columnHelper.accessor("eta", {
		id: "eta",
		header() {
			return (
				<HeaderContainer>
					<ClockLogo />
					<p>ETA</p>
				</HeaderContainer>
			);
		},
		cell({ cell }) {
			return <CellContainer>{cell.getValue()}</CellContainer>;
		},
	}),
	columnHelper.accessor("totalFiles", {
		id: "totalFiles",
		header() {
			return (
				<HeaderContainer>
					<FilesLogo />
					<p>Total Files</p>
				</HeaderContainer>
			);
		},
		cell({ cell }) {
			return <CellContainer>{cell.getValue()}</CellContainer>;
		},
	}),
	columnHelper.accessor("status", {
		id: "status",
		header() {
			return (
				<HeaderContainer>
					<TimerLogo />
					<p>Status</p>
				</HeaderContainer>
			);
		},
		cell({ cell, row }) {
			return (
				<CellContainer>
					<StatusCell
						status={cell.getValue()}
						progress={row.original.progress}
					/>
				</CellContainer>
			);
		},
	}),
	columnHelper.display({
		id: "actions",
		cell({ row }) {
			return <ActionsCell torrentId={row.original.id} />;
		},
	}),
];
