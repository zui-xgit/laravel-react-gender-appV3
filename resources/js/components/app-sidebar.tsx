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

import admin from '@/routes/admin';
import general from '@/routes/general';
import officer from '@/routes/officer';
import type { NavItem } from '@/types';
import type { UsePageProps } from '@/types/types';

const AdminNavItems: NavItem[] = [
    {
        title: 'Overview',
        href: admin.overview(),
        icon: LayoutDashboard,
    },
    {
        title: 'Personal Assignments',
        href: general.assignments(),

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
                href: admin.pending(),
                icon: Inbox,
            },
            {
                title: 'In progress',
                href: admin.inProgress(),
                icon: RefreshCw,
            },
            {
                title: 'Completed',
                href: admin.completed(),
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
        href: admin.auditLogs(),
        icon: History,
    },
];

const OfficerNavItems: NavItem[] = [
    {
        title: 'Overview',
        href: officer.overview(),
        icon: LayoutGrid,
    },
    {
        title: 'Assignments',
        href: general.assignments(),
        icon: UserCheck,
    },
    {
        title: 'Report',
        href: officer.report(),
        icon: TrendingUp,
    },
    {
        title: 'Logs',
        href: officer.logs(),
        icon: History,
    },
];

export function AppSidebar() {
    const { auth } = usePage<UsePageProps>().props;
    const route =
        auth.user.role === 'admin' ? admin.overview() : officer.overview();
    const navItems =
        auth.user.role === 'admin' ? AdminNavItems : OfficerNavItems;

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={route} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={navItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
