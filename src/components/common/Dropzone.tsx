import { cn } from "@/lib/utils";
import { styled } from "@mui/material";
import { ReactJSXElement } from "node_modules/@emotion/react/dist/declarations/types/jsx-namespace";
import React, { DragEventHandler, ReactNode, RefObject, useCallback, useEffect, useRef, useState } from "react";

type Props = {
    onUpload: (files: FileList) => void;
    children?: ReactNode;
    Element?: React.FC<{dragging:boolean}>;
};

export function Dropzone({ onUpload, children, Element }: Props) {
    const drop: RefObject<HTMLDivElement> = useRef(null);
    const [enteredDrag, setEnteredDrag] = useState<boolean>(false);

    const handleDragOver: DragEventHandler = useCallback((event)=>{
        event?.preventDefault();
        event?.stopPropagation();
    },[]);

    const handleDrop: DragEventHandler = useCallback((event)=>{
        event?.preventDefault();
        event?.stopPropagation();
        const {files} = event.dataTransfer;
        if(files?.length){
            onUpload(files);
        }
    },[onUpload]);

    const handleDragEnter: DragEventHandler = useCallback((event)=>{
        event?.preventDefault();
        event?.stopPropagation();
        console.log("drag enter ho gya hai ");
        setEnteredDrag(true);
    },[setEnteredDrag]);

    const handleDragLeave: DragEventHandler = useCallback((event)=>{
        event?.preventDefault();
        event?.stopPropagation();
        console.log("drag exit ho gya hai ");
        setEnteredDrag(false);
    },[setEnteredDrag]);

    useEffect(()=>{
        console.log("i am inside useeffect and adding handlers");
        drop.current?.addEventListener('dragover', handleDragOver);
        drop.current?.addEventListener('drop', handleDrop);
        drop.current?.addEventListener('dragenter', handleDragEnter);
        drop.current?.addEventListener('dragleave', handleDragLeave);
        return ()=>{
            drop.current?.removeEventListener('dragover', handleDragOver);
            drop.current?.removeEventListener('drop', handleDrop);
            drop.current?.removeEventListener('dragenter', handleDragEnter);
            drop.current?.removeEventListener('dragleave', handleDragLeave);
        }
    },[]);

    return (
        <div
            className={cn(
                "flex",
                "flex-col",
                "items-center",
                "justify-center",
                "h-min-32",
                "h-max-5/12",
                "bg-zinc-200",
                "rounded-md",
                "p-4"
            )}
            ref={drop}
        >
            <Element dragging={enteredDrag}/>
            {children}
        </div>
    );
}
