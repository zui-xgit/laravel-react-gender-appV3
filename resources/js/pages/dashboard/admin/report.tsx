import admin from '@/routes/admin';

const Report = () => {
    return <></>;
};

export default Report;

Report.layout = {
    breadcrumbs: [
        {
            title: 'Report',
            href: admin.report(),
        },
    ],
};
