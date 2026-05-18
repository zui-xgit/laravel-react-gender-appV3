import AssignModal from '@/components/dialogs/assign-case-dialog';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatDate, formatTime } from '@/lib/utils';
import { adminPending, adminViewCase } from '@/routes';
import { PendingCase, ViewCaseDetail } from '@/types/types';
import { Head, usePage } from '@inertiajs/react';
import {
    AlertCircle,
    CheckCircle2,
    Clock,
    FileText,
    MapPin,
    Phone,
    Printer,
    ShieldCheck,
    User,
    UserPlus,
} from 'lucide-react';
import { useState } from 'react';

interface ViewCaseProps {
    caseData: ViewCaseDetail;
}

const ViewCase = ({ caseData }: ViewCaseProps) => {
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [selectedCase, setSelectedCase] = useState<PendingCase | null>(null);

    const handlePrint = () => {
        // window.print();
    };

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

    const StatusIcon = statusIcons[caseData.status] || AlertCircle;

    const handleAssignToOfficer = () => {
        setSelectedCase(caseData);
        setIsAssignModalOpen(true);
    };

    return (
        <>
            <Head title={`Case ${caseData.case_tracking_id}`} />

            <div className="flex flex-col gap-8 px-4 py-6 md:px-8">
                {/* Header Section */}
                <div className="flex flex-col gap-4 border-b border-border/60 pb-6 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <Heading
                                title={`Case: ${caseData.case_tracking_id}`}
                                description={`Reported on ${formatDate(caseData.created_at)} at ${formatTime(caseData.created_at)}`}
                                variant="default"
                            />
                            <Badge
                                variant="outline"
                                className={`gap-1.5 px-3 py-1 capitalize ${statusColors[caseData.status]}`}
                            >
                                <StatusIcon className="h-3.5 w-3.5" />
                                {caseData.status.replace('_', ' ')}
                            </Badge>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            onClick={handlePrint}
                            className="cursor-pointer"
                        >
                            <Printer className="mr-2 h-4 w-4" />
                            Print / Save PDF
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue="overview" className="w-full">
                    <TabsList
                        variant="line"
                        className="mb-3 grid h-auto grid-cols-5 gap-3 rounded-none border-b bg-transparent p-0"
                    >
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="incident">
                            Incident Details
                        </TabsTrigger>
                        <TabsTrigger value="victim">Victim Info</TabsTrigger>
                        <TabsTrigger value="accused">Accused Info</TabsTrigger>
                        {!caseData.is_anonymous && (
                            <TabsTrigger value="informant">
                                Informant Info
                            </TabsTrigger>
                        )}
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            <Card className="shadow-xs">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                                        <FileText className="h-5 w-5 text-muted-foreground" />
                                        Case Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-6">
                                    <DetailItem
                                        label="Tracking ID"
                                        value={caseData.case_tracking_id}
                                    />
                                    <DetailItem
                                        label="Reporting Type"
                                        value={
                                            caseData.is_anonymous
                                                ? 'Anonymous Report'
                                                : 'Identified Report'
                                        }
                                        icon={
                                            caseData.is_anonymous ? (
                                                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                                            ) : null
                                        }
                                    />
                                    <DetailItem
                                        label="Submission Date"
                                        value={`${formatDate(caseData.created_at)} ${formatTime(caseData.created_at)}`}
                                    />
                                </CardContent>
                            </Card>

                            <Card className="shadow-xs">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                                        <User className="h-5 w-5 text-muted-foreground" />
                                        Assignment Details
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-6">
                                    {caseData.case_assignment ? (
                                        <>
                                            <DetailItem
                                                label="Assigned To"
                                                value={`${caseData.case_assignment.assigned_to.first_name} ${caseData.case_assignment.assigned_to.last_name}`}
                                            />
                                            <DetailItem
                                                label="Officer Role"
                                                value={
                                                    caseData.case_assignment
                                                        .assigned_to.role
                                                }
                                            />
                                            <DetailItem
                                                label="Assigned By"
                                                value={`${caseData.case_assignment.assigned_by.first_name} ${caseData.case_assignment.assigned_by.last_name}`}
                                            />
                                            <DetailItem
                                                label="Priority"
                                                value={
                                                    <Badge variant="secondary">
                                                        {
                                                            caseData
                                                                .case_assignment
                                                                .priority
                                                        }
                                                    </Badge>
                                                }
                                            />
                                        </>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-10 text-center">
                                            {/* Icon with a subtle background ring */}
                                            <div className="mb-4 rounded-full bg-muted p-3">
                                                <AlertCircle className="h-8 w-8 text-muted-foreground/60" />
                                            </div>

                                            <div className="max-w-[250px] space-y-2">
                                                <h3 className="text-lg font-semibold tracking-tight">
                                                    Case Unassigned
                                                </h3>
                                                <p className="text-sm text-muted-foreground">
                                                    This case has not been
                                                    assigned to an officer yet.
                                                    Assign it now to begin the
                                                    investigation.
                                                </p>
                                            </div>

                                            {/* Primary Action */}
                                            <Button
                                                className="mt-6 gap-2"
                                                size="sm"
                                                onClick={() =>
                                                    handleAssignToOfficer()
                                                }
                                            >
                                                <UserPlus className="h-4 w-4" />
                                                Assign to Officer
                                            </Button>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Incident Tab */}
                    <TabsContent value="incident">
                        <Card className="shadow-xs">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold">
                                    Incident Report Details
                                </CardTitle>
                                <CardDescription>
                                    Detailed account of the reported incident.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-8">
                                <div className="grid gap-6 md:grid-cols-2">
                                    <DetailItem
                                        label="Incident Type"
                                        value={
                                            caseData.incident_detail
                                                .incident_type
                                        }
                                    />
                                    <DetailItem
                                        label="Location"
                                        value={
                                            caseData.incident_detail.location
                                        }
                                        icon={<MapPin className="h-4 w-4" />}
                                    />
                                    <DetailItem
                                        label="Date & Time"
                                        value={`${caseData.incident_detail.date} at ${caseData.incident_detail.time}`}
                                    />
                                    <DetailItem
                                        label="Exact Location"
                                        value={
                                            caseData.incident_detail
                                                .exact_location
                                        }
                                    />
                                </div>
                                <div className="space-y-6 border-t border-border/50 pt-6">
                                    <TextAreaDetail
                                        label="Incident Description"
                                        value={
                                            caseData.incident_detail.description
                                        }
                                    />
                                    <TextAreaDetail
                                        label="Cause of Incident"
                                        value={caseData.incident_detail.cause}
                                    />
                                    <TextAreaDetail
                                        label="Injuries Sustained"
                                        value={
                                            caseData.incident_detail.injuries
                                        }
                                    />
                                    <TextAreaDetail
                                        label="Actions Taken"
                                        value={
                                            caseData.incident_detail
                                                .actions_taken
                                        }
                                    />
                                    <TextAreaDetail
                                        label="Assistance Needed"
                                        value={
                                            caseData.incident_detail
                                                .assistance_needed
                                        }
                                    />
                                    <TextAreaDetail
                                        label="Others Involved"
                                        value={
                                            caseData.incident_detail
                                                .other_involved
                                        }
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Victim Tab */}
                    <TabsContent value="victim">
                        <Card className="shadow-xs">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold">
                                    Victim Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">
                                    <DetailItem
                                        label="Full Name"
                                        value={caseData.victim_detail.name}
                                    />
                                    <DetailItem
                                        label="Sex"
                                        value={
                                            caseData.victim_detail.sex || 'N/A'
                                        }
                                    />
                                    <DetailItem
                                        label="Age"
                                        value={
                                            caseData.victim_detail.age?.toString() ||
                                            'N/A'
                                        }
                                    />
                                    <DetailItem
                                        label="Phone"
                                        value={caseData.victim_detail.phone}
                                        icon={<Phone className="h-4 w-4" />}
                                    />
                                    <DetailItem
                                        label="Email"
                                        value={caseData.victim_detail.email}
                                    />
                                    <DetailItem
                                        label="Education"
                                        value={caseData.victim_detail.education}
                                    />
                                    <DetailItem
                                        label="Residence"
                                        value={caseData.victim_detail.residence}
                                    />
                                    <DetailItem
                                        label="Workplace"
                                        value={caseData.victim_detail.workplace}
                                    />
                                    <DetailItem
                                        label="Disability"
                                        value={
                                            caseData.victim_detail.disability ||
                                            'None'
                                        }
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Accused Tab */}
                    <TabsContent value="accused">
                        <Card className="shadow-xs">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold">
                                    Accused Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">
                                    <DetailItem
                                        label="Full Name"
                                        value={caseData.accused_detail.name}
                                    />
                                    <DetailItem
                                        label="Sex"
                                        value={
                                            caseData.accused_detail.sex || 'N/A'
                                        }
                                    />
                                    <DetailItem
                                        label="Age"
                                        value={
                                            caseData.accused_detail.age?.toString() ||
                                            'N/A'
                                        }
                                    />
                                    <DetailItem
                                        label="Phone"
                                        value={caseData.accused_detail.phone}
                                        icon={<Phone className="h-4 w-4" />}
                                    />
                                    <DetailItem
                                        label="Residence"
                                        value={
                                            caseData.accused_detail.residence
                                        }
                                    />
                                    <DetailItem
                                        label="Workplace"
                                        value={
                                            caseData.accused_detail.workplace
                                        }
                                    />
                                    <DetailItem
                                        label="Education"
                                        value={
                                            caseData.accused_detail.education
                                        }
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Informant Tab */}
                    {!caseData.is_anonymous && (
                        <TabsContent value="informant">
                            <Card className="shadow-xs">
                                <CardHeader>
                                    <CardTitle className="text-lg font-semibold">
                                        Informant Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">
                                        <DetailItem
                                            label="Full Name"
                                            value={
                                                caseData.informant_detail.name
                                            }
                                        />
                                        <DetailItem
                                            label="Title / Position"
                                            value={
                                                caseData.informant_detail.title
                                            }
                                        />
                                        <DetailItem
                                            label="Sex"
                                            value={
                                                caseData.informant_detail.sex ||
                                                'N/A'
                                            }
                                        />
                                        <DetailItem
                                            label="Age"
                                            value={
                                                caseData.informant_detail.age?.toString() ||
                                                'N/A'
                                            }
                                        />
                                        <DetailItem
                                            label="Phone"
                                            value={
                                                caseData.informant_detail.phone
                                            }
                                            icon={<Phone className="h-4 w-4" />}
                                        />
                                        <DetailItem
                                            label="Workplace"
                                            value={
                                                caseData.informant_detail
                                                    .workplace
                                            }
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    )}
                </Tabs>
            </div>

            <AssignModal
                isOpen={isAssignModalOpen}
                onClose={() => setIsAssignModalOpen(false)}
                selectedCase={selectedCase}
            />
        </>
    );
};

