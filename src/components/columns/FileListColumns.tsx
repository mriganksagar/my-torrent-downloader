import { createColumnHelper } from "@tanstack/react-table";
import { FileInfo } from "@/lib/data-types";
import {
  HeaderContainer,
  CellContainer,
} from "@/components/torrentList/columns/headerAndCellContainer";

const columnHelper = createColumnHelper<FileInfo>();

export const FileListColumns = [
  columnHelper.accessor("name", {
    id: "name",
    header() {
      return <HeaderContainer>Name</HeaderContainer>;
    },
    cell({cell}) {
      return <CellContainer>{cell.getValue()}</CellContainer>;
    },
  }),
  columnHelper.accessor("size",{
    id:"size",
    header(){
        return <HeaderContainer>Size</HeaderContainer>
    },
    cell({cell}){
        return <CellContainer>{cell.getValue()}</CellContainer>
    }
  }),
  columnHelper.accessor("downloaded",{
    id:"downloaded",
    header(){
        return <HeaderContainer>Downloaded</HeaderContainer>
    },
    cell({cell}){
        return <CellContainer>{cell.getValue()}</CellContainer>
    }
  }),
  columnHelper.accessor("progress",{
    id:"progress",
    header(){
        return <HeaderContainer>Progress</HeaderContainer>
    },
    cell({cell}){
        return <CellContainer>{cell.getValue()}</CellContainer>
    }
  })
];
