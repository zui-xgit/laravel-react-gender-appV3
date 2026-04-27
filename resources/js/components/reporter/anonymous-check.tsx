// import { useStepperFormStore } from '@/hooks/store/use-stepper-form-store';
// import { ChevronRight, Info, Shield } from 'lucide-react';

// export const AnonymousCheck = () => {
//     // const [isAnonymous, setIsAnonymous] = useState<boolean | null>(null);

//     const isAnonymous = useStepperFormStore((state) => state.isAnonymous);
//     const setAnonymous = useStepperFormStore((state) => state.setAnonymous);
//     const setReportPreferenceContinue = useStepperFormStore((state) => state.setReportPreferenceContinue);

//     const canContinue = isAnonymous !== null;

//     const handleContinue = () => {
//         setReportPreferenceContinue(true);
//     };

//     return (
//         <div className="h-full min-h-screen w-full overflow-x-hidden px-5 pt-5 transition-all duration-500">
//             <div className="animate-reveal space-y-6 sm:space-y-8">
//                 {/* Header */}
//                 <div className="flex items-center gap-3 sm:gap-5">
//                     <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#00A896] sm:h-14 sm:w-14">
//                         <Shield size={20} className="sm:h-6 sm:w-6" />
//                     </div>
//                     <div className="min-w-0">
//                         <h2 className="text-lg font-bold tracking-tight sm:text-xl md:text-3xl">Reporting Preference</h2>
//                         <p className="mt-1 text-xs text-white/40 sm:text-sm">Choose how you would like to submit this report.</p>
//                     </div>
//                 </div>

//                 {/* Informational Notice */}
//                 <div className="flex items-start gap-3">
//                     <Info size={16} className="mt-0.5 shrink-0 text-[#00A896]" />
//                     <p className="text-xs leading-relaxed text-white/70">
//                         This reporting system is designed to support individuals affected by gender-based misconduct, harassment, or discrimination.
//                         Your safety and privacy are a priority. You are not required to provide identifying information to submit a report.
//                     </p>
//                 </div>

//                 {/* Options */}
//                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                     {/* Anonymous */}
//                     <button
//                         type="button"
//                         onClick={() => setAnonymous(true)}
//                         className={`relative cursor-pointer rounded-2xl border p-5 text-left transition-all ${
//                             isAnonymous === true ? 'border-[#00A896] bg-[#00A896]/10' : 'border-white/10 bg-white/5 hover:border-white/20'
//                         }`}
//                     >
//                         <div className="flex items-start">
//                             <div>
//                                 <p className="font-semibold text-white">Report Anonymously</p>
//                                 <p className="mt-1 text-xs text-white/50">
//                                     No personal details are collected. This option may limit direct follow-up, but your report will still be reviewed.
//                                 </p>
//                             </div>
//                         </div>
//                     </button>

//                     {/* Identified */}
//                     <button
//                         type="button"
//                         onClick={() => setAnonymous(false)}
//                         className={`relative cursor-pointer rounded-2xl border p-5 text-left transition-all ${
//                             isAnonymous === false ? 'border-[#00A896] bg-[#00A896]/10' : 'border-white/10 bg-white/5 hover:border-white/20'
//                         }`}
//                     >
//                         <div className="flex items-start">
//                             <div>
//                                 <p className="font-semibold text-white">Identify Myself</p>
//                                 <p className="mt-1 text-xs text-white/50">
//                                     Providing your details may help investigators contact you for clarification or offer support services, where
//                                     appropriate.
//                                 </p>
//                             </div>
//                         </div>
//                     </button>
//                 </div>

//                 {/* Continue */}
//                 <div>
//                     <button
//                         onClick={handleContinue}
//                         type="button"
//                         disabled={!canContinue}
//                         className={`flex items-center gap-2 rounded-2xl px-6 py-3 text-xs font-black tracking-widest uppercase transition-all sm:gap-3 sm:px-12 sm:py-4 ${
//                             canContinue
//                                 ? 'cursor-pointer bg-[#00A896] text-white shadow-2xl hover:bg-white hover:text-black active:scale-95'
//                                 : 'cursor-not-allowed bg-white/10 text-white/40 opacity-50'
//                         }`}
//                     >
//                         Continue
//                         <ChevronRight size={14} className="sm:h-4 sm:w-4" />
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

import { useStepperFormStore } from '@/hooks/store/use-stepper-form-store';
import { ChevronRight, Info, Shield } from 'lucide-react';

