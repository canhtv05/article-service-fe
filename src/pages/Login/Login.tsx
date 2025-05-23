import { LoginForm } from '@/components/LoginForm';

const Login = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10 bg-background">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
