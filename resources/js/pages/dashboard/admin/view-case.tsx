import { adminPending, adminViewCase } from '@/routes';
import { ViewCaseDetail } from '@/types/types';

interface ViewCaseProps {
    caseData: ViewCaseDetail;
}

const ViewCase = ({ caseData }: ViewCaseProps) => {
    return <></>;
};

export default ViewCase;

ViewCase.layout = {
    breadcrumbs: [
        {
            title: 'Pending Cases',
            href: adminPending(),
        },
        {
            title: 'View Case',
            href: '#',
        },
    ],
};
