import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
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
import { Head, router } from '@inertiajs/react';
import {
    ChevronDown,
    ChevronRight,
    ClipboardList,
    Monitor,
} from 'lucide-react';
import { formatDate, formatTime } from '@/lib/helpers';
import RefreshButton from '@/components/refresh-button';
import BackButton from '@/components/back-button';
import { PaginatedData } from '@/types/types';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Log } from '@/types/types';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import admin from '@/routes/admin';
import { auditLogs } from '@/routes';
import { Spinner } from '@/components/ui/spinner';

interface AuditLogsProps {
    logs: PaginatedData<Log>;
    filters: {
        filter?: string;
    };
}

const LogPlatformProperties = ({ log }: { log: Log }) => {
    // 1. Guard clause: Return early if no properties exist
    if (!log.properties) {
        return null;
    }
    const { ip, userAgent } = log.properties;

    // 2. Return early if neither ip nor userAgent are present in the payload
    if (!ip && !userAgent) {
        return null;
    }

    return (
        <div className="mt-1 flex flex-wrap items-center gap-2">
            {/* IP Address Badge */}
            {ip && (
                <div className="inline-flex items-center gap-1 rounded border border-muted bg-muted/60 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                    <span className="font-semibold uppercase opacity-70">
                        IP:
                    </span>
                    <span className="text-foreground">{String(ip)}</span>
                </div>
            )}

            {/* User Agent / Browser Badge */}
            {userAgent && (
                <div
                    className="inline-flex max-w-[280px] items-center gap-1 truncate rounded border border-muted bg-muted/60 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground"
                    title={String(userAgent)} // Shows full user agent string on hover
                >
                    <span className="font-semibold uppercase opacity-70">
                        Agent:
                    </span>
                    <span className="truncate text-foreground">
                        {String(userAgent)}
                    </span>
                </div>
            )}
        </div>
    );
};

