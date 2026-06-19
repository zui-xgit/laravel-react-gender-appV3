import { Head, router } from '@inertiajs/react';
import { format } from 'date-fns';
import {
    AlertCircle,
    Info,
    MapPin,
    User,
    Users,
    Calendar,
    Shield,
    Paperclip,
    CheckCircle2,
    Search,
    UserCheck,
    Briefcase,
    LogOut,
} from 'lucide-react';
import EvidenceFilesCard from '@/components/evidence-files-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { formatDate, formatTime } from '@/lib/helpers';
import { destroySession } from '@/routes';

interface User {
    first_name: string;
    last_name: string;
    role: string;
}

interface Case {
    uuid: string;
    case_tracking_id: string;
    status: 'pending' | 'in_progress' | 'completed';
    is_anonymous: number;
    evidence_description: string;
    created_at: string;
    informant_detail?: {
        name: string;
        title: string;
        sex: string;
        age: number;
        phone: string;
        workplace: string;
    };
    victim_detail: {
        name: string;
        title: string;
        sex: string;
        age: number;
        phone: string;
        email: string;
        education: string;
        residence: string;
        disability?: string;
        workplace: string;
    };
    accused_detail: {
        name: string;
        title: string;
        sex: string;
        age: number;
        phone: string;
        email: string;
        education: string;
        residence: string;
        workplace: string;
    };
    incident_detail: {
        incident_date: string;
        incident_time: string;
        location: string;
        exact_location: string;
        incident_type: string;
        cause: string;
        description: string;
        actions_taken: string;
        injuries: string;
        assistance_needed: string;
        other_involved: string;
    };
    case_evidence: Array<{
        uuid: string;
        file_name: string;
        file_type: string;
        // file_path: string;
        created_at: string;
    }>;
    case_assignment?: {
        assigned_to: User;
        priority: string;
        created_at: string;
    };
    case_workflow: Array<{
        phase: string;
        completed_at: string;
        completed_by: User;
    }>;
}

interface ProgressData {
    percentage: number;
    completed_phases: string[];
    all_phases: string[];
    current_status: string;
}

interface TrackProps {
    case: Case;
    progress: ProgressData;
}

const statusMap = {
    pending: {
        label: 'Pending Review',
        color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    },
    in_progress: {
        label: 'In Investigation',
        color: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    },
    completed: {
        label: 'Case Resolved',
        color: 'bg-green-500/10 text-green-500 border-green-500/20',
    },
};

const phaseMap: Record<string, string> = {
    intake: 'Intake & Registration',
    investigation: 'Investigation Phase',
    escalation: 'Action & Escalation',
    resolution: 'Case Resolution',
};

