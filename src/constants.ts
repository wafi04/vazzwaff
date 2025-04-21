export const URL_LOGO = 'https://res.cloudinary.com/dstvymie8/image/upload/v1741104560/LOGO_VAZZ_STORE_2_dereyt.webp'
export const DIGI_USERNAME = process.env.DIGI_USERNAME as string;
export  const BACKEND_URL =  process.env.NEXT_PUBLIC_BACKEND_URL as string
export const DIGI_KEY = process.env.DIGI_API_KEY as string;
export const CATEGORIES_QUERY_KEY = ['categories'] as const;
export const DUITKU_MERCHANT_CODE = process.env.DUITKU_MERCHANT_CODE;
export const DUITKU_API_KEY = process.env.DUITKU_API_KEY;
export const DUITKU_BASE_URL = process.env.DUITKU_BASE_URL
export const DUITKU_CALLBACK_URL = process.env.NEXT_PUBLIC_DUITKU_CALLBACK_URL;
export const DUITKU_RETURN_URL = process.env.NEXT_PUBLIC_DUITKU_RETURN_URL;
export const DUITKU_EXPIRY_PERIOD = 60 * 24;
export type ROLE_USER = "MEMBER" | "ADMIN"  | "PLATINUM" 
export const BASE_URL_VALIDATE_NICKNAME = process.env
  .NEXT_PUBLIC_CHECK_NICKNAME_URL as string;
