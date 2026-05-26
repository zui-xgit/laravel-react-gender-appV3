import AppGuestLayout from '@/layouts/app-guest-layout';

interface CaseReportedSuccessfullyProps {
    case_tracking_id: string;
}

export default function CaseReportedSuccessfully({
    case_tracking_id,
}: CaseReportedSuccessfullyProps) {
    return (
        <AppGuestLayout>
            <div className="flex h-screen items-center justify-center">
                <div className="rounded-lg border bg-white p-8 shadow-md">
                    <h2 className="mb-4 text-2xl font-bold">
                        Case Reported Successfully
                    </h2>
                    <p className="mb-6 text-gray-600">
                        Thank you for reporting the case. Your report has been
                        submitted successfully.
                    </p>
                    <p className="text-gray-600">
                        You will receive a tracking ID for your case shortly.
                        Please keep it for future reference.
                    </p>
                </div>
            </div>
        </AppGuestLayout>
    );
}
