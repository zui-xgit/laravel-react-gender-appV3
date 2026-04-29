import { adminInProgress } from '@/routes';

const InProgress = () => {
    return <></>;
};

export default InProgress;

InProgress.layout = {
    breadcrumbs: [
        {
            title: 'In Progress',
            href: adminInProgress(),
        },
    ],
};
