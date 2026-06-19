import { Head, Link } from '@inertiajs/react';
import { LogOut, RefreshCcw, OctagonX, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';

const Suspended = () => {
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = () => {
        setIsRefreshing(true);
        window.location.reload();
    };

    return (
        <>
            <Head title="Account Suspended" />
            <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 p-4">
                <Card className="w-full max-w-md border-none shadow-lg ring-1 ring-border">
                    <CardHeader className="text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
                            <OctagonX className="h-8 w-8 text-destructive" />
                        </div>
                        <CardTitle className="text-2xl font-bold tracking-tight">
                            Account Suspended
                        </CardTitle>
                        <CardDescription className="pt-2 text-balance text-muted-foreground">
                            Access to your account is Restricted.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 pb-8">
                        <div className="rounded-lg bg-muted/50 p-4 text-center">
                            <p className="text-sm leading-relaxed text-muted-foreground">
                                This account has been temporarily deactivated
                                due to a routine security compliance review or
                                an internal administrative directive. To restore
                                your dashboard access and resume case management
                                duties, please contact the System Administrator
                                or the IT Support Team.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Button
                                onClick={handleRefresh}
                                variant="default"
                                className="h-11 w-full cursor-pointer"
                            >
                                {isRefreshing ? (
                                    <Spinner className="text-white" />
                                ) : (
                                    <RefreshCcw className="mr-2 h-4 w-4" />
                                )}
                                Refresh Status
                            </Button>
                            <Button
                                onClick={() => window.history.back()}
                                variant="ghost"
                                className="h-11 w-full cursor-pointer"
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back
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

export default Suspended;
