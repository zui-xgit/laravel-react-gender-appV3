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
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import admin from '@/routes/admin';
import { Head, router, usePage } from '@inertiajs/react';
import {
    AlertCircle,
    CalendarIcon,
    CalendarRange,
    CheckCircle2,
    Clock,
    Download,
    Eye,
    FileText,
    Loader2,
    RotateCw,
    Search,
    Settings2,
    User,
    Users,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { UsePageProps } from '@/types/types';
import { Badge } from '@/components/ui/badge';

interface DatePickerFieldProps {
    label: string;
    dateValue: string;
    placeholder: string;
    onChange: (date: string) => void;
}

interface DataReportProps {
    summary: {
        total: number;
        pending: number;
        in_progress: number;
        completed: number;
    } | null;
    from_date?: string;
    to_date?: string;
    scope?: 'general' | 'personnel';
    selected_personnel_uuid?: string;
    users: {
        uuid: string;
        full_name: string;
        role: string;
    }[];
}

const safeFormat = (
    dateString: string | null | undefined,
    formatStr: string = 'PP',
) => {
    if (!dateString) return '...';
    const parsed = new Date(dateString);
    return isNaN(parsed.getTime()) ? '...' : format(parsed, formatStr);
};

const DatePickerField = ({
    label,
    dateValue,
    placeholder,
    onChange,
}: DatePickerFieldProps) => {
    return (
        <div className="flex flex-1 flex-col space-y-1.5">
            <label className="px-1 text-[10px] font-bold tracking-widest text-foreground uppercase">
                {label}
            </label>
            <Popover>
                <PopoverTrigger asChild className="cursor-pointer">
                    <Button
                        variant="outline"
                        className="h-11 w-full justify-start rounded-xl border-input bg-background px-3 text-left text-sm font-normal shadow-xs transition-all hover:bg-accent/30 focus:ring-2 focus:ring-primary/20"
                    >
                        <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground/80" />
                        {dateValue && !isNaN(new Date(dateValue).getTime()) ? (
                            safeFormat(dateValue, 'PPP')
                        ) : (
                            <span>{placeholder}</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto rounded-xl p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={
                            dateValue && !isNaN(new Date(dateValue).getTime())
                                ? new Date(dateValue)
                                : undefined
                        }
                        onSelect={(date) => {
                            const formattedDate = date
                                ? format(date, 'yyyy-MM-dd')
                                : '';
                            onChange(formattedDate);
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
};

const Report = ({
    summary,
    from_date,
    to_date,
    users,
    scope,
    selected_personnel_uuid,
}: DataReportProps) => {
    const [reportScope, setReportScope] = useState<'general' | 'personnel'>(
        scope || 'general',
    );
    const [selectedPersonnel, setSelectedPersonnel] = useState<string>(
        selected_personnel_uuid || '',
    );

    const [fromDate, setFromDate] = useState<string>(from_date || '');
    const [toDate, setToDate] = useState<string>(to_date || '');
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const { auth } = usePage<UsePageProps>().props;

    const handleProceed = () => {
        if (!fromDate || !toDate) {
            toast.error('Choose the date range');
            return;
        }

        if (reportScope === 'personnel' && !selectedPersonnel) {
            toast.error('Please select personnel');
            return;
        }

        router.get(
            admin.report().url,
            {
                from_date: fromDate,
                to_date: toDate,
                scope: reportScope,
                selected_personnel_uuid: selectedPersonnel,
            },
            {
                preserveScroll: true,
                preserveState: true,
                onStart: () => setIsSearching(true),
                onFinish: () => setIsSearching(false),

                onSuccess: (page) => {
                    const summary = page.props.summary as {
                        total: number;
                    } | null;
                    if (summary && summary.total > 0) {
                        toast.success(
                            `${summary.total} reports found for the selected criteria.`,
                        );
                    } else if (summary) {
                        toast.error('No reports found matching your criteria.');
                    }
                },
            },
        );
    };

    const handleReset = () => {
        setFromDate('');
        setToDate('');
        setSelectedPersonnel('');

        router.get(
            admin.report().url,
            {},
            {
                preserveScroll: true,
                preserveState: true,
                onStart: () => setIsRefreshing(true),
                onFinish: () => setIsRefreshing(false),
            },
        );
    };

    return (
        <>
            <Head title="Data Reports Hub" />

            <div className="flex flex-col gap-8 px-4 py-6 md:px-8">
                <Heading
                    title="Reporting Center"
                    description="Configure and generate multi-scope reports with a refined internal navigation."
                />

                <div className="flex flex-col lg:flex-row lg:space-x-12">
                    {/* Left "Sidebar" Scope Selector */}
                    <aside className="w-full max-w-xl lg:w-48">
                        <div className="mb-4 flex items-center gap-2 px-1">
                            <Settings2 className="h-4 w-4 text-muted-foreground" />
                            <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                                Report Scope
                            </span>
                        </div>
                        <nav
                            className="flex flex-col space-y-1"
                            aria-label="Report Scope"
                        >
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    setReportScope('general');
                                    handleReset();
                                }}
                                className={cn(
                                    'w-full cursor-pointer justify-start gap-2 rounded-lg transition-all',
                                    {
                                        'bg-muted font-semibold text-foreground':
                                            reportScope === 'general',
                                        'text-muted-foreground':
                                            reportScope !== 'general',
                                    },
                                )}
                            >
                                <Users className="h-4 w-4" />
                                General Report
                            </Button>

                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    setReportScope('personnel');
                                    handleReset();
                                }}
                                className={cn(
                                    'w-full cursor-pointer justify-start gap-2 rounded-lg transition-all',
                                    {
                                        'bg-muted font-semibold text-foreground':
                                            reportScope === 'personnel',
                                        'text-muted-foreground':
                                            reportScope !== 'personnel',
                                    },
                                )}
                            >
                                <User className="h-4 w-4" />
                                Personnel Report
                            </Button>
                        </nav>

                        <div className="mt-8 rounded-xl border border-primary/10 bg-primary/5 p-4">
                            <p className="text-[11px] leading-relaxed text-muted-foreground">
                                Use the general scope for platform-wide
                                statistics or narrow down to specific personnel
                                activity.
                            </p>
                        </div>
                    </aside>

                    {/* Main Configuration & Results Area */}
                    <div className="max-w-4xl flex-1 space-y-8">
                        {/* 1. Configuration Section */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 px-1">
                                <CalendarRange className="h-5 w-5 text-muted-foreground" />
                                <h3 className="text-lg font-semibold tracking-tight">
                                    Configuration
                                </h3>
                            </div>

                            <Card className="overflow-hidden border-none bg-card shadow-sm ring-1 ring-border">
                                <CardContent className="space-y-6 p-6">
                                    {/* Admin Selection (Conditional) */}
                                    {reportScope === 'personnel' && (
                                        <div className="animate-in duration-300 fade-in slide-in-from-left-4">
                                            <label className="mb-1.5 block px-1 text-[10px] font-bold tracking-widest text-foreground uppercase">
                                                Select Target Administrator
                                            </label>
                                            <Select
                                                value={selectedPersonnel}
                                                onValueChange={
                                                    setSelectedPersonnel
                                                }
                                            >
                                                <SelectTrigger className="h-11 rounded-xl shadow-xs">
                                                    <SelectValue placeholder="Choose an administrator from the list..." />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-xl">
                                                    {users.map(
                                                        (user, index) => (
                                                            <SelectItem
                                                                key={index}
                                                                value={
                                                                    user.uuid
                                                                }
                                                                className="rounded-lg"
                                                            >
                                                                {`${user.full_name}, Role: ${user.role}`}

                                                                {auth.user
                                                                    .uuid ===
                                                                    user.uuid && (
                                                                    <>
                                                                        <Badge
                                                                            variant="default"
                                                                            className="ml-1.5 border-none bg-emerald-600 text-[10px] font-bold text-white shadow-sm hover:bg-emerald-600"
                                                                        >
                                                                            You
                                                                        </Badge>
                                                                    </>
                                                                )}
                                                            </SelectItem>
                                                        ),
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    )}

                                    {/* Date Range Selection */}
                                    <div className="relative flex flex-col gap-6 pt-4 sm:flex-row">
                                        {(fromDate || toDate) && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                className="absolute -top-6 right-0 h-8 cursor-pointer gap-1.5 rounded-lg text-xs text-muted-foreground transition-all hover:bg-accent"
                                                onClick={handleReset}
                                                disabled={isRefreshing}
                                            >
                                                <RotateCw
                                                    className={cn(
                                                        'h-3.5 w-3.5',
                                                        isRefreshing &&
                                                            'animate-spin',
                                                    )}
                                                />
                                                <span>Reset selection</span>
                                            </Button>
                                        )}
                                        <DatePickerField
                                            label="From Date"
                                            placeholder="Start date"
                                            dateValue={fromDate}
                                            onChange={setFromDate}
                                        />
                                        <DatePickerField
                                            label="To Date"
                                            placeholder="End date"
                                            dateValue={toDate}
                                            onChange={setToDate}
                                        />
                                    </div>

                                    <Button
                                        onClick={handleProceed}
                                        disabled={
                                            !fromDate ||
                                            !toDate ||
                                            isSearching ||
                                            (reportScope === 'personnel' &&
                                                !selectedPersonnel)
                                        }
                                        className="h-11 w-full cursor-pointer rounded-xl font-bold shadow-lg shadow-primary/10 transition-all hover:shadow-xl active:scale-[0.98]"
                                    >
                                        {isSearching ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Analyzing Platform Data...
                                            </>
                                        ) : (
                                            <>
                                                <Search className="mr-2 h-4 w-4" />
                                                Generate Report Summary
                                            </>
                                        )}
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>

                        {/* 2. Results Section */}
                        {summary !== null ? (
                            <div className="animate-in duration-500 fade-in slide-in-from-top-4">
                                <Card className="overflow-hidden border-none bg-card shadow-sm ring-1 ring-border">
                                    <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/5 p-6 pb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-green-600">
                                                <CheckCircle2 className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-base font-bold">
                                                    Calculation Complete
                                                </CardTitle>
                                                <CardDescription className="text-xs text-muted-foreground">
                                                    {reportScope === 'general'
                                                        ? 'System-wide case audit'
                                                        : `Personnel audit for selected staff`}
                                                </CardDescription>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold tracking-tight text-primary">
                                                {summary.total}
                                            </p>
                                            <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                                                Total Entries
                                            </p>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-8 p-6">
                                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                                            <div className="space-y-1.5 rounded-xl bg-accent/5 p-4 ring-1 ring-border/50 transition-colors hover:bg-accent/10">
                                                <div className="flex items-center gap-1.5 text-amber-600">
                                                    <AlertCircle className="h-4 w-4" />
                                                    <span className="text-[10px] font-bold tracking-widest text-amber-600/80 uppercase">
                                                        Pending
                                                    </span>
                                                </div>
                                                <p className="text-2xl font-bold tracking-tight">
                                                    {summary.pending}
                                                </p>
                                            </div>
                                            <div className="space-y-1.5 rounded-xl bg-accent/5 p-4 ring-1 ring-border/50 transition-colors hover:bg-accent/10">
                                                <div className="flex items-center gap-1.5 text-blue-600">
                                                    <Clock className="h-4 w-4" />
                                                    <span className="text-[10px] font-bold tracking-widest text-blue-600/80 uppercase">
                                                        In Progress
                                                    </span>
                                                </div>
                                                <p className="text-2xl font-bold tracking-tight">
                                                    {summary.in_progress}
                                                </p>
                                            </div>
                                            <div className="space-y-1.5 rounded-xl bg-accent/5 p-4 ring-1 ring-border/50 transition-colors hover:bg-accent/10">
                                                <div className="flex items-center gap-1.5 text-green-600">
                                                    <CheckCircle2 className="h-4 w-4" />
                                                    <span className="text-[10px] font-bold tracking-widest text-green-600/80 uppercase">
                                                        Completed
                                                    </span>
                                                </div>
                                                <p className="text-2xl font-bold tracking-tight">
                                                    {summary.completed}
                                                </p>
                                            </div>
                                        </div>

                                        {summary.total > 0 && (
                                            <div className="flex flex-col gap-4 sm:flex-row">
                                                <a
                                                    href={
                                                        admin.dataReport({
                                                            query: {
                                                                from_date:
                                                                    fromDate,
                                                                to_date: toDate,
                                                                scope: reportScope,
                                                                selected_personnel_uuid:
                                                                    selectedPersonnel,
                                                                action: 'inline',
                                                            },
                                                        }).url
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    // Use text-sm and font-medium for a cleaner, less "aggressive" look
                                                    className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-input bg-background text-sm font-medium text-foreground shadow-sm transition-all hover:bg-accent active:scale-[0.98]"
                                                >
                                                    <Eye className="h-4 w-4 opacity-70" />
                                                    Preview Report
                                                </a>

                                                <a
                                                    href={
                                                        admin.dataReport({
                                                            query: {
                                                                from_date:
                                                                    fromDate,
                                                                to_date: toDate,
                                                                scope: reportScope,
                                                                selected_personnel_uuid:
                                                                    selectedPersonnel,
                                                                action: 'download',
                                                            },
                                                        }).url
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    // Applied same text sizing and weight for visual consistency
                                                    className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-primary text-sm font-medium text-primary-foreground shadow-xl shadow-primary/20 transition-all hover:opacity-90 active:scale-[0.98]"
                                                >
                                                    <Download className="h-4 w-4" />
                                                    Download Official PDF
                                                </a>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        ) : (
                            <div className="animate-pulse rounded-2xl border border-dashed border-foreground/60 bg-muted/5 py-5 text-center">
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground/50 shadow-inner">
                                    <FileText className="h-6 w-6" />
                                </div>
                                <h4 className="mt-6 text-base font-semibold tracking-tight text-muted-foreground">
                                    Waiting for Context
                                </h4>
                                <p className="mx-auto mt-2 max-w-xs text-xs leading-relaxed text-muted-foreground/70">
                                    Select your report parameters from the left
                                    panel and specify a date range to begin
                                    analysis.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

Report.layout = {
    breadcrumbs: [
        {
            title: 'Report',
            href: admin.report(),
        },
    ],
};

export default Report;
