import { cn } from "@/lib/utils";

interface DivProps {
  children?: React.ReactNode;
  className?: string;
  extraClasses: string;
}
export const DivWrapper: React.FC<DivProps> = ({
  children,
  extraClasses,
  className,
  ...restProps
}) => {
  return (
    <div className={cn(extraClasses, className)} {...restProps}>
      {children}
    </div>
  );
};
