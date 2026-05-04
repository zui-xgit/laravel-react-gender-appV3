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
} from '@/components/ui/card';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { adminPending, adminViewCase } from '@/routes';
import { Head, router } from '@inertiajs/react';
import {
    AlertCircle,
    Calendar,
    Clock,
    Download,
    Eye,
    LucideIcon,
    MoreHorizontal,
    Search,
    ShieldCheck,
    UserPlus,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { formatDate, formatTime } from '@/lib/utils';

import AssignModal from '@/components/dialogs/assign-case-dialog';

import { PendingCase } from '@/types/types';
import { Hint } from '@/components/hint';
import SearchInput from '@/components/search-input';

interface PaginationLinks {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedData<T> {
    data: T[];
    links: PaginationLinks[];
    current_page: number;
    from: number;
    to: number;
    total: number;
}

interface PendingProps {
    cases: PaginatedData<PendingCase>;
    stats: {
        total: number;
        identified: number;
        anonymous: number;
        today: number;
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

export default function Pending({ cases, stats, filters }: PendingProps) {
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [selectedCase, setSelectedCase] = useState<PendingCase | null>(null);

    const handleFilterChange = (value: string) => {
        router.get(
            adminPending(),
            { ...filters, filter: value === 'all' ? '' : value },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    };

    const openAssignModal = (caseItem: PendingCase) => {
        setSelectedCase(caseItem);
        setIsAssignModalOpen(true);
    };

    const viewCase = (uuid: string) => {
        router.get(adminViewCase({ case: uuid }));
    };

    const statsConfig: Stats[] = [
        {
            title: 'Total Pending',
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
        {
            title: 'Reported Today',
            value: stats.today.toString(),
            icon: Calendar,
            color: 'text-blue-600',
        },
    ];
    return (
        <>
            <Head title="Pending Cases" />

            <div className="flex flex-col gap-8 px-4 py-6 md:px-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <Heading
                        title="Pending Cases"
                        description="Cases awaiting review and officer assignment."
                    />
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
                                <CardTitle>Pending Queue</CardTitle>
                                <CardDescription>
                                    A list of newly reported cases requiring
                                    administrative action.
                                </CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                                <SearchInput filters={filters} />
                                <Select
                                    // defaultValue={filters.filter || 'all'}
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
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="relative w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm">
                                <thead className="[&_tr]:border-b">
                                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                            Case ID
                                        </th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                            Incident Type
                                        </th>

                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                            Identity
                                        </th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                            Submitted
                                        </th>
                                        <th className="flex h-12 items-center justify-center px-4 text-right align-middle font-medium text-muted-foreground">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="[&_tr:last-child]:border-0">
                                    {cases.data.map((item, index) => (
                                        <tr
                                            key={index}
                                            className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                                        >
                                            <td className="p-4 align-middle font-medium">
                                                {item.case_tracking_id}
                                            </td>
                                            <td className="p-4 align-middle">
                                                <span className="font-medium">
                                                    {item.incident_detail
                                                        ?.incident_type ||
                                                        'N/A'}
                                                </span>
                                            </td>

                                            <td className="p-4 align-middle">
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
                                            </td>
                                            <td className="p-4 align-middle text-muted-foreground">
                                                <div className="flex flex-col text-xs">
                                                    <span>
                                                        {formatDate(
                                                            item.created_at,
                                                        )}
                                                    </span>
                                                    <span>
                                                        {formatTime(
                                                            item.created_at,
                                                        )}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-4 text-right align-middle">
                                                <div className="flex justify-end gap-2">
                                                    <Hint content="Assign Personnel">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="h-8 cursor-pointer gap-1"
                                                            onClick={() =>
                                                                openAssignModal(
                                                                    item,
                                                                )
                                                            }
                                                        >
                                                            <UserPlus className="h-3.5 w-3.5" />
                                                            Assign
                                                        </Button>
                                                    </Hint>
                                                    <Hint content="View case">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 cursor-pointer"
                                                            onClick={() =>
                                                                viewCase(
                                                                    item.uuid,
                                                                )
                                                            }
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    </Hint>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex items-center justify-between border-t px-4 py-4">
                            <p className="text-xs text-muted-foreground">
                                Showing{' '}
                                <strong>
                                    {cases.from || 0}-{cases.to || 0}
                                </strong>{' '}
                                of <strong>{cases.total}</strong> pending cases
                            </p>
                            <div className="flex gap-2">
                                {cases.links.map((link, i) => {
                                    if (link.label.includes('Previous')) {
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
                                                Previous
                                            </Button>
                                        );
                                    }
                                    if (link.label.includes('Next')) {
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
                                                Next
                                            </Button>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <AssignModal
                isOpen={isAssignModalOpen}
                onClose={() => setIsAssignModalOpen(false)}
                selectedCase={selectedCase}
            />
        </>
    );
}

Pending.layout = {
    breadcrumbs: [
        {
            title: 'Pending Cases',
            href: adminPending(),
        },
    ],
};
