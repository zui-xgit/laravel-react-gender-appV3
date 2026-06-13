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
import { Head, router } from '@inertiajs/react';
import {
    AlertCircle,
    CalendarIcon,
    CalendarRange,
    CheckCircle2,
    Clock,
    Download,
    Eye,
    FileText,
    LayoutGrid,
    Loader2,
    Printer,
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

interface DatePickerFieldProps {
    label: string;
    dateValue: string;
    placeholder: string;
    onChange: (date: string) => void;
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

const TestReportPage = () => {
    const [reportScope, setReportScope] = useState<'general' | 'personnel'>(
        'general',
    );
    const [selectedAdmin, setSelectedAdmin] = useState<string>('');
    const [fromDate, setFromDate] = useState<string>('');
    const [toDate, setToDate] = useState<string>('');
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [summary, setSummary] = useState<any>(null);

    // Dummy data
    const dummyAdmins = [
        { id: '1', name: 'Admin Benjamin' },
        { id: '2', name: 'Admin Sarah' },
        { id: '3', name: 'Admin Michael' },
    ];

    const handleProceed = () => {
        if (!fromDate || !toDate) {
            toast.error('Please choose a date range');
            return;
        }
        if (reportScope === 'personnel' && !selectedAdmin) {
            toast.error('Please select an administrator');
            return;
        }

        setIsSearching(true);
        setSummary(null);

        // Simulate search
        setTimeout(() => {
            setIsSearching(false);
            setSummary({
                total: 24,
                pending: 5,
                in_progress: 12,
                completed: 7,
            });
            toast.success('Report data calculated successfully');
        }, 1500);
    };

    const handleReset = () => {
        setFromDate('');
        setToDate('');
        setSummary(null);
        setSelectedAdmin('');
        setReportScope('general');
    };

    return (
        <>
            <Head title="System Report Test" />

            <div className="flex flex-col gap-8 px-4 py-6 md:px-8">
                <Heading
                    title="Reporting Engine Test"
                    description="Configure and generate multi-scope reports with a refined internal navigation."
                />

                <div className="tborder flex flex-col lg:flex-row lg:space-x-12">
                    {/* Left "Sidebar" Scope Selector */}
                    <aside className="w-full max-w-xl lg:w-48">
                        <nav
                            className="flex flex-col space-y-1"
                            aria-label="Report Scope"
                        >
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    setReportScope('general');
                                    setSummary(null);
                                }}
                                className={cn(
                                    'w-full cursor-pointer justify-start gap-2',
                                    {
                                        'bg-muted': reportScope === 'general',
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
                                    setSummary(null);
                                }}
                                className={cn(
                                    'w-full cursor-pointer justify-start gap-2',
                                    {
                                        'bg-muted': reportScope === 'personnel',
                                    },
                                )}
                            >
                                <User className="h-4 w-4" />
                                Admin Report
                            </Button>
                        </nav>
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
                                                value={selectedAdmin}
                                                onValueChange={setSelectedAdmin}
                                            >
                                                <SelectTrigger className="h-11 rounded-xl shadow-xs">
                                                    <SelectValue placeholder="Choose an administrator from the list..." />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-xl">
                                                    {dummyAdmins.map((adm) => (
                                                        <SelectItem
                                                            key={adm.id}
                                                            value={adm.id}
                                                            className="rounded-lg"
                                                        >
                                                            {adm.name}
                                                        </SelectItem>
                                                    ))}
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
                                            >
                                                <RotateCw className="h-3.5 w-3.5" />
                                                <span>Reset All</span>
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
                                                !selectedAdmin)
                                        }
                                        className="h-11 w-full cursor-pointer rounded-xl font-bold shadow-lg shadow-primary/10 transition-all hover:shadow-xl active:scale-[0.98]"
                                    >
                                        {isSearching ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Processing Platform Data...
                                            </>
                                        ) : (
                                            <>
                                                <Search className="mr-2 h-4 w-4" />
                                                Analyze and Calculate Summary
                                            </>
                                        )}
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>

                        {/* 2. Results Section */}
                        {summary ? (
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
                                                <CardDescription className="text-xs">
                                                    {reportScope === 'general'
                                                        ? 'Full platform audit'
                                                        : `Staff audit for ${dummyAdmins.find((a) => a.id === selectedAdmin)?.name}`}
                                                </CardDescription>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold tracking-tight text-primary">
                                                {summary.total}
                                            </p>
                                            <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                                                Entries Matched
                                            </p>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-8 p-6">
                                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                                            <div className="space-y-1.5 rounded-xl bg-accent/5 p-4 ring-1 ring-border/50 transition-colors hover:bg-accent/10">
                                                <div className="flex items-center gap-1.5 text-amber-600">
                                                    <AlertCircle className="h-4 w-4" />
                                                    <span className="text-[10px] font-bold tracking-widest uppercase">
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
                                                    <span className="text-[10px] font-bold tracking-widest uppercase">
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
                                                    <span className="text-[10px] font-bold tracking-widest uppercase">
                                                        Completed
                                                    </span>
                                                </div>
                                                <p className="text-2xl font-bold tracking-tight">
                                                    {summary.completed}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-4 sm:flex-row">
                                            <Button
                                                variant="outline"
                                                className="h-12 flex-1 gap-2 rounded-xl font-bold transition-all hover:bg-accent active:scale-[0.98]"
                                            >
                                                <Eye className="h-4 w-4 opacity-70" />
                                                Preview Document
                                            </Button>
                                            <Button className="h-12 flex-1 gap-2 rounded-xl font-bold shadow-xl shadow-primary/20 transition-all hover:opacity-90 active:scale-[0.98]">
                                                <Download className="h-4 w-4" />
                                                Download Official PDF
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ) : (
                            <div className="animate-pulse rounded-2xl border border-dashed border-muted-foreground/20 bg-muted/5 py-20 text-center">
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

export default TestReportPage;
