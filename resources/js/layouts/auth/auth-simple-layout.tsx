import { Link } from '@inertiajs/react';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({ children }: AuthLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground antialiased selection:bg-primary selection:text-primary-foreground">
            {/* Info Banner - Replaced hardcoded hex with theme colors */}
            <div className="relative bg-primary px-6 py-2.5 text-center text-xs font-medium text-primary-foreground sm:py-3 sm:text-sm shadow-sm">
                <div className="container mx-auto flex items-center justify-center gap-2">
                    <ShieldAlert className="h-4 w-4 opacity-90" />
                    <span className="tracking-wide uppercase">
                        Authorized Administrative Access Only. Secure session required.
                    </span>
                </div>
            </div>

            {/* Header/Navigation back to Home */}
            <header className="absolute top-12 left-0 z-10 w-full px-6 sm:px-12">
                <Button variant="ghost" size="sm" asChild className="gap-2 text-muted-foreground hover:text-foreground">
                    <Link href="/">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Home
                    </Link>
                </Button>
            </header>

            {/* Main Login Content */}
            <main className="flex flex-grow flex-col items-center justify-center p-4 sm:p-6 lg:p-12 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background">
                {children}
            </main>
            
            {/* Footer Background Decoration */}
            <div className="fixed bottom-0 left-0 -z-10 h-64 w-64 rounded-full bg-primary/5 blur-3xl opacity-50"></div>
            <div className="fixed top-0 right-0 -z-10 h-64 w-64 rounded-full bg-chart-1/5 blur-3xl opacity-50"></div>
        </div>
    );
}
