// import { Form, Head } from '@inertiajs/react';
// import InputError from '@/components/input-error';
// import PasswordInput from '@/components/password-input';
// import TextLink from '@/components/text-link';
// import { Button } from '@/components/ui/button';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Spinner } from '@/components/ui/spinner';
// import { register } from '@/routes';
// import { store } from '@/routes/login';
// import { request } from '@/routes/password';

// type Props = {
//     status?: string;
//     canResetPassword: boolean;
//     canRegister: boolean;
// };

// export default function Login({
//     status,
//     canResetPassword,
// canRegister,
// }: Props) {
//     return (
//         <>
//             <Head title="Log in" />

//             <Form
//                 {...store.form()}
//                 resetOnSuccess={['password']}
//                 className="flex flex-col gap-6"
//             >
//                 {({ processing, errors }) => (
//                     <>
//                         <div className="grid gap-6">
//                             <div className="grid gap-2">
//                                 <Label htmlFor="email">Email address</Label>
//                                 <Input
//                                     id="email"
//                                     type="email"
//                                     name="email"
//                                     required
//                                     autoFocus
//                                     tabIndex={1}
//                                     autoComplete="email"
//                                     placeholder="email@example.com"
//                                 />
//                                 <InputError message={errors.email} />
//                             </div>

//                             <div className="grid gap-2">
//                                 <div className="flex items-center">
//                                     <Label htmlFor="password">Password</Label>
//                                     {canResetPassword && (
//                                         <TextLink
//                                             href={request()}
//                                             className="ml-auto text-sm"
//                                             tabIndex={5}
//                                         >
//                                             Forgot password?
//                                         </TextLink>
//                                     )}
//                                 </div>
//                                 <PasswordInput
//                                     id="password"
//                                     name="password"
//                                     required
//                                     tabIndex={2}
//                                     autoComplete="current-password"
//                                     placeholder="Password"
//                                 />
//                                 <InputError message={errors.password} />
//                             </div>

//                             <div className="flex items-center space-x-3">
//                                 <Checkbox
//                                     id="remember"
//                                     name="remember"
//                                     tabIndex={3}
//                                 />
//                                 <Label htmlFor="remember">Remember me</Label>
//                             </div>

//                             <Button
//                                 type="submit"
//                                 className="mt-4 w-full"
//                                 tabIndex={4}
//                                 disabled={processing}
//                                 data-test="login-button"
//                             >
//                                 {processing && <Spinner />}
//                                 Log in
//                             </Button>
//                         </div>

//                         {canRegister && (
//                            <div className="text-center text-sm text-muted-foreground">
//                                 Don't have an account?{' '}
//                                 <TextLink href={register()} tabIndex={5}>
//                                     Sign up
//                                 </TextLink>
//                             </div>
//                         )}
//                     </>
//                 )}
//             </Form>

//             {status && (
//                 <div className="mb-4 text-center text-sm font-medium text-green-600">
//                     {status}
//                 </div>
//             )}
//         </>
//     );
// }

// Login.layout = {
//     title: 'Log in to your account',
//     description: 'Enter your email and password below to log in',
// };

import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
// import InputError from '@/components/input-error';
// import PasswordInput from '@/components/password-input';
// import TextLink from '@/components/text-link';
// import { Button } from '@/components/ui/button';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

import { store } from '@/routes/login';
// import { request } from '@/routes/password';
import { register } from '@/routes';
import { toast } from 'sonner';

import { PortalLoader } from '@/components/portal-loader';
import { IMAGES } from '@/constants/images';

import { useState } from 'react';
import { Eye, EyeOff, LoaderCircle } from 'lucide-react';

type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
};

