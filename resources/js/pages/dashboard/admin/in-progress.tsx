import Heading from '@/components/heading';
import StatCard from '@/components/stat-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { adminInProgress, adminViewCase } from '@/routes';
import { Head, router } from '@inertiajs/react';
import {
    AlertCircle,
    Calendar,
    Clock,
    Download,
    Eye,
    LucideIcon,
    ShieldCheck,
} from 'lucide-react';
import { formatDate, formatTime } from '@/lib/helpers';

import { InProgressCase, PendingCase } from '@/types/types';
import { Hint } from '@/components/hint';
import SearchInput from '@/components/search-input';
import RefreshButton from '@/components/refresh-button';
import BackButton from '@/components/back-button';
import CaseProgressBar from '@/components/case-progress-bar';
import { PaginatedData } from '@/types/types';

// interface PaginationLinks {
//     url: string | null;
//     label: string;
//     active: boolean;
// }

// interface PaginatedData<T> {
//     data: T[];
//     links: PaginationLinks[];
//     current_page: number;
//     from: number;
//     to: number;
//     total: number;
// }

interface InProgressProps {
    cases: PaginatedData<InProgressCase>;
    stats: {
        total: number;
        identified: number;
        anonymous: number;
    };
    filters: {
        search?: string;
        filter?: string;
    };
}

type Stats = {
    title: string;
    value: string;
    icon: LucideIcon;
    color: string;
};

export default function InProgress({ cases, stats, filters }: InProgressProps) {
    const handleFilterChange = (value: string) => {
        router.get(
            adminInProgress(),
            { ...filters, filter: value === 'all' ? '' : value },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    };

    const viewCase = (uuid: string) => {
        router.get(adminViewCase({ case: uuid }), {
            from_page: 'In Progress Cases',
            from_url: window.location.pathname,
        });
    };

    const statsConfig: Stats[] = [
        {
            title: 'Total In Progress',
            value: stats.total.toString(),
            icon: Clock,
            color: 'text-amber-600',
        },
        {
            title: 'Identified',
            value: stats.identified.toString(),
            icon: AlertCircle,
            color: 'text-destructive',
        },
        {
            title: 'Anonymous',
            value: stats.anonymous.toString(),
            icon: ShieldCheck,
            color: 'text-indigo-600',
        },
    ];

    const getPriorityColor = (priority: string) => {
        switch (priority.toLowerCase()) {
            case 'high':
                return 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400';
            case 'medium':
                return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400';
            case 'low':
                return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400';
            default:
                return 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400';
        }
    };

    return (
        <>
            <Head title="In Progress Cases" />

            <div className="flex flex-col gap-8 px-4 py-6 md:px-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-row items-center gap-3">
                        <BackButton />
                        <Heading
                            title="In Progress Cases"
                            description="Cases currently under active investigation."
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Export List
                        </Button>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {statsConfig.map((stat, i) => (
                        <StatCard
                            key={i}
                            title={stat.title}
                            value={stat.value}
                            icon={stat.icon}
                            iconColor={stat.color}
                        />
                    ))}
                </div>

                <Card className="border-none shadow-sm ring-1 ring-border">
                    <CardHeader>
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div className="space-y-1">
                                <CardTitle>Active Queue</CardTitle>
                                <CardDescription>
                                    A list of cases currently being handled by
                                    officers.
                                </CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                                <SearchInput
                                    href={adminInProgress()}
                                    filters={filters}
                                />
                                <Select
                                    defaultValue="all"
                                    onValueChange={handleFilterChange}
                                >
                                    <SelectTrigger className="w-[130px]">
                                        <SelectValue placeholder="Priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All</SelectItem>
                                        <SelectItem value="identified">
                                            Identified
                                        </SelectItem>
                                        <SelectItem value="anonymous">
                                            Anonymous
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <RefreshButton href={adminInProgress()} />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Case ID</TableHead>
                                    <TableHead>Assigned At</TableHead>
                                    <TableHead>Priority</TableHead>
                                    <TableHead>Identity</TableHead>
                                    <TableHead>AssignedTo</TableHead>
                                    <TableHead>AssignedBy</TableHead>
                                    <TableHead>Progress</TableHead>
                                    <TableHead className="text-center">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {cases.data.length > 0 ? (
                                    cases.data.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">
                                                {item.case_tracking_id}
                                            </TableCell>
                                            <TableCell>
                                                {/* <span className="font-medium">
                                                    {item.incident_detail
                                                        ?.incident_type ||
                                                        'N/A'}
                                                </span> */}

                                                <div className="flex flex-col text-xs">
                                                    <span>
                                                        {formatDate(
                                                            item.case_assignment
                                                                .case_assigned_at,
                                                        )}
                                                    </span>
                                                    <span>
                                                        {formatTime(
                                                            item.case_assignment
                                                                .case_assigned_at,
                                                        )}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant="outline"
                                                    className={`capitalize ${getPriorityColor(item.case_assignment.priority)}`}
                                                >
                                                    {
                                                        item.case_assignment
                                                            .priority
                                                    }
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {item.is_anonymous ? (
                                                    <Badge
                                                        variant="secondary"
                                                        className="gap-1"
                                                    >
                                                        <ShieldCheck className="h-3 w-3" />
                                                        Anonymous
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="outline">
                                                        Identified
                                                    </Badge>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="text-sm">
                                                        {
                                                            item.case_assignment
                                                                ?.assigned_to
                                                        }
                                                    </span>
                                                    <span className="text-xs text-muted-foreground">
                                                        {
                                                            item.case_assignment
                                                                ?.assigned_to_role
                                                        }
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="text-sm">
                                                        {
                                                            item.case_assignment
                                                                ?.assigned_by
                                                        }
                                                    </span>
                                                    <span className="text-xs text-muted-foreground">
                                                        {
                                                            item.case_assignment
                                                                ?.assigned_by_role
                                                        }
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <CaseProgressBar
                                                    progress={
                                                        item.caseWorkflowPercentage
                                                    }
                                                />
                                            </TableCell>
                                            <TableCell className="flex items-center justify-center border-l border-solid border-black">
                                                <div className="flex justify-end gap-2">
                                                    <Hint content="View case">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="z-50 h-8 w-8 cursor-pointer"
                                                            onClick={() =>
                                                                viewCase(
                                                                    item.uuid,
                                                                )
                                                            }
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    </Hint>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={5}
                                            className="h-24 text-center text-muted-foreground"
                                        >
                                            No in-progress cases found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>

                    {cases.total > 0 && (
                        <CardFooter className="flex items-center justify-between border-t px-6 py-3">
                            <p className="text-xs text-muted-foreground">
                                Showing{' '}
                                <strong>
                                    {cases.from || 0}-{cases.to || 0}
                                </strong>{' '}
                                of <strong>{cases.total}</strong> in progress
                                cases
                            </p>
                            <div className="flex gap-2">
                                {cases.links.map((link, i) => {
                                    if (
                                        link.label.includes('Previous') ||
                                        link.label.includes('Next')
                                    ) {
                                        return (
                                            <Button
                                                key={i}
                                                variant="outline"
                                                size="sm"
                                                disabled={!link.url}
                                                onClick={() =>
                                                    link.url &&
                                                    router.get(link.url)
                                                }
                                            >
                                                {link.label.includes('Previous')
                                                    ? 'Previous'
                                                    : 'Next'}
                                            </Button>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                        </CardFooter>
                    )}
                </Card>
            </div>
        </>
    );
}

InProgress.layout = {
    breadcrumbs: [
        {
            title: 'In Progress Cases',
            href: adminInProgress(),
        },
    ],
};
