import { createColumnHelper } from "@tanstack/react-table";
import { FileInfo } from "@/lib/data-types";
import { HeaderContainer, CellContainer } from "./DivContainers";
import { DownloadLogo, TimerLogo } from "@/assets";
import {
	DownloadIcon,
	HardDriveIcon,
	MoreHorizontalIcon,
	Music4Icon,
	RouteIcon,
} from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/shadui/ui/dropdown-menu";

const columnHelper = createColumnHelper<FileInfo>();

const ActionsCell = ({row}) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<MoreHorizontalIcon />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem
					className="gap-2"
					onClick={async () => {
						const fileBlob: Blob = await row.original.fileRef.blob();
						const fileBlobUrl = URL.createObjectURL(fileBlob);
						const anchorElement = document.createElement('a');
						anchorElement.href = fileBlobUrl;
						anchorElement.target = '_blank';
						anchorElement.download = row.original.name;
						anchorElement.style.display = "none";
						document.body.appendChild(anchorElement); 
						anchorElement.click();
						document.removeChild(anchorElement);
					}}
				>
					<DownloadIcon />
					Save File
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export const FileListColumns = [
	columnHelper.accessor("name", {
		id: "title",
		header() {
			return <HeaderContainer>Title</HeaderContainer>;
		},
		cell({ cell }) {
			return <CellContainer>{cell.getValue()}</CellContainer>;
		},
	}),
	columnHelper.accessor("size", {
		id: "size",
		header() {
			return (
				<HeaderContainer>
					<HardDriveIcon className="text-blue-950" />
					Size
				</HeaderContainer>
			);
		},
		cell({ cell }) {
			return <CellContainer>{cell.getValue()}</CellContainer>;
		},
	}),
	columnHelper.accessor("downloaded", {
		id: "downloaded",
		header() {
			return (
				<HeaderContainer>
					<DownloadLogo />
					Downloaded
				</HeaderContainer>
			);
		},
		cell({ cell }) {
			return <CellContainer>{cell.getValue()}</CellContainer>;
		},
	}),
	columnHelper.accessor("progress", {
		id: "progress",
		header() {
			return (
				<HeaderContainer>
					<TimerLogo />
					Progress
				</HeaderContainer>
			);
		},
		cell({ cell }) {
			return <CellContainer>{cell.getValue()}</CellContainer>;
		},
	}),
	columnHelper.accessor("path", {
		id: "path",
		header() {
			return (
				<HeaderContainer>
					<RouteIcon className="text-blue-950" />
					Path
				</HeaderContainer>
			);
		},
		cell({ cell }) {
			return <CellContainer>{cell.getValue()}</CellContainer>;
		},
	}),
	columnHelper.accessor("type", {
		id: "type",
		header() {
			return (
				<HeaderContainer>
					<Music4Icon className="text-blue-900" />
					File Type
				</HeaderContainer>
			);
		},
		cell({ cell }) {
			return <CellContainer>{cell.getValue()}</CellContainer>;
		},
	}),
	columnHelper.display({
		id: "actions",
		cell({ row }) {
			return <ActionsCell row={row}/>
		},
	}),
];
