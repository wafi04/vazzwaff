"use client"
import { api } from "@/lib/axios";
import { loginAuth, RegisterAuth } from "@/schemas/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiError } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function Register() {
  const router = useRouter()
    const queryClient = useQueryClient()
    const {mutate,isPending,isError}  = useMutation({
      mutationKey : ["register"],
      mutationFn : async(req : RegisterAuth)  => {
        const data = {
          ...req,
          whatsApp : req.whatsapp?.toString()
        }
          const request = await api.post("/auth/register",data)
          return  request.data
      },
      onSuccess : ()  => {
        queryClient.invalidateQueries({queryKey : ["user"]})
        router.push("/auth/login")
        toast.success("Register Berhasil")

      },
      onError : (error : ApiError) => {
        queryClient.cancelQueries({ queryKey : ["user"]})
        toast.error(error.message || "Terjadi Kesalahan")
      }
    })

    return {
      mutate,
      isPending,
      isError
    }
}


export  function Login(){
  const queryClient = useQueryClient()
  const {mutate,isPending,isError}  = useMutation({
    mutationKey : ["login"],
    mutationFn : async(req : loginAuth)  => {
        const request = await api.post("/auth/login",req)
        return  request.data
    },
    onSuccess : ()  => {
      queryClient.invalidateQueries({ queryKey: ["user"] })
      window.location.href = "/"
      toast.success("Login Berhasil")
    },
    onError : (error : ApiError) => {
      if(error.statusCode === 401){
        toast.error("Invalid Credentials")
      }
      toast.error(error.message || "Terjadi Kesalahan,Silahkan Coba Lagi")
      queryClient.cancelQueries({ queryKey : ["user"]})
    }
  })

  return {
    mutate,
    isPending,
    isError
  }
}


export function Logout(){
  const queryClient =  useQueryClient()
  const {mutate,isPending,isError} =  useMutation({
    mutationKey : ["logout"],
    mutationFn : async ()  => {
      const request = await api.post("/auth/logout")
      return request.data
    },
    onSuccess : ()  => {
      queryClient.invalidateQueries({queryKey : ["user"]})
      toast.success("Logout Berhasil")
    },
    onError : (error : ApiError) => {
      toast.error(error.message || "Terjadi Kesalahan,Silahkan Coba Lagi")
      queryClient.cancelQueries({ queryKey : ["user"]})
    }
  })
  return {
    mutate,
    isPending,
    isError
  }

}