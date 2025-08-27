import { cn } from "@/lib/utils";

interface MaxWidthWrapperProps {
  className?: string;
  children: React.ReactNode;
}

const MaxWidthWrapper = ({ className, children }: MaxWidthWrapperProps) => {
  return (
    <div className={cn("h-full w-full px-5 py-5", className)}>
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
