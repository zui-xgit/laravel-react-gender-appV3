import { adminCompleted } from '@/routes';

const Completed = () => {
    return <></>;
};

export default Completed;

Completed.layout = {
    breadcrumbs: [
        {
            title: 'Completed Cases',
            href: adminCompleted(),
        },
    ],
};
