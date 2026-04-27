import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({ children }: AuthLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col bg-[#f8fafc]">
            <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#e2e8f0] bg-[#ffffff] px-4 py-3 shadow-sm sm:px-6 sm:py-4">
                <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0f172a] text-white sm:h-10 sm:w-10">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 sm:h-6 sm:w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-base leading-none font-bold tracking-tight text-[#0f172a] sm:text-lg">
                            MUHAS
                        </h1>
                        <p className="mt-0.5 text-[10px] font-semibold tracking-widest text-[#64748b] uppercase sm:text-xs">
                            Gender Reporting System
                        </p>
                    </div>
                </div>
            </header>

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
