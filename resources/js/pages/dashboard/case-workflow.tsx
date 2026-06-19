import { Head } from '@inertiajs/react';
import { ChevronRight, Clock } from 'lucide-react';
import BackButton from '@/components/back-button';
import type { IntRange } from '@/components/case-progress-bar';
import CaseProgressBar from '@/components/case-progress-bar';
import Heading from '@/components/heading';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    EscalationView,
    IntakeView,
    InvestigationView,
    ResolutionView,
    STEPS,
} from '@/components/workflow';

interface CaseWorkFlowProps {
    case_uuid: string;
    case_tracking_id: string;
    from_page: string;
    from_url: URL;
    caseWorkflowPercentage: IntRange<0, 100>;
    intake: {
        intake_data: {
            checklist: {
                identity: boolean;
                jurisdiction: boolean;
                safety: boolean;
            };
            observations: string;
        } | null;
        case_evidence: {
            uuid: string;
            file_name: string;
            file_type: string;
            created_at: string;
        }[];
    };
    investigation_data: {
        subjectName: string;
        relationship: string;
        summary: string;
    } | null;
    escalation_data: {
        targetUnit: string;
        reason: string;
        notes: string;
    } | null;
    resolution_data: {
        coordinatorName: string;
        phone: string;
        comment: string;
        date: string;
        time: string;
    } | null;
}

const CaseWorkFlow = ({
    case_uuid,
    case_tracking_id,
    intake,
    investigation_data,
    escalation_data,
    resolution_data,
    caseWorkflowPercentage,
}: CaseWorkFlowProps) => {
    return (
        <div className="px-4 py-6 font-sans md:px-8">
            <Head title="Case Workflow" />
            {/* ── Page Header ── */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                    <BackButton />
                    <Heading
                        variant="small"
                        title={case_tracking_id}
                        description="Assigned to You"
                    />
                </div>
            </div>
            {/* case progress bar */}
            <div className="mb-8 md:flex md:items-center md:justify-end">
                <div className="flex flex-col md:w-[50%]">
                    <span>Case Progress</span>
                    <CaseProgressBar progress={caseWorkflowPercentage} />
                </div>
            </div>
            {/* ── Main Grid ── */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                {/* ── LEFT: Work Area with Tabs ── */}
                <div className="lg:col-span-9">
                    <Tabs defaultValue="intake" className="flex flex-col">
                        <TabsList
                            variant={'line'}
                            className="grid h-auto w-full grid-cols-4 rounded-xl"
                        >
                            {STEPS.map((step, index) => {
                                const Icon = step.icon;

                                return (
                                    // <Hint content={step.hint}>
                                    <TabsTrigger
                                        key={index}
                                        value={step.id}
                                        className="flex h-auto cursor-pointer items-center justify-center gap-1 rounded-lg px-2 py-1 transition-all data-[state=active]:bg-background data-[state=active]:shadow-sm"
                                    >
                                        <div className="flex items-center gap-1.5">
                                            <Icon className="h-3.5 w-3.5" />
                                            <span className="hidden text-xs font-semibold sm:block">
                                                {step.shortLabel}
                                            </span>
                                        </div>
                                    </TabsTrigger>
                                    // </Hint>
                                );
                            })}
                        </TabsList>

                        {/* Tab Content Card */}
                        <TabsContent value="intake" className="mt-0">
                            <IntakeView case_uuid={case_uuid} intake={intake} />
                        </TabsContent>
                        <TabsContent value="investigation" className="mt-0">
                            <InvestigationView
                                case_uuid={case_uuid}
                                investigation_data={investigation_data}
                            />
                        </TabsContent>
                        <TabsContent value="escalation" className="mt-0">
                            <EscalationView
                                case_uuid={case_uuid}
                                escalation_data={escalation_data}
                            />
                        </TabsContent>
                        <TabsContent value="resolution" className="mt-0">
                            <ResolutionView
                                case_uuid={case_uuid}
                                resolution_data={resolution_data}
                            />
                        </TabsContent>
                    </Tabs>
                </div>

                {/* ── RIGHT: Compact Sidebar ── */}
                <div className="space-y-4 lg:col-span-3">
                    {/* Lifecycle / Next Step */}
                    <Card className="overflow-hidden border-none shadow-md ring-1 ring-border">
                        <div className="flex items-center gap-2 border-b bg-muted/30 px-4 py-3">
                            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-[10px] font-bold tracking-widest uppercase">
                                Case Lifecycle
                            </span>
                        </div>
                        <CardContent className="space-y-3 p-4">
                            {/* Latest event */}
                            <div className="flex gap-3">
                                <div className="relative flex flex-col items-center pt-0.5">
                                    <div className="h-2 w-2 rounded-full bg-green-500 ring-4 ring-green-100 dark:ring-green-900/30" />
                                    <div className="mt-1 h-full w-px bg-border" />
                                </div>
                                <div className="pb-3">
                                    <p className="text-[11px] font-semibold text-foreground">
                                        Intake Phase Completed
                                    </p>
                                    <p className="mt-0.5 text-[10px] text-muted-foreground">
                                        Today at 09:00 AM · Bernard
                                    </p>
                                </div>
                            </div>

                            <Button className="h-10 w-full text-sm font-bold tracking-wide">
                                Next Phase
                                <ChevronRight className="ml-1.5 h-4 w-4" />
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CaseWorkFlow;

CaseWorkFlow.layout = ({ from_page, from_url }: CaseWorkFlowProps) => {
    // console.log(case_id);
    return {
        breadcrumbs: [
            {
                title: from_page,
                href: from_url,
            },
            {
                title: 'Case Workflow',
                href: '',
            },
        ],
    };
};
