export type Cart = {
    amount: number
    completedAt: string | null
    createdAt: string
    id: number
    isManual: boolean
    items: OrderItems[]
    method: string | null
    position: string
    status: string
    transactionId: string
    type: string
    updatedAt: string
    username: string
}

export type OrderResponse = {
    data : {
        cart : Cart
    amountItems : number
    }
}

export type OrderItems = {
    createdAt: string
    gameId: string
    gameServer: string
    productImage : string | null
    id: number
    productName : string
    isReorder: boolean
    message: string | null
    nickName: string | null
    price: number
    productCode: string
    provider: string
    quantity: number
    serialNumber: string | null
    status: string
    transactionId: string
    transactionItemId: string
    updatedAt: string
}