export const AnonymousCheck = () => {
    const isAnonymous = useStepperFormStore((state) => state.isAnonymous);
    const setAnonymous = useStepperFormStore((state) => state.setAnonymous);
    const setReportPreferenceContinue = useStepperFormStore((state) => state.setReportPreferenceContinue);

    const canContinue = isAnonymous !== null;

    const handleContinue = () => {
        setReportPreferenceContinue(true);
    };

    return (
        <div className="h-full min-h-screen w-full overflow-x-hidden px-5 pt-5 transition-all duration-500">
            <div className="animate-reveal space-y-6 sm:space-y-8">
                {/* Header */}
                <div className="flex items-center gap-3 sm:gap-5">
                    <div
                        className="border-subtle flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border sm:h-14 sm:w-14"
                        style={{
                            backgroundColor: 'var(--bg-surface)',
                            color: 'var(--accent-primary)',
                        }}
                    >
                        <Shield size={20} className="sm:h-6 sm:w-6" />
                    </div>
                    <div className="min-w-0">
                        <h2 className="text-primary text-lg font-bold tracking-tight sm:text-xl md:text-3xl">Reporting Preference</h2>
                        <p className="text-secondary mt-1 text-xs sm:text-sm">Choose how you would like to submit this report.</p>
                    </div>
                </div>

                {/* Informational Notice */}
                <div className="flex items-start gap-3">
                    <Info size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--accent-primary)' }} />
                    <p className="text-secondary text-xs leading-relaxed">
                        This reporting system is designed to support individuals affected by gender-based misconduct, harassment, or discrimination.
                        Your safety and privacy are a priority. You are not required to provide identifying information to submit a report.
                    </p>
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* Anonymous */}
                    <button
                        type="button"
                        onClick={() => setAnonymous(true)}
                        className="border-subtle bg-surface relative cursor-pointer rounded-2xl border p-5 text-left transition-all hover:opacity-90"
                        style={
                            isAnonymous === true
                                ? {
                                      borderColor: 'var(--accent-primary)',
                                      backgroundColor: 'color-mix(in srgb, var(--accent-primary) 10%, var(--bg-surface))',
                                  }
                                : {}
                        }
                    >
                        <div className="flex items-start">
                            <div>
                                <p className="text-primary font-semibold">Report Anonymously</p>
                                <p className="text-secondary mt-1 text-xs">
                                    No personal details are collected. This option may limit direct follow-up, but your report will still be reviewed.
                                </p>
                            </div>
                        </div>
                    </button>

                    {/* Identified */}
                    <button
                        type="button"
                        onClick={() => setAnonymous(false)}
                        className="border-subtle bg-surface relative cursor-pointer rounded-2xl border p-5 text-left transition-all hover:opacity-90"
                        style={
                            isAnonymous === false
                                ? {
                                      borderColor: 'var(--accent-primary)',
                                      backgroundColor: 'color-mix(in srgb, var(--accent-primary) 10%, var(--bg-surface))',
                                  }
                                : {}
                        }
                    >
                        <div className="flex items-start">
                            <div>
                                <p className="text-primary font-semibold">Identify Myself</p>
                                <p className="text-secondary mt-1 text-xs">
                                    Providing your details may help investigators contact you for clarification or offer support services, where
                                    appropriate.
                                </p>
                            </div>
                        </div>
                    </button>
                </div>

                {/* Continue */}
                <div>
                    <button
                        onClick={handleContinue}
                        type="button"
                        disabled={!canContinue}
                        className="flex items-center gap-2 rounded-2xl px-6 py-3 text-xs font-black tracking-widest uppercase transition-all sm:gap-3 sm:px-12 sm:py-4"
                        style={
                            canContinue
                                ? {
                                      backgroundColor: 'var(--accent-primary)',
                                      color: 'white',
                                      cursor: 'pointer',
                                      boxShadow: 'var(--card-shadow)',
                                  }
                                : {
                                      backgroundColor: 'var(--bg-surface)',
                                      color: 'var(--text-secondary)',
                                      cursor: 'not-allowed',
                                      opacity: 0.5,
                                  }
                        }
                        onMouseEnter={(e) => {
                            if (canContinue) {
                                e.currentTarget.style.backgroundColor = 'var(--accent-hover)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (canContinue) {
                                e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
                            }
                        }}
                    >
                        Continue
                        <ChevronRight size={14} className="sm:h-4 sm:w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};
