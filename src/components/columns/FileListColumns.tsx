import { createColumnHelper } from "@tanstack/react-table";
import { FileInfo } from "@/lib/data-types";
import { HeaderContainer, CellContainer } from "./DivContainers";
import { DownloadLogo, TimerLogo } from "@/assets";
import { Music4Icon } from "lucide-react";

const columnHelper = createColumnHelper<FileInfo>();

export const FileListColumns = [
  columnHelper.accessor("name", {
    id: "name",
    header() {
      return <HeaderContainer>Name</HeaderContainer>;
    },
    cell({ cell }) {
      return <CellContainer>{cell.getValue()}</CellContainer>;
    },
  }),
  columnHelper.accessor("size", {
    id: "size",
    header() {
      return <HeaderContainer>Size</HeaderContainer>;
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
      return (<HeaderContainer>
        
        Path
      </HeaderContainer>)
    },
    cell({cell}) {
      return <CellContainer>{cell.getValue()}</CellContainer>
    }
  }),
  columnHelper.accessor("type", {
    id: "type",
    header() {
      return <HeaderContainer>
        <Music4Icon className="text-blue-800"/>File Type
      </HeaderContainer>;
    },
    cell({ cell }) {
      return <CellContainer>{cell.getValue()}</CellContainer>;
    },
  }),
];
