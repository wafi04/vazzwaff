'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { type RegisterAuth, registerSchema } from '@/types/schema/auth';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { WhatsAppInput } from '@/components/ui/wa-input';
import { AuthPage } from '../components/auth';
import { PasswordInput } from '@/components/ui/passwordInput';
import { Register } from '../components/server';
import { ApiError } from 'next/dist/server/api-utils';

export default function RegisterPage() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RegisterAuth>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      username: '',
      password: '',
      whatsapp: 62,
    },
  });
  
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const create = Register();
  
  const onSubmit = async (data: RegisterAuth) => {
    setIsLoading(true);
    try {
      create.mutate(data);
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.statusCode === 400)
          setError("Failed to register");
      }
    } finally {
      reset();
      setIsLoading(false);
    }
  };

  // Custom handler for WhatsApp input
  const handleWhatsAppChange = (value: string) => {
    setValue('whatsapp', value ? Number.parseInt(value) : 62);
  };

  return (
    <AuthPage>
      <div className="mx-auto max-w-md w-full px-4">
        <div className="bg-gray-800 rounded-xl p-6 shadow-2xl border border-gray-700">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-white mb-1">Buat Akun</h1>
            <p className="text-gray-400 text-sm">Isi Dibawah Ini dengan </p>
          </div>
          
          {error && (
            <div className="bg-red-900/30 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  className="bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  {...register('name')}
                />
                {errors.name && (
                  <p className="text-sm text-red-400">{errors.name.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-300">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Choose a username"
                  className="bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  {...register('username')}
                />
                {errors.username && (
                  <p className="text-sm text-red-400">{errors.username.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="whatsapp" className="text-gray-300">Nomer WhatsApp</Label>
                <WhatsAppInput
                  id="whatsapp"
                  placeholder="8123456789"
                  countryCode={62}
                  value={watch('whatsapp')}
                  onChange={(e) => handleWhatsAppChange(e.target.value)}
                  error={errors.whatsapp?.message}
                  className="bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">Password</Label>
                <PasswordInput
                  id="password"
                  placeholder="••••••••"
                  {...register('password')}
                  showStrengthMeter
                  error={errors.password?.message}
                  className="bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 mt-2"
                disabled={isLoading || create.isPending}
              >
                {isLoading || create.isPending ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading...
                  </span>
                ) : 'Create Account'}
              </Button>
            </div>

            <div className="text-center text-sm text-gray-400 mt-6">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-blue-400 hover:text-blue-300 hover:underline font-medium">
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </AuthPage>
  );
}
