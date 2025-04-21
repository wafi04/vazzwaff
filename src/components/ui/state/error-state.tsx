interface ErrorStateProps {
  message?: string
}

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="bg-red-50 text-red-600 p-4 rounded-md mt-4">
      <p className="font-medium">Terjadi kesalahan saat memuat data</p>
      {message && <p className="text-sm mt-1">{message}</p>}
      <p className="text-sm mt-1">Silakan periksa console untuk detail kesalahan</p>
    </div>
  )
}
