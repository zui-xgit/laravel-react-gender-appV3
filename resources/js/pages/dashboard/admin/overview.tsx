import { Head, router, usePage } from '@inertiajs/react';
import {
    AlertCircle,
    CheckCircle2,
    Clock,
    Filter,
    History,
    UserPlus,
} from 'lucide-react';
import { toast } from 'sonner';
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
import OverviewLogs from '@/components/overview-logs';

import admin from '@/routes/admin';
import type { Log } from '@/types/types';

interface OverviewProps {
    stats: {
        total_cases: string;
        pending: string;
        in_progress: string;
        completed: string;
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
                    {log.causer_name === 'System' ? (
                        <>{log.causer_name}</>
                    ) : (
                        <>
                            [{log.causer_roles.join(', ')}] {log.causer_name}
                        </>
                    )}
                </p>
                <p className="text-sm text-muted-foreground">
                    {log.description}
                </p>
                <p className="flex items-center gap-1 pt-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {/* 5 hours ago */}
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
    const { auth } = usePage().props;

    console.log('PERMISSIONS: ', auth.user.permissions);

    const statsConfig = [
        {
            title: 'Total Cases',
            value: stats.total_cases,
            icon: Clock,
            color: 'text-blue-600',
        },
        {
            title: 'Pending Cases',
            value: stats.pending,
            icon: AlertCircle,
            color: 'text-amber-600',
        },
        {
            title: 'In Progress',
            value: stats.in_progress,
            icon: Filter,
            color: 'text-indigo-600',
        },
        {
            title: 'Completed Cases',
            value: stats.completed,
            icon: CheckCircle2,
            color: 'text-green-600',
        },
    ];

    return (
        <>
            <Head title="Admin Overview" />

            <div className="flex flex-col gap-8 px-4 py-6 md:px-8">
                <div className="flex items-center">
                    <Heading
                        title="Dashboard Overview"
                        description="Key metrics and recent system activity."
                    />
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {statsConfig.map((stat, i) => (
                        // StatisticCard
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
                    {/* TODO:  recent activity (using spatie laravel activity log)*/}

                    <OverviewLogs
                        title="Recent Activity"
                        subtitle="   Latest actions across the platform."
                        logsLink={() => {
                            router.get(admin.auditLogs().url);
                        }}
                        logs={logs}
                    />

                    {/* TODO: system lockdown - system managements */}
                    <Card className="col-span-3 border-none shadow-sm ring-1 ring-border">
                        <CardHeader>
                            <CardTitle>System Management</CardTitle>
                            <CardDescription>
                                Quick administrative actions.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-3">
                            <Button
                                onClick={() => {
                                    router.get(admin.staffManagement().url);
                                }}
                                variant="outline"
                                className="w-full cursor-pointer justify-start transition-colors hover:bg-primary/5 hover:text-primary"
                            >
                                <UserPlus className="mr-3 h-4 w-4" />
                                Add Staff Member
                            </Button>

                            <div className="mt-4 rounded-xl bg-destructive/5 p-4 ring-1 ring-destructive/10">
                                <div className="mb-2 flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4 text-destructive" />
                                    <span className="text-sm font-semibold text-destructive">
                                        Emergency
                                    </span>
                                </div>
                                <p className="mb-3 text-xs text-destructive/80">
                                    Initiate a system-wide lockdown or emergency
                                    broadcast.
                                </p>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    className="w-full cursor-pointer"
                                    onClick={() => {
                                        toast.info(
                                            'This feature is in development',
                                        );
                                    }}
                                >
                                    Lockdown System
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
            href: admin.overview(),
        },
    ],
};
