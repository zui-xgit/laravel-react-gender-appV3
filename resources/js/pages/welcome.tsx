import { Link } from '@inertiajs/react';
import {
    ShieldAlert,
    FileText,
    Landmark,
    ArrowRight,
    EyeOff,
    Lock,
    CheckCircle2,
    PhoneCall,
    Inbox,
    UserCheck,
    Building2,
} from 'lucide-react';
import TrackExistingReportDialog from '@/components/dialogs/track-existing-report-dialog';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { reporterReport } from '@/routes';

export default function Home() {
    // Core application features
    const coreFeatures = [
        {
            icon: ShieldAlert,
            title: 'Secure Incident Reporting',
            description:
                'File formal reports securely with optional anonymity provisions built directly into the tracking pipeline.',
            color: 'text-chart-1 bg-chart-1/10',
        },
        {
            icon: EyeOff,
            title: 'Strict Confidentiality',
            description:
                'Your data is strictly restricted. Only mandated case handling officers have authenticated access to case timelines.',
            color: 'text-chart-2 bg-chart-2/10',
        },
        {
            icon: Landmark,
            title: 'Institutional Accountability',
            description:
                'Track the active compliance lifecycle, updates, and disciplinary metrics transparently in real-time.',
            color: 'text-chart-5 bg-chart-5/10',
        },
    ];

    // Alternative channels for accessible reporting
    const reportingChannels = [
        {
            icon: PhoneCall,
            title: '24/7 Helpline',
            detail: 'Call 0800-XXX-XXX',
            description:
                'Speak directly with a trained, empathetic trauma counselor for immediate support and guidance.',
            badge: 'Immediate Toll-Free',
        },
        {
            icon: Inbox,
            title: 'Physical Dropboxes',
            detail: 'Main Campus Locations',
            description:
                'Submit handwritten, anonymous reports into sealed collection boxes located in high-privacy areas.',
            badge: '100% Offline',
        },
        {
            icon: UserCheck,
            title: 'In-Person Counselors',
            detail: 'Block C, Office 12',
            description:
                'Walk in to speak directly with an ombudsperson or designated desk officer in a private, neutral environment.',
            badge: 'Face-to-Face',
        },
        {
            icon: Building2,
            title: 'External Advocates',
            detail: 'Partner NGOs',
            description:
                'Escalate or log your grievances through independent, third-party legal and human rights organizations.',
            badge: 'Independent Third-Party',
        },
    ];

    return (
        <div className="flex flex-col gap-20 py-12 md:py-20">
            {/* --- HERO SECTION --- */}
            <section className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-primary">
                    <Lock className="h-3 w-3 text-chart-2" />
                    <span>End-to-End Cryptographic Protection Active</span>
                </div>

                <h1 className="max-w-3xl text-4xl leading-tight font-extrabold tracking-tight text-primary md:text-5xl lg:text-6xl">
                    A Safe, Accountable Space for{' '}
                    <span className="text-chart-1">Gender Justice</span>
                </h1>

                <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                    File confidential reports, track case progression, and
                    access critical education resources under total privacy
                    protections.
                </p>

                {/* Action Buttons with 3-tier hierarchy */}
                <div className="flex w-full flex-col items-center justify-center gap-4 pt-4 sm:w-auto sm:flex-row">
                    {/* Primary Action */}
                    <Button
                        asChild
                        size="lg"
                        className="w-full bg-primary font-medium text-primary-foreground shadow-md hover:bg-primary/90 sm:w-auto"
                    >
                        <Link
                            href={reporterReport()}
                            className="flex items-center gap-2"
                        >
                            <FileText className="h-5 w-5" />
                            File a Secure Report
                            <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                    </Button>

                    {/* Secondary Action: Follow Up */}
                    <TrackExistingReportDialog />

                    {/* Tertiary Action: Info */}
                    <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="w-full border-border font-medium text-foreground hover:bg-accent sm:w-auto"
                    >
                        <Link href="/education">Explore Resources</Link>
                    </Button>
                </div>
            </section>

            {/* --- SYSTEM ASSURANCES / FEATURES --- */}
            <section className="grid grid-cols-1 gap-6 px-4 md:grid-cols-3">
                {coreFeatures.map((feature, idx) => {
                    const Icon = feature.icon;

                    return (
                        <Card
                            key={idx}
                            className="border-border bg-card shadow-sm transition-all hover:border-ring/40 hover:shadow-md"
                        >
                            <CardHeader className="space-y-4">
                                <div
                                    className={`w-fit rounded-lg p-3 ${feature.color}`}
                                >
                                    <Icon className="h-6 w-6" />
                                </div>
                                <CardTitle className="text-xl font-bold text-primary">
                                    {feature.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                                    {feature.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    );
                })}
            </section>

            {/* --- ALTERNATIVE REPORTING WAYS --- */}
            <section className="space-y-8 px-4">
                <div className="max-w-2xl text-center md:text-left">
                    <h2 className="text-2xl font-bold tracking-tight text-primary md:text-3xl">
                        Alternative Channels for Reporting
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground md:text-base">
                        If you prefer not to use our digital platform, we
                        support multiple alternative mechanisms to ensure your
                        voice is still safely heard.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {reportingChannels.map((channel, idx) => {
                        const Icon = channel.icon;

                        return (
                            <Card
                                key={idx}
                                className="flex flex-col justify-between border-border bg-card shadow-sm transition-colors hover:border-border"
                            >
                                <CardHeader className="space-y-3 pb-3">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="rounded-md border border-border bg-secondary p-2.5 text-primary">
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                                            {channel.badge}
                                        </span>
                                    </div>
                                    <div>
                                        <CardTitle className="text-base font-bold text-primary">
                                            {channel.title}
                                        </CardTitle>
                                        <span className="mt-0.5 block text-xs font-semibold text-chart-4">
                                            {channel.detail}
                                        </span>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <p className="text-xs leading-relaxed text-muted-foreground">
                                        {channel.description}
                                    </p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </section>

            {/* --- TRUST BANNER --- */}
            <section className="mx-4 rounded-xl border border-border bg-secondary/60 p-8 md:p-10">
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                    <div className="space-y-3 lg:col-span-7">
                        <h3 className="text-2xl font-bold text-primary">
                            Are you hesitant to make a report?
                        </h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                            Our platform architecture guarantees automated data
                            obfuscation options. You retain absolute control
                            over how your identity is communicated to resolution
                            teams.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
                        <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-xs font-semibold text-muted-foreground shadow-sm">
                            <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-600" />
                            <span>Encrypted Submissions</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-xs font-semibold text-muted-foreground shadow-sm">
                            <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-600" />
                            <span>Anonymous Support Available</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