const LogAttributeChanges = ({ log }: { log: Log }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
            {/* Trigger Button to handle sliding state */}
            <CollapsibleTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="mb-1 h-6 gap-1 px-0 text-xs font-medium text-muted-foreground hover:text-foreground"
                >
                    <span>{isOpen ? 'Hide changes' : 'View changes'}</span>
                    <ChevronDown
                        className={`h-3 w-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                </Button>
            </CollapsibleTrigger>

            {/* Sliding Container wrapping your exact code */}
            <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                    {Object.keys(log.attribute_changes.attributes).map(
                        (key, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-1.5 text-[11px]"
                            >
                                <span className="font-bold text-muted-foreground uppercase">
                                    {key}:
                                </span>
                                <span className="text-muted-foreground/60 line-through">
                                    {String(log.attribute_changes.old?.[key])}
                                </span>
                                <ChevronRight className="h-3 w-3 text-muted-foreground/60" />
                                <span className="font-medium text-foreground">
                                    {String(
                                        log.attribute_changes.attributes?.[key],
                                    )}
                                </span>
                            </div>
                        ),
                    )}
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
};
const LogDescription = ({ log, causer }: { log: Log; causer: string }) => {
    return (
        <span className="text-sm font-semibold text-foreground">
            {log.description}{' '}
            {log.log_name === 'users-table' && <> - By {causer}</>}
        </span>
    );
};

const LogProperties = ({ log, causer }: { log: Log; causer: string }) => {
    const assignedToNameAndRole: string = `${log.properties.assigned_to_name}  (${log.properties.assigned_to_role})`;
    const subjectName: string = `${log.subject?.first_name} ${log.subject?.last_name}`;
    return (
        <span className="text-xs text-foreground">
            {log.log_name === 'case-assigned' && (
                <>
                    Assigned To: {assignedToNameAndRole}
                    <div></div>
                    Assigned By: {causer}
                </>
            )}
            {log.log_name === 'auth' && log.event === 'login' && (
                <>Login by: {causer}</>
            )}
            {log.log_name === 'auth' && log.event === 'logout' && (
                <>Logout by: {causer}</>
            )}
            {log.event === 'workflow' && <> By: {causer}</>}
            {log.log_name === 'users-table' && log.event === 'updated' && (
                <>updated user: {subjectName} </>
            )}
            {log.log_name === 'users-table' && log.event === 'created' && (
                <>created user: {subjectName} </>
            )}
        </span>
    );
};

export default function AuditLogs({ logs, filters }: AuditLogsProps) {
    const [filterLoading, setFilterLoading] = useState(false);
    // Helper to get event badge
    const getLogEventBadge = (event: Log['event']) => {
        switch (event) {
            case 'created':
                return (
                    <Badge className="border-none bg-green-100 text-green-700 shadow-none hover:bg-green-100">
                        Created
                    </Badge>
                );
            case 'updated':
                return (
                    <Badge className="border-none bg-blue-100 text-blue-700 shadow-none hover:bg-blue-100">
                        Updated
                    </Badge>
                );
            case 'deleted':
                return (
                    <Badge variant="destructive" className="shadow-none">
                        Deleted
                    </Badge>
                );
            case 'login':
                return (
                    <Badge className="border-none bg-indigo-100 text-indigo-700 shadow-none hover:bg-indigo-100">
                        Login
                    </Badge>
                );
            case 'logout':
                return (
                    <Badge className="border-none bg-amber-100 text-amber-700 shadow-none hover:bg-amber-100">
                        Logout
                    </Badge>
                );
            default:
                return (
                    <Badge variant="outline" className="capitalize shadow-none">
                        Action
                    </Badge>
                );
        }
    };

    const handleFilterChange = (value: string) => {
        router.get(
            auditLogs(),
            { ...filters, filter: value === 'all' ? '' : value },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
                onStart: () => setFilterLoading(true),
                onFinish: () => setFilterLoading(false),
            },
        );
    };

    return (
        <>
            <Head title="Audit Logs" />

            <div className="flex flex-col gap-8 px-4 py-6 md:px-8">
                {/* Page Header - Perfectly matched with staff-management.tsx */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-row items-center gap-3">
                        <BackButton />
                        <Heading
                            title="System Audit Logs"
                            description="Monitor and track all administrative actions and system security events."
                        />
                    </div>
                </div>

                {/* Main Content Card */}
                <Card className="border-none shadow-sm ring-1 ring-border">
                    <CardHeader>
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div className="space-y-1">
                                <CardTitle>Activity History</CardTitle>
                                <CardDescription>
                                    Detailed trail of system modifications
                                </CardDescription>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                {filterLoading && (
                                    <>
                                        <div className="">
                                            <Spinner className="h-4 w-4" />
                                        </div>
                                    </>
                                )}
                                <Select
                                    defaultValue="all"
                                    onValueChange={handleFilterChange}
                                >
                                    <SelectTrigger className="w-[150px]">
                                        <SelectValue placeholder="All Events" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            All Events
                                        </SelectItem>
                                        <SelectItem value="login">
                                            Login
                                        </SelectItem>
                                        <SelectItem value="action">
                                            Actions
                                        </SelectItem>
                                        <SelectItem value="logout">
                                            Logout
                                        </SelectItem>
                                        <SelectItem value="created">
                                            Created
                                        </SelectItem>
                                        <SelectItem value="updated">
                                            Updated
                                        </SelectItem>
                                        <SelectItem value="deleted">
                                            Deleted
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <RefreshButton href={auditLogs()} />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/30 hover:bg-muted/30">
                                    <TableHead>#</TableHead>
                                    <TableHead className="w-[120px]">
                                        Event Type
                                    </TableHead>
                                    <TableHead className="min-w-[400px]">
                                        Description & Data Changes
                                    </TableHead>
                                    <TableHead>Platform</TableHead>
                                    <TableHead className="text-right">
                                        Timestamp
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {logs.data.length > 0 ? (
                                    logs.data.map((log, index) => {
                                        const causer = `${log.causer_name} (${log.causer_role})`;
                                        return (
                                            <TableRow
                                                key={index}
                                                className="group transition-colors hover:bg-muted/20"
                                            >
                                                <TableCell>
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell>
                                                    {getLogEventBadge(
                                                        log.event,
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col gap-1 py-1">
                                                        <LogDescription
                                                            log={log}
                                                            causer={causer}
                                                        />
                                                        <LogProperties
                                                            log={log}
                                                            causer={causer}
                                                        />

                                                        {/* Simple Data Changes - No Badges */}
                                                        {log.attribute_changes
                                                            .attributes && (
                                                            <LogAttributeChanges
                                                                log={log}
                                                            />
                                                        )}
                                                    </div>
                                                </TableCell>

                                                <TableCell>
                                                    <LogPlatformProperties
                                                        log={log}
                                                    />
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex flex-col gap-0.5 text-xs text-muted-foreground">
                                                        <span className="font-semibold text-foreground">
                                                            {formatDate(
                                                                log.created_at,
                                                            )}
                                                        </span>
                                                        <span>
                                                            {formatTime(
                                                                log.created_at,
                                                            )}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={4}
                                            className="h-40 text-center"
                                        >
                                            <div className="flex flex-col items-center justify-center text-muted-foreground">
                                                <ClipboardList className="mb-2 h-10 w-10 opacity-20" />
                                                <p className="text-sm font-medium">
                                                    No activity records found.
                                                </p>
                                                <p className="text-xs">
                                                    Logs will appear here as
                                                    system events occur.
                                                </p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                    {logs.total > 0 && (
                        <CardFooter className="flex items-center justify-between border-t px-6 py-3">
                            <p className="text-xs text-muted-foreground">
                                Showing{' '}
                                <strong>
                                    {logs.from || 0}-{logs.to || 0}
                                </strong>{' '}
                                of <strong>{logs.total}</strong> logs
                            </p>
                            <div className="flex gap-2">
                                {logs.links.map((link, i) => {
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

// Layout Breadcrumb Assignment
AuditLogs.layout = {
    breadcrumbs: [
        {
            title: 'Audit Logs',
            href: '#',
        },
    ],
};
