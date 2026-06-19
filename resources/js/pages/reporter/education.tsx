import { Link } from '@inertiajs/react';
import {
    GraduationCap,
    Shield,
    Heart,
    Monitor,
    Scale,
    FileText,
    Phone,
    Users,
    Stethoscope,
    CheckCircle2,
    ArrowRight,
} from 'lucide-react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

const gbvTypes = [
    {
        title: 'Sexual Harassment',
        description:
            'Unwelcome sexual advances, requests for sexual favors, and other verbal or physical conduct of a sexual nature.',
        icon: Shield,
        color: 'text-chart-1',
    },
    {
        title: 'Emotional Abuse',
        description:
            'Non-physical behavior that belittles or controls another person, often through threats, isolation, or constant criticism.',
        icon: Heart,
        color: 'text-chart-2',
    },
    {
        title: 'Physical Violence',
        description:
            'The use of physical force to cause harm, including hitting, pushing, or restraining.',
        icon: Scale,
        color: 'text-chart-3',
    },
    {
        title: 'Cyber Harassment',
        description:
            'Using digital platforms to stalk, threaten, or humiliate others through messages or social media.',
        icon: Monitor,
        color: 'text-chart-4',
    },
];

const rights = [
    {
        title: 'Institutional Policy',
        content:
            'Every member of our community has the right to a safe environment free from discrimination, harassment, and violence. Our policy mandates immediate response and investigation into all reported incidents.',
    },
    {
        title: 'Legal Protections',
        content:
            'Local and national laws provide strong protections against gender-based violence. This includes the right to file criminal charges, obtain protection orders, and seek civil remedies.',
    },
    {
        title: 'Right to Confidentiality',
        content:
            'You have the right to report incidents with the assurance that your information will be handled with the utmost care. We prioritize your privacy and safety throughout the entire process.',
    },
    {
        title: 'Protection from Retaliation',
        content:
            'It is strictly prohibited for anyone to retaliate against an individual for reporting an incident or participating in an investigation. We take retaliation extremely seriously.',
    },
];

const resources = [
    {
        name: 'Counseling Services',
        description: 'Professional emotional support and trauma-informed care.',
        icon: Users,
    },
    {
        name: 'Legal Aid',
        description: 'Guidance on legal rights and the reporting process.',
        icon: FileText,
    },
    {
        name: 'Medical Support',
        description:
            'Information on where to seek medical attention if needed.',
        icon: Stethoscope,
    },
    {
        name: '24/7 Hotline',
        description: 'Immediate crisis intervention and emotional support.',
        icon: Phone,
    },
];

const Education = () => {
    return (
        <div className="flex flex-col gap-16 py-12 md:py-20">
            {/* --- HERO SECTION --- */}
            <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-primary">
                    <GraduationCap className="h-3 w-3 text-chart-1" />
                    <span>Education & Awareness</span>
                </div>

                <h1 className="text-3xl font-extrabold tracking-tight text-primary md:text-4xl">
                    Empowering Through Knowledge
                </h1>

                <p className="text-lg text-muted-foreground">
                    Understanding gender-based violence is the first step toward
                    prevention. Explore our resources to learn about your
                    rights, available support, and how to stay safe.
                </p>
            </section>

            {/* --- TYPES OF GBV --- */}
            <section className="mx-auto w-full max-w-6xl px-4">
                <div className="mb-10 text-center">
                    <h2 className="text-2xl font-bold text-primary">
                        Understanding the Issues
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                        Recognizing the different forms of gender-based
                        violence.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {gbvTypes.map((type, idx) => (
                        <Card
                            key={idx}
                            className="border-border/60 transition-colors hover:border-primary/20"
                        >
                            <CardHeader>
                                <div
                                    className={`mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-secondary ${type.color}`}
                                >
                                    <type.icon className="h-5 w-5" />
                                </div>
                                <CardTitle className="text-lg">
                                    {type.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm leading-relaxed text-muted-foreground">
                                    {type.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* --- KNOW YOUR RIGHTS --- */}
            <section className="bg-secondary/30 py-16">
                <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-4">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2 text-chart-1">
                            <Scale className="h-5 w-5" />
                            <span className="text-sm font-bold tracking-wider uppercase">
                                Your Protections
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold text-primary">
                            Know Your Rights
                        </h2>
                        <p className="max-w-2xl text-muted-foreground">
                            You are protected by both institutional policy and
                            national laws. Familiarize yourself with these
                            rights to ensure you are treated fairly and safely.
                        </p>
                    </div>

                    <Accordion type="single" collapsible className="w-full">
                        {rights.map((right, idx) => (
                            <AccordionItem
                                key={idx}
                                value={`right-${idx}`}
                                className="border-border/60"
                            >
                                <AccordionTrigger className="py-4 text-left text-lg font-semibold text-primary hover:text-chart-1 hover:no-underline">
                                    {right.title}
                                </AccordionTrigger>
                                <AccordionContent className="pb-4 text-base leading-relaxed text-muted-foreground">
                                    {right.content}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>

            {/* --- ACTION STEPS --- */}
            <section className="mx-auto w-full max-w-5xl px-4">
                <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-primary">
                            What to do if an incident occurs?
                        </h2>
                        <p className="text-muted-foreground">
                            Taking the right steps after an incident can help
                            ensure your safety and make the reporting process
                            more effective.
                        </p>

                        <div className="space-y-4">
                            {[
                                'Get to a safe location immediately.',
                                'Preserve any evidence (messages, photos, documents).',
                                'Speak with a trusted friend or professional.',
                                'Consider filing a secure report through this platform.',
                            ].map((step, i) => (
                                <div key={i} className="flex gap-3">
                                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-chart-2" />
                                    <span className="text-sm font-medium text-foreground">
                                        {step}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4">
                            <Button asChild size="lg" className="gap-2">
                                <Link href="/reporter/report ">
                                    File a Secure Report
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {resources.map((resource, idx) => (
                            <Card
                                key={idx}
                                className="border-none bg-card shadow-md transition-transform hover:-translate-y-1"
                            >
                                <CardHeader className="p-4 pb-2">
                                    <resource.icon className="h-6 w-6 text-chart-1" />
                                    <CardTitle className="mt-2 text-base">
                                        {resource.name}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 pt-0">
                                    <p className="text-xs text-muted-foreground">
                                        {resource.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- FINAL CTA --- */}
            <section className="mx-auto w-full max-w-4xl px-4 pb-12">
                <Card className="overflow-hidden border-none bg-primary text-primary-foreground shadow-xl">
                    <div className="relative p-8 md:p-12">
                        <div className="relative z-10 flex flex-col items-center gap-6 text-center">
                            <h2 className="text-2xl font-bold md:text-3xl">
                                Together, we can build a safer community.
                            </h2>
                            <p className="max-w-xl text-primary-foreground/80">
                                If you or someone you know has been affected by
                                gender-based violence, do not hesitate to seek
                                help or report the incident. Your voice matters.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Button asChild variant="secondary" size="lg">
                                    <Link href="/faq">Visit FAQ</Link>
                                </Button>
                                <Button
                                    asChild
                                    variant="outline"
                                    className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                                    size="lg"
                                >
                                    <Link href="/">Back to Home</Link>
                                </Button>
                            </div>
                        </div>

                        {/* Decorative background element */}
                        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
                        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-black/10 blur-3xl"></div>
                    </div>
                </Card>
            </section>
        </div>
    );
};

export default Education;
