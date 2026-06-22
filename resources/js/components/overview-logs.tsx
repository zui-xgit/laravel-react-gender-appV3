import { formatRelativeTime, getInitials } from '@/lib/helpers';
import { Clock, History } from 'lucide-react';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Log } from '@/types/types';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from './ui/button';

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

const OverviewLogs = ({
    title,
    subtitle,
    logsLink,
    logs,
}: {
    title: string;
    subtitle: string;
    logsLink: () => void;
    logs: Log[];
}) => {
    return (
        <Card className="col-span-4 border-none shadow-sm ring-1 ring-border">
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="space-y-1">
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{subtitle}</CardDescription>
                </div>
                <Button
                    onClick={logsLink}
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
                    {logs.map((log, index) => (
                        <LogDescription key={index} log={log} />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default OverviewLogs;
