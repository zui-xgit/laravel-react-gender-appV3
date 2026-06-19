import { usePage } from '@inertiajs/react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getInitials } from '@/lib/helpers';
import type { UsePageProps } from '@/types/types';
import { UserMenuContent } from './user-menu-content';

const UserProfileDropdown = () => {
    const { auth } = usePage<UsePageProps>().props;

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="cursor-pointer">
                    <button className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-sm font-semibold text-white shadow-md transition-transform hover:scale-105 hover:bg-slate-700">
                        {getInitials(auth.user.full_name)}
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                    align="end"
                >
                    <UserMenuContent user={auth.user} />
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default UserProfileDropdown;
