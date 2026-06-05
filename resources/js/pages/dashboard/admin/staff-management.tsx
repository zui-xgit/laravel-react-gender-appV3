import { UsePageProps } from '@/types/types';
import { usePage } from '@inertiajs/react';

const StaffManagement = () => {
    const { auth } = usePage<UsePageProps>().props;
    console.log(auth.all_users);
    return <></>;
};

export default StaffManagement;

StaffManagement.layout = {
    breadcrumbs: [
        {
            title: 'Staff Management',
            href: '#',
        },
    ],
};
