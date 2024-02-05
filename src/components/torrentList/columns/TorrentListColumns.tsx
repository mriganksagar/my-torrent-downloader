import React from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { TorrentInfo } from "@/lib/data-types";
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
import { cn } from "@/lib/utils";
import { TorrentStatus as Status } from "@/lib/data-types/TorrentStatus";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/shadui/ui/dropdown-menu";
import { webTorrentClient } from "@/singleton";
import { Torrent } from "webtorrent";

const columnHelper = createColumnHelper<TorrentInfo>();

interface DivProps {
  children?: React.ReactNode;
  className?: string;
}
const ColumnHeaderContainer: React.FC<DivProps> = ({
  children,
  className,
  ...restProps
}) => {
  return (
    <div
      className={cn("flex", "gap-2", "justify-center", className)}
      {...restProps}
    >
      {children}
    </div>
  );
};

const CellContainer: React.FC<DivProps> = ({
  children,
  className,
  ...restProps
}) => {
  return (
    <div className={cn("flex-col", "items-center", className)} {...restProps}>
      {children}
    </div>
  );
};

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

const ActionsCell: React.FC<{ torrentId: string }> = ({ torrentId }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <MoreHorizontal />
    </DropdownMenuTrigger>
    <DropdownMenuContent className="min-w-fit">
      <DropdownMenuItem
        onClick={() => onPauseTorrent(torrentId)}
        className="justify-content gap-2"
      >
        <PauseLogo />
        Pause
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={() => onResumeTorrent(torrentId)}
        className="justify-content gap-2"
      >
        <ResumeLogo />
        Resume
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

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
    id: "name",
    header() {
      return <ColumnHeaderContainer>Name</ColumnHeaderContainer>;
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
        <ColumnHeaderContainer>
          <DownloadLogo />
          <p>Downloaded</p>
        </ColumnHeaderContainer>
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
        <ColumnHeaderContainer>
          <UploadLogo />
          <p>Uploaded</p>
        </ColumnHeaderContainer>
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
        <ColumnHeaderContainer>
          <ClockLogo />
          <p>ETA</p>
        </ColumnHeaderContainer>
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
        <ColumnHeaderContainer>
          <FilesLogo />
          <p>Total Files</p>
        </ColumnHeaderContainer>
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
        <ColumnHeaderContainer>
          <TimerLogo />
          <p>Status</p>
        </ColumnHeaderContainer>
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
