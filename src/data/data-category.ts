import { CategoryType } from "@/schemas/category"

export type CategoriesTypeData = {
    type: CategoryType
    name  : string
}

export const dataCategoryType : CategoriesTypeData[] =  [
    {
        name: "Game",
        type : 'gamelainnya'
    },
    {
        name: "Voucher",
        type : "voucher"
    },
    {
        name: "PLN",
        type : 'pln'
    },
    {
        name: "Pulsa",
        type : "pulsa"
    },
    {
        name: "Popular",
        type : 'populer'
    },
]