import { Head, router } from '@inertiajs/react';
import Heading from '@/components/heading';
import officer from '@/routes/officer';
import type { PaginatedData } from '@/types/types';
import type { Log } from '@/types/types';
import LogsCard from '@/components/logs-card';

interface LogsProps {
    logs: PaginatedData<Log>;
    filters: {
        filter?: string;
    };
}

export default function Logs({ logs, filters }: LogsProps) {
    return (
        <>
            <Head title="My Activity Logs" />

            <div className="flex flex-col gap-8 px-4 py-6 md:px-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <Heading
                        title="Personal Activity Logs"
                        description="Track and review your recent actions and system interactions."
                    />
                </div>

                <LogsCard
                    title="Your action History"
                    subtitle="Chronological record of your platform activity"
                    logs={logs}
                    filters={filters}
                    filterRoute={officer.logs()}
                />
            </div>
        </>
    );
}

Logs.layout = {
    breadcrumbs: [
        {
            title: 'Activity Logs',
            href: officer.logs(),
        },
    ],
};
