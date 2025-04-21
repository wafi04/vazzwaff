export function LoadingState() {
  return (
    <div className="flex justify-center py-12">
      <div className="flex flex-col items-center gap-2">
        <div className="h-8 w-8 rounded-full border-4 border-muted border-t-primary animate-spin"></div>
        <p className="text-muted-foreground text-sm">Memuat data kategori...</p>
      </div>
    </div>
  )
}
