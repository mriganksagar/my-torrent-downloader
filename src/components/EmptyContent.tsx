import { cn } from "@/lib/utils";
import { FrameLogo } from "@/assets";

export const EmptyContent = () => {
  return (
    <div
      className={cn(
        "bg-slate-100",
        "flex-1",
        "rounded-lg",
        "m-8",
        "flex",
        "flex-col",
        "items-center",
        "justify-center",
        "font-semibold",
        "text-xl"
      )}
    >
      No Torrents Added!
      <FrameLogo className={cn("md:size-80", "sm:size-60", "xsm:size-40")} />
    </div>
  );
};
