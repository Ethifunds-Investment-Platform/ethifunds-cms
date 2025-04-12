import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-neutral-100 dark:bg-stone-800", className)}
      {...props}
    />
  )
}

function SkeletonList({ count, className }: { count: number; className?: string }) {
	return Array.from({ length: count }, (_, idx) => <Skeleton key={idx} className={className} />);
}

export { Skeleton, SkeletonList };
