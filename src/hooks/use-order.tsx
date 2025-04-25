import { useCreateTransactionCart } from "@/app/(main)/order/server"
import { create } from "zustand"

type CartItem = {
  gameId: string
  gameServer?: string
    productCode: string
    productName: string
  nickname : string
}

type UseOrderType = {
  items: CartItem[]
  gameId: string
  gameServer?: string
  productCode: string
  productName: string
  nickname : string

  setGameId: (id: string) => void
  setGameServer: (server: string) => void
  setProductCode: (code: string) => void
  setProductName: (name: string) => void
  setNickName : (nickname : string)  => void

  addToCart: () => void
  resetFields: () => void
}

export const useAddToCart = create<UseOrderType>((set, get) => ({
    items: [],
    gameId: "",
    gameServer: "",
    productCode: "",
    productName: "",
    nickname: "",

    setGameId: (id) => set({ gameId: id }),
    setGameServer: (server) => set({ gameServer: server }),
    setProductCode: (code) => set({ productCode: code }),
    setNickName: (name) => set({ nickname: name }),
    setProductName : (product)  => set({productName : product}),
    addToCart: () => {
    const { gameId, gameServer, productCode,productName,nickname } = get()
    if (!gameId || !productCode) return 
    set((state) => ({
      items: [...state.items, { gameId, gameServer, productCode,productName,nickname }],
      gameId: "",
      gameServer: "",
      productCode: "",
    }))
  },

  resetFields: () => set({
    items : [],
    gameId: "",
    gameServer: "",
    productCode: "",
  }),
}))
