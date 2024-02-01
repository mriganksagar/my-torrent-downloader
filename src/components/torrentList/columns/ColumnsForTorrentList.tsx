import React from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { TorrentInfo } from "@/lib/data-types";
import { Checkbox } from "@/shadui/ui/checkbox";
import {
  CalendarLogo,
  ClockLogo,
  DownloadLogo,
  FilesLogo,
  TimerLogo,
  UploadLogo,
} from "@/assets";
import { cn } from "@/lib/utils";

const columnHelper = createColumnHelper<TorrentInfo>();

interface ColumnHeaderContainerProps {
  children?: React.ReactNode;
  className?: string;
}
const ColumnHeaderContainer: React.FC<ColumnHeaderContainerProps> = ({
  children,
  className,
  ...restProps
}) => {
  return (
    <div className={cn("flex", "gap-2", className)} {...restProps}>
      {children}
    </div>
  );
};

export const ColumnsForTorrentList = [
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
  }),
  columnHelper.accessor("name", {
    id: "name",
    header: "Title",
  }),
  columnHelper.accessor("dateAdded", {
    id: "dateAdded",
    header() {
      return (
        <ColumnHeaderContainer>
          <CalendarLogo />
          <div>Date Added</div>
        </ColumnHeaderContainer>
      );
    },
    cell({ cell }) {
      return (
        <div className="flex-col">
          <p>{cell.getValue().formattedDate}</p>
          <p>{cell.getValue().time}</p>
        </div>
      );
    },
    enableSorting: true,
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
        <div className="flex-col">
          <p>{cell.getValue()}</p>
          <p>{row.original.downloadSpeed}</p>
        </div>
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
        <div className="flex-col">
          <p>{cell.getValue()}</p>
          <p>{row.original.uploadSpeed}</p>
        </div>
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
      return <p>{cell.getValue()}</p>;
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
      return <p>{cell.getValue()}</p>;
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
        <div className="flex-col">
          <p>{cell.getValue()}</p>
          <p>{row.original.progress}</p>
        </div>
      );
    },
  }),
];
