/* eslint-disable react-refresh/only-export-components */
import React from "react";
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
  UploadLogo,
} from "@/assets";
import { FilesIcon, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/shadui/ui/dropdown-menu";
import { CellContainer, HeaderContainer } from "./DivContainers";
import { useNavigate } from "react-router-dom";

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

const onPauseTorrent = (torrentId: string) => {
  webTorrentClient.get(torrentId).then((torrent: Torrent) => torrent.pause());
};

const onResumeTorrent = (torrentId: string) => {
  webTorrentClient.get(torrentId).then((torrent: Torrent) => torrent.resume());
};

const ActionsCell: React.FC<{ torrentId: string }> = ({ torrentId }) => {
  const navigate = useNavigate();

  return (<DropdownMenu>
    <DropdownMenuTrigger asChild>
      <MoreHorizontal />
    </DropdownMenuTrigger>
    <DropdownMenuContent className="min-w-fit">
      <DropdownMenuItem
        onClick={() => onPauseTorrent(torrentId)}
        className="gap-2"
      >
        <PauseLogo />
        Pause
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={() => onResumeTorrent(torrentId)}
        className="gap-2"
      >
        <ResumeLogo />
        Resume
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={()=> navigate(`/torrents/${torrentId}/files`)}
        className="gap-2"
      >
        <FilesIcon className="text-indigo-500"/> 
        Show Files
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>);
}  

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
    id: "Title",
    header() {
      return <HeaderContainer>Title</HeaderContainer>;
    },
    cell({ cell }) {
      return <CellContainer>{cell.getValue()}</CellContainer>;
    },
    enableHiding: false,
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
