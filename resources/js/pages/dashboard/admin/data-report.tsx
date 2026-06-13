import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import admin from '@/routes/admin';
import { Head, router } from '@inertiajs/react';
import {
    AlertCircle,
    CalendarIcon,
    CalendarRange,
    CheckCircle2,
    Clock,
    Loader2,
    Printer,
    RotateCw,
    Search,
    Settings2,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

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
}

// Global safe date formatting utility to prevent breaking the fiber tree
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
        <>
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
        </>
    );
};

const DataReport = ({ summary, from_date, to_date }: DataReportProps) => {
    const [fromDate, setFromDate] = useState<string>(from_date || '');
    const [toDate, setToDate] = useState<string>(to_date || '');
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

    const handleProceed = () => {
        if (!fromDate || !toDate) {
            toast.error('Choose the date range ');
            return;
        }

        router.get(
            admin.report().url,
            { from_date: fromDate, to_date: toDate },
            {
                preserveScroll: true,
                preserveState: true,
                onStart: () => setIsSearching(true),
                onFinish: () => setIsSearching(false),

                onSuccess: (page) => {
                    const summary = page.props.summary as { total: number };
                    const from_date = page.props.from_date as string;
                    const to_date = page.props.to_date as string;

                    if (summary.total > 0) {
                        toast.success(
                            `${summary.total} reports found.
                             From: ${from_date},   To: ${to_date}`,
                            { style: { whiteSpace: 'pre-line' } },
                        );
                    } else {
                        toast.error(
                            `No reports found.
                             From: ${from_date},   To: ${to_date}`,
                            { style: { whiteSpace: 'pre-line' } },
                        );
                    }
                },
            },
        );
    };

    const handleReset = () => {
        setFromDate('');
        setToDate('');

        router.get(
            admin.report().url,
            {},
            {
                preserveScroll: true,
                onStart: () => setIsRefreshing(true),
                onFinish: () => setIsRefreshing(false),
            },
        );
    };

    return (
        <>
            <Head title="Data Reports Hub" />

            <div className="flex flex-col gap-8 px-4 py-6 md:px-8">
                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                    <Heading
                        title="Reporting Center"
                        description="Select a date range to generate official platform reports based on case records."
                    />
                </div>

                <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 p-4 sm:p-6">
                    {/* Range Selection */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 px-1">
                            <CalendarRange className="h-5 w-5 text-muted-foreground" />
                            <h3 className="text-lg font-semibold tracking-tight">
                                Specify Date Range
                            </h3>
                        </div>

                        <Card className="overflow-hidden border-none bg-card shadow-sm ring-1 ring-border">
                            <CardContent className="relative space-y-6 p-4 pt-14 sm:p-6 sm:pt-14">
                                {(fromDate || toDate) && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        className="absolute top-3 right-3 h-8 cursor-pointer gap-1.5 rounded-lg text-xs text-muted-foreground transition-all hover:bg-accent"
                                        disabled={isRefreshing}
                                        onClick={handleReset}
                                    >
                                        <RotateCw
                                            className={cn(
                                                'h-3.5 w-3.5 text-muted-foreground',
                                                isRefreshing && 'animate-spin',
                                            )}
                                        />
                                        <span>Reset</span>
                                    </Button>
                                )}
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    {/* From Date Shadcn Popover Picker */}
                                    <div className="flex flex-col space-y-1.5">
                                        <DatePickerField
                                            label="From Date"
                                            placeholder="Pick a start date"
                                            dateValue={fromDate}
                                            onChange={(date) => {
                                                setFromDate(date);
                                            }}
                                        />
                                    </div>

                                    {/* To Date Shadcn Popover Picker */}
                                    <div className="flex flex-col space-y-1.5">
                                        <DatePickerField
                                            label="To Date"
                                            placeholder="Pick an end date"
                                            dateValue={toDate}
                                            onChange={(date) => {
                                                setToDate(date);
                                            }}
                                        />
                                    </div>
                                </div>

                                <Button
                                    onClick={handleProceed}
                                    disabled={
                                        !fromDate || !toDate || isSearching
                                    }
                                    className="h-11 w-full cursor-pointer rounded-xl font-semibold shadow-lg shadow-primary/10 transition-transform active:scale-[0.98]"
                                >
                                    {isSearching ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Checking platform data...
                                        </>
                                    ) : (
                                        <>
                                            <Search className="mr-2 h-4 w-4" />
                                            Proceed with Report Generation
                                        </>
                                    )}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Result Section */}
                    {summary !== null ? (
                        <>
                            {summary.total > 0 ? (
                                <>
                                    <div className="animate-in duration-500 fade-in slide-in-from-top-4">
                                        <Card className="overflow-hidden border-none bg-card shadow-sm ring-1 ring-border">
                                            <CardHeader className="border-b bg-muted/5 p-4 pb-3 shadow-xs sm:p-6 sm:pb-3">
                                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-green-600">
                                                            <CheckCircle2 className="h-5 w-5" />
                                                        </div>
                                                        <div>
                                                            <CardTitle className="text-base font-bold">
                                                                Data Ready
                                                            </CardTitle>
                                                            <CardDescription className="text-xs">
                                                                Cases found
                                                                between{' '}
                                                                <span className="font-semibold text-foreground">
                                                                    {safeFormat(
                                                                        fromDate,
                                                                    )}
                                                                </span>{' '}
                                                                and{' '}
                                                                <span className="font-semibold text-foreground">
                                                                    {safeFormat(
                                                                        toDate,
                                                                    )}
                                                                </span>
                                                            </CardDescription>
                                                        </div>
                                                    </div>
                                                    <div className="text-left sm:text-right">
                                                        <p className="text-2xl font-bold tracking-tight text-primary">
                                                            {summary.total}
                                                        </p>
                                                        <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                                                            Total Cases Found
                                                        </p>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="p-4 sm:p-6">
                                                <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                                                    <div className="space-y-1 rounded-xl bg-accent/5 p-3 ring-1 ring-border/50">
                                                        <div className="flex items-center gap-1.5 text-amber-600">
                                                            <AlertCircle className="h-3.5 w-3.5" />
                                                            <span className="text-[10px] font-bold tracking-wider uppercase">
                                                                Pending
                                                            </span>
                                                        </div>
                                                        <p className="text-lg font-bold">
                                                            {summary.pending}
                                                        </p>
                                                    </div>
                                                    <div className="space-y-1 rounded-xl bg-accent/5 p-3 ring-1 ring-border/50">
                                                        <div className="flex items-center gap-1.5 text-blue-600">
                                                            <Clock className="h-3.5 w-3.5" />
                                                            <span className="text-[10px] font-bold tracking-wider uppercase">
                                                                In Progress
                                                            </span>
                                                        </div>
                                                        <p className="text-lg font-bold">
                                                            {
                                                                summary.in_progress
                                                            }
                                                        </p>
                                                    </div>
                                                    <div className="space-y-1 rounded-xl bg-accent/5 p-3 ring-1 ring-border/50">
                                                        <div className="flex items-center gap-1.5 text-green-600">
                                                            <CheckCircle2 className="h-3.5 w-3.5" />
                                                            <span className="text-[10px] font-bold tracking-wider uppercase">
                                                                Completed
                                                            </span>
                                                        </div>
                                                        <p className="text-lg font-bold">
                                                            {summary.completed}
                                                        </p>
                                                    </div>
                                                </div>

                                                <a
                                                    href={
                                                        admin.dataReport({
                                                            query: {
                                                                from_date:
                                                                    fromDate,
                                                                to_date: toDate,
                                                            },
                                                        }).url
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-8 text-sm font-bold text-primary-foreground shadow-xl shadow-primary/20 transition-all hover:opacity-90 active:scale-[0.98]"
                                                >
                                                    <Printer className="h-4 w-4" />
                                                    Print Official PDF Report
                                                </a>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="animate-in duration-500 fade-in slide-in-from-top-4">
                                        <Card className="overflow-hidden border-none bg-card shadow-sm ring-1 ring-border">
                                            <CardHeader className="border-b bg-muted/5 p-4 pb-3 shadow-xs sm:p-6 sm:pb-3">
                                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
                                                            <AlertCircle className="h-5 w-5" />
                                                        </div>
                                                        <div>
                                                            <CardTitle className="text-base font-bold">
                                                                No Records Found
                                                            </CardTitle>
                                                            <CardDescription className="text-xs">
                                                                Range checked:{' '}
                                                                <span className="font-semibold text-foreground">
                                                                    {safeFormat(
                                                                        fromDate,
                                                                    )}
                                                                </span>{' '}
                                                                to{' '}
                                                                <span className="font-semibold text-foreground">
                                                                    {safeFormat(
                                                                        toDate,
                                                                    )}
                                                                </span>
                                                            </CardDescription>
                                                        </div>
                                                    </div>
                                                    <div className="text-left sm:text-right">
                                                        <p className="text-2xl font-bold tracking-tight text-amber-600">
                                                            0
                                                        </p>
                                                        <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                                                            Total Cases Found
                                                        </p>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="flex flex-col items-center justify-center p-8 py-12 text-center sm:p-12">
                                                <div className="max-w-xs space-y-1.5">
                                                    <p className="text-sm font-semibold tracking-tight text-foreground">
                                                        Empty Date Range
                                                        Selection
                                                    </p>
                                                    <p className="text-xs leading-normal text-muted-foreground">
                                                        There are no platform
                                                        case entries currently
                                                        logged in the database
                                                        system between{' '}
                                                        <span className="font-semibold text-foreground">
                                                            {safeFormat(
                                                                fromDate,
                                                            )}
                                                        </span>{' '}
                                                        and{' '}
                                                        <span className="font-semibold text-foreground">
                                                            {safeFormat(toDate)}
                                                        </span>
                                                        . Try adjusting your
                                                        parameters above.
                                                    </p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            <div className="rounded-xl border border-dashed border-muted-foreground/20 bg-muted/5 py-12 text-center transition-all">
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground/80 shadow-xs">
                                    <CalendarRange className="h-5 w-5" />
                                </div>
                                <h4 className="mt-4 text-sm font-semibold tracking-tight text-foreground">
                                    No Active Report Generated
                                </h4>
                                <p className="mx-auto mt-1 max-w-xs text-xs text-muted-foreground">
                                    Pick your parameters above and click proceed
                                    to calculate server statistics.
                                </p>
                            </div>
                        </>
                    )}

                    {/* Info Footer */}
                    <div className="rounded-xl border border-primary/10 bg-primary/5 p-4 sm:p-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <Settings2 className="h-5 w-5" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-semibold text-primary">
                                    Secure Report Generation
                                </p>
                                <p className="max-w-2xl text-xs leading-relaxed text-muted-foreground">
                                    All generated reports are digitally signed
                                    and timestamped for authenticity. Reports
                                    generated within custom ranges are
                                    temporarily cached for optimal performance.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

DataReport.layout = {
    breadcrumbs: [
        {
            title: 'Report',
            href: admin.report(),
        },
    ],
};

export default DataReport;
