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
//         .map((char, index) =>
//             index < 2 || index > caseTrackingId.length - 3 ? char : '*',
//         )
//         .join('');

//     return (
//         <Portal>
//             <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
//                 {/* Backdrop */}
//                 <div
//                     className="fixed inset-0 animate-in backdrop-blur-sm duration-300 fade-in"
//                     style={{
//                         backgroundColor:
//                             'color-mix(in srgb, var(--bg-app) 90%, transparent)',
//                     }}
//                 />

//                 {/* Main Container */}
//                 <div className="relative w-full max-w-[400px] animate-in duration-500 zoom-in-95 slide-in-from-bottom-4 sm:max-w-[520px] md:max-w-[640px] lg:max-w-[720px]">
//                     {/* Glass Card */}
//                     <div
//                         className="relative overflow-hidden rounded-[2rem] border p-6 backdrop-blur-2xl sm:p-8"
//                         style={{
//                             borderColor: 'var(--border-subtle)',
//                             backgroundColor:
//                                 'color-mix(in srgb, var(--bg-surface) 90%, transparent)',
//                             boxShadow: 'var(--card-shadow)',
//                         }}
//                     >
//                         {/* Glow Accents */}
//                         <div
//                             className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 blur-[80px]"
//                             style={{
//                                 backgroundColor:
//                                     'color-mix(in srgb, var(--accent-primary) 50%, transparent)',
//                             }}
//                         />
//                         <div
//                             className="pointer-events-none absolute -bottom-24 -left-24 h-48 w-48 blur-[80px]"
//                             style={{
//                                 backgroundColor:
//                                     'color-mix(in srgb, var(--accent-primary) 50%, transparent)',
//                             }}
//                         />

//                         {/* Success Icon */}
//                         <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20">
//                             <div
//                                 className="absolute inset-0 animate-ping rounded-full"
//                                 style={{
//                                     backgroundColor:
//                                         'color-mix(in srgb, var(--accent-primary) 30%, transparent)',
//                                     animationDuration: '3s',
//                                 }}
//                             />
//                             <div
//                                 className="relative flex h-full w-full items-center justify-center rounded-full border"
//                                 style={{
//                                     borderColor:
//                                         'color-mix(in srgb, var(--accent-primary) 30%, transparent)',
//                                     backgroundColor:
//                                         'color-mix(in srgb, var(--accent-primary) 10%, var(--bg-surface))',
//                                 }}
//                             >
//                                 <CheckCircle2
//                                     className="h-8 w-8 sm:h-10 sm:w-10"
//                                     style={{ color: 'var(--accent-primary)' }}
//                                     strokeWidth={2}
//                                 />
//                             </div>
//                         </div>

//                         {/* Text */}
//                         <div className="text-center">
//                             <h2 className="mb-2 text-xl font-bold tracking-tight text-primary sm:text-2xl">
//                                 Submission Successful
//                             </h2>
//                             <p
//                                 className="mb-6 text-xs sm:text-sm"
//                                 style={{ color: '#ef4444' }}
//                             >
//                                 Please ensure that you save your Case ID in a
//                                 secure location. This Case ID is required to
//                                 track, review, and monitor the progress of your
//                                 case at any time. Once this page is closed or
//                                 refreshed, the Case ID will no longer be
//                                 available, and it cannot be recovered. Failure
//                                 to save it may prevent you from accessing
//                                 updates or checking the status of your case in
//                                 the future.
//                             </p>
//                         </div>

//                         {/* Reference Number Box */}
//                         <div
//                             className="bg-surface relative mb-6 rounded-2xl border p-4 transition-colors"
//                             style={{
//                                 borderColor:
//                                     'color-mix(in srgb, var(--border-subtle) 50%, transparent)',
//                             }}
//                             onMouseEnter={(e) => {
//                                 e.currentTarget.style.backgroundColor =
//                                     'color-mix(in srgb, var(--bg-surface) 90%, var(--accent-primary) 10%)';
//                             }}
//                             onMouseLeave={(e) => {
//                                 e.currentTarget.style.backgroundColor =
//                                     'var(--bg-surface)';
//                             }}
//                         >
//                             <div
//                                 className="mb-1 text-center text-[10px] font-bold tracking-[0.2em] uppercase"
//                                 style={{ color: 'var(--accent-primary)' }}
//                             >
//                                 Reference ID
//                             </div>

//                             <div className="mb-2 text-center font-mono text-xl font-bold tracking-widest text-primary sm:text-2xl">
//                                 {visible ? caseTrackingId : maskedId}
//                             </div>

//                             <button
//                                 onClick={() => setVisible(!visible)}
//                                 className="border-subtle bg-surface mx-auto flex items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm text-secondary transition-colors"
//                                 onMouseEnter={(e) => {
//                                     e.currentTarget.style.backgroundColor =
//                                         'color-mix(in srgb, var(--bg-surface) 90%, var(--accent-primary) 10%)';
//                                 }}
//                                 onMouseLeave={(e) => {
//                                     e.currentTarget.style.backgroundColor =
//                                         'var(--bg-surface)';
//                                 }}
//                             >
//                                 {visible ? (
//                                     <>
//                                         <EyeOff className="h-4 w-4 text-secondary" />{' '}
//                                         Hide ID
//                                     </>
//                                 ) : (
//                                     <>
//                                         <Eye className="h-4 w-4 text-secondary" />{' '}
//                                         Show ID
//                                     </>
//                                 )}
//                             </button>

