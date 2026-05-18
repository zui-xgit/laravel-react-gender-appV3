import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({ children }: AuthLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col bg-[#f8fafc]">
            {/* Info Banner */}
            <div className="relative bg-[#2563eb] px-6 py-2 text-center text-[11px] font-light text-white sm:py-3 sm:text-sm">
                <span className="inline-block px-4">
                    Authorized Administrative Access Only. Secure session
                    required.
                </span>
            </div>

            {/* Main Login Content */}
            <main className="flex flex-grow flex-col items-center justify-center p-4 sm:p-6 lg:p-12">
                {children}
            </main>
        </div>
    );
}
