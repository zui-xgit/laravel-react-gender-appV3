import { Button } from './ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    AlertCircle,
    ArrowUpRight,
    Calendar,
    CheckCircle,
    Clock,
    Eye,
    Landmark,
    MessageSquare,
    PenTool,
    Phone,
    Scale,
    Search,
    Shield,
    ShieldAlert,
    Upload,
    User,
    FileText,
    Info,
    LucideIcon,
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';
import { Hint } from './hint';
import { Checkbox } from './ui/checkbox';
import { cn } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Spinner } from './ui/spinner';
import {
    caseEscalation,
    caseIntake,
    caseInvestigation,
    caseResolution,
} from '@/routes';
import { toast } from 'sonner';
import { useEffect } from 'react';

interface StepCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    children: React.ReactNode;
    className?: string;
}

type StepId = 'intake' | 'investigation' | 'escalation' | 'resolution';

interface WorkflowStep {
    id: StepId;
    label: string;
    shortLabel: string;
    icon: React.ElementType;
}

export const STEPS: WorkflowStep[] = [
    {
        id: 'intake',
        label: 'Intake & Review',
        shortLabel: 'Intake',
        icon: Search,
    },
    {
        id: 'investigation',
        label: 'Investigation',
        shortLabel: 'Investigate',
        icon: Shield,
    },
    {
        id: 'escalation',
        label: 'Escalation',
        shortLabel: 'Escalate',
        icon: Landmark,
    },
    {
        id: 'resolution',
        label: 'Final Resolution',
        shortLabel: 'Resolve',
        icon: Scale,
    },
];

export function StepCard({
    title,
    description,
    icon: Icon,
    children,
    className,
}: StepCardProps) {
    return (
        <Card
            className={cn(
                'overflow-hidden border-none shadow-md ring-1 ring-border',
                className,
            )}
        >
            <CardHeader className="border-b bg-muted/30 px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-md shadow-primary/20">
                        <Icon className="h-5 w-5" />
                    </div>
                    <div>
                        <CardTitle className="text-lg leading-none font-bold">
                            {title}
                        </CardTitle>
                        <CardDescription className="mt-1.5 text-[10px] font-bold tracking-widest text-primary/70 uppercase">
                            {description}
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-6">{children}</CardContent>
        </Card>
    );
}

type IntakeViewUseForm = {
    checklist: {
        identity: boolean;
        jurisdiction: boolean;
        safety: boolean;
    };
    observations: string;
};

interface IntakeViewProps {
    case_uuid: string;
    intake_data: {
        checklist: {
            identity: boolean;
            jurisdiction: boolean;
            safety: boolean;
        };
        observations: string;
    } | null;
}

