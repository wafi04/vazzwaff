import { number, z } from "zod"

export const createMethod = z.object({
    name :  z.string(),
    images : z.string(),
    code : z.string(),
    keterangan : z.string(),
    tipe : z.enum(["BANK_TRANSFER","EWALLET","CSSTORE"]),
    min : z.number(),
    isActive : z.boolean(),
    typeTax : z.string().nullable(),
    taxAdmin : z.number().nullable(),
    minExpired : z.number().nullable(),
    maxExpired : z.number().nullable(),
    max : z.number().nullable()
})

export type CreateMethod = z.infer<typeof createMethod>
export interface MethodsData extends CreateMethod {
    id :  number
    createdAt : string | null
    updatedAt : string | null
}


export type MethodsResponse = {
    meta: {
        limit: 
number
page
: 
number
total
: 
number
totalPages
: 
number
    }
methods : MethodsData[]
}

export type UpdateMethods = Partial<CreateMethod>
export type DeleteMethods = {
    id : number
}
export type FilterMethod = {
    isAll : string
    code? : string
    isActive? : boolean
    page? : number
    limit? : number
    type? : string
}

