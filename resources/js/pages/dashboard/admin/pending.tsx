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
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { adminPending } from '@/routes';
import { Head } from '@inertiajs/react';
import {
    AlertCircle,
    Calendar,
    Clock,
    Download,
    Eye,
    Filter,
    MoreHorizontal,
    Search,
    ShieldCheck,
    UserPlus,
} from 'lucide-react';

const pendingCases = [
    {
        id: 'GBV-2024-105',
        title: 'Verbal Harassment - Office A',
        isAnonymous: false,
        date: '2024-04-29',
        time: '10:30 AM',
    },
    {
        id: 'GBV-2024-106',
        title: 'Physical Intimidation',
        isAnonymous: true,
        date: '2024-04-29',
        time: '11:15 AM',
    },
    {
        id: 'GBV-2024-107',
        title: 'Cyber Bullying Report',
        isAnonymous: false,
        date: '2024-04-28',
        time: '02:45 PM',
    },
    {
        id: 'GBV-2024-108',
        title: 'Unfair Treatment Claim',
        isAnonymous: true,
        date: '2024-04-28',
        time: '04:20 PM',
    },
    {
        id: 'GBV-2024-109',
        title: 'Domestic Abuse Assistance',
        isAnonymous: false,
        date: '2024-04-27',
        time: '09:00 AM',
    },
];

const stats = [
    {
        title: 'Total Pending',
        value: '12',
        icon: Clock,
        color: 'text-amber-600',
    },
    {
        title: 'Identified',
        value: '3',
        icon: AlertCircle,
        color: 'text-destructive',
    },
    {
        title: 'Anonymous',
        value: '5',
        icon: ShieldCheck,
        color: 'text-indigo-600',
    },
    {
        title: 'Reported Today',
        value: '2',
        icon: Calendar,
        color: 'text-blue-600',
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

export default function Pending() {
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
                    {stats.map((stat, i) => (
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
                                <div className="relative">
                                    <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search cases..."
                                        className="w-[200px] pl-8 md:w-[300px]"
                                    />
                                </div>
                                <Select defaultValue="all">
                                    <SelectTrigger className="w-[130px]">
                                        <SelectValue placeholder="Priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All</SelectItem>
                                        <SelectItem value="high">
                                            Identified
                                        </SelectItem>
                                        <SelectItem value="medium">
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
                                    {pendingCases.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                                        >
                                            <td className="p-4 align-middle font-medium">
                                                {item.id}
                                            </td>
                                            <td className="p-4 align-middle">
                                                <span className="font-medium">
                                                    {item.title}
                                                </span>
                                            </td>

                                            <td className="p-4 align-middle">
                                                {item.isAnonymous ? (
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
                                                    <span>{item.date}</span>
                                                    <span>{item.time}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 text-right align-middle">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="h-8 gap-1"
                                                    >
                                                        <UserPlus className="h-3.5 w-3.5" />
                                                        Assign
                                                    </Button>
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
                                <strong>12</strong> pending cases
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

Pending.layout = {
    breadcrumbs: [
        {
            title: 'Pending Cases',
            href: adminPending(),
        },
    ],
};