export default function Login({
    status,
    // canResetPassword,
    canRegister,
}: Props) {
    // Initialize useForm with your fields
    const { data, setData, post, processing, errors, reset } = useForm({
        // email: '',
        username: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // Using your existing route logic from store.form()
        post(store().url, {
            onSuccess: () => {
                toast.success('Logged in successfully!');
            },
            onError: () => {
                toast.error(
                    'Failed to log in. Please check your credentials and try again.',
                );
            },
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Log in" />

            {processing && <PortalLoader />}

            <div className="grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-xl border border-[#e2e8f0] bg-[#ffffff] shadow-2xl md:grid-cols-2">
                {/* Brand/Logo Section */}
                <div className="flex flex-col items-center justify-center space-y-6 border-b border-[#e2e8f0] bg-[#f8fafc] p-8 sm:space-y-8 sm:p-12 md:border-r md:border-b-0">
                    <div className="relative h-32 w-32 sm:h-48 sm:w-48">
                        <img
                            src={IMAGES.logo}
                            alt="MUHAS Logo"
                            className="h-full w-full object-contain"
                        />
                    </div>
                    <div className="text-center">
                        <h2 className="text-xl leading-tight font-bold text-[#0f172a] sm:text-2xl">
                            Muhimbili University of{' '}
                            <br className="hidden sm:block" /> Health and Allied
                            Sciences
                        </h2>
                        <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-[#2563eb] sm:w-16"></div>
                    </div>
                    <p className="hidden max-w-xs text-center text-xs leading-relaxed text-[#64748b] sm:block sm:text-sm">
                        Institutional portal for gender equity reporting, case
                        management, and statistics analysis.
                    </p>
                </div>

                {/* Form Section */}
                <div className="flex flex-col justify-center bg-[#ffffff] p-8 sm:p-12">
                    <div className="mb-8 text-center sm:mb-10 md:text-left">
                        <h3 className="text-2xl font-bold text-[#0f172a] sm:text-3xl">
                            Login
                        </h3>
                        <p className="mt-2 text-sm text-[#64748b] sm:text-base">
                            Welcome back. Please enter your credentials.
                        </p>
                    </div>

                    <form className="space-y-5 sm:space-y-6" onSubmit={submit}>
                        {/* User Name Field */}
                        <div>
                            <label
                                htmlFor="username"
                                className="mb-1.5 block text-sm font-semibold text-[#0f172a] sm:mb-2"
                            >
                                User Name
                            </label>
                            <input
                                id="user_name"
                                type="text"
                                value={data.username}
                                onChange={(e) =>
                                    setData('username', e.target.value)
                                }
                                placeholder="john.erasto"
                                className={`w-full rounded-lg border px-4 py-3 text-sm text-black transition-all outline-none focus:ring-2 sm:text-base ${
                                    errors.username
                                        ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200'
                                        : 'border-[#e2e8f0] bg-[#f1f5f9] focus:border-[#2563eb] focus:ring-[#2563eb]'
                                }`}
                                required
                            />
                            {errors.username && (
                                <p className="mt-1.5 text-xs text-red-600 sm:text-sm">
                                    {errors.username}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label
                                htmlFor="password"
                                className="mb-1.5 block text-sm font-semibold text-[#0f172a] sm:mb-2"
                            >
                                Password
                            </label>

                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={data.password}
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                    placeholder="••••••••"
                                    className={`w-full rounded-lg border px-4 py-3 pr-11 text-sm text-black transition-all outline-none focus:ring-2 sm:text-base ${
                                        errors.password
                                            ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200'
                                            : 'border-[#e2e8f0] bg-[#f1f5f9] focus:border-[#2563eb] focus:ring-[#2563eb]'
                                    }`}
                                    required
                                />

                                {/* Eye toggle */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword((prev) => !prev)
                                    }
                                    className="absolute inset-y-0 right-3 flex cursor-pointer items-center text-slate-500 transition hover:text-blue-600"
                                    tabIndex={-1}
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                            </div>

                            {errors.password && (
                                <p className="mt-1.5 text-xs text-red-600 sm:text-sm">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="flex w-full transform cursor-pointer items-center justify-center gap-5 rounded-lg bg-[#2563eb] py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-[#1d4ed8] active:scale-[0.98] disabled:pointer-events-auto disabled:cursor-not-allowed sm:py-4 sm:text-base"
                        >
                            {processing && (
                                // <LoaderCircle className="size-5 animate-spin" />
                                <Spinner className="text-sidebar" />
                            )}
                            Log in
                        </button>
                    </form>

                    {canRegister && (
                        <div className="mt-6 text-center text-sm text-[#64748b]">
                            Don't have an account?{' '}
                            <Link
                                prefetch="hover"
                                href={register()}
                                className="font-bold text-[#2563eb] hover:underline"
                            >
                                Register
                            </Link>
                        </div>
                    )}

                    <div className="mt-8 text-center text-[10px] text-[#64748b] sm:text-xs">
                        © 2026 MUHAS Gender Reporting Unit. Version 1.0.2
                    </div>
                </div>
            </div>

            {/* Footer Navigation */}
            <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs font-medium text-[#64748b] sm:mt-12 sm:text-sm">
                <span className="cursor-pointer border-b-2 border-transparent pb-1 transition-all hover:border-[#2563eb] hover:text-[#2563eb]">
                    About GRS
                </span>
                <span className="cursor-pointer border-b-2 border-transparent pb-1 transition-all hover:border-[#2563eb] hover:text-[#2563eb]">
                    Latest Reports
                </span>
                <span className="cursor-pointer border-b-2 border-transparent pb-1 transition-all hover:border-[#2563eb] hover:text-[#2563eb]">
                    University Governance
                </span>
                <span className="cursor-pointer border-b-2 border-transparent pb-1 transition-all hover:border-[#2563eb] hover:text-[#2563eb]">
                    Terms of Service
                </span>
            </div>
            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
        </>
    );
}