export const IntakeView = ({ case_uuid, intake_data }: IntakeViewProps) => {
    const { data, setData, errors, setError, clearErrors, processing, post } =
        useForm<IntakeViewUseForm>({
            checklist: intake_data?.checklist ?? {
                identity: false,
                jurisdiction: false,
                safety: false,
            },
            observations: intake_data?.observations ?? '',
        });

    // useEffect(() => {
    //     if (intake_data) {
    //         setData((prevData) => ({
    //             ...prevData,
    //             checklist: intake_data.checklist,
    //             observations: intake_data.observations,
    //         }));
    //     }
    // }, [intake_data]);

    const handleCheckChange = (id: string, checked: boolean) => {
        setData('checklist', {
            ...data.checklist,
            [id]: checked,
        });
    };

    const handleSubmit = () => {
        clearErrors();
        let hasErrors = false;

        if (!data.observations.trim()) {
            setError('observations', 'Please provide initial observations.');
            hasErrors = true;
        }

        const allChecked = Object.values(data.checklist).every(Boolean);
        if (!allChecked) {
            setError('checklist', 'All verification steps must be completed.');
            hasErrors = true;
        }

        if (hasErrors) return;

        // console.log('Intake Review Verified Successfully:', data);

        post(caseIntake({ case: case_uuid }).url, {
            onSuccess: (page) => {
                if (page.flash) {
                    toast.success(page.flash.message as string);
                }
            },
            onError: (errors) => {
                if (errors) {
                    toast.error(errors.error);
                }
            },
            preserveScroll: true,
        });
    };

    return (
        <>
            <StepCard
                icon={Search}
                title="Case Intake & Review"
                description="Initial document verification and observations"
            >
                <div className="animate-in space-y-6 duration-300 fade-in slide-in-from-bottom-2">
                    <Alert className="border-none bg-muted/50 shadow-sm ring-1 ring-border">
                        <Info className="h-4 w-4" />
                        <AlertTitle className="font-semibold">
                            Officer Review Required
                        </AlertTitle>
                        <AlertDescription className="text-muted-foreground">
                            Complete the verification checklist after reviewing
                            the attached documents.
                        </AlertDescription>
                    </Alert>

                    {/* Documents */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {[
                            {
                                name: 'Victim_Statement.pdf',
                                colorClass:
                                    'bg-destructive/10 text-destructive',
                            },
                            {
                                name: 'Incident_Photos.zip',
                                colorClass: 'bg-primary/10 text-primary',
                            },
                        ].map((doc) => (
                            <Card
                                key={doc.name}
                                className="border-none shadow-sm ring-1 ring-border transition-all hover:ring-primary/30"
                            >
                                <CardContent className="flex items-center justify-between p-4">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`rounded-md p-2 ${doc.colorClass}`}
                                        >
                                            <FileText className="h-4 w-4" />
                                        </div>
                                        <span className="text-sm font-medium">
                                            {doc.name}
                                        </span>
                                    </div>
                                    <Hint content="View File">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </Hint>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <Separator />

                    {/* Checklist */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                                Verification Checklist
                            </p>
                            <InputError message={errors.checklist} />
                        </div>
                        <div className="grid gap-2">
                            {[
                                {
                                    id: 'identity',
                                    label: 'Victim identity verified via valid ID/Passport',
                                },
                                {
                                    id: 'jurisdiction',
                                    label: 'Incident location falls within department jurisdiction',
                                },
                                {
                                    id: 'safety',
                                    label: 'Immediate safety assessment completed (No active threat)',
                                },
                            ].map((item) => (
                                <div
                                    key={item.id}
                                    className={cn(
                                        'flex items-start gap-3 rounded-lg border p-3.5 transition-colors hover:bg-muted/40',
                                        errors.checklist &&
                                            !data.checklist[
                                                item.id as keyof typeof data.checklist
                                            ] &&
                                            'border-destructive/50 bg-destructive/5',
                                    )}
                                >
                                    <Checkbox
                                        id={item.id}
                                        className="mt-0.5"
                                        checked={
                                            data.checklist[
                                                item.id as keyof typeof data.checklist
                                            ]
                                        }
                                        onCheckedChange={(checked) =>
                                            handleCheckChange(
                                                item.id,
                                                !!checked,
                                            )
                                        }
                                    />
                                    <Label
                                        htmlFor={item.id}
                                        className="cursor-pointer text-sm leading-snug font-normal"
                                    >
                                        {item.label}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Observations */}
                    <div className="space-y-2">
                        <Label className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                            Initial Case Observations
                        </Label>
                        <Textarea
                            placeholder="Enter any initial notes regarding the credibility or urgency of the report..."
                            className={cn(
                                'min-h-[110px] resize-none',
                                errors.observations &&
                                    'border-destructive focus-visible:ring-destructive',
                            )}
                            value={data.observations}
                            onChange={(e) =>
                                setData('observations', e.target.value)
                            }
                        />
                        <InputError message={errors.observations} />
                    </div>

                    <Button
                        className="h-11 w-full cursor-pointer font-semibold"
                        onClick={handleSubmit}
                        disabled={processing}
                    >
                        {processing ? (
                            <Spinner />
                        ) : (
                            <>
                                <CheckCircle className="mr-2 h-4 w-4" />

                                {intake_data
                                    ? 'Update Intake Review'
                                    : 'Verify & Lock Intake Review'}
                            </>
                        )}
                    </Button>
                </div>
            </StepCard>
        </>
    );
};

interface InvetigationViewProps {
    case_uuid: string;
    investigation_data: {
        subjectName: string;
        relationship: string;
        summary: string;
    } | null;
}
export const InvestigationView = ({
    case_uuid,
    investigation_data,
}: InvetigationViewProps) => {
    const { data, setData, errors, setError, clearErrors, processing, post } =
        useForm({
            subjectName: investigation_data?.subjectName ?? '',
            relationship: investigation_data?.relationship ?? '',
            summary: investigation_data?.summary ?? '',
        });

    const handleSubmit = () => {
        clearErrors();
        let hasErrors = false;

        if (!data.subjectName.trim()) {
            setError('subjectName', 'Subject name is required.');
            hasErrors = true;
        }
        if (!data.relationship) {
            setError('relationship', 'Please select a relationship.');
            hasErrors = true;
        }
        if (!data.summary.trim()) {
            setError('summary', 'Investigation summary is required.');
            hasErrors = true;
        }

        if (hasErrors) return;

        // console.log('Investigation Log Updated Successfully:', data);
        post(caseInvestigation({ case: case_uuid }).url, {
            onSuccess: (page) => {
                if (page.flash) {
                    toast.success(page.flash.message as string);
                }
            },
            onError: (errors) => {
                if (errors) {
                    toast.error(errors.error);
                }
            },
            preserveScroll: true,
        });
    };

    return (
        <StepCard
            icon={Shield}
            title="Active Investigation"
            description="Evidence collection and subject profiling"
        >
            <div className="animate-in space-y-6 duration-300 fade-in slide-in-from-bottom-2">
                {/* Quick Actions */}
                <div className="grid grid-cols-3 gap-3">
                    {[
                        { Icon: Upload, label: 'Upload Evidence' },
                        { Icon: MessageSquare, label: 'Log Interview' },
                        { Icon: Search, label: 'Request Forensic' },
                    ].map(({ Icon, label }) => (
                        <Button
                            key={label}
                            variant="outline"
                            className="flex h-20 flex-col gap-1.5 border-dashed bg-muted/20 text-center transition-all hover:border-primary/40 hover:bg-primary/5"
                        >
                            <Icon className="h-4 w-4 text-muted-foreground" />
                            <span className="text-[9px] leading-tight font-bold tracking-widest uppercase">
                                {label}
                            </span>
                        </Button>
                    ))}
                </div>

                {/* Subject Info */}
                <Card className="overflow-hidden border-none shadow-sm ring-1 ring-border">
                    <CardHeader className="bg-muted/30 px-5 py-3">
                        <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-primary" />
                            <CardTitle className="text-sm font-bold">
                                Subject / Perpetrator
                            </CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4 p-5">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-1.5">
                                <Label className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                                    Full Name / Alias
                                </Label>
                                <Input
                                    placeholder="Enter name..."
                                    value={data.subjectName}
                                    onChange={(e) =>
                                        setData('subjectName', e.target.value)
                                    }
                                    className={cn(
                                        errors.subjectName &&
                                            'border-destructive focus-visible:ring-destructive',
                                    )}
                                />
                                <InputError message={errors.subjectName} />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                                    Relationship to Victim
                                </Label>
                                <Select
                                    value={data.relationship}
                                    onValueChange={(val) =>
                                        setData('relationship', val)
                                    }
                                >
                                    <SelectTrigger
                                        className={cn(
                                            errors.relationship &&
                                                'border-destructive focus-visible:ring-destructive',
                                        )}
                                    >
                                        <SelectValue placeholder="Select..." />
                                    </SelectTrigger>
                                    <SelectContent>
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
                                <InputError message={errors.relationship} />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                                Investigation Summary
                            </Label>
                            <Textarea
                                placeholder="Detail the progress of the investigation..."
                                className={cn(
                                    'min-h-[100px] resize-none',
                                    errors.summary &&
                                        'border-destructive focus-visible:ring-destructive',
                                )}
                                value={data.summary}
                                onChange={(e) =>
                                    setData('summary', e.target.value)
                                }
                            />
                            <InputError message={errors.summary} />
                        </div>
                        <div className="flex justify-end gap-2 pt-1">
                            {/* <Button variant="outline" size="sm">
                                Save Draft
                            </Button> */}
                            <Button
                                size="sm"
                                className="px-6"
                                onClick={handleSubmit}
                                disabled={processing}
                            >
                                {processing ? (
                                    <>
                                        <Spinner />
                                    </>
                                ) : (
                                    <>
                                        {investigation_data
                                            ? 'Update investigation'
                                            : 'Save Investigation'}
                                    </>
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Timeline */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <h4 className="flex items-center gap-2 text-sm font-bold">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            Investigation Timeline
                        </h4>
                        <Badge
                            variant="outline"
                            className="px-2 py-0 text-[9px] tracking-widest uppercase"
                        >
                            Auto-saving
                        </Badge>
                    </div>
                    <div className="rounded-lg border border-dashed bg-muted/10 py-8 text-center">
                        <p className="text-xs text-muted-foreground italic">
                            No investigation logs recorded yet.
                        </p>
                    </div>
                </div>
            </div>
        </StepCard>
    );
};

interface EscalationViewProps {
    case_uuid: string;
    escalation_data: {
        targetUnit: string;
        reason: string;
        notes: string;
    } | null;
}
export const EscalationView = ({
    case_uuid,
    escalation_data,
}: EscalationViewProps) => {
    const { data, setData, errors, setError, clearErrors, processing, post } =
        useForm({
            targetUnit: escalation_data?.targetUnit ?? '',
            reason: escalation_data?.reason ?? '',
            notes: escalation_data?.notes ?? '',
        });

    const handleSubmit = () => {
        clearErrors();
        let hasErrors = false;

        if (!data.targetUnit) {
            setError('targetUnit', 'Target unit is required.');
            hasErrors = true;
        }
        if (!data.reason) {
            setError('reason', 'Reason for escalation is required.');
            hasErrors = true;
        }
        if (!data.notes.trim()) {
            setError('notes', 'Handover notes are required.');
            hasErrors = true;
        }

        if (hasErrors) return;

        post(caseEscalation({ case: case_uuid }).url, {
            onSuccess: (page) => {
                if (page.flash) {
                    toast.success(page.flash.message as string);
                }
            },
            onError: (errors) => {
                if (errors) {
                    toast.error(errors.error);
                }
            },
            preserveScroll: true,
        });
    };

    return (
        <StepCard
            icon={Landmark}
            title="Case Escalation"
            description="Specialized unit referral and legal consultation"
        >
            <div className="animate-in space-y-6 duration-300 fade-in slide-in-from-bottom-2">
                <Alert className="border-amber-200 bg-amber-50 shadow-sm dark:border-amber-900 dark:bg-amber-950/20">
                    <ShieldAlert className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    <AlertTitle className="font-bold text-amber-800 dark:text-amber-400">
                        Escalation Protocol Active
                    </AlertTitle>
                    <AlertDescription className="text-xs text-amber-700 dark:text-amber-500">
                        Escalating will notify Senior Admin and move this to a
                        specialized review queue.
                    </AlertDescription>
                </Alert>

                <Card className="overflow-hidden border-none shadow-sm ring-1 ring-border">
                    <CardHeader className="border-b bg-amber-50/50 px-5 py-3 dark:bg-amber-950/10">
                        <div className="flex items-center gap-2">
                            <Landmark className="h-4 w-4 text-amber-600" />
                            <CardTitle className="text-sm font-bold">
                                Specialized Unit Referral
                            </CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4 p-5">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-1.5">
                                <Label className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                                    Target Unit
                                </Label>
                                <Select
                                    value={data.targetUnit}
                                    onValueChange={(val) =>
                                        setData('targetUnit', val)
                                    }
                                >
                                    <SelectTrigger
                                        className={cn(
                                            errors.targetUnit &&
                                                'border-destructive focus-visible:ring-destructive',
                                        )}
                                    >
                                        <SelectValue placeholder="Select unit..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="gbv-legal">
                                            GBV Legal & Litigation
                                        </SelectItem>
                                        <SelectItem value="forensic">
                                            Advanced Forensic Unit
                                        </SelectItem>
                                        <SelectItem value="social-services">
                                            Social Services & Support
                                        </SelectItem>
                                        <SelectItem value="internal-affairs">
                                            Internal Affairs Bureau
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.targetUnit} />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                                    Reason for Escalation
                                </Label>
                                <Select
                                    value={data.reason}
                                    onValueChange={(val) =>
                                        setData('reason', val)
                                    }
                                >
                                    <SelectTrigger
                                        className={cn(
                                            errors.reason &&
                                                'border-destructive focus-visible:ring-destructive',
                                        )}
                                    >
                                        <SelectValue placeholder="Select reason..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="complexity">
                                            High Case Complexity
                                        </SelectItem>
                                        <SelectItem value="jurisdiction">
                                            Cross-Jurisdictional
                                        </SelectItem>
                                        <SelectItem value="legal">
                                            Urgent Legal Intervention
                                        </SelectItem>
                                        <SelectItem value="safety">
                                            Extreme Safety Risk
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.reason} />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <Label className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                                Handover Briefing Notes
                            </Label>
                            <Textarea
                                placeholder="Provide a summary of why this case is being referred..."
                                className={cn(
                                    'min-h-[110px] resize-none',
                                    errors.notes &&
                                        'border-destructive focus-visible:ring-destructive',
                                )}
                                value={data.notes}
                                onChange={(e) =>
                                    setData('notes', e.target.value)
                                }
                            />
                            <InputError message={errors.notes} />
                        </div>

                        <Separator />

                        <div className="flex flex-col gap-2 pt-1 sm:flex-row">
                            <Button
                                className="flex-1 bg-amber-600 font-semibold text-white hover:bg-amber-700"
                                onClick={handleSubmit}
                                disabled={processing}
                            >
                                {processing ? (
                                    <>
                                        <Spinner />
                                    </>
                                ) : (
                                    <>
                                        <ArrowUpRight className="mr-2 h-4 w-4" />
                                        {escalation_data
                                            ? 'Update Initiation Transfer'
                                            : 'Initiate Transfer'}
                                    </>
                                )}
                            </Button>
                            <Button variant="outline" className="flex-1">
                                <Scale className="mr-2 h-4 w-4 text-muted-foreground" />
                                Legal Consultation
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex items-center gap-2 px-1 text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    <span>
                        Ownership remains with you until accepted by the target
                        department.
                    </span>
                </div>
            </div>
        </StepCard>
    );
};

interface ResolutionViewProps {
    case_uuid: string;
    resolution_data: {
        coordinatorName: string;
        phone: string;
        comment: string;
        date: string;
        time: string;
    } | null;
}
export const ResolutionView = ({
    case_uuid,
    resolution_data,
}: ResolutionViewProps) => {
    const { data, setData, errors, setError, clearErrors, processing, post } =
        useForm({
            coordinatorName: resolution_data?.coordinatorName ?? '',
            phone: resolution_data?.phone ?? '',
            comment: resolution_data?.comment ?? '',
            date: resolution_data?.date ?? '',
            time: resolution_data?.time ?? '',
        });

    const handleSubmit = () => {
        clearErrors();
        let hasErrors = false;

        if (!data.coordinatorName.trim()) {
            setError('coordinatorName', 'Coordinator name is required.');
            hasErrors = true;
        }
        if (!data.phone.trim()) {
            setError('phone', 'Phone number is required.');
            hasErrors = true;
        }
        if (!data.comment.trim()) {
            setError('comment', 'Final comment is required.');
            hasErrors = true;
        }
        if (!data.date) {
            setError('date', 'Resolution date is required.');
            hasErrors = true;
        }
        if (!data.time) {
            setError('time', 'Resolution time is required.');
            hasErrors = true;
        }

        if (hasErrors) return;

        post(caseResolution({ case: case_uuid }).url, {
            onSuccess: (page) => {
                if (page.flash) {
                    toast.success(page.flash.message as string);
                }
            },
            onError: (errors) => {
                if (errors) {
                    toast.error(errors.error);
                }
            },
            preserveScroll: true,
        });
    };

    return (
        <StepCard
            icon={Scale}
            title="Final Disposition"
            description="Official closing and record archival"
        >
            <div className="animate-in space-y-6 duration-300 fade-in slide-in-from-bottom-2">
                <div className="flex items-center gap-4 rounded-xl bg-green-50 p-4 ring-1 ring-green-100 dark:bg-green-950/20 dark:ring-green-900/50">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                        <h3 className="font-bold text-green-900 dark:text-green-400">
                            Final Resolution — Part C
                        </h3>
                        <p className="text-xs text-green-700/70 italic dark:text-green-500/70">
                            To be completed by the GBV Desk Coordinator
                        </p>
                    </div>
                </div>

                <Card className="overflow-hidden border-none shadow-sm ring-1 ring-border">
                    <CardHeader className="border-b border-green-100 bg-green-500/5 px-5 py-3 dark:border-green-900/30">
                        <CardTitle className="text-[10px] font-black tracking-[0.2em] text-green-700 uppercase dark:text-green-400">
                            Official Closing Document
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-5 p-5">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-1.5">
                                <Label className="flex items-center gap-1.5 text-xs font-bold tracking-widest text-muted-foreground uppercase">
                                    <User size={11} /> Coordinator Name
                                </Label>
                                <Input
                                    placeholder="Enter full name..."
                                    value={data.coordinatorName}
                                    onChange={(e) =>
                                        setData(
                                            'coordinatorName',
                                            e.target.value,
                                        )
                                    }
                                    className={cn(
                                        errors.coordinatorName &&
                                            'border-destructive focus-visible:ring-destructive',
                                    )}
                                />
                                <InputError message={errors.coordinatorName} />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="flex items-center gap-1.5 text-xs font-bold tracking-widest text-muted-foreground uppercase">
                                    <Phone size={11} /> Phone Number
                                </Label>
                                <Input
                                    type="number"
                                    placeholder="+255..."
                                    value={data.phone}
                                    onChange={(e) =>
                                        setData('phone', e.target.value)
                                    }
                                    className={cn(
                                        errors.phone &&
                                            'border-destructive focus-visible:ring-destructive',
                                    )}
                                />
                                <InputError message={errors.phone} />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <Label className="flex items-center gap-1.5 text-xs font-bold tracking-widest text-muted-foreground uppercase">
                                <MessageSquare size={11} /> Final Coordinator
                                Comment
                            </Label>
                            <Textarea
                                placeholder="Provide final remarks on case resolution..."
                                className={cn(
                                    'min-h-[90px] resize-none',
                                    errors.comment &&
                                        'border-destructive focus-visible:ring-destructive',
                                )}
                                value={data.comment}
                                onChange={(e) =>
                                    setData('comment', e.target.value)
                                }
                            />
                            <InputError message={errors.comment} />
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                            <div className="space-y-1.5">
                                <Label className="flex items-center gap-1.5 text-xs font-bold tracking-widest text-muted-foreground uppercase">
                                    <PenTool size={11} /> Signature
                                </Label>
                                <div className="flex h-9 items-center rounded-md border border-dashed bg-muted/10 px-3 text-xs text-muted-foreground italic">
                                    Click to sign...
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <Label className="flex items-center gap-1.5 text-xs font-bold tracking-widest text-muted-foreground uppercase">
                                    <Calendar size={11} /> Date
                                </Label>
                                <Input
                                    type="date"
                                    className={cn(
                                        'h-9',
                                        errors.date &&
                                            'border-destructive focus-visible:ring-destructive',
                                    )}
                                    value={data.date}
                                    onChange={(e) =>
                                        setData('date', e.target.value)
                                    }
                                />
                                <InputError message={errors.date} />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="flex items-center gap-1.5 text-xs font-bold tracking-widest text-muted-foreground uppercase">
                                    <Clock size={11} /> Time
                                </Label>
                                <Input
                                    type="time"
                                    className={cn(
                                        'h-9',
                                        errors.time &&
                                            'border-destructive focus-visible:ring-destructive',
                                    )}
                                    value={data.time}
                                    onChange={(e) =>
                                        setData('time', e.target.value)
                                    }
                                />
                                <InputError message={errors.time} />
                            </div>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                            <Button
                                className="h-12 w-full bg-green-600 text-base font-bold text-white shadow-lg shadow-green-500/20 transition-all hover:bg-green-700 active:scale-[0.98]"
                                onClick={handleSubmit}
                                disabled={processing}
                            >
                                {processing ? (
                                    <>
                                        <Spinner />
                                    </>
                                ) : (
                                    <>
                                        {resolution_data
                                            ? 'Update & Archive Case Record'
                                            : 'Finalize & Archive Case Record'}
                                    </>
                                )}
                            </Button>
                            <p className="px-4 text-center text-[10px] text-muted-foreground italic">
                                By finalizing, you certify this case was handled
                                per GBV standard operating procedures.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </StepCard>
    );
};
