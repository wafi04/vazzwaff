"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/ui/passwordInput"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { type loginAuth, loginSchema } from "@/types/schema/auth"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { AuthPage } from "../components/auth"
import { Login } from "../components/server"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)
  const login = Login()

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<loginAuth>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  async function onSubmit(data: loginAuth) {
    setIsLoading(true)
    setLoginError(null)

    try {
      login.mutate({
        password: data.password,
        username: data.username,
      })
    } catch (error) {
      setLoginError("Terjadi Kesalahan saat login")
    } finally {
      setIsLoading(false)
      reset()
    }
  }

  return (
    <AuthPage>
      <div className="w-full">
        <div className="rounded-xl p-4 sm:p-6 shadow-2xl">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-white mb-1">Login</h1>
            <p className="text-gray-300 text-sm">Masuk ke akun Anda</p>
          </div>

          {loginError && (
            <div className="bg-red-900/30 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6 text-sm">
              {loginError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-300">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Masukkan username"
                  className="bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  {...register("username")}
                />
                {errors.username && <p className="text-sm text-red-400">{errors.username.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">
                  Password
                </Label>
                <PasswordInput
                  id="password"
                  placeholder="••••••••"
                  {...register("password")}
                  showStrengthMeter={false}
                  error={errors.password?.message}
                  className="bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end">
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-blue-400 hover:text-blue-300 hover:underline"
                >
                  Lupa Password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 mt-2"
                disabled={isLoading || login.isPending}
              >
                {isLoading || login.isPending ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Loading...
                  </span>
                ) : (
                  "Masuk"
                )}
              </Button>
            </div>

            <div className="text-center text-sm text-gray-400 mt-4">
              Belum Punya Akun?{" "}
              <Link href="/auth/register" className="text-blue-400 hover:text-blue-300 hover:underline font-medium">
                Daftar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </AuthPage>
  )
}
