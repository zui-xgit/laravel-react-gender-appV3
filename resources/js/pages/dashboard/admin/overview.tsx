import { Head } from '@inertiajs/react';
import { adminOverview } from '@/routes';

export default function Overview() {
    return <></>;
}

Overview.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: adminOverview(),
        },
    ],
};
