import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    Shield,
    Menu,
    GraduationCap,
    HelpCircle,
    Home,
    LogIn,
    ArrowLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
} from '@/components/ui/sheet';
import QuickExitButton from '@/components/quick-exit-button';
import { reporterReport, reporterSuccess } from '@/routes';
import { useStepperFormStore } from '@/hooks/store/use-stepper-form-store';
import officer from '@/routes/officer';
import admin from '@/routes/admin';

interface AppLayoutProps {
    children: React.ReactNode;
}

export default function AppGuestLayout({ children }: AppLayoutProps) {
    const { url, props } = usePage();
    const resetForm = useStepperFormStore((state) => state.resetForm);

    let dashboardHref = '';
    if (props.auth.user) {
        dashboardHref =
            props.auth.user.role === 'admin'
                ? admin.overview().url
                : officer.overview().url;
    }

    const navLinks = [
        { href: '/', label: 'Home', icon: Home },
        { href: '/faq', label: 'FAQ', icon: HelpCircle },
        { href: '/education', label: 'Education', icon: GraduationCap },
        props.auth.user
            ? { href: dashboardHref, label: 'Dashboard', icon: Home }
            : { href: '/login', label: 'Login', icon: GraduationCap },
    ];

    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground antialiased selection:bg-primary selection:text-primary-foreground">
            {/* Navigation Bar */}
            <header className="sticky top-0 z-50 w-full border-b border-border bg-card/90 backdrop-blur supports-[backdrop-filter]:bg-card/60">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    {/* Logo/Identity */}
                    <Link
                        href="/"
                        className="group flex items-center gap-2.5 transition-opacity hover:opacity-90"
                    >
                        <div className="rounded-md bg-primary p-2 text-primary-foreground shadow-sm">
                            <Shield className="h-5 w-5" />
                        </div>
                        <span className="text-lg font-semibold tracking-tight text-primary">
                            GRS
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden items-center gap-1 md:flex">
                        {url === reporterReport.url() ? (
                            <>
                                <button
                                    onClick={() => {
                                        resetForm();
                                        window.history.back();
                                    }}
                                    className="flex items-center gap-1 rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Back
                                </button>
                            </>
                        ) : (
                            <>
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </>
                        )}

                        <QuickExitButton />
                    </nav>

                    {/* Mobile Menu (Shadcn Sheet) */}
                    <div className="flex items-center md:hidden">
                        <QuickExitButton />
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    aria-label="Toggle Menu"
                                    className="text-foreground hover:bg-accent"
                                >
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="right"
                                className="flex w-[300px] flex-col justify-between border-l border-border bg-card p-6"
                            >
                                <div className="space-y-6">
                                    <SheetTitle className="text-left text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                                        Navigation
                                    </SheetTitle>
                                    <nav className="flex flex-col gap-2">
                                        {navLinks.map((link) => {
                                            const Icon = link.icon;
                                            return (
                                                <Link
                                                    key={link.href}
                                                    href={link.href}
                                                    className="flex items-center gap-3 rounded-md px-4 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                                                >
                                                    <Icon className="h-5 w-5 text-muted-foreground" />
                                                    {link.label}
                                                </Link>
                                            );
                                        })}
                                    </nav>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="container mx-auto flex flex-1 flex-col">
                {children}
            </main>
        </div>
    );
}