//                             <button
//                                 onClick={handleCopyReference}
//                                 className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg py-2 text-[11px] font-medium transition-all"
//                             >
//                                 {copied ? (
//                                     <>
//                                         <Check
//                                             size={18}
//                                             style={{
//                                                 color: 'var(--accent-primary)',
//                                             }}
//                                         />
//                                         <span
//                                             className="text-lg font-extrabold"
//                                             style={{
//                                                 color: 'var(--accent-primary)',
//                                             }}
//                                         >
//                                             Copied!
//                                         </span>
//                                     </>
//                                 ) : (
//                                     <>
//                                         <Copy
//                                             size={20}
//                                             style={{ color: '#ef4444' }}
//                                         />
//                                         <span
//                                             className="text-lg font-extrabold"
//                                             style={{ color: '#ef4444' }}
//                                         >
//                                             Click to Copy
//                                         </span>
//                                     </>
//                                 )}
//                             </button>
//                         </div>

//                         {/* Close Button */}
//                         <div className="flex flex-col gap-3 sm:flex-row">
//                             <button
//                                 onClick={resetForm}
//                                 className="border-subtle bg-surface flex-1 cursor-pointer rounded-xl border py-3 text-xs font-bold text-secondary transition-colors active:scale-95"
//                                 style={{
//                                     boxShadow: 'var(--card-shadow)',
//                                 }}
//                                 onMouseEnter={(e) => {
//                                     e.currentTarget.style.backgroundColor =
//                                         'color-mix(in srgb, var(--bg-surface) 90%, var(--accent-primary) 10%)';
//                                 }}
//                                 onMouseLeave={(e) => {
//                                     e.currentTarget.style.backgroundColor =
//                                         'var(--bg-surface)';
//                                 }}
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

import { memo, useCallback, useState } from 'react';
import { useStepperFormStore } from '@/hooks/store/use-stepper-form-store';
import { Check, Copy, Eye, EyeOff, CheckCircle2, X } from 'lucide-react';
import { toast } from 'sonner';

// Shadcn UI Components
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface SuccessModalProps {
    caseTrackingId: string;
}

export const CaseTrackingId = memo(({ caseTrackingId }: SuccessModalProps) => {
    const [copied, setCopied] = useState(false);
    const [visible, setVisible] = useState(false);
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

    const maskedId = caseTrackingId
        .split('')
        .map((char, index) =>
            index < 2 || index > caseTrackingId.length - 3 ? char : '•',
        )
        .join('');

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop using theme variables */}
            <div className="fixed inset-0 animate-in bg-background/80 backdrop-blur-sm duration-300 fade-in" />

            {/* Main Modal Container */}
            <Card className="relative w-full max-w-[400px] animate-in border-border bg-card shadow-2xl zoom-in-95 slide-in-from-bottom-4 sm:max-w-[500px]">
                {/* Visual Glow Accents using theme primary */}
                <div className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/10 blur-[50px]" />
                <div className="pointer-events-none absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-primary/10 blur-[50px]" />

                <CardHeader className="pt-8 text-center">
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/5 ring-1 ring-primary/20">
                        <CheckCircle2
                            className="h-10 w-10 animate-in text-primary duration-500 zoom-in-50"
                            strokeWidth={1.5}
                        />
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
                        Submission Successful
                    </CardTitle>
                    <CardDescription className="px-2 leading-relaxed font-medium text-destructive">
                        IMPORTANT: Save your Case ID now. It cannot be recovered
                        once this page is closed.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pb-8">
                    {/* ID Display Box */}
                    <div className="group relative rounded-2xl border border-border bg-muted/30 p-6 transition-all hover:bg-muted/50">
                        <div className="mb-3 text-center text-[10px] font-black tracking-[0.3em] text-muted-foreground uppercase">
                            Reference Tracking ID
                        </div>

                        <div className="mb-4 text-center font-mono text-2xl font-bold tracking-widest text-foreground">
                            {visible ? caseTrackingId : maskedId}
                        </div>

                        <div className="flex flex-col gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setVisible(!visible)}
                                className="h-9 w-full text-xs font-semibold"
                            >
                                {visible ? (
                                    <>
                                        <EyeOff className="mr-2 h-4 w-4" /> Hide
                                        ID
                                    </>
                                ) : (
                                    <>
                                        <Eye className="mr-2 h-4 w-4" /> Show ID
                                    </>
                                )}
                            </Button>

                            <Button
                                variant="secondary"
                                onClick={handleCopyReference}
                                className="h-12 w-full text-base font-black transition-all active:scale-95"
                            >
                                {copied ? (
                                    <>
                                        <Check className="mr-2 h-5 w-5 text-primary" />{' '}
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <Copy className="mr-2 h-5 w-5" /> Click
                                        to Copy
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>

                    <Separator className="bg-border" />

                    <Button
                        onClick={resetForm}
                        className="h-11 w-full font-bold tracking-widest"
                    >
                        DONE & CLOSE
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
});
