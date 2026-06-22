import { Head } from '@inertiajs/react';
import { usePDF } from '@react-pdf/renderer';
import {
    AlertCircle,
    CheckCircle2,
    Clock,
    Download,
    FileText,
    Paperclip,
    ShieldCheck,
    User,
    UserPlus,
} from 'lucide-react';
import { useState } from 'react';
import BackButton from '@/components/back-button';
import AssignModal from '@/components/dialogs/assign-case-dialog';
import EvidenceFilesCard from '@/components/evidence-files-card';
import CaseDetailPDF from '@/components/pdf/case-detail-pdf';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { formatDate, formatTime } from '@/lib/helpers';
import type { PendingCase, CaseDetail } from '@/types/types';

interface User {
    uuid: string;
    first_name: string;
    last_name: string;
    roles: string[];
}

interface ViewCaseProps {
    case_detail: CaseDetail;
    all_users: User[];
}

const ViewCase = ({ case_detail, all_users }: ViewCaseProps) => {
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [selectedCase, setSelectedCase] = useState<PendingCase | null>(null);
    const [instance] = usePDF({
        document: <CaseDetailPDF caseData={case_detail} />,
    });

    const statusColors = {
        pending:
            'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400',
        completed:
            'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400',
        in_progress:
            'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400',
    };

    const statusIcons = {
        pending: Clock,
        completed: CheckCircle2,
        in_progress: AlertCircle,
    };

    const StatusIcon = statusIcons[case_detail.status] || AlertCircle;

    const handleAssignToOfficer = () => {
        setSelectedCase(case_detail);
        setIsAssignModalOpen(true);
    };

    return (
        <>
            <Head title={`Case ${case_detail.case_tracking_id}`} />

            <div className="flex flex-col gap-8 px-4 py-6 md:px-8">
                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-2">
                        <BackButton />
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <h2 className="text-xl font-semibold tracking-tight text-primary">
                                    Case:{' '}
                                    <span className="text-blue-600">
                                        {case_detail.case_tracking_id}
                                    </span>
                                </h2>
                                <Badge
                                    variant="outline"
                                    className={`gap-1.5 px-3 py-1 text-xs font-bold capitalize ${statusColors[case_detail.status]}`}
                                >
                                    <StatusIcon className="h-3.5 w-3.5" />
                                    {case_detail.status.replace('_', ' ')}
                                </Badge>
                            </div>
                            <p className="text-sm font-medium text-muted-foreground">
                                Reported on{' '}
                                <span className="text-foreground">
                                    {formatDate(case_detail.created_at)}
                                </span>{' '}
                                at{' '}
                                <span className="text-foreground">
                                    {formatTime(case_detail.created_at)}
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Button
                            asChild
                            variant="outline"
                            disabled={instance.loading}
                            className="cursor-pointer border-blue-200 bg-blue-50/50 font-bold text-blue-700 hover:bg-blue-100 dark:border-blue-900/30 dark:bg-blue-900/20 dark:text-blue-400"
                        >
                            <a
                                href={instance.url || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {instance.loading ? (
                                    <Spinner />
                                ) : (
                                    <Download className="mr-2 h-4 w-4" />
                                )}
                                View Document PDF
                            </a>
                        </Button>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {/* Case Summary Card */}
                    <Card className="overflow-hidden border-none shadow-sm ring-1 ring-border/50">
                        <CardHeader className="bg-muted/30">
                            <CardTitle className="flex items-center gap-2 text-base font-bold">
                                <FileText className="h-4 w-4 text-blue-600" />
                                Case Summary
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-5 pt-6">
                            <DetailItem
                                label="Tracking Identifier"
                                value={case_detail.case_tracking_id}
                                className="rounded-lg border border-blue-100/50 bg-blue-50/30 p-3 dark:border-blue-800/30 dark:bg-blue-900/10"
                            />
                            <DetailItem
                                label="Anonymity Status"
                                value={
                                    case_detail.is_anonymous
                                        ? 'Anonymous Submission'
                                        : 'Identified Submission'
                                }
                                icon={
                                    case_detail.is_anonymous ? (
                                        <ShieldCheck className="h-4 w-4 text-emerald-600" />
                                    ) : (
                                        <User className="h-4 w-4 text-blue-600" />
                                    )
                                }
                            />
                            <DetailItem
                                label="System Status"
                                value={case_detail.status
                                    .toUpperCase()
                                    .replace('_', ' ')}
                            />
                        </CardContent>
                    </Card>

                    {/* Officer Assignment Card */}
                    <Card className="overflow-hidden border-none shadow-sm ring-1 ring-border/50">
                        <CardHeader className="bg-muted/30">
                            <CardTitle className="flex items-center gap-2 text-base font-bold">
                                <UserPlus className="h-4 w-4 text-blue-600" />
                                Personnel Assignment
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            {case_detail.case_assignment ? (
                                <div className="grid gap-5">
                                    <DetailItem
                                        label="Assigned Personnel"
                                        value={`${case_detail.case_assignment.assigned_to.first_name} ${case_detail.case_assignment.assigned_to.last_name}`}
                                    />
                                    <DetailItem
                                        label="Personnel Designation"
                                        value={
                                            <>
                                                [
                                                {case_detail.case_assignment.assigned_to.roles.join(
                                                    ', ',
                                                )}
                                                ]
                                            </>
                                        }
                                    />
                                    <div className="flex items-center justify-between border-t border-border/50 pt-4">
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase">
                                            Priority Level
                                        </p>
                                        <Badge
                                            variant="secondary"
                                            className="font-black"
                                        >
                                            {
                                                case_detail.case_assignment
                                                    .priority
                                            }
                                        </Badge>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-6 text-center">
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 dark:bg-amber-900/20">
                                        <AlertCircle className="h-6 w-6 text-amber-600" />
                                    </div>
                                    <h3 className="text-sm font-bold">
                                        Needs Assignment
                                    </h3>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        No officer has been assigned to this
                                        case yet.
                                    </p>
                                    <Button
                                        className="mt-4 w-full gap-2 font-bold"
                                        size="sm"
                                        onClick={() => handleAssignToOfficer()}
                                    >
                                        <UserPlus className="h-3.5 w-3.5" />
                                        Assign Now
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Evidencep FILES Card */}

                <Card className="overflow-hidden border-none shadow-sm ring-1 ring-border/50">
                    <CardHeader className="bg-muted/30">
                        <CardTitle className="flex items-center gap-2 text-base font-bold">
                            <Paperclip className="h-4 w-4 text-blue-600" />
                            Case Evidence & Attachments
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <EvidenceFilesCard
                            case_evidence={case_detail.case_evidence}
                        />
                    </CardContent>
                </Card>
            </div>

            <AssignModal
                isOpen={isAssignModalOpen}
                onClose={() => setIsAssignModalOpen(false)}
                selectedCase={selectedCase}
                all_users={all_users}
            />
        </>
    );
};

const DetailItem = ({
    label,
    value,
    icon,
    className = '',
}: {
    label: string;
    value: React.ReactNode;
    icon?: React.ReactNode;
    className?: string;
}) => (
    <div className={`space-y-1.5 ${className}`}>
        <p className="text-[10px] font-black tracking-widest text-muted-foreground/80 uppercase">
            {label}
        </p>
        <div className="flex items-center gap-2">
            {icon && <span className="text-blue-600/70">{icon}</span>}
            <span className="text-sm font-bold text-foreground">
                {value || 'N/A'}
            </span>
        </div>
    </div>
);

export default ViewCase;

ViewCase.layout = ({
    from_page,
    from_url,
}: {
    from_page: string;
    from_url: string;
}) => {
    return {
        breadcrumbs: [
            {
                title: from_page,
                href: from_url,
            },
            {
                title: 'View Case',
                href: '#',
            },
        ],
    };
};
