import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    CheckCircle,
    ChevronLeft,
    Clock,
    Eye,
    FileText,
    Info,
    Landmark,
    MessageSquare,
    Scale,
    Search,
    Shield,
    Upload,
} from 'lucide-react';
import { useState } from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import {
    AlertCircle,
    ArrowUpRight,
    Calendar,
    PenTool,
    Phone,
    ShieldAlert,
    User,
} from 'lucide-react';

const CaseWorkflowPage = () => {
    const [activeStep, setActiveStep] = useState(1);

    // --- 1. INTAKE & REVIEW UI ---
    const IntakeView = () => (
        <div className="animate-in space-y-6 duration-500 fade-in slide-in-from-bottom-2">
            {/* Info Alert */}
            <div className="border-subtle flex items-start gap-4 rounded-lg border bg-input p-4">
                <Info className="mt-1 text-[var(--accent-primary)]" size={20} />
                <div>
                    <h4 className="font-bold text-primary">
                        Officer Review Required
                    </h4>
                    <p className="text-sm text-secondary">
                        Complete the verification checklist below after
                        reviewing the attached documents.
                    </p>
                </div>
            </div>

            {/* Document Cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Card className="bg-surface border-subtle flex items-center justify-between p-4 shadow-sm transition-shadow hover:shadow-md">
                    <div className="flex items-center gap-3">
                        <div className="rounded bg-red-100 p-2 dark:bg-red-950/30">
                            <FileText className="text-red-500" size={18} />
                        </div>
                        <span className="text-sm font-medium text-primary">
                            Victim_Statement.pdf
                        </span>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-secondary hover:text-primary"
                    >
                        <Eye size={16} />
                    </Button>
                </Card>
                <Card className="bg-surface border-subtle flex items-center justify-between p-4 shadow-sm transition-shadow hover:shadow-md">
                    <div className="flex items-center gap-3">
                        <div className="rounded bg-blue-100 p-2 dark:bg-blue-950/30">
                            <FileText className="text-blue-500" size={18} />
                        </div>
                        <span className="text-sm font-medium text-primary">
                            Incident_Photos.zip
                        </span>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-secondary hover:text-primary"
                    >
                        <Eye size={16} />
                    </Button>
                </Card>
            </div>

            <Separator className="bg-subtle" />

            {/* Verification Form */}
            <div className="border-subtle bg-surface space-y-4 rounded-xl border p-6 shadow-sm">
                <h4 className="text-sm font-bold tracking-wider text-secondary uppercase">
                    Verification Checklist
                </h4>

                <div className="grid gap-4 py-2">
                    <div className="flex items-center space-y-0 space-x-3">
                        <Checkbox
                            id="identity"
                            className="border-subtle data-[state=checked]:bg-[var(--accent-primary)]"
                        />
                        <Label
                            htmlFor="identity"
                            className="cursor-pointer text-sm text-primary"
                        >
                            Victim identity has been verified via valid
                            ID/Passport
                        </Label>
                    </div>
                    <div className="flex items-center space-y-0 space-x-3">
                        <Checkbox
                            id="jurisdiction"
                            className="border-subtle data-[state=checked]:bg-[var(--accent-primary)]"
                        />
                        <Label
                            htmlFor="jurisdiction"
                            className="cursor-pointer text-sm text-primary"
                        >
                            Incident location falls within department
                            jurisdiction
                        </Label>
                    </div>
                    <div className="flex items-center space-y-0 space-x-3">
                        <Checkbox
                            id="safety"
                            className="border-subtle data-[state=checked]:bg-[var(--accent-primary)]"
                        />
                        <Label
                            htmlFor="safety"
                            className="cursor-pointer text-sm text-primary"
                        >
                            Immediate safety assessment completed (No active
                            threat)
                        </Label>
                    </div>
                </div>

                <div className="space-y-2 pt-2">
                    <Label
                        htmlFor="observations"
                        className="text-xs font-bold tracking-tighter text-secondary uppercase"
                    >
                        Initial Case Observations
                    </Label>
                    <Textarea
                        id="observations"
                        placeholder="Enter any initial notes regarding the credibility or urgency of the report..."
                        className="border-subtle min-h-[100px] bg-input text-primary focus:ring-[var(--accent-primary)]"
                    />
                </div>

                <Button className="mt-4 w-full bg-[var(--accent-primary)] py-6 text-white shadow-lg shadow-blue-500/10 hover:bg-[var(--accent-hover)]">
                    <CheckCircle className="mr-2" size={18} />
                    Verify & Lock Intake Review
                </Button>
            </div>
        </div>
    );

    // --- 2. INVESTIGATION UI ---
    const InvestigationView = () => (
        <div className="animate-in space-y-6 duration-500 fade-in slide-in-from-bottom-2">
            {/* Quick Action Buttons */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <Button
                    variant="outline"
                    className="border-subtle flex h-24 flex-col gap-2 border-dashed bg-input/50 transition-all hover:border-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/5"
                >
                    <Upload size={20} className="text-secondary" />
                    <span className="text-[10px] font-bold tracking-tight uppercase">
                        Upload Evidence
                    </span>
                </Button>
                <Button
                    variant="outline"
                    className="border-subtle flex h-24 flex-col gap-2 border-dashed bg-input/50 transition-all hover:border-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/5"
                >
                    <MessageSquare size={20} className="text-secondary" />
                    <span className="text-[10px] font-bold tracking-tight uppercase">
                        Log Interview
                    </span>
                </Button>
                <Button
                    variant="outline"
                    className="border-subtle flex h-24 flex-col gap-2 border-dashed bg-input/50 transition-all hover:border-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/5"
                >
                    <Search size={20} className="text-secondary" />
                    <span className="text-[10px] font-bold tracking-tight uppercase">
                        Request Forensic
                    </span>
                </Button>
            </div>

            {/* Active Investigation Form */}
            <Card className="bg-surface border-subtle overflow-hidden shadow-sm">
                <CardHeader className="border-subtle border-b bg-input/30 py-3">
                    <CardTitle className="flex items-center gap-2 text-sm font-bold text-primary">
                        <Shield
                            size={16}
                            className="text-[var(--accent-primary)]"
                        />
                        Subject/Perpetrator Information
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label className="text-xs font-bold tracking-tighter text-secondary uppercase">
                                Full Name (or Alias)
                            </Label>
                            <Input
                                placeholder="Enter name..."
                                className="border-subtle bg-input text-primary focus:ring-1 focus:ring-[var(--accent-primary)]"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs font-bold tracking-tighter text-secondary uppercase">
                                Relationship to Victim
                            </Label>
                            <Select>
                                <SelectTrigger className="border-subtle bg-input text-primary">
                                    <SelectValue placeholder="Select relationship..." />
                                </SelectTrigger>
                                <SelectContent className="bg-surface border-subtle">
                                    <SelectItem value="stranger">
                                        Stranger
                                    </SelectItem>
                                    <SelectItem value="acquaintance">
                                        Acquaintance
                                    </SelectItem>
                                    <SelectItem value="family">
                                        Family Member
                                    </SelectItem>
                                    <SelectItem value="partner">
                                        Intimate Partner
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-xs font-bold tracking-tighter text-secondary uppercase">
                            Investigation Summary / Current Findings
                        </Label>
                        <Textarea
                            placeholder="Detail the progress of the investigation, including any leads or witness testimony..."
                            className="border-subtle min-h-[120px] bg-input text-primary focus:ring-1 focus:ring-[var(--accent-primary)]"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <Button
                            variant="outline"
                            className="border-subtle text-primary"
                        >
                            Save Draft
                        </Button>
                        <Button className="bg-[var(--accent-primary)] px-8 text-white hover:bg-[var(--accent-hover)]">
                            Update Case Log
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Timeline Log Section */}
            <div className="border-subtle bg-surface rounded-xl border p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                    <h4 className="flex items-center gap-2 text-sm font-bold text-primary">
                        <Clock size={16} className="text-secondary" />
                        Investigation Timeline
                    </h4>
                    <Badge
                        variant="outline"
                        className="border-subtle text-[10px] text-secondary"
                    >
                        AUTO-SAVING
                    </Badge>
                </div>
                <Separator className="bg-subtle mb-4" />
                <div className="border-subtle rounded-lg border border-dashed bg-input/20 py-6 text-center text-xs text-secondary italic">
                    No investigation logs recorded for this phase yet.
                </div>
            </div>
        </div>
    );

    // --- 3. ESCALATION UI ---
    const EscalationView = () => (
        <div className="animate-in space-y-6 duration-500 fade-in slide-in-from-bottom-2">
            {/* Warning Alert */}
            <Alert className="border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/20">
                <ShieldAlert className="h-4 w-4 text-amber-600" />
                <AlertTitle className="font-bold text-amber-800 dark:text-amber-400">
                    Case Escalation Protocol
                </AlertTitle>
                <AlertDescription className="text-xs text-amber-700 dark:text-amber-500">
                    Escalating this case will notify Senior Admin and move it to
                    a specialized review queue. Ensure all evidence is attached
                    before proceeding.
                </AlertDescription>
            </Alert>

            <Card className="bg-surface border-subtle overflow-hidden shadow-sm">
                <CardHeader className="border-subtle border-b bg-amber-50/50 dark:bg-amber-950/10">
                    <CardTitle className="flex items-center gap-2 text-sm font-bold text-primary">
                        <Landmark size={18} className="text-amber-600" />
                        Specialized Unit Referral Form
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5 p-6">
                    <div className="space-y-2">
                        <Label className="text-xs font-bold tracking-tighter text-secondary uppercase">
                            Target Department/Unit
                        </Label>
                        <Select>
                            <SelectTrigger className="border-subtle bg-input text-primary">
                                <SelectValue placeholder="Select specialized unit..." />
                            </SelectTrigger>
                            <SelectContent className="bg-surface border-subtle">
                                <SelectItem value="gbv-legal">
                                    GBV Legal & Litigation Team
                                </SelectItem>
                                <SelectItem value="forensic">
                                    Advanced Forensic Unit
                                </SelectItem>
                                <SelectItem value="social-services">
                                    Social Services & Victim Support
                                </SelectItem>
                                <SelectItem value="internal-affairs">
                                    Internal Affairs Bureau
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-xs font-bold tracking-tighter text-secondary uppercase">
                            Primary Reason for Escalation
                        </Label>
                        <Select>
                            <SelectTrigger className="border-subtle bg-input text-primary">
                                <SelectValue placeholder="Select reason..." />
                            </SelectTrigger>
                            <SelectContent className="bg-surface border-subtle">
                                <SelectItem value="complexity">
                                    High Case Complexity
                                </SelectItem>
                                <SelectItem value="jurisdiction">
                                    Cross-Jurisdictional Issues
                                </SelectItem>
                                <SelectItem value="legal">
                                    Urgent Legal/Court Intervention
                                </SelectItem>
                                <SelectItem value="safety">
                                    Extreme Victim Safety Risk
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-xs font-bold tracking-tighter text-secondary uppercase">
                            Handover Briefing Notes
                        </Label>
                        <Textarea
                            placeholder="Provide a summary of why this case is being referred and what specific action is needed from the specialized unit..."
                            className="border-subtle min-h-[120px] bg-input text-primary focus:ring-1 focus:ring-amber-500"
                        />
                    </div>

                    <Separator className="bg-subtle" />

                    <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                        <Button className="flex-1 bg-amber-600 text-white shadow-md shadow-amber-500/20 hover:bg-amber-700">
                            <ArrowUpRight className="mr-2 h-4 w-4" />
                            Initiate Official Transfer
                        </Button>
                        <Button
                            variant="outline"
                            className="border-subtle text-primary"
                        >
                            <Scale className="mr-2 h-4 w-4 text-secondary" />
                            Request Legal Consultation
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Informational Footer */}
            <div className="flex items-center gap-2 px-2 text-[10px] font-medium text-secondary">
                <AlertCircle size={14} />
                <span>
                    Case ownership will remain with you until the target
                    department accepts the transfer.
                </span>
            </div>
        </div>
    );

    // --- 4. RESOLUTION UI ---
    const ResolutionView = () => (
        <div className="animate-in space-y-6 duration-500 fade-in slide-in-from-bottom-2">
            <div className="mb-2 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                    <CheckCircle className="text-green-600" size={24} />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-primary">
                        Part C: Final Resolution
                    </h3>
                    <p className="text-xs text-secondary italic">
                        To be completed by the GBV Desk Coordinator
                    </p>
                </div>
            </div>

            <Card className="bg-surface border-subtle overflow-hidden shadow-[var(--card-shadow)]">
                <CardHeader className="border-subtle border-b bg-green-500/5 py-3">
                    <CardTitle className="text-[10px] font-black tracking-widest text-green-700 uppercase dark:text-green-400">
                        Official Closing Document
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                    {/* Name and Phone Row */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2 text-[10px] font-bold text-secondary uppercase">
                                <User size={12} /> Coordinator Name
                            </Label>
                            <Input
                                placeholder="Enter full name..."
                                className="border-subtle bg-input text-primary focus:ring-green-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2 text-[10px] font-bold text-secondary uppercase">
                                <Phone size={12} /> Phone Number
                            </Label>
                            <Input
                                placeholder="+255..."
                                className="border-subtle bg-input text-primary focus:ring-green-500"
                            />
                        </div>
                    </div>

                    {/* Comment Section */}
                    <div className="space-y-2">
                        <Label className="flex items-center gap-2 text-[10px] font-bold text-secondary uppercase">
                            <MessageSquare size={12} /> Final Coordinator
                            Comment
                        </Label>
                        <Textarea
                            placeholder="Provide final remarks on case resolution..."
                            className="border-subtle min-h-[100px] bg-input text-primary focus:ring-green-500"
                        />
                    </div>

                    {/* Signature, Date, and Time Row */}
                    <div className="grid grid-cols-1 gap-4 pt-2 md:grid-cols-3">
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2 text-[10px] font-bold text-secondary uppercase">
                                <PenTool size={12} /> Digital Signature
                            </Label>
                            <div className="border-subtle flex h-10 items-center rounded-md border bg-input px-3 text-xs text-secondary italic">
                                Sign here...
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2 text-[10px] font-bold text-secondary uppercase">
                                <Calendar size={12} /> Date
                            </Label>
                            <Input
                                type="date"
                                className="border-subtle bg-input text-primary"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2 text-[10px] font-bold text-secondary uppercase">
                                <Clock size={12} /> Time
                            </Label>
                            <Input
                                type="time"
                                className="border-subtle bg-input text-primary"
                            />
                        </div>
                    </div>

                    <Separator className="bg-subtle" />

                    <div className="pt-2">
                        <Button className="w-full bg-green-600 py-6 font-bold text-white shadow-lg shadow-green-500/20 transition-transform hover:bg-green-700 active:scale-[0.98]">
                            Finalize & Archive Case Record
                        </Button>
                        <p className="mt-3 text-center text-[10px] text-secondary italic">
                            By clicking finalize, you certify that this case has
                            been handled according to GBV standard operating
                            procedures.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );

    return (
        <div className="bg-app min-h-screen p-6 font-sans transition-colors duration-300">
            {/* HEADER */}
            <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-secondary hover:text-primary"
                    >
                        <ChevronLeft size={20} /> Back
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-primary">
                            Case: PS-2026-08-21-XTFQU
                        </h1>
                        <p className="text-sm text-secondary italic">
                            Active Officer: Bernard
                        </p>
                    </div>
                </div>
                <Badge className="bg-[var(--accent-primary)] px-4 py-1 text-sm font-medium text-white">
                    STEP {activeStep} IN PROGRESS
                </Badge>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* LEFT COLUMN: THE DYNAMIC WORK AREA */}
                <div className="lg:col-span-2">
                    <Card className="bg-surface border-subtle flex min-h-[500px] flex-col shadow-[var(--card-shadow)]">
                        <CardHeader className="border-subtle border-b bg-input/20">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-[var(--accent-primary)] p-2 text-white">
                                    {activeStep === 1 && <Search size={20} />}
                                    {activeStep === 2 && <Shield size={20} />}
                                    {activeStep === 3 && <Landmark size={20} />}
                                    {activeStep === 4 && <Scale size={20} />}
                                </div>
                                <div>
                                    <CardTitle className="text-lg text-primary">
                                        {activeStep === 1 &&
                                            'Case Intake & Evidence Review'}
                                        {activeStep === 2 &&
                                            'Active Investigation & Evidence Log'}
                                        {activeStep === 3 &&
                                            'Case Escalation & Legal Referral'}
                                        {activeStep === 4 &&
                                            'Final Case Disposition'}
                                    </CardTitle>
                                    <p className="mt-0.5 text-xs font-bold tracking-widest text-secondary uppercase">
                                        Primary Workspace
                                    </p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 p-8">
                            {activeStep === 1 && <IntakeView />}
                            {activeStep === 2 && <InvestigationView />}
                            {activeStep === 3 && <EscalationView />}
                            {activeStep === 4 && <ResolutionView />}
                        </CardContent>
                    </Card>
                </div>

                {/* RIGHT COLUMN: WORKFLOW CONTROL */}
                <div className="space-y-6">
                    <Card className="bg-surface border-subtle shadow-[var(--card-shadow)]">
                        <CardHeader className="border-subtle border-b pb-3">
                            <CardTitle className="text-xs font-black tracking-[0.2em] text-secondary uppercase">
                                Investigation Steps
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 pt-4">
                            {[
                                {
                                    id: 1,
                                    label: 'Intake & Review',
                                    desc: 'Statement validation',
                                },
                                {
                                    id: 2,
                                    label: 'Investigation',
                                    desc: 'Evidence & interviews',
                                },
                                {
                                    id: 3,
                                    label: 'Escalation',
                                    desc: 'Legal & Referrals',
                                },
                                {
                                    id: 4,
                                    label: 'Final Resolution',
                                    desc: 'Closing report',
                                },
                            ].map((step) => (
                                <button
                                    key={step.id}
                                    onClick={() => setActiveStep(step.id)}
                                    className={`flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-all ${
                                        activeStep === step.id
                                            ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/5 shadow-sm'
                                            : 'border-transparent text-secondary hover:bg-input'
                                    }`}
                                >
                                    <div
                                        className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                                            activeStep === step.id
                                                ? 'bg-[var(--accent-primary)] text-white'
                                                : 'bg-input text-secondary'
                                        }`}
                                    >
                                        {step.id}
                                    </div>
                                    <div>
                                        <p
                                            className={`text-sm font-bold ${activeStep === step.id ? 'text-primary' : ''}`}
                                        >
                                            {step.label}
                                        </p>
                                        <p className="text-[10px] tracking-tight opacity-70">
                                            {step.desc}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="bg-surface border-subtle p-4 shadow-sm">
                        <div className="mb-4 flex items-center gap-3 text-secondary">
                            <Clock size={16} />
                            <span className="text-xs font-bold tracking-widest uppercase">
                                Case Lifecycle
                            </span>
                        </div>
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <div className="mt-1 h-2 w-2 rounded-full bg-green-500" />
                                <p className="text-[11px] text-primary">
                                    Intake completed by Bernard at 09:00 AM
                                </p>
                            </div>
                            <Button
                                onClick={() =>
                                    activeStep < 4 &&
                                    setActiveStep(activeStep + 1)
                                }
                                className="w-full bg-primary text-white hover:bg-primary/90"
                            >
                                Proceed to Next Phase
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CaseWorkflowPage;
