import { Head, Link, router, usePage } from '@inertiajs/react';
import { LogOut, RefreshCcw, ShieldAlert } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardFooter,
    CardTitle,
} from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { getInitials } from '@/lib/helpers';
import { logout } from '@/routes';
import admin from '@/routes/admin';
import officer from '@/routes/officer';
import type { UsePageProps } from '@/types/types';

const Inactive = () => {
    const { auth } = usePage<UsePageProps>().props;
    const route =
        auth.user.role === 'admin'
            ? admin.overview().url
            : officer.overview().url;

    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

    const handleRefresh = () => {
        router.get(
            route,
            {},
            {
                onStart: () => setIsRefreshing(true),
                onFinish: () => setIsRefreshing(false),
            },
        );
    };

    return (
        <>
            <Head title="Account Inactive" />
            <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 p-4">
                <Card className="w-full max-w-md border-none shadow-lg ring-1 ring-border">
                    <CardHeader className="text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
                            <ShieldAlert className="h-8 w-8 text-destructive" />
                        </div>
                        <CardTitle className="text-2xl font-bold tracking-tight">
                            Account Inactive
                        </CardTitle>
                        <CardTitle className="text-xl font-bold">
                            {auth.user.full_name}
                        </CardTitle>
                        <CardDescription className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
                            Role: {auth.user.role}
                        </CardDescription>
                        <CardDescription className="pt-2 text-balance text-muted-foreground">
                            Your account is inactive or deactivated.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 pb-8">
                        <div className="rounded-lg bg-muted/50 text-center">
                            <p className="text-sm leading-relaxed text-muted-foreground">
                                Your account is currently marked as{' '}
                                <span className="font-semibold text-foreground">
                                    Inactive
                                </span>{' '}
                                . Please reach out to your system administrator
                                or the IT support team to resolve this.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Button
                                onClick={handleRefresh}
                                variant="default"
                                className="h-11 w-full"
                            >
                                {isRefreshing ? (
                                    <>
                                        <Spinner />
                                    </>
                                ) : (
                                    <>
                                        <RefreshCcw className="mr-2 h-4 w-4" />
                                    </>
                                )}
                                Refresh Status
                            </Button>

                            <Button
                                variant="outline"
                                className="h-11 w-full"
                                asChild
                            >
                                <Link
                                    href={logout()}
                                    as="button"
                                    method="post"
                                    className="flex w-full items-center justify-center"
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Sign Out
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <p className="mt-8 text-center text-xs text-muted-foreground">
                    &copy; {new Date().getFullYear()} Gender Reporting System.
                    All rights reserved.
                </p>
            </div>
        </>
    );
};

export default Inactive;
