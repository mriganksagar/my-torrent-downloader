import { cn } from "@/lib/utils";
import { styled } from "@mui/material";
import React, {
    DragEventHandler,
    ReactNode,
    RefObject,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

type Props = {
    onUpload: (files: FileList) => void;
    children?: ReactNode;
    Element?: React.FC<{ dragging: boolean }>;
};

const Overlay = styled("div")({
    gridColumn: "1/2",
    gridRow: "1/2",
});

const ContentWrapper = styled("div")({
    gridColumn: "1/2",
    gridRow: "1/2",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
});

export function Dropzone({ onUpload, children, Element }: Props) {
    const drop: RefObject<HTMLDivElement> = useRef(null);
    const overlay: RefObject<HTMLDivElement> = useRef(null);

    const [enteredDrag, setEnteredDrag] = useState<boolean>(false);

    const handleDragOver: DragEventHandler = useCallback((event) => {
        event?.preventDefault();
        event?.stopPropagation();
    }, []);

    const handleDrop: DragEventHandler = useCallback(
        (event) => {
            event?.preventDefault();
            event?.stopPropagation();
            setEnteredDrag(false);
            console.log(event);
            const { files } = event.dataTransfer;
            if (files?.length > 0) {
                console.log("the dropped files are ", files);
                onUpload(files);
            }
        },
        [onUpload]
    );

    const handleDragEnter: DragEventHandler = useCallback(
        (event) => {
            event?.preventDefault();
            event?.stopPropagation();
            console.log("drag enter ho gya hai ");
            console.log(event);
            if (event.target !== overlay.current) setEnteredDrag(true);
        },
        [setEnteredDrag]
    );

    const handleDragLeave: DragEventHandler = useCallback(
        (event) => {
            event?.preventDefault();
            event?.stopPropagation();
            console.log("drag exit ho gya hai ");
            console.log(event);
            if (event.target === overlay.current) setEnteredDrag(false);
        },
        [setEnteredDrag]
    );

    useEffect(() => {
        console.log("i am inside useeffect and adding handlers");
        drop.current?.addEventListener("dragover", handleDragOver);
        drop.current?.addEventListener("drop", handleDrop);
        drop.current?.addEventListener("dragenter", handleDragEnter);
        drop.current?.addEventListener("dragleave", handleDragLeave);
        return () => {
            drop.current?.removeEventListener("dragover", handleDragOver);
            drop.current?.removeEventListener("drop", handleDrop);
            drop.current?.removeEventListener("dragenter", handleDragEnter);
            drop.current?.removeEventListener("dragleave", handleDragLeave);
        };
    }, []);

    return (
        <div
            className={cn(
                "grid",
                "grid-cols-1",
                "grid-rows-1",
                "min-h-60",
                "bg-slate-200",
                "rounded-lg",
                "p-4"
            )}
            ref={drop}
        >
            {enteredDrag && <Overlay ref={overlay} className={cn("-m-4", "bg-slate-400", "rounded-lg")} />}
            <ContentWrapper>
                <Element dragging={enteredDrag} />
                {children}
            </ContentWrapper>
        </div>
    );
}
