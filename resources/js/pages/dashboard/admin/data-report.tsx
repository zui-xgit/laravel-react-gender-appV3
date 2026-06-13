import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import admin from '@/routes/admin';
import { Head } from '@inertiajs/react';
import {
    Calendar,
    CalendarDays,
    CalendarRange,
    FileText,
    Printer,
    Settings2,
} from 'lucide-react';
import { useState } from 'react';

const DataReport = () => {
    const [selectedReportType, setSelectedReportType] = useState('general');

    const reportCategories = [
        {
            id: 'general',
            title: 'General Case Summary',
            description:
                'A comprehensive overview of all cases, status distributions, and recent trends.',
        },
        {
            id: 'incidents',
            title: 'Incident Type Analysis',
            description:
                'Detailed breakdown of reported incident types and their frequencies across locations.',
        },
        {
            id: 'staff',
            title: 'Staff Activity Log',
            description:
                'Records of officer assignments, case updates, and administrative actions.',
        },
        {
            id: 'demographics',
            title: 'Demographic Statistics',
            description:
                'Analysis of victim and accused demographics including age, gender, and regional data.',
        },
    ];

    return (
        <>
            <Head title="Data Reports Hub" />

            <div className="flex flex-col gap-8 px-4 py-6 md:px-8">
                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                    <Heading
                        title="Reporting Center"
                        description="Configure and generate official data reports for the platform."
                    />
                </div>

                {/* 1. Select Report Category */}
                <div className="grid gap-6">
                    <div className="flex items-center gap-2 px-1">
                        <Settings2 className="h-5 w-5 text-muted-foreground" />
                        <h3 className="text-lg font-semibold tracking-tight">
                            1. Select Report Category
                        </h3>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {reportCategories.map((report) => (
                            <Card
                                key={report.id}
                                className={`group relative cursor-pointer overflow-hidden transition-all duration-200 hover:ring-2 hover:ring-primary/20 ${
                                    selectedReportType === report.id
                                        ? 'border-none bg-primary/5 shadow-sm ring-2 ring-primary'
                                        : 'border-none bg-card shadow-sm ring-1 ring-border'
                                }`}
                                onClick={() => setSelectedReportType(report.id)}
                            >
                                <CardHeader className="pb-3">
                                    <div
                                        className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                                            selectedReportType === report.id
                                                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                                                : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
                                        }`}
                                    >
                                        <FileText className="h-5 w-5" />
                                    </div>
                                    <CardTitle className="text-sm leading-tight font-bold">
                                        {report.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="line-clamp-2 text-xs leading-relaxed">
                                        {report.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* 2. Choose Reporting Period */}
                <div className="grid gap-6">
                    <div className="flex items-center gap-2 px-1">
                        <CalendarRange className="h-5 w-5 text-muted-foreground" />
                        <h3 className="text-lg font-semibold tracking-tight">
                            2. Choose Reporting Period
                        </h3>
                    </div>

                    <div className="flex flex-col gap-4">
                        {/* Daily Report */}
                        <Card className="overflow-hidden border-none bg-card shadow-sm ring-1 ring-border transition-colors hover:bg-accent/5">
                            <div className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between">
                                <div className="flex flex-1 items-start gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                        <Calendar className="h-5 w-5" />
                                    </div>
                                    <div className="space-y-1">
                                        <CardTitle className="text-base font-semibold">
                                            Daily Report
                                        </CardTitle>
                                        <CardDescription className="text-xs">
                                            Generate a report for a specific
                                            calendar day.
                                        </CardDescription>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-4 sm:flex-row sm:items-center">
                                    <div className="w-full space-y-1.5 sm:w-[200px]">
                                        <label className="px-1 text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                                            Target Date
                                        </label>
                                        <input
                                            type="date"
                                            className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:outline-none"
                                            defaultValue="2026-06-13"
                                        />
                                    </div>
                                    <Button className="h-10 cursor-pointer gap-2 px-6 shadow-lg shadow-primary/10">
                                        <Printer className="h-4 w-4" />{' '}
                                        <span>Print Daily Report</span>
                                    </Button>
                                </div>
                            </div>
                        </Card>

                        {/* Monthly Report */}
                        <Card className="overflow-hidden border-none bg-card shadow-sm ring-1 ring-border transition-colors hover:bg-accent/5">
                            <div className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between">
                                <div className="flex flex-1 items-start gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                        <CalendarDays className="h-5 w-5" />
                                    </div>
                                    <div className="space-y-1">
                                        <CardTitle className="text-base font-semibold">
                                            Monthly Report
                                        </CardTitle>
                                        <CardDescription className="text-xs">
                                            Aggregate platform activity for a
                                            full calendar month.
                                        </CardDescription>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-4 sm:flex-row sm:items-center">
                                    <div className="w-full space-y-1.5 sm:w-[150px]">
                                        <label className="px-1 text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                                            Month
                                        </label>
                                        <Select defaultValue="6">
                                            <SelectTrigger className="h-10 rounded-lg">
                                                <SelectValue placeholder="Month" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {[
                                                    'January',
                                                    'February',
                                                    'March',
                                                    'April',
                                                    'May',
                                                    'June',
                                                    'July',
                                                    'August',
                                                    'September',
                                                    'October',
                                                    'November',
                                                    'December',
                                                ].map((m, i) => (
                                                    <SelectItem
                                                        key={m}
                                                        value={(
                                                            i + 1
                                                        ).toString()}
                                                    >
                                                        {m}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="w-full space-y-1.5 sm:w-[120px]">
                                        <label className="px-1 text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                                            Year
                                        </label>
                                        <Select defaultValue="2026">
                                            <SelectTrigger className="h-10 rounded-lg">
                                                <SelectValue placeholder="Year" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="2024">
                                                    2024
                                                </SelectItem>
                                                <SelectItem value="2025">
                                                    2025
                                                </SelectItem>
                                                <SelectItem value="2026">
                                                    2026
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <Button className="h-10 cursor-pointer gap-2 px-6 shadow-lg shadow-primary/10">
                                        <Printer className="h-4 w-4" />{' '}
                                        <span>Print Monthly Report</span>
                                    </Button>
                                </div>
                            </div>
                        </Card>

                        {/* Yearly Report */}
                        <Card className="overflow-hidden border-none bg-card shadow-sm ring-1 ring-border transition-colors hover:bg-accent/5">
                            <div className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between">
                                <div className="flex flex-1 items-start gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                        <CalendarRange className="h-5 w-5" />
                                    </div>
                                    <div className="space-y-1">
                                        <CardTitle className="text-base font-semibold">
                                            Yearly Report
                                        </CardTitle>
                                        <CardDescription className="text-xs">
                                            Summary of all platform data for the
                                            entire year.
                                        </CardDescription>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-4 sm:flex-row sm:items-center">
                                    <div className="w-full space-y-1.5 sm:w-[120px]">
                                        <label className="px-1 text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                                            Select Year
                                        </label>
                                        <Select defaultValue="2026">
                                            <SelectTrigger className="h-10 rounded-lg">
                                                <SelectValue placeholder="Year" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="2024">
                                                    2024
                                                </SelectItem>
                                                <SelectItem value="2025">
                                                    2025
                                                </SelectItem>
                                                <SelectItem value="2026">
                                                    2026
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <Button className="h-10 cursor-pointer gap-2 px-6 shadow-lg shadow-primary/10">
                                        <Printer className="h-4 w-4" />{' '}
                                        <span>Print Yearly Report</span>
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="rounded-xl border border-primary/10 bg-primary/5 p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <Settings2 className="h-5 w-5" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-semibold text-primary">
                                Automatic Report Validation
                            </p>
                            <p className="max-w-2xl text-xs text-muted-foreground">
                                Reports are digitally signed and timestamped for
                                authenticity.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

DataReport.layout = {
    breadcrumbs: [{ title: 'Report', href: admin.report() }],
};

export default DataReport;
