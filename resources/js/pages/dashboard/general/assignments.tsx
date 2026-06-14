import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
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
import { adminCaseWorkflow, adminViewCase } from '@/routes';
import { Head, router } from '@inertiajs/react';
import {
    Download,
    Eye,
    MoreHorizontal,
    ShieldCheck,
    SquarePen,
} from 'lucide-react';
import { formatDate, formatTime } from '@/lib/helpers';

import { PersonalAssignment } from '@/types/types';
import { Hint } from '@/components/hint';
import SearchInput from '@/components/search-input';
import RefreshButton from '@/components/refresh-button';
import CaseProgressBar from '@/components/case-progress-bar';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { PaginatedData } from '@/types/types';
import general from '@/routes/general';

interface AssignmentsProps {
    assignments: PaginatedData<PersonalAssignment>;
    filters?: {
        search?: string;
        filter?: string;
    };
}

const Assignments = ({ assignments, filters = {} }: AssignmentsProps) => {
    const handleFilterChange = (value: string) => {
        router.get(
            general.assignments(),
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

    const caseWorkFlow = (uuid: string) => {
        router.get(adminCaseWorkflow({ case: uuid }), {
            from_page: 'My assignments',
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
                    <div className="flex flex-row items-center gap-3">
                        <Heading
                            title="My Assignments"
                            description="View and manage cases assigned to you."
                        />
                    </div>
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
                                    href={general.assignments()}
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
                                <RefreshButton href={general.assignments()} />
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Case ID</TableHead>
                                    <TableHead>Priority</TableHead>
                                    <TableHead>Assigned By</TableHead>
                                    <TableHead>Identity</TableHead>
                                    <TableHead>Progress</TableHead>
                                    <TableHead>Date Assigned</TableHead>
                                    <TableHead className="text-center">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {assignments.data.length > 0 ? (
                                    assignments.data.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">
                                                {
                                                    item.caseDetail
                                                        .case_tracking_id
                                                }
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant="outline"
                                                    className={`capitalize ${getPriorityColor(item.priority)}`}
                                                >
                                                    {item.priority}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="font-medium">
                                                        {
                                                            item.assignedBy
                                                                .assigned_by
                                                        }
                                                    </span>
                                                    <span className="text-xs text-muted-foreground uppercase">
                                                        {
                                                            item.assignedBy
                                                                .assigned_by_role
                                                        }
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {item.caseDetail
                                                    .is_anonymous ? (
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
                                                <CaseProgressBar
                                                    progress={
                                                        item.caseDetail
                                                            .caseWorkflowPercentage
                                                    }
                                                />
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
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
                                            </TableCell>
                                            <TableCell className="flex items-center justify-center">
                                                <div className="flex justify-end gap-2">
                                                    <Hint content="View details">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 cursor-pointer"
                                                            onClick={() =>
                                                                viewCase(
                                                                    item
                                                                        .caseDetail
                                                                        .uuid,
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
                                                                        item
                                                                            .caseDetail
                                                                            .uuid,
                                                                    )
                                                                }
                                                            >
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                View Details
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    caseWorkFlow(
                                                                        item
                                                                            .caseDetail
                                                                            .uuid,
                                                                    )
                                                                }
                                                            >
                                                                <SquarePen className="mr-2 h-4 w-4" />
                                                                Deal with Case
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={7}
                                            className="h-24 text-center text-muted-foreground"
                                        >
                                            No assignments found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>

                    {/* Cleaner approach using CardFooter for pagination */}
                    {assignments.total > 0 && (
                        <CardFooter className="flex items-center justify-between border-t px-6 py-4">
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
};

export default Assignments;

Assignments.layout = {
    breadcrumbs: [
        {
            title: 'Assignments',
            href: general.assignments(),
        },
    ],
};
