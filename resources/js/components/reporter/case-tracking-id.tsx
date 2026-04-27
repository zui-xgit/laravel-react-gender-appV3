// import { useStepperFormStore } from '@/hooks/store/use-stepper-form-store';
// import { Portal } from '@headlessui/react';
// import { Check, CheckCircle2, Copy, Eye, EyeOff } from 'lucide-react';
// import { memo, useCallback, useState } from 'react';
// import { toast } from 'sonner';

// interface SuccessModalProps {
//     caseTrackingId: string;
// }

// export const CaseTrackingId = memo(({ caseTrackingId }: SuccessModalProps) => {
//     const [copied, setCopied] = useState(false);
//     const resetForm = useStepperFormStore((state) => state.resetForm);

//     const handleCopyReference = useCallback(async () => {
//         try {
//             await navigator.clipboard.writeText(caseTrackingId);
//             setCopied(true);
//             setTimeout(() => setCopied(false), 2000);
//             toast.success('ID copied successfully');
//         } catch (err) {
//             console.error('Failed to copy:', err);
//         }
//     }, [caseTrackingId]);

//     const [visible, setVisible] = useState(false);

//     const maskedId = caseTrackingId
//         .split('')
//         .map((char, index) => (index < 2 || index > caseTrackingId.length - 3 ? char : '*'))
//         .join('');

//     return (
//         <Portal>
//             <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
//                 {/* Backdrop */}
//                 <div className="animate-in fade-in fixed inset-0 bg-[var(--color-black-90)] backdrop-blur-sm duration-300" />

//                 {/* Main Container */}
//                 <div className="animate-in zoom-in-95 slide-in-from-bottom-4 relative w-full max-w-[400px] duration-500 sm:max-w-[520px] md:max-w-[640px] lg:max-w-[720px]">
//                     {/* Glass Card */}
//                     <div className="relative overflow-hidden rounded-[2rem] border border-[var(--color-white-10)] bg-[var(--color-bg-secondary)]/90 p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
//                         {/* Glow Accents */}
//                         <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 bg-[var(--color-primary-50)] blur-[80px]" />
//                         <div className="pointer-events-none absolute -bottom-24 -left-24 h-48 w-48 bg-[var(--color-primary-50)] blur-[80px]" />

//                         {/* Success Icon */}
//                         <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20">
//                             <div
//                                 className="absolute inset-0 animate-ping rounded-full bg-[var(--color-primary-30)]"
//                                 style={{ animationDuration: '3s' }}
//                             />
//                             <div className="relative flex h-full w-full items-center justify-center rounded-full border border-[var(--color-primary-30)] bg-[var(--color-primary-10)]">
//                                 <CheckCircle2 className="h-8 w-8 text-[var(--color-primary)] sm:h-10 sm:w-10" strokeWidth={2} />
//                             </div>
//                         </div>

//                         {/* Text */}
//                         <div className="text-center">
//                             <h2 className="mb-2 text-xl font-bold tracking-tight text-[var(--color-white)] sm:text-2xl">Submission Successful</h2>
//                             <p className="mb-6 text-xs text-[var(--color-danger)] sm:text-sm">
//                                 Please ensure that you save your Case ID in a secure location. This Case ID is required to track, review, and monitor
//                                 the progress of your case at any time. Once this page is closed or refreshed, the Case ID will no longer be available,
//                                 and it cannot be recovered. Failure to save it may prevent you from accessing updates or checking the status of your
//                                 case in the future.
//                             </p>
//                         </div>

//                         {/* Reference Number Box */}
//                         <div className="relative mb-6 rounded-2xl border border-[var(--color-white-5)] bg-[var(--color-white-5)] p-4 transition-colors hover:bg-[var(--color-white-10)]">
//                             <div className="mb-1 text-center text-[10px] font-bold tracking-[0.2em] text-[var(--color-primary)] uppercase">
//                                 Reference ID
//                             </div>

//                             <div className="mb-2 text-center font-mono text-xl font-bold tracking-widest text-[var(--color-white)] sm:text-2xl">
//                                 {visible ? caseTrackingId : maskedId}
//                             </div>

