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
import styled from "@emotion/styled";

const columnHelper = createColumnHelper<TorrentInfo>();

const ColumnHeaderContainer = styled.div.attrs({

})

const containercolumnheader = css
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
        <div className="flex">
          <CalendarLogo />
          <p>Date Added</p>
        </div>
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
        <div className="flex">
          <DownloadLogo />
          <p>Downloaded</p>
        </div>
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
        <div className="flex">
          <UploadLogo />
          <p>Uploaded</p>
        </div>
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
        <div className="flex">
          <ClockLogo />
          <p>ETA</p>
        </div>
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
        <div className="flex">
          <FilesLogo />
          <p>Total Files</p>
        </div>
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
        <div className="flex">
          <TimerLogo />
          <p>Status</p>
        </div>
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
