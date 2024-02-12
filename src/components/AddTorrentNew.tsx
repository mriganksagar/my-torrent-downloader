import { cn } from "@/lib/utils";
import { Button } from "@/shadui/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shadui/ui/dialog";
import { PlusIcon } from "lucide-react";
import { Link } from "lucide-react";
import { InputAdornment, TextField } from "@mui/material";
import { Dropzone } from "./common/Dropzone";
import { DropZoneInside } from "./DropZoneInside";

export const AddTorrent = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          className={cn(
            "bg-cyan-500",
            "hover:bg-cyan-600",
            "text-black",
            "gap-2",
            "w-1/12",
            "min-w-fit",
            "h-12"
          )}
        >
          Add Torrent
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className={cn("w-2/3", "max-w-2xl")}>
        <DialogHeader>
          <DialogTitle>Add Torrent</DialogTitle>
        </DialogHeader>
        <TextField
          label="Magnet Url"
          multiline
          maxRows={8}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Link className="text-cyan-200" />
              </InputAdornment>
            ),
          }}
        />
        <Dropzone
          onUpload={(files) => {
            console.log(files);
          }}
          Element={DropZoneInside}
        />
      </DialogContent>
    </Dialog>
  );
};