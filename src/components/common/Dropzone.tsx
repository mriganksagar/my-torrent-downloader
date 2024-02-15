import { cn } from "@/lib/utils";
import { styled } from "@mui/material";
import React, {
    ChangeEvent,
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
    zIndex: 9999,
});

const ContentWrapper = styled("div")({
    gridColumn: "1/2",
    gridRow: "1/2",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
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

    const handleFileInputWhenBrowsed = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        event?.preventDefault();
        event?.stopPropagation();
        const files = event.target?.files;
        if (files?.length && files.length > 0) {
            onUpload(files);
        }
    }, [onUpload]);

    const handleDrop: DragEventHandler = useCallback(
        (event) => {
            event?.preventDefault();
            event?.stopPropagation();
            setEnteredDrag(false);
            const { files } = event.dataTransfer;
            if (files?.length > 0 && files.length > 0) {
                onUpload(files);
            }
        },
        [onUpload]
    );

    const handleDragEnter: DragEventHandler = useCallback(
        (event) => {
            event?.preventDefault();
            event?.stopPropagation();
            if (event.target !== overlay.current) setEnteredDrag(true);
        },
        [setEnteredDrag]
    );

    const handleDragLeave: DragEventHandler = useCallback(
        (event) => {
            event?.preventDefault();
            event?.stopPropagation();
            if (event.target === overlay.current) setEnteredDrag(false);
        },
        [setEnteredDrag]
    );

    useEffect(() => {
        drop.current?.addEventListener("dragover", handleDragOver);
        drop.current?.addEventListener("drop", handleDrop);
        drop.current?.addEventListener("dragenter", handleDragEnter);
        drop.current?.addEventListener("dragleave", handleDragLeave);
        drop.current?.addEventListener("change", handleFileInputWhenBrowsed);
        return () => {
            drop.current?.removeEventListener("dragover", handleDragOver);
            drop.current?.removeEventListener("drop", handleDrop);
            drop.current?.removeEventListener("dragenter", handleDragEnter);
            drop.current?.removeEventListener("dragleave", handleDragLeave);
            drop.current?.removeEventListener('change', handleFileInputWhenBrowsed);
        };
    }, []);

    return (
        <div
            className={cn(
                "grid",
                "grid-cols-1",
                "grid-rows-1",
                "min-h-60",
                enteredDrag ? "bg-slate-200" : "bg-slate-100",
                "rounded-lg",
                "p-4"
            )}
            ref={drop}
        >
            {enteredDrag && <Overlay ref={overlay} className={cn("-m-4", "rounded-lg", "bg-slate-200/30")} />}
            <ContentWrapper>
                <Element dragging={enteredDrag} />
                {children}
            </ContentWrapper>
        </div>
    );
}
