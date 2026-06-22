import { Head } from '@inertiajs/react';

import Heading from '@/components/heading';

import admin from '@/routes/admin';
import type { PaginatedData } from '@/types/types';
import type { Log } from '@/types/types';
import LogsCard from '@/components/logs-card';

interface AuditLogsProps {
    logs: PaginatedData<Log>;
    filters: {
        filter?: string;
    };
}

export default function AuditLogs({ logs, filters }: AuditLogsProps) {
    return (
        <>
            <Head title="Audit Logs" />

            <div className="flex flex-col gap-8 px-4 py-6 md:px-8">
                {/* Page Header - Perfectly matched with staff-management.tsx */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-row items-center gap-3">
                        <Heading
                            title="System Audit Logs"
                            description="Monitor and track all administrative actions and system security events."
                        />
                    </div>
                </div>

                <LogsCard
                    title="Activity History "
                    subtitle=" Detailed trail of system modifications"
                    logs={logs}
                    filters={filters}
                    filterRoute={admin.auditLogs()}
                />
            </div>
        </>
    );
}

// Layout Breadcrumb Assignment
AuditLogs.layout = {
    breadcrumbs: [
        {
            title: 'Audit Logs',
            href: '#',
        },
    ],
};
