import { Head, Link } from '@inertiajs/react';
import { LogOut, RefreshCcw, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AppLogo from '@/components/app-logo';
import { logout } from '@/routes';

const Inactive = () => {
    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <>
            <Head title="Account Inactive" />
            <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 p-4">
                <div className="mb-8">
                    {/* <AppLogo className="h-10 w-auto" /> */}
                </div>

                <Card className="w-full max-w-md border-none shadow-lg ring-1 ring-border">
                    <CardHeader className="text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
                            <ShieldAlert className="h-8 w-8 text-destructive" />
                        </div>
                        <CardTitle className="text-2xl font-bold tracking-tight">
                            Account Inactive
                        </CardTitle>
                        <CardDescription className="pt-2 text-balance text-muted-foreground">
                            Access to the Gender Reporting System has been
                            restricted for your account.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 pb-8">
                        <div className="rounded-lg bg-muted/50 p-4 text-center">
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
                                <RefreshCcw className="mr-2 h-4 w-4" />
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