const DetailItem = ({
    label,
    value,
    icon,
}: {
    label: string;
    value: React.ReactNode;
    icon?: React.ReactNode;
}) => (
    <div className="space-y-1.5">
        <p className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
            {label}
        </p>
        <div className="flex items-center gap-2">
            {icon && <span className="text-muted-foreground/70">{icon}</span>}
            <span className="text-sm font-medium text-foreground">
                {value || 'N/A'}
            </span>
        </div>
    </div>
);

const TextAreaDetail = ({ label, value }: { label: string; value: string }) => (
    <div className="space-y-2">
        <p className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
            {label}
        </p>
        <div className="rounded-lg border border-border/40 bg-muted/30 p-4 text-sm leading-relaxed whitespace-pre-wrap text-foreground/90">
            {value || (
                <span className="text-muted-foreground/60 italic">
                    No information provided.
                </span>
            )}
        </div>
    </div>
);

export default ViewCase;

interface ViewCaseLayout {
    caseData: ViewCaseDetail;
    from_page: string;
    from_url: URL;
}

ViewCase.layout = ({ caseData, from_page, from_url }: ViewCaseLayout) => {
    return {
        breadcrumbs: [
            {
                title: from_page,
                href: from_url,
            },
            {
                title: 'View Case',
                href: adminViewCase({ case: caseData.uuid }),
            },
        ],
    };
};
