import { create } from "zustand"

export type usePaymentType = {
    selectPayment : {
        name : string,
        code : string,
        type : string,
        tax? : number
    }
    setSelectPayment : (pay : {
        code : string,
        name : string,
        type : string,
        tax? : number
    })  => void
    voucher :  string | undefined
    setSelectVoucher : (voucher : string | undefined)  => void
    whatsapp : string
    setWhatsapp : (wa : string)  => void
}

export const usePaymentStore = create<usePaymentType>((set) => ({
    selectPayment : {
        code : "",
        name : "",
        type : "",
        tax : undefined
    },
    setSelectPayment : (pay : {
        code : string,
        name : string,
        type : string,
        tax? : number
    })  => set({ selectPayment : pay}),
    voucher : undefined, 
    setSelectVoucher : (voucher : string | undefined)  => set({  voucher}),
    whatsapp : "",
    setWhatsapp : (wa : string)  => set({ whatsapp : wa}) 
}))