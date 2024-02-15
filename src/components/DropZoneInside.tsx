import React from "react";
import { UploadFileIcon } from "@/assets";
import { styled } from "@mui/material";
import { Input } from "@/shadui/ui/input";
import { cn } from "@/lib/utils";

const InputNoneStyled = styled('input')({
  display: "none",
})

InputNoneStyled.defaultProps = {
  type: "file",
}

export const DropZoneInside: React.FC<{ dragging: boolean }> = ({ dragging }) => {
  return (
    <>
      <UploadFileIcon/>
      <h2 className={cn("font-semibold")}>Drag and Drop Torrent Files</h2>
      <Input type="file" /> 
    </>
  );
};