export function ThumbnailSkeleton() {
  return (
    <div className="absolute inset-0 grid place-items-center" aria-hidden>
      <div className="h-px w-12 animate-pulse bg-foreground/25 motion-reduce:animate-none" />
    </div>
  );
}
