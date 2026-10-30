export default function Loading() {
  return (
    <div className="container-page py-12 sm:py-16" aria-busy="true" aria-label="Loading page">
      <div className="h-3 w-32 animate-pulse rounded-full bg-secondary" />
      <div className="mt-5 h-10 w-2/3 max-w-md animate-pulse rounded-full bg-secondary sm:h-14" />
      <div className="mt-4 h-4 w-1/2 max-w-sm animate-pulse rounded-full bg-secondary" />

      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index}>
            <div className="aspect-[4/5] animate-pulse rounded-2xl bg-secondary" />
            <div className="mt-4 h-3 w-16 animate-pulse rounded-full bg-secondary" />
            <div className="mt-2 h-4 w-3/4 animate-pulse rounded-full bg-secondary" />
          </div>
        ))}
      </div>
    </div>
  );
}
