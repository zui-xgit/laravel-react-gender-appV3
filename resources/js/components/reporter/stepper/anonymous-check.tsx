import { useStepperFormStore } from '@/hooks/store/use-stepper-form-store';
import { ChevronRight, Info, Shield } from 'lucide-react';

export const AnonymousCheck = () => {
    const isAnonymous = useStepperFormStore((state) => state.isAnonymous);
    const setAnonymous = useStepperFormStore((state) => state.setAnonymous);
    // const setReportPreferenceContinue = useStepperFormStore(
    //     (state) => state.setReportPreferenceContinue,
    // );

    // const canContinue = isAnonymous !== null;

    // const handleContinue = () => {
    //     setReportPreferenceContinue(true);
    // };

    return (
        <div className="w-full overflow-x-hidden px-5 pt-5 transition-all duration-500">
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
                        <h2 className="text-lg font-bold tracking-tight text-primary sm:text-xl md:text-3xl">
                            Reporting Preference
                        </h2>
                        <p className="mt-1 text-xs text-primary sm:text-sm">
                            Choose how you would like to submit this report.
                        </p>
                    </div>
                </div>

                {/* Informational Notice */}
                <div className="flex items-start gap-3">
                    <Info
                        size={16}
                        className="mt-0.5 shrink-0"
                        style={{ color: 'var(--accent-primary)' }}
                    />
                    <p className="text-xs leading-relaxed text-primary">
                        This reporting system is designed to support individuals
                        affected by gender-based misconduct, harassment, or
                        discrimination. Your safety and privacy are a priority.
                        You are not required to provide identifying information
                        to submit a report.
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
                                      borderColor: 'var(--sidebar-primary)',
                                      backgroundColor:
                                          'color-mix(in srgb, var(--accent-primary) 10%, var(--bg-surface))',
                                  }
                                : {}
                        }
                    >
                        <div className="flex items-start">
                            <div>
                                <p className="font-semibold text-primary">
                                    Report Anonymously
                                </p>
                                <p className="mt-1 text-xs text-primary">
                                    No personal details are collected. This
                                    option may limit direct follow-up, but your
                                    report will still be reviewed.
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
                                      borderColor: 'var(--sidebar-primary)',
                                      backgroundColor:
                                          'color-mix(in srgb, var(--accent-primary) 10%, var(--bg-surface))',
                                  }
                                : {}
                        }
                    >
                        <div className="flex items-start">
                            <div>
                                <p className="font-semibold text-primary">
                                    Identify Myself
                                </p>
                                <p className="mt-1 text-xs text-primary">
                                    Providing your details may help
                                    investigators contact you for clarification
                                    or offer support services, where
                                    appropriate.
                                </p>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};
