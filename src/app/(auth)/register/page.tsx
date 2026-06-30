import Link from 'next/link';
import RegisterForm from '@/components/auth/RegisterForm';

export const metadata = { title: 'Register' };

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-2xl font-semibold text-slate-900">Create an account</h1>
      <p className="mt-2 text-sm text-slate-600">
        Register to read premium articles and manage newsletter preferences.
      </p>
      <RegisterForm />
    </div>
  );
}
