export type User = {
  name: string; 
  id: number; 
  username: string; 
  isEmailVerified : boolean
  whatsapp: string | null; 
  balance: number; 
  role: string; 
  createdAt: Date | null; 
  updatedAt: Date | null; 
  password? : string
};


export type Member = {
    name: string;
    id: number;
    createdAt: string | null;
    updatedAt: string | null;
    username: string;
    whatsapp: string | null;
    password: string;
    balance: number;
    role: string;
    otp: string | null;
    apiKey: string | null;
    lastPaymentAt: string | null;
}