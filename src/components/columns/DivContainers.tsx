import { cn } from "@/lib/utils";

interface DivProps {
  children?: React.ReactNode;
  className?: string;
}

export const HeaderContainer: React.FC<DivProps> = ({
  children,
  className,
  ...restProps
}) => {
  return (
    <div
      className={cn("flex", "gap-2", "items-center", className)}
      {...restProps}
    >
      {children}
    </div>
  );
};

export const CellContainer: React.FC<DivProps> = ({
  children,
  className,
  ...restProps
}) => {
  return (
    <div className={cn("flex-col","pl-1", className)} {...restProps}>
      {children}
    </div>
  );
};
