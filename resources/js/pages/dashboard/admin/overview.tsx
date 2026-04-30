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
import { adminOverview } from '@/routes';
import { AdminOverviewStats } from '@/types/types';
import { Head } from '@inertiajs/react';
import {
    Activity,
    AlertCircle,
    CheckCircle2,
    Clock,
    Filter,
    History,
    Plus,
    ShieldAlert,
    TrendingUp,
    UserPlus,
    Users,
} from 'lucide-react';

const recentActivities = [
    {
        id: 1,
        user: 'Officer Sarah Chen',
        action: 'updated case status',
        target: '#GBV-2024-089',
        time: '12 minutes ago',
        avatar: 'SC',
    },
    {
        id: 2,
        user: 'Admin Michael Ross',
        action: 'assigned a new officer to',
        target: '#GBV-2024-092',
        time: '45 minutes ago',
        avatar: 'MR',
    },
    {
        id: 3,
        user: 'System',
        action: 'generated weekly report',
        target: 'April Week 4',
        time: '2 hours ago',
        avatar: 'SYS',
    },
    {
        id: 4,
        user: 'Officer David Kim',
        action: 'closed case',
        target: '#GBV-2024-045',
        time: '5 hours ago',
        avatar: 'DK',
    },
];

export default function Overview({ stats }: AdminOverviewStats) {
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
                <div className="flex items-center justify-between">
                    <Heading
                        title="Dashboard Overview"
                        description="Key metrics and recent system activity."
                    />
                    <div className="flex items-center gap-2">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            New Case
                        </Button>
                    </div>
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
                    <Card className="col-span-4 border-none shadow-sm ring-1 ring-border">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div className="space-y-1">
                                <CardTitle>Recent Activity</CardTitle>
                                <CardDescription>
                                    Latest actions across the platform.
                                </CardDescription>
                            </div>
                            <Button
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
                                {recentActivities.map((activity) => (
                                    <div
                                        key={activity.id}
                                        className="flex items-start gap-4"
                                    >
                                        <Avatar className="h-9 w-9 border ring-offset-2">
                                            <AvatarFallback className="bg-primary/5 text-xs font-semibold text-primary">
                                                {activity.avatar}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 space-y-1">
                                            <p className="text-sm leading-none font-medium">
                                                {activity.user}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {activity.action}{' '}
                                                <span className="font-semibold text-foreground">
                                                    {activity.target}
                                                </span>
                                            </p>
                                            <p className="flex items-center gap-1 pt-1 text-xs text-muted-foreground">
                                                <Clock className="h-3 w-3" />
                                                {activity.time}
                                            </p>
                                        </div>
                                        <Badge
                                            variant="outline"
                                            className="text-[10px] tracking-wider uppercase"
                                        >
                                            Log
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

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
                                variant="outline"
                                className="w-full justify-start transition-colors hover:bg-primary/5 hover:text-primary"
                            >
                                <UserPlus className="mr-3 h-4 w-4" />
                                Add Staff Member
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full justify-start transition-colors hover:bg-primary/5 hover:text-primary"
                            >
                                <ShieldAlert className="mr-3 h-4 w-4" />
                                Role Permissions
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full justify-start transition-colors hover:bg-primary/5 hover:text-primary"
                            >
                                <Activity className="mr-3 h-4 w-4" />
                                System Health
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
                                    className="w-full"
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
            href: adminOverview(),
        },
    ],
};