//                             <button
//                                 onClick={() => setVisible(!visible)}
//                                 className="mx-auto flex items-center justify-center gap-2 rounded-lg border border-[var(--color-white-20)] bg-[var(--color-white-5)] px-4 py-2 text-sm text-[var(--color-white-70)] transition-colors hover:bg-[var(--color-white-10)]"
//                             >
//                                 {visible ? (
//                                     <>
//                                         <EyeOff className="h-4 w-4 text-[var(--color-white-70)]" /> Hide ID
//                                     </>
//                                 ) : (
//                                     <>
//                                         <Eye className="h-4 w-4 text-[var(--color-white-70)]" /> Show ID
//                                     </>
//                                 )}
//                             </button>

//                             <button
//                                 onClick={handleCopyReference}
//                                 className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg py-2 text-[11px] font-medium transition-all"
//                             >
//                                 {copied ? (
//                                     <>
//                                         <Check size={18} className="text-[var(--color-primary)]" />
//                                         <span className="text-lg font-extrabold text-[var(--color-primary)]">Copied!</span>
//                                     </>
//                                 ) : (
//                                     <>
//                                         <Copy size={20} className="text-[var(--color-danger)]" />
//                                         <span className="text-lg font-extrabold text-[var(--color-danger)]">Click to Copy</span>
//                                     </>
//                                 )}
//                             </button>
//                         </div>

//                         {/* Close Button */}
//                         <div className="flex flex-col gap-3 sm:flex-row">
//                             <button
//                                 onClick={resetForm}
//                                 className="flex-1 cursor-pointer rounded-xl border border-[var(--color-white-10)] bg-[var(--color-white-5)] py-3 text-xs font-bold text-[var(--color-white-70)] transition-colors hover:bg-[var(--color-white-10)] active:scale-95"
//                             >
//                                 CLOSE
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </Portal>
//     );
// });

import { useStepperFormStore } from '@/hooks/store/use-stepper-form-store';
import { Portal } from '@headlessui/react';
import { Check, CheckCircle2, Copy, Eye, EyeOff } from 'lucide-react';
import { memo, useCallback, useState } from 'react';
import { toast } from 'sonner';

interface SuccessModalProps {
    caseTrackingId: string;
}

