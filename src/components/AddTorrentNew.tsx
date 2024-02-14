import { cn } from "@/lib/utils";
import { Button } from "@/shadui/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadui/ui/dialog";
import { PlusIcon, XCircleIcon, XIcon } from "lucide-react";
import { Link } from "lucide-react";
import { InputAdornment, TextField } from "@mui/material";
import { Dropzone } from "./common/Dropzone";
import { DropZoneInside } from "./DropZoneInside";
import { useCallback, useRef, useState } from "react";
import { webTorrentClient } from "@/lib/singleton";

export const AddTorrent = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState([]);

  const addTorrentHandler = useCallback(() => {
    const magUrl = inputRef.current?.value;
    console.log("this is magurl ", magUrl);
    console.log(inputRef.current);
    if (magUrl) {
      webTorrentClient.add(magUrl);
    }
    console.log("files inside the add hander", files);
    if (files?.length) {
      files.forEach((file) => webTorrentClient.add(file));
    }
  }, [inputRef, files]);

  const dropHandler = useCallback(
    (files) => {
      setFiles(files);
    },
    [setFiles]
  );

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          className={cn(
            "bg-cyan-400",
            "hover:bg-cyan-500",
            "text-black",
            "gap-2",
            "min-w-fit",
            "h-12",
            "font-semibold"
          )}
        >
          Add Torrent
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className={cn("w-2/3", "max-w-2xl")} noClose={true}>
        <DialogHeader>
          <DialogTitle
            className={cn("flex", "justify-between", "items-center", "font-bold", "text-xl")}
            >
            <DialogClose>
              <XIcon className={cn("bg-slate-100", "hover:bg-slate-200" ,"rounded-full", "size-8", "p-2")}/>
            </DialogClose>
            Add Torrent
            <DialogClose>
              <Button
                className={cn(
                  "bg-cyan-400",
                  "hover:bg-cyan-500",
                  "text-black",
                  "font-semibold"
                )}
                onClick={addTorrentHandler}
              >
                Start
              </Button>
            </DialogClose>
          </DialogTitle>
        </DialogHeader>
        <TextField
          label="Magnet Url"
          multiline
          maxRows={8}
          inputRef={inputRef}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Link className="text-blue-950" />
              </InputAdornment>
            ),
          }}
        />
        <Dropzone onUpload={dropHandler} Element={DropZoneInside} />
      </DialogContent>
    </Dialog>
  );
};
