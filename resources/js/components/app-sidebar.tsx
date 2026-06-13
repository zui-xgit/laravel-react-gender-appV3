import { Link, usePage } from '@inertiajs/react';
import {
    CheckCircle2,
    History,
    Inbox,
    LayoutDashboard,
    LayoutGrid,
    RefreshCw,
    TrendingUp,
    User2,
    UserCheck,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
    adminAssignments,
    adminCompleted,
    adminInProgress,
    adminOverview,
    adminPending,
    auditLogs,
} from '@/routes';
import type { NavItem } from '@/types';
import { UsePageProps } from '@/types/types';
import admin from '@/routes/admin';

const AdminNavItems: NavItem[] = [
    {
        title: 'Overview',
        href: adminOverview(),
        icon: LayoutDashboard,
    },
    {
        title: 'Personal Assignment',
        href: adminAssignments(),
        icon: UserCheck,
    },
    {
        title: 'Cases',
        // empty href since this is collapsible
        href: '',
        icon: Inbox,
        items: [
            {
                title: 'Pending',
                href: adminPending(),
                icon: Inbox,
            },
            {
                title: 'In progress',
                href: adminInProgress(),
                icon: RefreshCw,
            },
            {
                title: 'Completed',
                href: adminCompleted(),
                icon: CheckCircle2,
            },
        ],
    },
    {
        title: 'Data Report',
        href: admin.report(),
        icon: TrendingUp,
    },
    {
        title: 'Staff Management',
        href: admin.staffManagement(),
        icon: User2,
    },
    {
        title: 'Audit Logs',
        href: auditLogs(),
        icon: History,
    },
];

const OfficerNavItems: NavItem[] = [
    {
        title: 'Officer Dashboard',
        href: adminOverview(),
        icon: LayoutGrid,
    },
];

export function AppSidebar() {
    const { auth } = usePage<UsePageProps>().props;

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={adminOverview()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {auth.user.role === 'admin' && (
                    <NavMain items={AdminNavItems} />
                )}
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
