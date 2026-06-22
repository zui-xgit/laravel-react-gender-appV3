import { Link, router, usePage } from '@inertiajs/react';
import { CircleUser, LogOut, Settings } from 'lucide-react';
import { toast } from 'sonner';
import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { UserInfo } from '@/components/user-info';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { logout } from '@/routes';
import officer from '@/routes/officer';
import { edit } from '@/routes/profile';
import type { User } from '@/types';
import type { UsePageProps } from '@/types/types';

type Props = {
    user: User;
};

export function UserMenuContent({ user }: Props) {
    const cleanup = useMobileNavigation();

    const { auth } = usePage<UsePageProps>().props;

    const isAdmin = auth.user.roles.includes('admin');
    const isOfficer = auth.user.roles.includes('officer');

    const handleLogout = () => {
        cleanup();
        router.flushAll();
        toast.success('Logged out successfully');
    };

    return (
        <>
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <UserInfo user={user} showEmail={true} />
                </div>
            </DropdownMenuLabel>

            {isAdmin && (
                <>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                            <Link
                                className="block w-full cursor-pointer"
                                href={edit()}
                                prefetch
                                onClick={cleanup}
                            >
                                <Settings className="mr-2" />
                                Settings
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </>
            )}
            {isOfficer && (
                <>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                            <Link
                                className="block w-full cursor-pointer"
                                href={officer.profile()}
                                prefetch
                                onClick={cleanup}
                            >
                                <CircleUser className="mr-2" />
                                Profile
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link
                    className="block w-full cursor-pointer"
                    href={logout()}
                    as="button"
                    onClick={handleLogout}
                    data-test="logout-button"
                >
                    <LogOut className="mr-2" />
                    Log out
                </Link>
            </DropdownMenuItem>
        </>
    );
}
