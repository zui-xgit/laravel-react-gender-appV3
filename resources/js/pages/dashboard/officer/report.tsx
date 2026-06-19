import { Head, router } from '@inertiajs/react';
import { format } from 'date-fns';
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
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
import { cn } from '@/lib/utils';
import officer from '@/routes/officer';

interface DatePickerFieldProps {
    label: string;
    dateValue: string;
    placeholder: string;
    onChange: (date: string) => void;
}

interface ReportProps {
    summary: {
        total: number;
        pending: number;
        in_progress: number;
        completed: number;
    } | null;
    from_date?: string;
    to_date?: string;
}

const safeFormat = (
    dateString: string | null | undefined,
    formatStr: string = 'PP',
) => {
    if (!dateString) {
return '...';
}

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

const Report = ({ summary, from_date, to_date }: ReportProps) => {
    const [fromDate, setFromDate] = useState<string>(from_date || '');
    const [toDate, setToDate] = useState<string>(to_date || '');
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

    const handleProceed = () => {
        if (!fromDate || !toDate) {
            toast.error('Choose the date range');

            return;
        }

        router.get(
            officer.report().url,
            {
                from_date: fromDate,
                to_date: toDate,
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
                            `${summary.total} cases found in your assignment for the selected range.`,
                        );
                    } else if (summary) {
                        toast.error('No cases found matching your criteria.');
                    }
                },
            },
        );
    };

    const handleReset = () => {
        setFromDate('');
        setToDate('');

        router.get(
            officer.report().url,
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
            <Head title="Personal Performance Report" />

            <div className="flex flex-col gap-8 px-4 py-6 md:px-8">
                <Heading
                    title="Case Performance Report"
                    description="Analyze your case management efficiency and generate official documentation."
                />

                <div className="mx-auto w-full max-w-4xl space-y-8">
                    {/* 1. Configuration Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 px-1">
                            <CalendarRange className="h-5 w-5 text-muted-foreground" />
                            <h3 className="text-lg font-semibold tracking-tight">
                                Reporting Period
                            </h3>
                        </div>

                        <Card className="overflow-hidden border-none bg-card shadow-sm ring-1 ring-border">
                            <CardContent className="space-y-6 p-6">
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
                                        !fromDate || !toDate || isSearching
                                    }
                                    className="h-11 w-full cursor-pointer rounded-xl font-bold shadow-lg shadow-primary/10 transition-all hover:shadow-xl active:scale-[0.98]"
                                >
                                    {isSearching ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Compiling Personal Audit...
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
                                                Audit Generated
                                            </CardTitle>
                                            <CardDescription className="text-xs text-muted-foreground">
                                                Cases assigned to you during
                                                this period
                                            </CardDescription>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold tracking-tight text-primary">
                                            {summary.total}
                                        </p>
                                        <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                                            Total Assignments
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
                                                    officer.dataReport({
                                                        query: {
                                                            from_date: fromDate,
                                                            to_date: toDate,
                                                            action: 'inline',
                                                        },
                                                    }).url
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-input bg-background text-sm font-medium text-foreground shadow-sm transition-all hover:bg-accent active:scale-[0.98]"
                                            >
                                                <Eye className="h-4 w-4 opacity-70" />
                                                Preview Report
                                            </a>

                                            <a
                                                href={
                                                    officer.dataReport({
                                                        query: {
                                                            from_date: fromDate,
                                                            to_date: toDate,
                                                            action: 'download',
                                                        },
                                                    }).url
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
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
                                Select Reporting Period
                            </h4>
                            <p className="mx-auto mt-2 max-w-xs text-xs leading-relaxed text-muted-foreground/70">
                                Specify a date range to generate a summary of
                                your assigned cases and performance metrics.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

Report.layout = {
    breadcrumbs: [
        {
            title: 'Report',
            href: officer.report(),
        },
    ],
};

export default Report;
