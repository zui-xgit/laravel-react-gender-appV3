import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    BadgeAlert,
    Clock,
    Download,
    Edit2,
    Mail,
    MoreHorizontal,
    Phone,
    Plus,
    ShieldAlert,
    ShieldCheck,
    Trash2,
    UserMinus,
    UserPlus,
    UserRoundSearch,
    Users,
    UserX,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import ConfirmationDialog from '@/components/dialogs/confirmation-dialog';
import StaffDialog from '@/components/dialogs/staff-dialog';
import Heading from '@/components/heading';
import { PortalLoader } from '@/components/portal-loader';
import RefreshButton from '@/components/refresh-button';
import SearchInput from '@/components/search-input';
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { formatDate, formatTime } from '@/lib/helpers';
import admin from '@/routes/admin';
import { edit } from '@/routes/profile';
import type { StaffMember, UsePageProps } from '@/types/types';
// import { fa } from 'zod/v4/locales';

interface StaffManagementProps {
    staff_members: StaffMember[];
    stats: {
        total: number;
        admins: number;
        officers: number;
        suspended: number;
    };
    filters: {
        search?: string;
        role?: string;
        status?: string;
    };
}

// Define a safe type for our modal configuration
interface DialogState {
    uuid: string;
    type: 'activate' | 'suspend';
}

