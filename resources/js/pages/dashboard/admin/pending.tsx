import { adminPending } from '@/routes';

const Pending = () => {
    return <></>;
};

export default Pending;

Pending.layout = {
    breadcrumbs: [
        {
            title: 'Pending Cases',
            href: adminPending(),
        },
    ],
};
