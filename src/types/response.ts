export type ApiResponse <T> =  {
    message : string
    data : T
    statusCode : number
}