import { cn } from "@/lib/utils";
import { Button } from "@/shadui/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/shadui/ui/dialog";
import { DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { PlusIcon } from "lucide-react";
import { Link } from "lucide-react";
import { InputAdornment, TextField } from "@mui/material";
import { Dropzone } from "./common/Dropzone";
import { PirateLogo, UploadFileIcon } from "@/assets";
import { Input } from "@/shadui/ui/input";
import React from "react";

const DropZoneInside: React.FC<{ dragging: boolean }> = ({ dragging }) => {
    return (
        <>
            <UploadFileIcon />
            <h2>Drag and Drop to upload Files</h2>
            <Button variant={"link"}>Browse</Button>
            {/* <Input type="file" /> */}
            {dragging && "dragg ho rha hai"}
        </>
    );
};
const AddTorrent = () => {
    return (
        <Dialog>
            <DialogTrigger>
                <Button
                    className={cn(
                        "bg-[#2CD4F6]",
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
                                <Link className="text-sky-800" />
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

export const Header = () => {
    return (
        <div
            className={cn(
                "h-24",
                "w-screen",
                "bg-[#021B45]",
                "flex",
                "justify-between",
                "items-center",
                "p-4"
            )}
        >
            <PirateLogo width="80"/>
            <h1 className={cn("text-2xl", "text-sky-200")}>
                Torrent Downloader
            </h1>
            <AddTorrent />
        </div>
    );
};
