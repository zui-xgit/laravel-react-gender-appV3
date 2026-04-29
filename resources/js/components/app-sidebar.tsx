import { Link, usePage } from '@inertiajs/react';
import {
    Activity,
    BookOpen,
    CheckCircle2,
    FilePlus2,
    FolderGit2,
    History,
    Inbox,
    LayoutDashboard,
    LayoutGrid,
    Settings2,
    User2,
    UserCheck,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
// import { NavFooter } from '@/components/nav-footer';
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
import { adminDashboard, reporterReport, reporterTrack } from '@/routes';
import type { NavItem } from '@/types';
import { UsePageProps } from '@/types/types';

const AdminNavItems: NavItem[] = [
    {
        title: 'Overview',
        href: adminDashboard(),
        icon: LayoutDashboard,
    },
    {
        title: 'Personal Assignment',
        href: adminDashboard(),
        icon: UserCheck,
    },
    {
        title: 'Unassigned',
        href: adminDashboard(),
        icon: Inbox,
    },
    {
        title: 'Resolved',
        href: adminDashboard(),
        icon: CheckCircle2,
    },
    {
        title: 'Staff Management',
        href: adminDashboard(),
        icon: User2,
    },
    {
        title: 'Audit Logs',
        href: adminDashboard(),
        icon: History,
    },
    {
        title: 'Settings',
        href: adminDashboard(),
        icon: Settings2,
    },
];

const OfficerNavItems: NavItem[] = [
    {
        title: 'Officer Dashboard',
        href: adminDashboard(),
        icon: LayoutGrid,
    },
];

const ReporterNavItems: NavItem[] = [
    {
        title: 'New Case',
        href: reporterReport(),
        icon: FilePlus2,
    },
    {
        title: 'Track Case',
        href: reporterTrack(),
        icon: Activity,
    },
];

// const footerNavItems: NavItem[] = [
//     {
//         title: 'Repository',
//         href: 'https://github.com/laravel/react-starter-kit',
//         icon: FolderGit2,
//     },
//     {
//         title: 'Documentation',
//         href: 'https://laravel.com/docs/starter-kits#react',
//         icon: BookOpen,
//     },
// ];

export function AppSidebar() {
    const { auth } = usePage<UsePageProps>().props;

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={adminDashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {auth.user ? (
                    <>
                        {auth.user.role === 'admin' && (
                            <NavMain items={AdminNavItems} />
                        )}
                    </>
                ) : (
                    <NavMain items={ReporterNavItems} />
                )}
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}

                {auth.user && <NavUser />}
            </SidebarFooter>
        </Sidebar>
    );
}
