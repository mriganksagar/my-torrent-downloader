// import { Button, TextField } from "@mui/material";
import { Button } from "@/shadui/ui/button";
import { Input } from "@/shadui/ui/input";

import { cn } from "@/lib/utils";
import { useState } from "react";
// import { LightContainer } from "./common";
import { webTorrentClient } from "@/singleton";
import {
  Card,
  CardFooter,
  CardContent,
  CardTitle,
  CardHeader,
} from "@/shadui/ui/card";
import { Alert, AlertTitle } from "@/shadui/ui/alert";

export function AddTorrent() {
  const [magUrl, setMagUrl] = useState<string>();
  const [wrongMagUrl, setWrongMagUrl] = useState<boolean>(false);

  function magUrlChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setMagUrl(e.target.value);
  }
  function addTorrentHandler() {
    const torrent = webTorrentClient.add(magUrl, (torrent) => {
      torrent.on("error", () => {
        console.log("customm error and can't add this torrent");
      });
    });
    // torrent.on("error", () => {
    //   setWrongMagUrl(true);
    //   setTimeout(()=>{
    //     setWrongMagUrl(false);
    //   },2000)
    // });
  }
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>ADD TORRENT</CardTitle>
        </CardHeader>
        <CardContent className="flex">
          <Input
            className={cn("mr-5", "w-5/6")}
            placeholder="Add torrent by Magnet URL here"
            value={magUrl}
            onChange={magUrlChangeHandler}
          />
          <Button className={cn("w-1/6")} onClick={addTorrentHandler}>
            ADD
          </Button>
        </CardContent>
        <CardFooter>
            {wrongMagUrl && (
                <Alert className="transition-all ease-in-out bg-zinc-300 duration-1000">
                    <AlertTitle>Invalid magnet URL</AlertTitle>
                </Alert>
            )}
        </CardFooter>
      </Card>
    </>
  );
}
