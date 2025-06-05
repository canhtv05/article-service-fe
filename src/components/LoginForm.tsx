import { useNavigate } from 'react-router-dom';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import images from '@/assets/imgs';
import { FormEvent, useState } from 'react';
import { useAuthStore } from '@/zustand/authStore';
import { useMutation } from '@tanstack/react-query';
import { ApiResponse, UserResponse } from '@/types';
import { httpRequest } from '@/utils/httpRequest';
import cookieUtil from '@/utils/cookieUtil';
import axios from 'axios';
import { toast } from 'sonner';
import { Status } from '@/enums';

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  const navigate = useNavigate();
  const [value, setValue] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });

  const setUser = useAuthStore((s) => s.setUser);
  const setIsLoading = useAuthStore((s) => s.setIsLoading);

  const loginMutation = useMutation({
    mutationFn: async (): Promise<ApiResponse<UserResponse>> => {
      const data = await httpRequest.post('/auth/login', { email: value.email, password: value.password });
      return data.data;
    },
    onSuccess: (data: ApiResponse<UserResponse>) => {
      setUser(data.data, true);
      const token = {
        accessToken: data.meta?.tokenInfo?.accessToken,
        refreshToken: data.meta?.tokenInfo?.refreshToken,
      };
      cookieUtil.setStorage(token);
      toast.success('Đăng nhập thành công');
      navigate('/author-switch');
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error(Status.ERROR);
      }
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!value.email) {
      toast.error('Nhập email');
      return;
    } else if (!value.password) {
      toast.error('Nhập password');
      return;
    }

    setIsLoading(true);
    loginMutation.mutate();
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-normal">Welcome back</h1>
                <p className="text-balance text-muted-foreground">Login to your Acme Inc account</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={(e) => setValue((prev) => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Mật khẩu"
                  onChange={(e) => setValue((prev) => ({ ...prev, password: e.target.value }))}
                />
              </div>
              <Button type="submit" className="w-full" customize={'default'}>
                Login
              </Button>
            </div>
          </form>
          <div className="relative hidden bg-card md:block">
            <img
              src={images.admin}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover p-6 block rounded-2xl"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
