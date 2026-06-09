import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react'; // 1. Added usePage import
import {
    Copy,
    Check,
    ArrowRight,
    Search,
    Home,
    ShieldCheck,
    Clock,
    UserCheck,
    Lock,
    AlertCircle, // Added an alert icon for the expired state
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { home, reporterTrack } from '@/routes';
import { toast } from 'sonner';

export default function CaseReportedSuccessfully() {
    const [copied, setCopied] = useState(false);

    // 2. Extract the flashed session state variable from the page properties
    const page = usePage();
    let trackingId: string = '';

    if (page.flash.case_tracking_id) {
        trackingId = page.flash.case_tracking_id as string;
    }

    const copyToClipboard = () => {
        if (!trackingId) return;
        navigator.clipboard.writeText(trackingId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast.success('Successfully copied the tracking id');
    };

    const nextSteps = [
        {
            icon: Clock,
            title: 'Case Review',
            description:
                'A designated officer will be assigned to review your report within 24-48 hours.',
            color: 'text-chart-1 bg-chart-1/10',
        },
        {
            icon: ShieldCheck,
            title: 'Secure Processing',
            description:
                'Your information is handled with the highest level of confidentiality and security.',
            color: 'text-chart-2 bg-chart-2/10',
        },
        {
            icon: UserCheck,
            title: 'Support Services',
            description:
                'You can access counseling and support resources at any time during this process.',
            color: 'text-chart-5 bg-chart-5/10',
        },
    ];

    return (
        <div className="container mx-auto flex flex-col gap-8 py-12 md:py-20">
            {/* --- SUCCESS HERO SECTION --- */}
            <section className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-primary">
                    <Lock className="h-3 w-3 text-chart-2" />
                    <span>Submission Encrypted & Secured</span>
                </div>

                <h1 className="max-w-3xl text-4xl leading-tight font-extrabold tracking-tight text-primary md:text-5xl">
                    Report Successfully{' '}
                    <span className="text-blue-600">Submitted</span>
                </h1>

                <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                    Thank you for your courage in reporting this incident. Your
                    report has been securely received and is now in our system
                    for review.
                </p>
            </section>

            {/* --- TRACKING ID SECTION (Handles Show-Once Condition) --- */}
            <section className="mx-auto w-full max-w-2xl px-4">
                {trackingId ? (
                    <Card className="border-2 border-dashed border-emerald-200 bg-emerald-50/30 dark:border-emerald-900/50 dark:bg-emerald-900/10">
                        <CardHeader className="pb-2 text-center">
                            <CardTitle className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
                                Your Unique Tracking ID
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center gap-4 pb-6">
                            <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 shadow-sm">
                                <code className="text-2xl font-black tracking-[0.2em] text-primary md:text-3xl">
                                    {trackingId}
                                    {/* TESTING */}
                                </code>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={copyToClipboard}
                                    className="h-10 w-10 cursor-pointer text-muted-foreground hover:text-primary"
                                >
                                    {copied ? (
                                        <Check className="h-5 w-5 text-emerald-600" />
                                    ) : (
                                        <Copy className="h-5 w-5" />
                                    )}
                                </Button>
                            </div>
                            <p className="w-full rounded-lg border border-amber-200/40 bg-amber-50 p-2.5 text-center text-sm font-medium text-destructive dark:bg-amber-950/20">
                                ⚠️ Security Notice: Please record or copy this
                                tracking reference code immediately. To keep
                                your information confidential, it will clear
                                completely on page refresh.
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    /* --- FALLBACK LAYOUT AFTER USER REFRESHES --- */
                    <Card className="border border-destructive/20 bg-destructive/5 dark:bg-destructive/10">
                        <CardContent className="flex flex-col items-center gap-2 p-8 text-center">
                            <AlertCircle className="mb-2 h-8 w-8 text-destructive" />
                            <CardTitle className="text-md font-bold text-destructive">
                                Tracking ID Expired
                            </CardTitle>
                            <p className="max-w-sm text-sm text-muted-foreground">
                                For security and survivor privacy reasons,
                                tracking identifiers are visible exactly once.
                                If you did not record your key, check your
                                secure notification channels or contact system
                                administration.
                            </p>
                        </CardContent>
                    </Card>
                )}
            </section>

            {/* --- NEXT STEPS --- */}
            <section className="grid grid-cols-1 gap-6 px-4 md:grid-cols-3">
                {nextSteps.map((step, idx) => {
                    const Icon = step.icon;
                    return (
                        <Card
                            key={idx}
                            className="border-border bg-card shadow-sm transition-all hover:border-ring/40 hover:shadow-md"
                        >
                            <CardHeader className="space-y-4">
                                <div
                                    className={`w-fit rounded-lg p-3 ${step.color}`}
                                >
                                    <Icon className="h-6 w-6" />
                                </div>
                                <CardTitle className="text-xl font-bold text-primary">
                                    {step.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                                    {step.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    );
                })}
            </section>

            {/* --- ACTIONS --- */}
            <section className="flex flex-col items-center justify-center gap-4 px-4 sm:flex-row">
                <Button
                    asChild
                    size="lg"
                    className="w-full bg-primary font-medium text-primary-foreground shadow-md hover:bg-primary/90 sm:w-auto"
                >
                    <Link
                        href={reporterTrack()}
                        className="flex items-center gap-2"
                    >
                        <Search className="h-5 w-5" />
                        Track Your Report
                        <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                </Button>

                <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="w-full border-border font-medium text-foreground hover:bg-accent sm:w-auto"
                >
                    <Link href={home()} className="flex items-center gap-2">
                        <Home className="h-5 w-5 text-muted-foreground" />
                        Return to Home
                    </Link>
                </Button>
            </section>

            {/* --- FOOTER ASSURANCE --- */}
            <section className="mx-4 rounded-xl border border-border bg-secondary/60 p-6 text-center">
                <p className="text-xs text-muted-foreground">
                    Your privacy is our priority. This tracking ID is the only
                    way to access your report without anonymity compromise. Do
                    not share this ID with unauthorized individuals.
                </p>
            </section>
        </div>
    );
}