export const CaseTrackingId = memo(({ caseTrackingId }: SuccessModalProps) => {
    const [copied, setCopied] = useState(false);
    const resetForm = useStepperFormStore((state) => state.resetForm);

    const handleCopyReference = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(caseTrackingId);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
            toast.success('ID copied successfully');
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    }, [caseTrackingId]);

    const [visible, setVisible] = useState(false);

    const maskedId = caseTrackingId
        .split('')
        .map((char, index) => (index < 2 || index > caseTrackingId.length - 3 ? char : '*'))
        .join('');

    return (
        <Portal>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                {/* Backdrop */}
                <div
                    className="animate-in fade-in fixed inset-0 backdrop-blur-sm duration-300"
                    style={{ backgroundColor: 'color-mix(in srgb, var(--bg-app) 90%, transparent)' }}
                />

                {/* Main Container */}
                <div className="animate-in zoom-in-95 slide-in-from-bottom-4 relative w-full max-w-[400px] duration-500 sm:max-w-[520px] md:max-w-[640px] lg:max-w-[720px]">
                    {/* Glass Card */}
                    <div
                        className="relative overflow-hidden rounded-[2rem] border p-6 backdrop-blur-2xl sm:p-8"
                        style={{
                            borderColor: 'var(--border-subtle)',
                            backgroundColor: 'color-mix(in srgb, var(--bg-surface) 90%, transparent)',
                            boxShadow: 'var(--card-shadow)',
                        }}
                    >
                        {/* Glow Accents */}
                        <div
                            className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 blur-[80px]"
                            style={{ backgroundColor: 'color-mix(in srgb, var(--accent-primary) 50%, transparent)' }}
                        />
                        <div
                            className="pointer-events-none absolute -bottom-24 -left-24 h-48 w-48 blur-[80px]"
                            style={{ backgroundColor: 'color-mix(in srgb, var(--accent-primary) 50%, transparent)' }}
                        />

                        {/* Success Icon */}
                        <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20">
                            <div
                                className="absolute inset-0 animate-ping rounded-full"
                                style={{
                                    backgroundColor: 'color-mix(in srgb, var(--accent-primary) 30%, transparent)',
                                    animationDuration: '3s',
                                }}
                            />
                            <div
                                className="relative flex h-full w-full items-center justify-center rounded-full border"
                                style={{
                                    borderColor: 'color-mix(in srgb, var(--accent-primary) 30%, transparent)',
                                    backgroundColor: 'color-mix(in srgb, var(--accent-primary) 10%, var(--bg-surface))',
                                }}
                            >
                                <CheckCircle2 className="h-8 w-8 sm:h-10 sm:w-10" style={{ color: 'var(--accent-primary)' }} strokeWidth={2} />
                            </div>
                        </div>

                        {/* Text */}
                        <div className="text-center">
                            <h2 className="text-primary mb-2 text-xl font-bold tracking-tight sm:text-2xl">Submission Successful</h2>
                            <p className="mb-6 text-xs sm:text-sm" style={{ color: '#ef4444' }}>
                                Please ensure that you save your Case ID in a secure location. This Case ID is required to track, review, and monitor
                                the progress of your case at any time. Once this page is closed or refreshed, the Case ID will no longer be available,
                                and it cannot be recovered. Failure to save it may prevent you from accessing updates or checking the status of your
                                case in the future.
                            </p>
                        </div>

                        {/* Reference Number Box */}
                        <div
                            className="bg-surface relative mb-6 rounded-2xl border p-4 transition-colors"
                            style={{
                                borderColor: 'color-mix(in srgb, var(--border-subtle) 50%, transparent)',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'color-mix(in srgb, var(--bg-surface) 90%, var(--accent-primary) 10%)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'var(--bg-surface)';
                            }}
                        >
                            <div
                                className="mb-1 text-center text-[10px] font-bold tracking-[0.2em] uppercase"
                                style={{ color: 'var(--accent-primary)' }}
                            >
                                Reference ID
                            </div>

                            <div className="text-primary mb-2 text-center font-mono text-xl font-bold tracking-widest sm:text-2xl">
                                {visible ? caseTrackingId : maskedId}
                            </div>

                            <button
                                onClick={() => setVisible(!visible)}
                                className="text-secondary border-subtle bg-surface mx-auto flex items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm transition-colors"
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'color-mix(in srgb, var(--bg-surface) 90%, var(--accent-primary) 10%)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--bg-surface)';
                                }}
                            >
                                {visible ? (
                                    <>
                                        <EyeOff className="text-secondary h-4 w-4" /> Hide ID
                                    </>
                                ) : (
                                    <>
                                        <Eye className="text-secondary h-4 w-4" /> Show ID
                                    </>
                                )}
                            </button>

                            <button
                                onClick={handleCopyReference}
                                className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg py-2 text-[11px] font-medium transition-all"
                            >
                                {copied ? (
                                    <>
                                        <Check size={18} style={{ color: 'var(--accent-primary)' }} />
                                        <span className="text-lg font-extrabold" style={{ color: 'var(--accent-primary)' }}>
                                            Copied!
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <Copy size={20} style={{ color: '#ef4444' }} />
                                        <span className="text-lg font-extrabold" style={{ color: '#ef4444' }}>
                                            Click to Copy
                                        </span>
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Close Button */}
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <button
                                onClick={resetForm}
                                className="text-secondary border-subtle bg-surface flex-1 cursor-pointer rounded-xl border py-3 text-xs font-bold transition-colors active:scale-95"
                                style={{
                                    boxShadow: 'var(--card-shadow)',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'color-mix(in srgb, var(--bg-surface) 90%, var(--accent-primary) 10%)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--bg-surface)';
                                }}
                            >
                                CLOSE
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Portal>
    );
});
