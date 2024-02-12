import React from "react";
import { Button } from "@/shadui/ui/button";
import { UploadFileIcon } from "@/assets";

export const DropZoneInside: React.FC<{ dragging: boolean }> = ({ dragging }) => {
  return (
    <>
      <UploadFileIcon/>
      <h2>Drag and Drop to upload Files</h2>
      <Button variant={"link"}>Browse</Button>
      {/* <Input type="file" /> */}
      {dragging && "dragg ho rha hai"}
    </>
  );
};