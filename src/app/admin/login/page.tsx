import { AuthError } from 'next-auth';

import { redirect } from 'next/navigation';

import { auth, signIn } from '@/lib/auth';

import { isStaffRole } from '@/lib/auth-utils';

import DsbLogo from '@/components/brand/DsbLogo';

import AdminLoginForm from '@/components/admin/AdminLoginForm';



export const metadata = { title: 'Admin Sign In' };



const ERROR_MESSAGES: Record<string, string> = {

  CredentialsSignin: 'Invalid email or password.',

  NotStaff: 'This account does not have staff access. Use the public login for client accounts.',

};



export default async function AdminLoginPage({

  searchParams,

}: {

  searchParams: Promise<{ error?: string; callbackUrl?: string }>;

}) {

  const session = await auth();

  const { error, callbackUrl } = await searchParams;

  const redirectTo =

    callbackUrl?.startsWith('/admin') && !callbackUrl.startsWith('/admin/login')

      ? callbackUrl

      : '/admin';



  if (session?.user) {

    if (isStaffRole(session.user.role)) {

      redirect(redirectTo);

    }

    redirect('/admin/login?error=NotStaff');

  }



  async function loginAction(formData: FormData) {

    'use server';

    const target = String(formData.get('callbackUrl') ?? '/admin');

    const safeTarget =

      target.startsWith('/admin') && !target.startsWith('/admin/login') ? target : '/admin';



    try {

      await signIn('credentials', {

        email: String(formData.get('email') ?? ''),

        password: String(formData.get('password') ?? ''),

        redirectTo: safeTarget,

      });

    } catch (err) {

      if (err instanceof AuthError && err.type === 'CredentialsSignin') {

        redirect(

          `/admin/login?error=CredentialsSignin&callbackUrl=${encodeURIComponent(safeTarget)}`,

        );

      }

      throw err;

    }

  }



  const errorMessage = error ? (ERROR_MESSAGES[error] ?? 'Unable to sign in.') : null;



  return (

    <div className="zynix-auth-card">

      <div className="mb-8 text-center lg:text-left">

        <div className="flex justify-center lg:justify-start">

          <DsbLogo height={44} priority className="lg:hidden" />

        </div>

        <p className="mt-4 text-sm font-semibold uppercase tracking-wider lg:mt-0 zynix-auth-accent">

          Staff Sign In

        </p>

        <h2 className="mt-1 text-2xl font-bold" style={{ color: 'var(--z-text)' }}>

          Admin dashboard

        </h2>

        <p className="mt-2 text-sm" style={{ color: 'var(--z-text-muted)' }}>

          CMS access for authorized DSB Law Group staff only.

        </p>

      </div>



      <AdminLoginForm action={loginAction} redirectTo={redirectTo} errorMessage={errorMessage} />

    </div>

  );

}


