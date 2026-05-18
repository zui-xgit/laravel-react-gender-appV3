import React, { useState, useEffect } from 'react';
import {
    Shield,
    Menu,
    X,
    ChevronDown,
    ChevronUp,
    BookOpen,
    BarChart3,
    Users,
    ArrowRight,
    CheckCircle2,
    Lock,
    Mail,
    Eye,
    EyeOff,
    GraduationCap,
    FileText,
    HeartHandshake,
    Globe,
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*                               COLOR PALETTE                                */
/* -------------------------------------------------------------------------- */
// Using the provided :root variables mapped to Tailwind arbitrary values
// or standard utilities where possible. The inline styles below reference
// these hex codes directly to ensure 100% accuracy to your request.

const COLORS = {
    background: '#f9fafb',
    foreground: '#111827',
    card: '#ffffff',
    primary: '#1e293b',
    primaryForeground: '#f9fafb',
    secondary: '#f3f4f6',
    secondaryForeground: '#1f2937',
    muted: '#f3f4f6',
    mutedForeground: '#6b7280',
    accent: '#f3f4f6',
    border: '#e5e7eb',
    ring: '#9ca3af',
    destructive: '#dc2626',
    chart1: '#4f46e5',
    chart2: '#0891b2',
    chart3: '#111827',
    chart4: '#d97706',
    chart5: '#059669',
    sidebar: '#0b143d',
    sidebarPrimary: '#3b4ba0',
};

/* -------------------------------------------------------------------------- */
/*                                MOCK DATA                                   */
/* -------------------------------------------------------------------------- */

const FAQS = [
    {
        question: 'What is the Gender Reporting System?',
        answer: 'It is a secure, anonymous platform designed to collect, analyze, and report gender-related data within organizations to promote equity, inclusion, and transparency.',
    },
    {
        question: 'Is my report truly anonymous?',
        answer: 'Yes. We utilize end-to-end encryption and do not store IP addresses or personal metadata alongside your submission unless you explicitly choose to identify yourself for follow-up purposes.',
    },
    {
        question: 'Who has access to the submitted data?',
        answer: 'Only authorized compliance officers and designated HR administrators have access to raw data. Aggregated, anonymized reports are shared with leadership to drive policy changes.',
    },
    {
        question: 'How does the Education module work?',
        answer: 'The Education section provides curated resources, training modules, and policy guidelines to help employees and managers understand gender dynamics and legal obligations.',
    },
    {
        question: 'Can I track the status of my report?',
        answer: 'If you create an account and submit while logged in, you can track the status in your dashboard. Anonymous submissions receive a unique token for status checking.',
    },
];

const RESOURCES = [
    {
        title: 'Understanding Gender Equity',
        desc: 'A comprehensive guide to the principles of fairness and justice in the distribution of resources and opportunities.',
        icon: <BookOpen className="h-6 w-6" />,
        color: 'text-[#4f46e5]',
        bg: 'bg-[#eef2ff]',
    },
    {
        title: 'Reporting Guidelines',
        desc: 'Step-by-step instructions on how to file a report, what information to include, and what to expect during the review process.',
        icon: <FileText className="h-6 w-6" />,
        color: 'text-[#0891b2]',
        bg: 'bg-[#ecfeff]',
    },
    {
        title: 'Support Networks',
        desc: 'Connect with internal support groups and external organizations dedicated to advocacy and counseling.',
        icon: <HeartHandshake className="h-6 w-6" />,
        color: 'text-[#059669]',
        bg: 'bg-[#ecfdf5]',
    },
    {
        title: 'Global Policies',
        desc: 'An overview of international standards and local legal frameworks governing gender rights and workplace conduct.',
        icon: <Globe className="h-6 w-6" />,
        color: 'text-[#d97706]',
        bg: 'bg-[#fffbeb]',
    },
];

/* -------------------------------------------------------------------------- */
/*                               COMPONENTS                                   */
/* -------------------------------------------------------------------------- */

// --- Sticky Navbar ---
const Navbar = ({
    activeTab,
    setActiveTab,
}: {
    activeTab: string;
    setActiveTab: (t: string) => void;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { id: 'home', label: 'Home' },
        { id: 'education', label: 'Education' },
        { id: 'faq', label: 'FAQ' },
        { id: 'login', label: 'Login' },
    ];

    return (
        <nav
            className={`fixed top-0 right-0 left-0 z-50 border-b transition-all duration-300 ${
                scrolled
                    ? 'border-[#e5e7eb] bg-white/90 shadow-sm backdrop-blur-md'
                    : 'border-transparent bg-white'
            }`}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div
                        className="flex cursor-pointer items-center gap-2"
                        onClick={() => setActiveTab('home')}
                    >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1e293b]">
                            <Shield className="h-5 w-5 text-[#f9fafb]" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-[#111827]">
                            GRS
                        </span>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden items-center gap-1 md:flex">
                        {navLinks.map((link) => (
                            <button
                                key={link.id}
                                onClick={() => setActiveTab(link.id)}
                                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                                    activeTab === link.id
                                        ? 'bg-[#f3f4f6] text-[#1f2937]'
                                        : 'text-[#6b7280] hover:bg-[#f9fafb] hover:text-[#111827]'
                                }`}
                            >
                                {link.label}
                            </button>
                        ))}
                        <button
                            onClick={() => setActiveTab('login')}
                            className="ml-4 rounded-md bg-[#1e293b] px-5 py-2 text-sm font-medium text-[#f9fafb] shadow-sm transition-colors hover:bg-[#334155]"
                        >
                            Get Started
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="rounded-md p-2 text-[#6b7280] hover:bg-[#f3f4f6]"
                        >
                            {isOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="space-y-2 border-t border-[#e5e7eb] bg-white px-4 py-4 shadow-lg md:hidden">
                    {navLinks.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => {
                                setActiveTab(link.id);
                                setIsOpen(false);
                                window.scrollTo(0, 0);
                            }}
                            className={`block w-full rounded-md px-3 py-3 text-left text-base font-medium ${
                                activeTab === link.id
                                    ? 'bg-[#f3f4f6] text-[#1f2937]'
                                    : 'text-[#6b7280]'
                            }`}
                        >
                            {link.label}
                        </button>
                    ))}
                </div>
            )}
        </nav>
    );
};

// --- Footer ---
const Footer = () => (
    <footer className="mt-auto bg-[#0b143d] py-12 text-[#ffffff]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
            <div className="col-span-1 md:col-span-2">
                <div className="mb-4 flex items-center gap-2">
                    <Shield className="h-6 w-6 text-[#3b4ba0]" />
                    <span className="text-xl font-bold">
                        Gender Reporting System
                    </span>
                </div>
                <p className="max-w-sm text-[#9ca3af]">
                    Empowering organizations to build safer, more inclusive
                    environments through transparent data and anonymous
                    reporting.
                </p>
            </div>
            <div>
                <h4 className="mb-4 font-semibold text-[#f9fafb]">Platform</h4>
                <ul className="space-y-2 text-sm text-[#9ca3af]">
                    <li className="cursor-pointer hover:text-white">
                        Submit a Report
                    </li>
                    <li className="cursor-pointer hover:text-white">
                        Track Status
                    </li>
                    <li className="cursor-pointer hover:text-white">
                        Analytics
                    </li>
                </ul>
            </div>
            <div>
                <h4 className="mb-4 font-semibold text-[#f9fafb]">Support</h4>
                <ul className="space-y-2 text-sm text-[#9ca3af]">
                    <li className="cursor-pointer hover:text-white">
                        Help Center
                    </li>
                    <li className="cursor-pointer hover:text-white">
                        Privacy Policy
                    </li>
                    <li className="cursor-pointer hover:text-white">
                        Contact Us
                    </li>
                </ul>
            </div>
        </div>
        <div className="mx-auto mt-12 max-w-7xl border-t border-[#1e2959] px-4 pt-8 text-center text-sm text-[#6b7280] sm:px-6 lg:px-8">
            Gender Reporting System. All rights reserved.
        </div>
    </footer>
);

/* -------------------------------------------------------------------------- */
/*                                 PAGES                                      */
/* -------------------------------------------------------------------------- */

// --- HOME PAGE ---
const HomePage = ({ setActiveTab }: { setActiveTab: (t: string) => void }) => {
    return (
        <div className="animate-in duration-500 fade-in">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-0 right-0 h-full w-1/2 rounded-l-[3rem] bg-[#f3f4f6] opacity-50" />
                </div>

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 rounded-full border border-[#c7d2fe] bg-[#eef2ff] px-3 py-1 text-sm font-medium text-[#4f46e5]">
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4f46e5] opacity-75"></span>
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4f46e5]"></span>
                                </span>
                                Secure & Anonymous Reporting
                            </div>
                            <h1 className="text-4xl leading-[1.1] font-extrabold tracking-tight text-[#111827] sm:text-5xl lg:text-6xl">
                                Building a culture of{' '}
                                <span className="text-[#1e293b] underline decoration-[#4f46e5] decoration-4 underline-offset-4">
                                    trust
                                </span>{' '}
                                and equity.
                            </h1>
                            <p className="max-w-lg text-lg leading-relaxed text-[#6b7280]">
                                Our Gender Reporting System provides a safe,
                                confidential channel for employees to report
                                concerns while giving leadership the data
                                insights needed to foster an inclusive
                                workplace.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button
                                    onClick={() => setActiveTab('login')}
                                    className="flex items-center gap-2 rounded-lg bg-[#1e293b] px-8 py-3.5 font-semibold text-white shadow-lg transition-all hover:bg-[#334155] hover:shadow-xl"
                                >
                                    Get Started{' '}
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => setActiveTab('education')}
                                    className="rounded-lg border border-[#e5e7eb] bg-white px-8 py-3.5 font-semibold text-[#1f2937] transition-all hover:bg-[#f9fafb]"
                                >
                                    Learn More
                                </button>
                            </div>

                            <div className="flex items-center gap-6 pt-4 text-sm text-[#6b7280]">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-[#059669]" />{' '}
                                    End-to-end encrypted
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-[#059669]" />{' '}
                                    GDPR Compliant
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-[#4f46e5] to-[#0891b2] opacity-20 blur-2xl" />
                            <img
                                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop"
                                alt="Diverse professional team collaborating"
                                className="relative h-[400px] w-full rounded-2xl border border-[#e5e7eb] object-cover shadow-2xl lg:h-[500px]"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="border-y border-[#e5e7eb] bg-white py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
                        {[
                            {
                                label: 'Reports Filed',
                                value: '12,400+',
                                color: 'text-[#4f46e5]',
                            },
                            {
                                label: 'Organizations',
                                value: '850+',
                                color: 'text-[#0891b2]',
                            },
                            {
                                label: 'Resolution Rate',
                                value: '94%',
                                color: 'text-[#059669]',
                            },
                            {
                                label: 'User Satisfaction',
                                value: '4.9/5',
                                color: 'text-[#d97706]',
                            },
                        ].map((stat, i) => (
                            <div key={i} className="space-y-2">
                                <div
                                    className={`text-3xl font-bold sm:text-4xl ${stat.color}`}
                                >
                                    {stat.value}
                                </div>
                                <div className="text-sm font-medium text-[#6b7280]">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="bg-[#f9fafb] py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto mb-16 max-w-2xl text-center">
                        <h2 className="mb-4 text-3xl font-bold text-[#111827]">
                            Designed for Safety & Action
                        </h2>
                        <p className="text-[#6b7280]">
                            A robust infrastructure that protects the reporter
                            while delivering actionable insights to
                            administrators.
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        {[
                            {
                                title: 'Anonymous Reporting',
                                desc: 'Submit reports without fear of retaliation. Our system strips metadata and uses secure tokens.',
                                icon: (
                                    <Shield className="h-6 w-6 text-[#4f46e5]" />
                                ),
                                bg: 'bg-[#eef2ff]',
                            },
                            {
                                title: 'Real-time Analytics',
                                desc: 'Administrators gain access to anonymized dashboards that highlight trends and areas for improvement.',
                                icon: (
                                    <BarChart3 className="h-6 w-6 text-[#0891b2]" />
                                ),
                                bg: 'bg-[#ecfeff]',
                            },
                            {
                                title: 'Community Support',
                                desc: 'Access resources, connect with support networks, and find guidance throughout the process.',
                                icon: (
                                    <Users className="h-6 w-6 text-[#059669]" />
                                ),
                                bg: 'bg-[#ecfdf5]',
                            },
                        ].map((feature, i) => (
                            <div
                                key={i}
                                className="rounded-xl border border-[#e5e7eb] bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
                            >
                                <div
                                    className={`h-12 w-12 rounded-lg ${feature.bg} mb-6 flex items-center justify-center`}
                                >
                                    {feature.icon}
                                </div>
                                <h3 className="mb-3 text-xl font-semibold text-[#111827]">
                                    {feature.title}
                                </h3>
                                <p className="leading-relaxed text-[#6b7280]">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

// --- EDUCATION PAGE ---
const EducationPage = () => {
    return (
        <div className="min-h-screen animate-in pt-24 pb-12 duration-500 fade-in slide-in-from-bottom-4">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <div className="mb-6 inline-flex items-center justify-center rounded-full bg-[#ecfdf5] p-3">
                        <GraduationCap className="h-8 w-8 text-[#059669]" />
                    </div>
                    <h1 className="mb-4 text-4xl font-bold text-[#111827]">
                        Education & Resources
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-[#6b7280]">
                        Knowledge is the foundation of change. Explore our
                        curated library of resources to understand gender
                        dynamics, legal rights, and organizational best
                        practices.
                    </p>
                </div>

                <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {RESOURCES.map((res, i) => (
                        <div
                            key={i}
                            className="group cursor-pointer rounded-xl border border-[#e5e7eb] bg-white p-6 transition-all hover:border-[#9ca3af] hover:shadow-lg"
                        >
                            <div
                                className={`h-12 w-12 rounded-lg ${res.bg} mb-4 flex items-center justify-center transition-transform group-hover:scale-110`}
                            >
                                <div className={res.color}>{res.icon}</div>
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-[#111827]">
                                {res.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-[#6b7280]">
                                {res.desc}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="relative overflow-hidden rounded-2xl bg-[#1e293b] p-8 text-white md:p-12">
                    <div className="relative z-10 flex flex-col items-center gap-8 md:flex-row">
                        <div className="flex-1 space-y-4">
                            <h2 className="text-2xl font-bold md:text-3xl">
                                Start the Conversation
                            </h2>
                            <p className="max-w-xl text-[#9ca3af]">
                                Download our comprehensive toolkit for managers
                                and team leads to facilitate healthy discussions
                                about gender equity in the workplace.
                            </p>
                            <button className="inline-flex items-center gap-2 rounded-lg bg-[#3b4ba0] px-6 py-3 font-medium transition-colors hover:bg-[#4f5eb1]">
                                <BookOpen className="h-4 w-4" /> Download
                                Toolkit
                            </button>
                        </div>
                        <div className="w-full md:w-1/3">
                            <img
                                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop"
                                alt="Workshop session"
                                className="h-48 w-full rounded-lg object-cover shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- FAQ PAGE ---
const FaqPage = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="min-h-screen animate-in bg-[#f9fafb] pt-24 pb-12 duration-500 fade-in slide-in-from-bottom-4">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h1 className="mb-4 text-4xl font-bold text-[#111827]">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-[#6b7280]">
                        Everything you need to know about the Gender Reporting
                        System.
                    </p>
                </div>

                <div className="space-y-4">
                    {FAQS.map((faq, i) => (
                        <div
                            key={i}
                            className="overflow-hidden rounded-xl border border-[#e5e7eb] bg-white shadow-sm"
                        >
                            <button
                                onClick={() =>
                                    setOpenIndex(openIndex === i ? null : i)
                                }
                                className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-[#f9fafb]"
                            >
                                <span className="pr-8 font-semibold text-[#111827]">
                                    {faq.question}
                                </span>
                                {openIndex === i ? (
                                    <ChevronUp className="h-5 w-5 shrink-0 text-[#6b7280]" />
                                ) : (
                                    <ChevronDown className="h-5 w-5 shrink-0 text-[#6b7280]" />
                                )}
                            </button>
                            <div
                                className={`transition-all duration-300 ease-in-out ${
                                    openIndex === i
                                        ? 'max-h-48 opacity-100'
                                        : 'max-h-0 opacity-0'
                                } overflow-hidden`}
                            >
                                <div className="border-t border-[#f3f4f6] p-6 pt-0 leading-relaxed text-[#6b7280]">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 rounded-xl border border-[#e5e7eb] bg-white p-8 text-center">
                    <h3 className="mb-2 text-lg font-semibold text-[#111827]">
                        Still have questions?
                    </h3>
                    <p className="mb-6 text-[#6b7280]">
                        Can't find the answer you're looking for? Please chat
                        with our friendly team.
                    </p>
                    <button className="rounded-lg bg-[#1e293b] px-6 py-2.5 font-medium text-white transition-colors hover:bg-[#334155]">
                        Contact Support
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- LOGIN PAGE ---
const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex min-h-screen animate-in items-center justify-center bg-[#f9fafb] pt-24 pb-12 duration-500 fade-in slide-in-from-bottom-4">
            <div className="w-full max-w-md px-4">
                <div className="overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-xl">
                    <div className="p-8">
                        <div className="mb-8 text-center">
                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#eef2ff]">
                                <Lock className="h-6 w-6 text-[#4f46e5]" />
                            </div>
                            <h2 className="text-2xl font-bold text-[#111827]">
                                Welcome Back
                            </h2>
                            <p className="mt-2 text-sm text-[#6b7280]">
                                Enter your credentials to access the dashboard.
                            </p>
                        </div>

                        <form
                            className="space-y-5"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-[#374151]">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
                                    <input
                                        type="email"
                                        placeholder="name@organization.com"
                                        className="w-full rounded-lg border border-[#e5e7eb] bg-[#f9fafb] py-2.5 pr-4 pl-10 text-[#111827] transition-all placeholder:text-[#9ca3af] focus:border-transparent focus:ring-2 focus:ring-[#9ca3af] focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium text-[#374151]">
                                        Password
                                    </label>
                                    <a
                                        href="#"
                                        className="text-xs font-medium text-[#4f46e5] hover:underline"
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
                                    <input
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        placeholder="••••••••"
                                        className="w-full rounded-lg border border-[#e5e7eb] bg-[#f9fafb] py-2.5 pr-10 pl-10 text-[#111827] transition-all placeholder:text-[#9ca3af] focus:border-transparent focus:ring-2 focus:ring-[#9ca3af] focus:outline-none"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute top-1/2 right-3 -translate-y-1/2 text-[#9ca3af] hover:text-[#6b7280]"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className="h-4 w-4 rounded border-[#e5e7eb] text-[#1e293b] focus:ring-[#9ca3af]"
                                />
                                <label
                                    htmlFor="remember"
                                    className="text-sm text-[#6b7280]"
                                >
                                    Remember me for 30 days
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-lg bg-[#1e293b] py-3 font-semibold text-white shadow-md transition-colors hover:bg-[#334155]"
                            >
                                Sign In to Dashboard
                            </button>
                        </form>

                        <div className="mt-8 border-t border-[#f3f4f6] pt-6 text-center">
                            <p className="text-sm text-[#6b7280]">
                                Don't have an account?{' '}
                                <a
                                    href="#"
                                    className="font-semibold text-[#4f46e5] hover:underline"
                                >
                                    Request Access
                                </a>
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-2 border-t border-[#e5e7eb] bg-[#f9fafb] px-8 py-4 text-xs text-[#6b7280]">
                        <Shield className="h-3 w-3" /> Protected by
                        enterprise-grade security
                    </div>
                </div>
            </div>
        </div>
    );
};

/* -------------------------------------------------------------------------- */
/*                                 MAIN APP                                   */
/* -------------------------------------------------------------------------- */

export default function App() {
    const [activeTab, setActiveTab] = useState('home');

    // Scroll to top on tab change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [activeTab]);

    return (
        <div className="flex min-h-screen flex-col bg-[#f9fafb] font-sans text-[#111827]">
            <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

            <main className="flex-grow">
                {activeTab === 'home' && (
                    <HomePage setActiveTab={setActiveTab} />
                )}
                {activeTab === 'education' && <EducationPage />}
                {activeTab === 'faq' && <FaqPage />}
                {activeTab === 'login' && <LoginPage />}
            </main>

            <Footer />
        </div>
    );
}
