import AppGuestLayout from '@/layouts/app-guest-layout';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    BookOpen,
    GraduationCap,
    ShieldAlert,
    Users,
    Scale,
    HeartHandshake,
    FileText,
    ArrowRight,
    CheckCircle2,
    Info,
} from 'lucide-react';
import { Link } from '@inertiajs/react';
import { reporterReport } from '@/routes';

const modules = [
    {
        id: 'awareness',
        title: 'Awareness',
        icon: ShieldAlert,
        content: (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-primary">Recognizing Harassment</h3>
                    <p className="text-muted-foreground">
                        Understanding what constitutes harassment is the first step toward prevention.
                        Harassment includes any unwelcome conduct based on gender that creates an
                        intimidating, hostile, or offensive environment.
                    </p>
                    <ul className="space-y-2">
                        {[
                            'Unwelcome sexual advances or requests for sexual favors.',
                            'Verbal or physical conduct of a sexual nature.',
                            'Gender-based bullying or discriminatory remarks.',
                            'Visual displays of degrading or offensive materials.',
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-chart-2" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <Card className="border-border bg-secondary/20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            <Info className="h-4 w-4 text-chart-4" />
                            Key Definition
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm italic text-muted-foreground">
                        "Gender-based violence (GBV) is violence directed against a person because of that person's gender or violence that affects persons of a particular gender disproportionately."
                    </CardContent>
                </Card>
            </div>
        ),
    },
    {
        id: 'policies',
        title: 'Institutional Policies',
        icon: BookOpen,
        content: (
            <div className="space-y-6">
                <div className="max-w-3xl">
                    <h3 className="text-xl font-bold text-primary">Zero Tolerance Policy</h3>
                    <p className="mt-2 text-muted-foreground">
                        Our institution maintains a zero-tolerance stance on gender-based violence and harassment.
                        All members are expected to uphold a culture of respect and equity.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {[
                        { title: 'Non-Retaliation', desc: 'Protection against any adverse action for reporting in good faith.' },
                        { title: 'Confidentiality', desc: 'Strict data handling protocols to protect your identity.' },
                        { title: 'Due Process', desc: 'Fair and impartial investigation for all parties involved.' },
                    ].map((policy, i) => (
                        <div key={i} className="rounded-lg border border-border bg-card p-4 shadow-sm">
                            <h4 className="font-bold text-primary">{policy.title}</h4>
                            <p className="mt-1 text-xs text-muted-foreground">{policy.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        ),
    },
    {
        id: 'support',
        title: 'Bystander Support',
        icon: Users,
        content: (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                <div className="lg:col-span-7 space-y-4">
                    <h3 className="text-xl font-bold text-primary">The 5D's of Bystander Intervention</h3>
                    <p className="text-muted-foreground text-sm">
                        Safe intervention can stop harassment in its tracks. Use these five strategies to support others:
                    </p>
                    <div className="space-y-3">
                        {[
                            { label: 'Direct', desc: 'Speak up directly to the person being targeted.' },
                            { label: 'Distract', desc: 'Create a diversion to interrupt the situation.' },
                            { label: 'Delegate', desc: 'Ask for assistance from a third party or authority.' },
                            { label: 'Delay', desc: 'Check in with the person afterward to offer support.' },
                            { label: 'Document', desc: 'Record or take notes of the incident safely.' },
                        ].map((d, i) => (
                            <div key={i} className="flex gap-3">
                                <Badge variant="secondary" className="h-fit">{d.label}</Badge>
                                <span className="text-sm text-muted-foreground">{d.desc}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="lg:col-span-5 rounded-xl overflow-hidden border border-border shadow-md">
                    <img 
                        src="https://images.unsplash.com/photo-1573164574511-73c773193279?q=80&w=2069&auto=format&fit=crop" 
                        alt="Supporting colleagues" 
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>
        ),
    },
    {
        id: 'legal',
        title: 'Legal Framework',
        icon: Scale,
        content: (
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-primary">Your Rights Under the Law</h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <Card className="border-border">
                        <CardHeader>
                            <CardTitle className="text-lg">National Legislation</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            Learn about the national laws governing workplace conduct, gender equality, and
                            protection against sexual offenses. These laws provide the foundation for our 
                            institutional policies.
                        </CardContent>
                    </Card>
                    <Card className="border-border">
                        <CardHeader>
                            <CardTitle className="text-lg">International Standards</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            Our system aligns with international human rights standards and labor conventions 
                            aimed at eliminating violence and harassment in the world of work.
                        </CardContent>
                    </Card>
                </div>
            </div>
        ),
    },
];

const Education = () => {
    return (
        <AppGuestLayout>
            <div className="flex flex-col gap-16 py-12 md:py-20">
                {/* --- HERO SECTION --- */}
                <section className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-primary">
                        <GraduationCap className="h-3 w-3 text-chart-5" />
                        <span>Knowledge Center</span>
                    </div>

                    <h1 className="text-4xl font-extrabold tracking-tight text-primary md:text-5xl lg:text-6xl">
                        Education & <span className="text-chart-5">Advocacy</span>
                    </h1>

                    <p className="max-w-2xl text-lg text-muted-foreground">
                        Empower yourself with information. Understanding your rights, our policies,
                        and how to support others is essential to creating a safer community.
                    </p>
                </section>

                {/* --- LEARNING MODULES --- */}
                <section className="mx-auto w-full max-w-6xl px-4">
                    <Tabs defaultValue="awareness" className="w-full space-y-8">
                        <div className="flex justify-center">
                            <TabsList className="grid h-auto w-full grid-cols-2 gap-2 bg-secondary/50 p-1 md:w-auto md:grid-cols-4">
                                {modules.map((module) => (
                                    <TabsTrigger
                                        key={module.id}
                                        value={module.id}
                                        className="flex items-center gap-2 py-2.5 text-xs font-bold md:px-6 md:text-sm"
                                    >
                                        <module.icon className="h-4 w-4" />
                                        {module.title}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </div>

                        {modules.map((module) => (
                            <TabsContent
                                key={module.id}
                                value={module.id}
                                className="mt-0 focus-visible:outline-none"
                            >
                                <Card className="border-border bg-card shadow-sm">
                                    <CardContent className="p-6 md:p-10">
                                        {module.content}
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        ))}
                    </Tabs>
                </section>

                {/* --- RESOURCE CARDS --- */}
                <section className="mx-auto w-full max-w-6xl px-4 space-y-8">
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl font-bold tracking-tight text-primary">Resource Library</h2>
                        <p className="mt-2 text-sm text-muted-foreground">Download guides and toolkits for deeper learning.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            { title: 'Survivor Handbook', icon: HeartHandshake, color: 'text-chart-1' },
                            { title: 'Reporting Guide (PDF)', icon: FileText, color: 'text-chart-2' },
                            { title: 'Bystander Toolkit', icon: Users, color: 'text-chart-5' },
                        ].map((resource, i) => (
                            <Card key={i} className="group transition-all hover:border-ring/40 hover:shadow-md">
                                <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                                    <div className={`rounded-lg bg-secondary p-2 ${resource.color}`}>
                                        <resource.icon className="h-5 w-5" />
                                    </div>
                                    <CardTitle className="text-base">{resource.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Button variant="ghost" size="sm" className="w-full justify-between group-hover:bg-secondary">
                                        Download <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* --- CALL TO ACTION --- */}
                <section className="mx-4 rounded-2xl bg-primary p-8 md:p-12 text-primary-foreground text-center space-y-6 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
                    <div className="absolute bottom-0 left-0 -ml-16 -mb-16 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
                    
                    <h2 className="text-2xl font-bold md:text-3xl relative z-10">Ready to take the next step?</h2>
                    <p className="mx-auto max-w-2xl text-primary-foreground/80 relative z-10">
                        If you have experienced an incident or wish to report on behalf of someone else, 
                        our secure platform is ready to assist you.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                        <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-bold">
                            <Link href={reporterReport()}>
                                <FileText className="mr-2 h-5 w-5" />
                                File a Secure Report
                            </Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="border-white/20 hover:bg-white/10 text-white font-bold">
                            <Link href="/faq">Visit FAQ</Link>
                        </Button>
                    </div>
                </section>
            </div>
        </AppGuestLayout>
    );
};

export default Education;
