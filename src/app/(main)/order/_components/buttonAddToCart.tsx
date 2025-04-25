"use client"
import { Button } from "@/components/ui/button"
import { useAddToCart } from "@/hooks/use-order"
import { useCreateTransactionCart } from "../server"
import { CheckNickName } from "@/lib/check-nickname"
import { GameType } from "@/data/check-code"
import { useState } from "react"

export function ButtonAddToCart({ code }: { code: string }) {
  const { addToCart, resetFields, items, gameId, gameServer, productCode } = useAddToCart()
  const { mutate, isPending } = useCreateTransactionCart()
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      const isValid = await CheckNickName({
        type: code as GameType,
        userId: gameId,
        serverId: gameServer
      })

      if (!isValid.success) {
        setError("Nickname tidak valid.")
        return
      }

      addToCart()
      mutate([...items, { gameId, gameServer, productCode }])

      resetFields()

    } catch (err) {
      setError("Terjadi kesalahan saat memvalidasi nickname.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#00112b] mt-4 p-4 rounded-lg border border-[#4f9cf9]/20 space-y-3">
      {/* Menampilkan pesan error jika ada */}
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button
        type="submit"
        disabled={isPending} // Disable tombol jika sedang proses
        className="w-full bg-[#4f9cf9] hover:bg-[#3b87db] text-white text-sm"
      >
        {isPending ? "Memproses..." : "Tambah ke Keranjang"}
      </Button>
    </form>
  )
}
