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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { adminAssignments, adminViewCase } from '@/routes';
import { Head, router } from '@inertiajs/react';
import {
    Download,
    Eye,
    FileText,
    MoreHorizontal,
    RefreshCcw,
    ShieldCheck,
    SquarePen,
    TrendingUp,
} from 'lucide-react';
import { formatDate, formatTime } from '@/lib/utils';

import { PersonalAssignment } from '@/types/types';
import { Hint } from '@/components/hint';
import SearchInput from '@/components/search-input';
import RefreshButton from '@/components/refresh-button';

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

interface AssignmentsProps {
    assignments: PaginatedData<PersonalAssignment>;
    filters?: {
        search?: string;
        filter?: string;
    };
}

export default function PersonalAssignments({
    assignments,
    filters = {},
}: AssignmentsProps) {
    const handleFilterChange = (value: string) => {
        router.get(
            adminAssignments(),
            { ...filters, filter: value === 'all' ? '' : value },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    };

    const viewCase = (uuid: string) => {
        router.get(adminViewCase({ case: uuid }), {
            from_page: 'My Assignments',
            from_url: window.location.pathname,
        });
    };

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
            <Head title="My Assignments" />

            <div className="flex flex-col gap-8 px-4 py-6 md:px-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <Heading
                        title="My Assignments"
                        description="View and manage cases assigned to you."
                    />
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Export List
                        </Button>
                    </div>
                </div>

                <Card className="border-none shadow-sm ring-1 ring-border">
                    <CardHeader>
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div className="space-y-1">
                                <CardTitle>Assigned Cases</CardTitle>
                                <CardDescription>
                                    Cases that have been assigned to you for
                                    investigation.
                                </CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                                <SearchInput
                                    href={adminAssignments()}
                                    filters={filters}
                                />
                                <Select
                                    defaultValue={'all'}
                                    onValueChange={handleFilterChange}
                                >
                                    <SelectTrigger className="w-[130px]">
                                        <SelectValue placeholder="Priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            All Priorities
                                        </SelectItem>
                                        <SelectItem value="high">
                                            High
                                        </SelectItem>
                                        <SelectItem value="medium">
                                            Medium
                                        </SelectItem>
                                        <SelectItem value="low">Low</SelectItem>
                                    </SelectContent>
                                </Select>
                                <RefreshButton href={adminAssignments()} />
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
                                            Priority
                                        </th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                            Assigned By
                                        </th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                            Identity
                                        </th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                            Date Assigned
                                        </th>
                                        <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="[&_tr:last-child]:border-0">
                                    {assignments.data.length > 0 ? (
                                        assignments.data.map((item, index) => (
                                            <tr
                                                key={index}
                                                className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                                            >
                                                <td className="p-4 align-middle font-medium">
                                                    {item.case_tracking_id}
                                                </td>
                                                <td className="p-4 align-middle">
                                                    <Badge
                                                        variant="outline"
                                                        className={`capitalize ${getPriorityColor(item.priority)}`}
                                                    >
                                                        {item.priority}
                                                    </Badge>
                                                </td>
                                                <td className="p-4 align-middle">
                                                    <div className="flex flex-col">
                                                        <span className="font-medium">
                                                            {item.assigned_by}
                                                        </span>
                                                        <span className="text-xs text-muted-foreground uppercase">
                                                            {
                                                                item.assigned_by_role
                                                            }
                                                        </span>
                                                    </div>
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
                                                                item.date_assigned,
                                                            )}
                                                        </span>
                                                        <span>
                                                            {formatTime(
                                                                item.date_assigned,
                                                            )}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-right align-middle">
                                                    <div className="flex justify-end gap-2">
                                                        <Hint content="View details">
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

                                                        <DropdownMenu>
                                                            <Hint content="More Actions">
                                                                <DropdownMenuTrigger
                                                                    asChild
                                                                >
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        className="h-8 w-8 cursor-pointer"
                                                                    >
                                                                        <MoreHorizontal className="h-4 w-4" />
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                            </Hint>

                                                            <DropdownMenuContent
                                                                align="end"
                                                                className="w-48"
                                                            >
                                                                <DropdownMenuLabel>
                                                                    Actions
                                                                </DropdownMenuLabel>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem
                                                                    onClick={() =>
                                                                        viewCase(
                                                                            item.uuid,
                                                                        )
                                                                    }
                                                                >
                                                                    <Eye className="mr-2 h-4 w-4" />
                                                                    View Details
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem>
                                                                    <TrendingUp className="mr-2 h-4 w-4" />
                                                                    Update
                                                                    Status
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem>
                                                                    <SquarePen className="mr-2 h-4 w-4" />
                                                                    Edit
                                                                    Assignment
                                                                </DropdownMenuItem>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem>
                                                                    <FileText className="mr-2 h-4 w-4" />
                                                                    Export Case
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                className="h-24 text-center text-muted-foreground"
                                            >
                                                No assignments found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        {assignments.total > 0 && (
                            <div className="flex items-center justify-between border-t px-4 py-4">
                                <p className="text-xs text-muted-foreground">
                                    Showing{' '}
                                    <strong>
                                        {assignments.from || 0}-
                                        {assignments.to || 0}
                                    </strong>{' '}
                                    of <strong>{assignments.total}</strong>{' '}
                                    assignments
                                </p>
                                <div className="flex gap-2">
                                    {assignments.links.map((link, i) => {
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
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

PersonalAssignments.layout = {
    breadcrumbs: [
        {
            title: 'My Assignments',
            href: adminAssignments(),
        },
    ],
};