export default function StaffManagement({
    staff_members,
    stats,
    filters,
}: StaffManagementProps) {
    const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(
        null,
    );

    const { auth } = usePage<UsePageProps>().props;

    const handleFilterChange = (key: string, value: string) => {
        router.get(
            admin.staffManagement(),
            { ...filters, [key]: value === 'all' ? '' : value },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    };

    const statsConfig = [
        {
            title: 'Total Staff',
            value: stats.total.toString(),
            icon: Users,
            color: 'text-blue-600',
        },
        {
            title: 'Administrators',
            value: stats.admins.toString(),
            icon: ShieldCheck,
            color: 'text-indigo-600',
        },
        {
            title: 'Field Officers',
            value: stats.officers.toString(),
            icon: ShieldAlert,
            color: 'text-amber-600',
        },
        {
            title: 'Suspended',
            value: stats.suspended.toString(),
            icon: UserX,
            color: 'text-destructive',
        },
    ];

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'active':
                return (
                    <Badge className="border-none bg-green-100 text-green-700 shadow-none hover:bg-green-100">
                        Active
                    </Badge>
                );
            case 'inactive':
                return (
                    <Badge variant="secondary" className="shadow-none">
                        Inactive
                    </Badge>
                );
            case 'suspended':
                return (
                    <Badge variant="destructive" className="shadow-none">
                        Suspended
                    </Badge>
                );
            default:
                return (
                    <Badge variant="outline" className="capitalize shadow-none">
                        {status}
                    </Badge>
                );
        }
    };

    const handleAddStaff = () => {
        setSelectedStaff(null);
        setIsStaffModalOpen(true);
    };

    const handleUpdateStaff = (staffMember: StaffMember) => {
        setSelectedStaff(staffMember);
        setIsStaffModalOpen(true);
    };

    const [onConfirmSuspendStaff, setOnConfirmSuspendStaff] = useState<
        (() => void) | null
    >(null);
    const [onConfirmActivateStaff, setOnConfirmActivateStaff] = useState<
        (() => void) | null
    >(null);

    const [onConfirmDeactivateStaff, setOnConfirmDeactivateStaff] = useState<
        (() => void) | null
    >(null);

    const [processing, setProcessing] = useState(false);

    const handleSuspendStaff = (uuid: string) => {
        setOnConfirmSuspendStaff(() => () => {
            router.post(
                admin.suspendStaff({ user: uuid }).url,
                {},
                {
                    preserveScroll: true,
                    onStart: () => setProcessing(true),
                    onFinish: () => {
                        setProcessing(false);
                    },
                },
            );
            setOnConfirmSuspendStaff(null);
        });
    };

    const handleActivateStaff = (uuid: string) => {
        setOnConfirmActivateStaff(() => () => {
            router.post(
                admin.activateStaff({ user: uuid }).url,
                {},
                {
                    preserveScroll: true,
                    onStart: () => setProcessing(true),
                    onFinish: () => {
                        setProcessing(false);
                    },
                },
            );
            setOnConfirmActivateStaff(null);
        });
    };

    const handleHandleDeactivateStaff = (uuid: string) => {
        setOnConfirmDeactivateStaff(() => () => {
            router.post(
                admin.deactivateStaff({ user: uuid }).url,
                {},
                {
                    preserveScroll: true,
                    onStart: () => setProcessing(true),
                    onFinish: () => {
                        setProcessing(false);
                    },
                },
            );
            setOnConfirmDeactivateStaff(null);
        });
    };

    const handleRemoveStaff = (uuid: string) => {
        toast.info(
            'Feature is in progress. It will be available in future versions. If you still need to remove this staff member, contact IT management',
        );
    };

    return (
        <>
            {processing && <PortalLoader />}
            <ConfirmationDialog
                isOpen={onConfirmSuspendStaff !== null}
                onClose={() => setOnConfirmSuspendStaff(null)}
                onConfirm={onConfirmSuspendStaff || (() => {})}
                title="Confirm Action"
                description="Are you sure you want to proceed with suspending this staff member ?"
                confirmText="Yes, Proceed"
                variant="destructive"
            />
            <ConfirmationDialog
                isOpen={onConfirmDeactivateStaff !== null}
                onClose={() => setOnConfirmDeactivateStaff(null)}
                onConfirm={onConfirmDeactivateStaff || (() => {})}
                title="Confirm Action"
                description="Are you sure you want to proceed with Deactivating this staff member ?"
                confirmText="Yes, Proceed"
                variant="destructive"
            />

            <ConfirmationDialog
                isOpen={onConfirmActivateStaff !== null}
                onClose={() => setOnConfirmActivateStaff(null)}
                onConfirm={onConfirmActivateStaff || (() => {})}
                title="Confirm Action"
                description="Are you sure you want to proceed with this staff modification?"
                confirmText="Yes, Proceed"
            />
            <Head title="Staff Management" />

            <div className="flex flex-col gap-8 px-4 py-6 md:px-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-row items-center gap-3">
                        <Heading
                            title="Staff Management"
                            description="View and manage system administrators and field reporting officers."
                        />
                    </div>
                    <div className="flex items-center">
                        <Button
                            size="sm"
                            onClick={handleAddStaff}
                            className="cursor-pointer"
                        >
                            <UserPlus className="mr-2 h-4 w-4" />
                            Add New Staff
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
                                <CardTitle>Personnel Directory</CardTitle>
                                <CardDescription>
                                    Manage account access and roles
                                </CardDescription>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                <SearchInput
                                    href={admin.staffManagement()}
                                    filters={filters}
                                />
                                <Select
                                    value={filters?.role || 'all'}
                                    onValueChange={(v) =>
                                        handleFilterChange('role', v)
                                    }
                                >
                                    <SelectTrigger className="w-[130px]">
                                        <SelectValue placeholder="Role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            All Roles
                                        </SelectItem>
                                        <SelectItem value="admin">
                                            Admin
                                        </SelectItem>
                                        <SelectItem value="officer">
                                            Officer
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select
                                    value={filters?.status || 'all'}
                                    onValueChange={(v) =>
                                        handleFilterChange('status', v)
                                    }
                                >
                                    <SelectTrigger className="w-[130px]">
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            All Status
                                        </SelectItem>
                                        <SelectItem value="active">
                                            Active
                                        </SelectItem>
                                        <SelectItem value="inactive">
                                            Inactive
                                        </SelectItem>
                                        <SelectItem value="suspended">
                                            Suspended
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <RefreshButton href={admin.staffManagement()} />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/30 hover:bg-muted/30">
                                    <TableHead className="w-[300px]">
                                        Staff Member
                                    </TableHead>
                                    <TableHead>Role & Department</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Last Activity</TableHead>
                                    <TableHead className="text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {staff_members.length > 0 ? (
                                    staff_members.map((member) => (
                                        <TableRow
                                            key={member.uuid}
                                            className="group transition-colors hover:bg-muted/20"
                                        >
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
                                                        <AvatarFallback className="bg-primary/5 text-xs font-bold text-primary uppercase">
                                                            {
                                                                member
                                                                    .first_name[0]
                                                            }
                                                            {
                                                                member
                                                                    .last_name[0]
                                                            }
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex flex-col">
                                                        <span className="mb-1 text-sm leading-none font-semibold text-foreground">
                                                            {member.first_name}{' '}
                                                            {member.last_name}{' '}
                                                            {auth.user.uuid ===
                                                                member.uuid && (
                                                                <>
                                                                    <Badge
                                                                        variant="default"
                                                                        className="ml-1.5 border-none bg-emerald-600 text-[13px] font-bold text-white shadow-sm hover:bg-emerald-600"
                                                                    >
                                                                        You
                                                                    </Badge>
                                                                </>
                                                            )}
                                                        </span>
                                                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                                            <Mail className="h-3 w-3" />
                                                            {member.email}
                                                        </span>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="text-sm font-medium capitalize">
                                                        {member.role}
                                                    </span>
                                                    <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                                                        {member.role === 'admin'
                                                            ? 'Management'
                                                            : 'Operations'}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {getStatusBadge(member.status)}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                <div className="flex flex-col gap-1 text-xs">
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="w-12 font-medium">
                                                            Login:
                                                        </span>
                                                        <span>
                                                            {member.last_login_at
                                                                ? `${formatDate(member.last_login_at)} ${formatTime(member.last_login_at)}`
                                                                : 'Never'}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="w-12 font-medium">
                                                            Logout:
                                                        </span>
                                                        <span>
                                                            {member.last_logout_at
                                                                ? `${formatDate(member.last_logout_at)} ${formatTime(member.last_logout_at)}`
                                                                : '--'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger
                                                        asChild
                                                    >
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 cursor-pointer rounded-full"
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent
                                                        align="end"
                                                        className="w-[180px]"
                                                    >
                                                        {auth.user.uuid ===
                                                        member.uuid ? (
                                                            <>
                                                                <DropdownMenuLabel>
                                                                    Your Account
                                                                </DropdownMenuLabel>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem className="cursor-pointer">
                                                                    <Link
                                                                        href={edit()}
                                                                        prefetch
                                                                        className="flex items-center gap-2"
                                                                    >
                                                                        <UserRoundSearch className="mr-2 h-4 w-4" />
                                                                        View
                                                                        Profile
                                                                    </Link>
                                                                </DropdownMenuItem>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <DropdownMenuLabel>
                                                                    Staff
                                                                    Actions
                                                                </DropdownMenuLabel>
                                                                <DropdownMenuItem
                                                                    onClick={() =>
                                                                        handleUpdateStaff(
                                                                            member,
                                                                        )
                                                                    }
                                                                    className="cursor-pointer"
                                                                >
                                                                    <Edit2 className="mr-2 h-4 w-4" />
                                                                    Edit Profile
                                                                </DropdownMenuItem>

                                                                <DropdownMenuSeparator />

                                                                {/* 1. If user is ACTIVE, show Suspend option */}
                                                                {member.status ===
                                                                    'active' && (
                                                                    <>
                                                                        <DropdownMenuItem
                                                                            onClick={() =>
                                                                                handleSuspendStaff(
                                                                                    member.uuid,
                                                                                )
                                                                            }
                                                                            className="cursor-pointer text-amber-600 focus:text-amber-600"
                                                                        >
                                                                            <UserX className="mr-2 h-4 w-4" />
                                                                            Suspend
                                                                            Account
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem
                                                                            onClick={() =>
                                                                                handleHandleDeactivateStaff(
                                                                                    member.uuid,
                                                                                )
                                                                            }
                                                                            className="cursor-pointer text-amber-600 focus:text-amber-600"
                                                                        >
                                                                            {/* <UserX className="mr-2 h-4 w-4" /> */}
                                                                            <UserMinus className="mr-2 h-4 w-4" />
                                                                            Deactivate
                                                                            member
                                                                        </DropdownMenuItem>
                                                                    </>
                                                                )}

                                                                {/* 2. If user is INACTIVE, show Activate option */}
                                                                {member.status ===
                                                                    'inactive' && (
                                                                    <DropdownMenuItem
                                                                        onClick={() =>
                                                                            handleActivateStaff(
                                                                                member.uuid,
                                                                            )
                                                                        }
                                                                        className="cursor-pointer text-green-600 focus:text-green-600"
                                                                    >
                                                                        <ShieldCheck className="mr-2 h-4 w-4" />
                                                                        Activate
                                                                        Account
                                                                    </DropdownMenuItem>
                                                                )}

                                                                {/* 3. If user is SUSPENDED, show Active Access option */}
                                                                {member.status ===
                                                                    'suspended' && (
                                                                    <DropdownMenuItem
                                                                        onClick={() =>
                                                                            handleActivateStaff(
                                                                                member.uuid,
                                                                            )
                                                                        }
                                                                        className="cursor-pointer text-green-600 focus:text-green-600"
                                                                    >
                                                                        <ShieldCheck className="mr-2 h-4 w-4" />
                                                                        Active
                                                                        Access
                                                                    </DropdownMenuItem>
                                                                )}
                                                                <DropdownMenuItem
                                                                    onClick={() =>
                                                                        handleRemoveStaff(
                                                                            member.uuid,
                                                                        )
                                                                    }
                                                                    className="cursor-pointer text-destructive focus:bg-destructive/5 focus:text-destructive"
                                                                >
                                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                                    Remove Staff
                                                                </DropdownMenuItem>
                                                            </>
                                                        )}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={5}
                                            className="h-40 text-center"
                                        >
                                            <div className="flex flex-col items-center justify-center text-muted-foreground">
                                                <Users className="mb-2 h-8 w-8 opacity-20" />
                                                <p className="text-sm font-medium">
                                                    No staff members found.
                                                </p>
                                                <p className="text-xs">
                                                    Try adjusting your filters
                                                    or search query.
                                                </p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <StaffDialog
                open={isStaffModalOpen}
                onOpenChange={setIsStaffModalOpen}
                staffMember={selectedStaff}
            />
        </>
    );
}

StaffManagement.layout = {
    breadcrumbs: [
        {
            title: 'Staff Management',
            href: admin.staffManagement(),
        },
    ],
};