export default function Track({ case: caseData, progress }: TrackProps) {
    const handleExitSession = () => {
        router.post(destroySession().url);
    };

    return (
        <div>
            <Head title={'Track Case'} />

            <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-4 md:p-8">
                {/* Header Section */}
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <h1 className="text-3xl font-bold tracking-tight">
                                {caseData.case_tracking_id}
                            </h1>
                            <Badge
                                className={`${statusMap[caseData.status].color} font-medium`}
                            >
                                {statusMap[caseData.status].label}
                            </Badge>
                        </div>
                        <p className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>
                                Reported on {formatDate(caseData.created_at)} at{' '}
                                {formatTime(caseData.created_at)}
                            </span>
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        {caseData.is_anonymous === 0 && (
                            <Badge
                                variant="outline"
                                className="flex items-center gap-1 px-3 py-1"
                            >
                                <Shield className="h-3.5 w-3.5" />
                                Anonymous Report
                            </Badge>
                        )}
                        <Badge variant="secondary" className="px-3 py-1">
                            {caseData.incident_detail.incident_type}
                        </Badge>
                        <Button
                            onClick={handleExitSession}
                            variant={'outline'}
                            className="group flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-red-600 transition-all duration-200 hover:bg-red-50 hover:text-red-700 focus:ring-2 focus:ring-red-200 focus:outline-none active:scale-95"
                        >
                            <LogOut size={18} className="animate-bounce" />
                            <span>Exit Session</span>
                        </Button>
                    </div>
                </div>

                {/* Progress Overview */}
                <Card className="overflow-hidden border-primary/10 shadow-sm">
                    <div className="border-b border-primary/10 bg-primary/5 p-4">
                        <div className="mb-2 flex items-center justify-between">
                            <span className="flex items-center gap-2 text-sm font-semibold">
                                <CheckCircle2 className="h-4 w-4 text-primary" />
                                Overall Progress
                            </span>
                            <span className="text-sm font-bold text-primary">
                                {Math.round(progress.percentage)}%
                            </span>
                        </div>
                        <Progress value={progress.percentage} className="h-2" />
                    </div>
                    <div className="grid grid-cols-1 divide-y border-primary/10 md:grid-cols-4 md:divide-x md:divide-y-0">
                        {progress.all_phases.map((phase) => {
                            const isCompleted =
                                progress.completed_phases.includes(phase);
                            const isCurrent =
                                !isCompleted &&
                                progress.completed_phases.length ===
                                    progress.all_phases.indexOf(phase);

                            return (
                                <div
                                    key={phase}
                                    className={`flex items-center gap-3 p-4 ${isCurrent ? 'bg-primary/5' : ''}`}
                                >
                                    <div
                                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                                            isCompleted
                                                ? 'bg-green-500 text-white'
                                                : isCurrent
                                                  ? 'animate-pulse bg-primary text-primary-foreground'
                                                  : 'bg-muted text-muted-foreground'
                                        }`}
                                    >
                                        {isCompleted ? (
                                            <CheckCircle2 className="h-5 w-5" />
                                        ) : (
                                            progress.all_phases.indexOf(phase) +
                                            1
                                        )}
                                    </div>
                                    <div className="flex flex-col">
                                        <span
                                            className={`text-sm font-medium ${isCurrent ? 'text-primary' : ''}`}
                                        >
                                            {phaseMap[phase]}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            {isCompleted
                                                ? 'Completed'
                                                : isCurrent
                                                  ? 'Active'
                                                  : 'Pending'}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Card>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Left Column: Quick Info & Assignment */}
                    <div className="space-y-6 lg:col-span-1">
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <UserCheck className="h-5 w-5 text-primary" />
                                    Case Management
                                </CardTitle>
                                <CardDescription>
                                    Assignment and handling info
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                        Assigned Officer
                                    </label>
                                    {caseData.case_assignment ? (
                                        <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                                                {
                                                    caseData.case_assignment
                                                        .assigned_to
                                                        .first_name[0]
                                                }
                                                {
                                                    caseData.case_assignment
                                                        .assigned_to
                                                        .last_name[0]
                                                }
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">
                                                    {
                                                        caseData.case_assignment
                                                            .assigned_to
                                                            .first_name
                                                    }{' '}
                                                    {
                                                        caseData.case_assignment
                                                            .assigned_to
                                                            .last_name
                                                    }
                                                </p>
                                                <p className="text-xs text-muted-foreground capitalize">
                                                    {
                                                        caseData.case_assignment
                                                            .assigned_to.role
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2 rounded-lg border border-dashed bg-muted/30 p-3 text-muted-foreground">
                                            <AlertCircle className="h-4 w-4" />
                                            <span className="text-sm italic">
                                                Waiting for assignment
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <Separator />

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">
                                            Priority
                                        </span>
                                        <Badge
                                            variant="outline"
                                            className="capitalize"
                                        >
                                            {caseData.case_assignment
                                                ?.priority || 'Normal'}
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <MapPin className="h-5 w-5 text-primary" />
                                    Incident Summary
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <p className="text-xs font-medium text-muted-foreground">
                                            Date
                                        </p>
                                        <p className="text-sm font-semibold">
                                            {
                                                caseData.incident_detail
                                                    .incident_date
                                            }
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-medium text-muted-foreground">
                                            Time
                                        </p>
                                        <p className="text-sm font-semibold">
                                            {
                                                caseData.incident_detail
                                                    .incident_time
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-medium text-muted-foreground">
                                        Location
                                    </p>
                                    <p className="text-sm font-semibold">
                                        {caseData.incident_detail.location}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {
                                            caseData.incident_detail
                                                .exact_location
                                        }
                                    </p>
                                </div>
                                <Separator />
                                <div className="space-y-2">
                                    <p className="text-xs font-medium text-muted-foreground">
                                        Description Snippet
                                    </p>
                                    <p className="line-clamp-3 text-sm text-muted-foreground italic">
                                        "{caseData.incident_detail.description}"
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Detail Tabs */}
                    <div className="lg:col-span-2">
                        <Tabs defaultValue="details" className="w-full">
                            <TabsList
                                className="grid h-auto w-full grid-cols-3"
                                variant={'line'}
                            >
                                <TabsTrigger
                                    value="details"
                                    className="cursor-pointer gap-2"
                                >
                                    <Info className="h-4 w-4" />
                                    <span className="hidden md:inline">
                                        Details
                                    </span>
                                </TabsTrigger>
                                {/* <TabsTrigger
                                    value="timeline"
                                    className="cursor-pointer gap-2"
                                >
                                    <History className="h-4 w-4" />
                                    <span className="hidden md:inline">
                                        Timeline
                                    </span>
                                </TabsTrigger> */}
                                <TabsTrigger
                                    value="evidence"
                                    className="cursor-pointer gap-2"
                                >
                                    <Paperclip className="h-4 w-4" />
                                    <span className="hidden md:inline">
                                        Evidence
                                    </span>
                                </TabsTrigger>
                                <TabsTrigger
                                    value="workflow"
                                    className="cursor-pointer gap-2"
                                >
                                    <Briefcase className="h-4 w-4" />
                                    <span className="hidden md:inline">
                                        Workflow
                                    </span>
                                </TabsTrigger>
                            </TabsList>

                            {/* Details Tab */}
                            <TabsContent
                                value="details"
                                className="mt-6 space-y-6"
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-md flex items-center gap-2">
                                            <User className="h-4 w-4 text-primary" />
                                            Victim Information
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <div className="space-y-3">
                                            <DetailItem
                                                label="Full Name"
                                                value={`${caseData.victim_detail.title} ${caseData.victim_detail.name}`}
                                            />
                                            <DetailItem
                                                label="Age / Sex"
                                                value={`${caseData.victim_detail.age}y / ${caseData.victim_detail.sex}`}
                                            />
                                            <DetailItem
                                                label="Contact"
                                                value={
                                                    caseData.victim_detail.phone
                                                }
                                                subValue={
                                                    caseData.victim_detail.email
                                                }
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <DetailItem
                                                label="Residence"
                                                value={
                                                    caseData.victim_detail
                                                        .residence
                                                }
                                            />
                                            <DetailItem
                                                label="Education"
                                                value={
                                                    caseData.victim_detail
                                                        .education
                                                }
                                            />
                                            <DetailItem
                                                label="Workplace"
                                                value={
                                                    caseData.victim_detail
                                                        .workplace
                                                }
                                            />
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Accused Section */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-md flex items-center gap-2 text-destructive">
                                            <Users className="h-4 w-4" />
                                            Accused Information
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <div className="space-y-3">
                                            <DetailItem
                                                label="Full Name"
                                                value={`${caseData.accused_detail.title} ${caseData.accused_detail.name}`}
                                            />
                                            <DetailItem
                                                label="Age / Sex"
                                                value={`${caseData.accused_detail.age}y / ${caseData.accused_detail.sex}`}
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <DetailItem
                                                label="Residence"
                                                value={
                                                    caseData.accused_detail
                                                        .residence
                                                }
                                            />
                                            <DetailItem
                                                label="Workplace"
                                                value={
                                                    caseData.accused_detail
                                                        .workplace
                                                }
                                            />
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Informant Section (If visible) */}
                                {!caseData.is_anonymous &&
                                    caseData.informant_detail && (
                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="text-md flex items-center gap-2">
                                                    <Search className="h-4 w-4 text-primary" />
                                                    Reporter Information
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                                <div className="space-y-3">
                                                    <DetailItem
                                                        label="Full Name"
                                                        value={`${caseData.informant_detail.title} ${caseData.informant_detail.name}`}
                                                    />
                                                    <DetailItem
                                                        label="Contact"
                                                        value={
                                                            caseData
                                                                .informant_detail
                                                                .phone
                                                        }
                                                    />
                                                </div>
                                                <div className="space-y-3">
                                                    <DetailItem
                                                        label="Workplace"
                                                        value={
                                                            caseData
                                                                .informant_detail
                                                                .workplace
                                                        }
                                                    />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )}
                            </TabsContent>

                            {/* Evidence Tab */}
                            <TabsContent value="evidence" className="mt-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-md">
                                            Attached Evidence
                                        </CardTitle>
                                        <CardDescription>
                                            Files and documents submitted
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-6">
                                            <div className="rounded-lg border bg-muted/30 p-4">
                                                <p className="mb-2 text-xs font-semibold text-muted-foreground uppercase">
                                                    Evidence Description
                                                </p>
                                                <p className="text-sm text-muted-foreground italic">
                                                    "
                                                    {
                                                        caseData.evidence_description
                                                    }
                                                    "
                                                </p>
                                            </div>
                                            <div>
                                                <EvidenceFilesCard
                                                    case_evidence={
                                                        caseData.case_evidence
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Workflow Tab */}
                            <TabsContent value="workflow" className="mt-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-md">
                                            Workflow Milestones
                                        </CardTitle>
                                        <CardDescription>
                                            Official phase completion records
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {caseData.case_workflow.map(
                                                (wf) => (
                                                    <div
                                                        key={wf.phase}
                                                        className="flex items-center justify-between rounded-lg border border-green-500/20 bg-green-500/5 p-4"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className="rounded-full bg-green-500 p-1.5 text-white">
                                                                <CheckCircle2 className="h-4 w-4" />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-bold">
                                                                    {
                                                                        phaseMap[
                                                                            wf
                                                                                .phase
                                                                        ]
                                                                    }
                                                                </p>
                                                                <p className="text-xs text-muted-foreground">
                                                                    Completed by{' '}
                                                                    {
                                                                        wf
                                                                            .completed_by
                                                                            .first_name
                                                                    }{' '}
                                                                    {
                                                                        wf
                                                                            .completed_by
                                                                            .last_name
                                                                    }{' '}
                                                                    (
                                                                    {
                                                                        wf
                                                                            .completed_by
                                                                            .role
                                                                    }
                                                                    )
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-xs font-medium">
                                                                {format(
                                                                    new Date(
                                                                        wf.completed_at,
                                                                    ),
                                                                    'PPP',
                                                                )}
                                                            </p>
                                                            <p className="text-[10px] text-muted-foreground">
                                                                {format(
                                                                    new Date(
                                                                        wf.completed_at,
                                                                    ),
                                                                    'h:mm a',
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ),
                                            )}
                                            {caseData.case_workflow.length ===
                                                0 && (
                                                <div className="py-12 text-center text-muted-foreground">
                                                    <Briefcase className="mx-auto mb-4 h-12 w-12 opacity-20" />
                                                    <p>
                                                        Workflow has not started
                                                        yet
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
}

function DetailItem({
    label,
    value,
    subValue,
}: {
    label: string;
    value: string;
    subValue?: string;
}) {
    return (
        <div className="space-y-1">
            <p className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                {label}
            </p>
            <p className="text-sm font-medium">{value}</p>
            {subValue && (
                <p className="text-xs text-muted-foreground">{subValue}</p>
            )}
        </div>
    );
}
