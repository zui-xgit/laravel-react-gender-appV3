import { adminAssignments } from '@/routes';

const PersonalAssignments = () => {
    return <></>;
};

export default PersonalAssignments;

PersonalAssignments.layout = {
    breadcrumbs: [
        {
            title: 'Pending Cases',
            href: adminAssignments(),
        },
    ],
};
