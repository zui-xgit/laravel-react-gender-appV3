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
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { adminAssignments } from '@/routes';
import { Head } from '@inertiajs/react';
import {
    AlertCircle,
    CheckCircle2,
    Clock,
    Download,
    Eye,
    Filter,
    MoreHorizontal,
    Plus,
    Search,
} from 'lucide-react';

const assignments = [
    {
        id: 'GBV-2024-089',
        title: 'Physical Assault - Downtown',
        reporter: 'Jane Doe',
        officer: 'Sarah Chen',
        priority: 'High',
        status: 'In Progress',
        date: '2024-04-28',
    },
    {
        id: 'GBV-2024-092',
        title: 'Verbal Harassment Claim',
        reporter: 'John Smith',
        officer: 'Michael Ross',
        priority: 'Medium',
        status: 'Pending',
        date: '2024-04-29',
    },
    {
        id: 'GBV-2024-045',
        title: 'Workplace Discrimination',
        reporter: 'Alice Wong',
        officer: 'David Kim',
        priority: 'Low',
        status: 'Completed',
        date: '2024-04-20',
    },
    {
        id: 'GBV-2024-101',
        title: 'Domestic Dispute - North Side',
        reporter: 'Robert Brown',
        officer: 'Sarah Chen',
        priority: 'High',
        status: 'Pending',
        date: '2024-04-29',
    },
    {
        id: 'GBV-2024-077',
        title: 'Cyber Bullying Report',
        reporter: 'Emily Davis',
        officer: 'Alex Johnson',
        priority: 'Medium',
        status: 'In Progress',
        date: '2024-04-25',
    },
];

const getPriorityBadge = (priority: string) => {
    switch (priority) {
        case 'High':
            return <Badge variant="destructive">{priority}</Badge>;
        case 'Medium':
            return (
                <Badge
                    variant="outline"
                    className="border-amber-200 bg-amber-50 text-amber-700"
                >
                    {priority}
                </Badge>
            );
        case 'Low':
            return (
                <Badge
                    variant="outline"
                    className="border-blue-200 bg-blue-50 text-blue-700"
                >
                    {priority}
                </Badge>
            );
        default:
            return <Badge variant="secondary">{priority}</Badge>;
    }
};

const getStatusBadge = (status: string) => {
    switch (status) {
        case 'Completed':
            return (
                <Badge
                    variant="outline"
                    className="border-green-200 bg-green-50 text-green-700"
                >
                    {status}
                </Badge>
            );
        case 'In Progress':
            return (
                <Badge
                    variant="outline"
                    className="border-indigo-200 bg-indigo-50 text-indigo-700"
                >
                    {status}
                </Badge>
            );
        case 'Pending':
            return (
                <Badge
                    variant="outline"
                    className="border-amber-200 bg-amber-50 text-amber-700"
                >
                    {status}
                </Badge>
            );
        default:
            return <Badge variant="secondary">{status}</Badge>;
    }
};

export default function Assignments() {
    return (
        <>
            <Head title="Case Assignments" />

            <div className="flex flex-col gap-8 px-4 py-6 md:px-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <Heading
                        title="Case Assignments"
                        description="Manage and monitor case allocations to officers."
                    />
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Export
                        </Button>
                        <Button size="sm">
                            <Plus className="mr-2 h-4 w-4" />
                            New Assignment
                        </Button>
                    </div>
                </div>

                <Card className="border-none shadow-sm ring-1 ring-border">
                    <CardHeader>
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div className="space-y-1">
                                <CardTitle>Assignment List</CardTitle>
                                <CardDescription>
                                    A list of all cases and their current
                                    assignments.
                                </CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="relative">
                                    <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search cases..."
                                        className="w-[200px] pl-8 md:w-[300px]"
                                    />
                                </div>
                                <Select defaultValue="all">
                                    <SelectTrigger className="w-[130px]">
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            All Status
                                        </SelectItem>
                                        <SelectItem value="pending">
                                            Pending
                                        </SelectItem>
                                        <SelectItem value="in-progress">
                                            In Progress
                                        </SelectItem>
                                        <SelectItem value="completed">
                                            Completed
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
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                                            Case ID
                                        </th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                                            Case Title
                                        </th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                                            Assignee
                                        </th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                                            Priority
                                        </th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                                            Status
                                        </th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                                            Date
                                        </th>
                                        <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="[&_tr:last-child]:border-0">
                                    {assignments.map((assignment) => (
                                        <tr
                                            key={assignment.id}
                                            className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                                        >
                                            <td className="p-4 align-middle font-medium">
                                                {assignment.id}
                                            </td>
                                            <td className="p-4 align-middle">
                                                <div className="flex flex-col">
                                                    <span className="font-medium">
                                                        {assignment.title}
                                                    </span>
                                                    <span className="text-xs text-muted-foreground">
                                                        Rep:{' '}
                                                        {assignment.reporter}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-4 align-middle">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                                                        {assignment.officer
                                                            .split(' ')
                                                            .map((n) => n[0])
                                                            .join('')}
                                                    </div>
                                                    <span>
                                                        {assignment.officer}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-4 align-middle">
                                                {getPriorityBadge(
                                                    assignment.priority,
                                                )}
                                            </td>
                                            <td className="p-4 align-middle">
                                                {getStatusBadge(
                                                    assignment.status,
                                                )}
                                            </td>
                                            <td className="p-4 align-middle text-muted-foreground">
                                                {assignment.date}
                                            </td>
                                            <td className="p-4 text-right align-middle">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
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
                                Showing <strong>1-5</strong> of{' '}
                                <strong>42</strong> assignments
                            </p>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" disabled>
                                    Previous
                                </Button>
                                <Button variant="outline" size="sm">
                                    Next
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

Assignments.layout = {
    breadcrumbs: [
        {
            title: 'Assignments',
            href: adminAssignments(),
        },
    ],
};
