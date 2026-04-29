import { Head } from '@inertiajs/react';
import { adminDashboard } from '@/routes';

export default function AdminDashboard() {
    return <></>;
}

AdminDashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: adminDashboard(),
        },
    ],
};
