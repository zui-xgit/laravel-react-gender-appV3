import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Hint } from '@/components/hint';
import { Head } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import {
    EscalationView,
    IntakeView,
    InvestigationView,
    ResolutionView,
    STEPS,
} from '@/components/workflow';
import Heading from '@/components/heading';

const CaseWorkFlow = () => {
    return (
        <div className="px-4 py-6 font-sans md:px-8">
            <Head title="Case Workflow" />

            {/* ── Page Header ── */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                    <Hint content="Go Back">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-9 w-9 shrink-0 rounded-full border-none shadow-sm ring-1 ring-border"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                    </Hint>
                    <Heading
                        variant="small"
                        title="Case:    PS-2026-08-21-XTFQU"
                        description="Assigned to Bernard"
                    />
                </div>
            </div>

            {/* ── Main Grid ── */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                {/* ── LEFT: Work Area with Tabs ── */}
                <div className="lg:col-span-9">
                    <Tabs defaultValue="intake" className="flex flex-col gap-8">
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
                                        className="flex h-11 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg px-2 py-2 transition-all data-[state=active]:bg-background data-[state=active]:shadow-sm"
                                    >
                                        <div className="flex items-center gap-1.5">
                                            <Icon className="h-3.5 w-3.5" />
                                            <span className="hidden text-xs font-semibold sm:block">
                                                {step.shortLabel}
                                            </span>
                                        </div>
                                        <span className="hidden text-[9px] font-medium tracking-wide text-muted-foreground uppercase md:block">
                                            {step.desc}
                                        </span>
                                    </TabsTrigger>
                                    // </Hint>
                                );
                            })}
                        </TabsList>

                        {/* Tab Content Card */}
                        <TabsContent value="intake" className="mt-0">
                            <IntakeView />
                        </TabsContent>
                        <TabsContent value="investigation" className="mt-0">
                            <InvestigationView />
                        </TabsContent>
                        <TabsContent value="escalation" className="mt-0">
                            <EscalationView />
                        </TabsContent>
                        <TabsContent value="resolution" className="mt-0">
                            <ResolutionView />
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

interface CaseWorkFlowLayout {
    case_id: string;
    from_page: string;
    from_url: URL;
}
CaseWorkFlow.layout = ({
    case_id,
    from_page,
    from_url,
}: CaseWorkFlowLayout) => {
    console.log(case_id);
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
