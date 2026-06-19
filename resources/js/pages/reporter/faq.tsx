import {
    HelpCircle,
    Lock,
    MessageCircle,
    FileText,
    AlertCircle,
    LifeBuoy,
} from 'lucide-react';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

const faqCategories = [
    {
        title: 'Getting Started',
        icon: HelpCircle,
        questions: [
            {
                q: 'What is the Gender Reporting System (GRS)?',
                a: 'The GRS is a secure platform designed to help members of our institution report incidents of gender-based violence, harassment, or discrimination. It provides a confidential channel to ensure safety and institutional accountability.',
            },
            {
                q: 'How do I file a report?',
                a: 'Click on the "File a Secure Report" button on the homepage. You will be guided through a multi-step form to provide details about the incident, the parties involved, and any evidence you may have.',
            },
        ],
    },
    {
        title: 'Privacy & Anonymity',
        icon: Lock,
        questions: [
            {
                q: 'Can I remain anonymous?',
                a: 'Yes. You have the option to report anonymously. If you choose this, we will not collect your name or contact details. You will be given a unique tracking ID to follow up on your case without revealing your identity.',
            },
            {
                q: 'Who can see my report?',
                a: 'Reports are strictly restricted to authorized Case Handling Officers and relevant compliance staff. Access is logged and monitored to ensure total confidentiality.',
            },
            {
                q: 'Is my data secure?',
                a: 'Yes. We use industry-standard cryptographic protection to ensure that all submissions are encrypted and stored securely.',
            },
        ],
    },
    {
        title: 'Case Tracking & Resolution',
        icon: FileText,
        questions: [
            {
                q: 'What happens after I submit a report?',
                a: 'Once submitted, a Case Handling Officer is assigned to review the details. They may contact you (if not anonymous) for further clarification. The case will progress through investigation and resolution phases according to our institutional policies.',
            },
            {
                q: 'How do I track my case status?',
                a: 'Use the tracking ID provided at the end of your submission. Go to the "Track Existing Report" page and enter your ID to see real-time updates on the progress of your case.',
            },
            {
                q: 'How long does an investigation take?',
                a: 'Investigation timelines vary depending on the complexity of the case. However, we strive to acknowledge all reports within 48 hours and provide initial updates shortly after.',
            },
        ],
    },
    {
        title: 'Support & Safety',
        icon: LifeBuoy,
        questions: [
            {
                q: 'What if I am in immediate danger?',
                a: 'If you are in an emergency or immediate danger, please contact campus security or local emergency services immediately. Our platform is for reporting and administrative resolution, not for emergency response.',
            },
            {
                q: 'Where can I find emotional or psychological support?',
                a: 'We provide links to counseling services and trauma-informed advocates in our "Education & Resources" section. You can also visit the Counseling Center at the main campus.',
            },
        ],
    },
];

const Faq = () => {
    return (
        <div className="flex flex-col gap-12 py-12 md:py-20">
            {/* --- HERO SECTION --- */}
            <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-primary">
                    <HelpCircle className="h-3 w-3 text-chart-1" />
                    <span>Support Center</span>
                </div>

                <h1 className="text-2xl font-extrabold tracking-tight text-primary md:text-3xl">
                    Frequently Asked Questions
                </h1>

                <p className="text-lg text-muted-foreground">
                    Find answers to common questions about reporting, privacy,
                    and the resolution process.
                </p>
            </section>

            {/* --- FAQ CONTENT --- */}
            <section className="mx-auto w-full max-w-4xl px-4">
                <div className="grid grid-cols-1 gap-10">
                    {faqCategories.map((category, idx) => (
                        <div key={idx} className="space-y-4">
                            <div className="flex items-center gap-3 border-b border-border pb-2">
                                <category.icon className="h-5 w-5 text-chart-1" />
                                <h2 className="text-xl font-bold text-primary">
                                    {category.title}
                                </h2>
                            </div>

                            <Accordion
                                type="single"
                                collapsible
                                className="w-full"
                            >
                                {category.questions.map((item, qIdx) => (
                                    <AccordionItem
                                        key={qIdx}
                                        value={`item-${idx}-${qIdx}`}
                                        className="border-border/60"
                                    >
                                        <AccordionTrigger className="text-base font-semibold text-primary hover:text-chart-1 hover:no-underline">
                                            {item.q}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            {item.a}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- CONTACT CTA --- */}
            <section className="mx-auto w-full max-w-4xl px-4">
                <Card className="border-border bg-secondary/40 shadow-sm">
                    <CardHeader className="text-center">
                        <CardTitle>Still have questions?</CardTitle>
                        <CardDescription>
                            If you cannot find the answer you are looking for,
                            please reach out to our team.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm font-semibold text-muted-foreground shadow-sm">
                            <MessageCircle className="h-4 w-4 text-chart-2" />
                            <span>Live Chat (Mon-Fri)</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm font-semibold text-muted-foreground shadow-sm">
                            <AlertCircle className="h-4 w-4 text-chart-4" />
                            <span>Email Support</span>
                        </div>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
};

export default Faq;
