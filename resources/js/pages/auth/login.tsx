import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';
import { Shield, User, Lock, ArrowRight, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

// Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { PortalLoader } from '@/components/portal-loader';
import { Spinner } from '@/components/ui/spinner';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';

// Constants & Routes
import { IMAGES } from '@/constants/images';
import { store } from '@/routes/login';

type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
};

export default function Login({
    status,
    canResetPassword = false,
    canRegister = false,
}: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(store().url, {
            onSuccess: () => {
                toast.success('Logged in successfully!');
            },

            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="w-full max-w-5xl">
            <Head title="Administrative Login" />

            {processing && <PortalLoader />}

            <Card className="overflow-hidden border-none shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Left Column: Branding & Info */}
                    <div className="relative flex flex-col items-center justify-center border-border bg-muted/30 p-8 text-center sm:p-12 md:border-r">
                        {/* Background Decoration */}
                        <div className="pointer-events-none absolute top-0 left-0 h-full w-full overflow-hidden opacity-5">
                            <Shield className="absolute -top-10 -left-10 h-64 w-64 rotate-12" />
                            <Lock className="absolute -right-10 -bottom-10 h-64 w-64 -rotate-12" />
                        </div>

                        <div className="relative z-10 flex flex-col items-center gap-8">
                            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                                <img
                                    src={IMAGES.logo}
                                    alt="MUHAS Logo"
                                    className="h-24 w-24 object-contain sm:h-32 sm:w-32"
                                />
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-xl leading-tight font-bold tracking-tight text-primary sm:text-2xl">
                                    Gender Reporting{' '}
                                    <br className="hidden sm:block" /> System
                                </h2>
                                <div className="mx-auto h-1 w-16 rounded-full bg-primary/30"></div>
                                <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                                    Institutional portal for gender equity
                                    reporting, case management, and data-driven
                                    policy analysis.
                                </p>
                            </div>

                            <div className="mt-4 flex w-full max-w-[280px] flex-col gap-3">
                                <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-card/50 p-3 text-left">
                                    <Shield className="h-5 w-5 shrink-0 text-chart-1" />
                                    <span className="text-xs font-medium text-muted-foreground">
                                        Secure Multi-Factor Authentication
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-card/50 p-3 text-left">
                                    <Info className="h-5 w-5 shrink-0 text-chart-2" />
                                    <span className="text-xs font-medium text-muted-foreground">
                                        Encryption Grade Data Protection
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="flex flex-col justify-center bg-card p-8 sm:p-12">
                        <div className="mb-8 space-y-2">
                            <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                                Welcome Back
                            </h3>
                            <p className="text-sm text-muted-foreground sm:text-base">
                                Please sign in to your administrative account.
                            </p>
                        </div>

                        <form className="space-y-6" onSubmit={submit}>
                            {/* Username */}
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <div className="relative">
                                    <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        id="username"
                                        type="text"
                                        placeholder="Enter your username"
                                        value={data.username}
                                        onChange={(e) =>
                                            setData('username', e.target.value)
                                        }
                                        className={cn(
                                            'h-10 pl-10',
                                            errors.username &&
                                                'border-destructive ring-destructive/20',
                                        )}
                                        required
                                        autoComplete="username"
                                    />
                                </div>
                                {errors.username && (
                                    <InputError message={errors.username} />
                                )}
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Password</Label>
                                    {/* {canResetPassword && (
                                        <Link
                                            href={register}
                                            className="text-xs font-medium text-primary hover:underline"
                                        >
                                            Forgot password?
                                        </Link>
                                    )} */}
                                </div>
                                <div className="relative">
                                    <Lock className="absolute top-1/2 left-3 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <PasswordInput
                                        id="password"
                                        placeholder="••••••••"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData('password', e.target.value)
                                        }
                                        className={cn(
                                            'h-10 pl-10',
                                            errors.password &&
                                                'border-destructive ring-destructive/20',
                                        )}
                                        required
                                        autoComplete="current-password"
                                    />
                                </div>
                                {errors.password && (
                                    <InputError message={errors.password} />
                                )}
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="remember"
                                    checked={data.remember}
                                    onCheckedChange={(checked) =>
                                        setData('remember', checked as boolean)
                                    }
                                />
                                <Label
                                    htmlFor="remember"
                                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Keep me logged in
                                </Label>
                            </div>

                            {status && (
                                <div className="rounded-lg border border-green-100 bg-green-50 p-3 text-sm font-medium text-green-600">
                                    {status}
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="h-12 w-full gap-2 text-base font-bold"
                                disabled={processing}
                            >
                                {processing ? (
                                    <Spinner className="text-white" />
                                ) : (
                                    'Sign In'
                                )}
                                {!processing && (
                                    <ArrowRight className="h-4 w-4" />
                                )}
                            </Button>
                        </form>

                        <div className="mt-10 border-t border-border/50 pt-8 text-center">
                            <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                                © 2026 Gender Reporting System
                                <span className="inline-block h-1 w-1 rounded-full bg-muted-foreground/30"></span>
                                v1.0.3
                            </p>
                        </div>
                    </div>
                </div>
            </Card>

            {/* External Links */}
            <nav className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4 px-4">
                {[
                    'About GRS',
                    'Latest Reports',
                    'University Governance',
                    'Terms of Service',
                ].map((item) => (
                    <button
                        key={item}
                        className="group relative pb-1 text-xs font-semibold text-muted-foreground transition-all hover:text-primary"
                    >
                        {item}
                        <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all group-hover:w-full"></span>
                    </button>
                ))}
            </nav>
        </div>
    );
}
