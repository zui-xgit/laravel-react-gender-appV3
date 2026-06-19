import { Head, router } from '@inertiajs/react';
import {
    AlertCircle,
    CheckCircle2,
    Clock,
    Filter,
    History,
    TrendingUp,
    UserCheck,
} from 'lucide-react';
import Heading from '@/components/heading';
import StatCard from '@/components/stat-card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { formatRelativeTime, getInitials } from '@/lib/helpers';

import general from '@/routes/general';
import officer from '@/routes/officer';
import type { Log } from '@/types/types';

interface OverviewProps {
    stats: {
        total_cases: number;
        pending: number;
        in_progress: number;
        completed: number;
    };
    logs: Log[];
}

const LogDescription = ({ log }: { log: Log }) => {
    return (
        <div className="flex items-start gap-4">
            <Avatar className="h-9 w-9 border ring-offset-2">
                <AvatarFallback className="bg-primary/5 text-xs font-semibold text-primary">
                    {getInitials(log.causer_name)}
                </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
                <p className="text-sm leading-none font-medium">
                    {log.causer_role} {log.causer_name}
                </p>
                <p className="text-sm text-muted-foreground">
                    {log.description}
                </p>
                <p className="flex items-center gap-1 pt-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {formatRelativeTime(log.created_at)}
                </p>
            </div>
            <Badge
                variant="outline"
                className="text-[10px] tracking-wider uppercase"
            >
                Log
            </Badge>
        </div>
    );
};

export default function Overview({ stats, logs }: OverviewProps) {
    const statsConfig = [
        {
            title: 'My Total Assignments',
            value: stats.total_cases.toString(),
            icon: Clock,
            color: 'text-blue-600',
        },
        {
            title: 'Pending Action',
            value: stats.pending.toString(),
            icon: AlertCircle,
            color: 'text-amber-600',
        },
        {
            title: 'In Progress',
            value: stats.in_progress.toString(),
            icon: Filter,
            color: 'text-indigo-600',
        },
        {
            title: 'Completed',
            value: stats.completed.toString(),
            icon: CheckCircle2,
            color: 'text-green-600',
        },
    ];

    return (
        <>
            <Head title="Officer Overview" />

            <div className="flex flex-col gap-8 px-4 py-6 md:px-8">
                <div className="flex items-center">
                    <Heading
                        title="Officer Dashboard"
                        description="Monitor your assigned cases and recent activity."
                    />
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

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-4 border-none shadow-sm ring-1 ring-border">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div className="space-y-1">
                                <CardTitle>My Recent Activity</CardTitle>
                                <CardDescription>
                                    Your latest actions in the system.
                                </CardDescription>
                            </div>
                            <Button
                                onClick={() => {
                                    router.get(officer.logs().url);
                                }}
                                variant="ghost"
                                size="sm"
                                className="text-xs"
                            >
                                <History className="mr-2 h-3 w-3" />
                                View All
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {logs && logs.length > 0 ? (
                                    logs.map((log, index) => (
                                        <LogDescription key={index} log={log} />
                                    ))
                                ) : (
                                    <div className="flex h-32 flex-col items-center justify-center text-center">
                                        <p className="text-sm text-muted-foreground">
                                            No recent activity found.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="col-span-3 border-none shadow-sm ring-1 ring-border">
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                            <CardDescription>
                                Shortcuts to common tasks.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-3">
                            <Button
                                onClick={() => {
                                    router.get(general.assignments().url);
                                }}
                                variant="outline"
                                className="w-full cursor-pointer justify-start transition-colors hover:bg-primary/5 hover:text-primary"
                            >
                                <UserCheck className="mr-3 h-4 w-4" />
                                View My Assignments
                            </Button>
                            <Button
                                onClick={() => {
                                    router.get(officer.report().url);
                                }}
                                variant="outline"
                                className="w-full cursor-pointer justify-start transition-colors hover:bg-primary/5 hover:text-primary"
                            >
                                <TrendingUp className="mr-3 h-4 w-4" />
                                Generate Case Report
                            </Button>

                            <div className="mt-4 rounded-xl bg-primary/5 p-4 ring-1 ring-primary/10">
                                <div className="mb-2 flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-primary" />
                                    <span className="text-sm font-semibold text-primary">
                                        Case Progress
                                    </span>
                                </div>
                                <p className="mb-3 text-xs text-muted-foreground">
                                    Keep your assigned cases updated to ensure
                                    accurate reporting and tracking.
                                </p>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full"
                                    onClick={() =>
                                        router.get(general.assignments().url)
                                    }
                                >
                                    Update Progress
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

Overview.layout = {
    breadcrumbs: [
        {
            title: 'Overview',
            href: officer.overview(),
        },
    ],
};
