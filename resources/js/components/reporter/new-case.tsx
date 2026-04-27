import { InitialFormData } from '@/constants/constants';
import {
    FormData,
    useStepperFormStore,
} from '@/hooks/store/use-stepper-form-store';
import { useForm } from '@inertiajs/react';
import {
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    ShieldAlert,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { PortalLoader } from '../portal-loader';
import { CaseTrackingId } from './case-tracking-id';
import { Step1 } from './stepper/step1';
import { Step2 } from './stepper/step2';
import { Step3 } from './stepper/step3';
import { Step4 } from './stepper/step4';
import { Step5 } from './stepper/step5';

const NewCase = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const {
        formData,
        resetErrors,
        setErrors,
        currentStep,
        nextStep,
        previousStep,
        resetForm,
        isAnonymous,
        isCaseSubmitted,
        setIsCaseSubmitted,
    } = useStepperFormStore();

    const { setData, post, processing } = useForm<
        FormData & { isAnonymous: boolean | null }
    >({
        ...InitialFormData,
        isAnonymous: null,
    });

    const [caseTrackingId, setCaseTrackingId] = useState<string>('');

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        setData({ ...formData, isAnonymous });
    }, [formData, isAnonymous]);

    const isStepperOnTop = windowWidth <= 1024;
    const stepperLabels = [
        'Reporter',
        'Victim',
        'Accused',
        'Incident',
        'Review',
    ];

    const handleNextStep = () => {
        if (currentStep < 5) {
            nextStep();
        } else if (currentStep === 5) {
            // making sure the step 5 is confirmed
            if (!formData.confirmationChecked) {
                console.log('please tick');
                setErrors({ confirmationChecked: 'Confirmation is Required' });
                return;
            } else {
                resetErrors();
            }

            // we post the data to the database but we also validate the data in the backend,
            // look at ReporterController.php to see that , This is to prevent any attempts of trying to get anauthorized access
            post('/report', {
                onError: (errors) => {
                    // TODO: important to check for any errors from the database
                    console.log(
                        'ERRORS FROM SUBMITING REPORT FORM: ',
                        errors.error,
                    );
                    toast.error(errors.error);
                },
                onSuccess: (page) => {
                    // // Access page props
                    // console.log('PAGE PROPS', page.props);

                    // // Access flash data (v2.3.3+)
                    // console.log('PAGE FLASH', page.flash);

                    // // Access URL`
                    // console.log('PAGE URL', page.url);
                    // console.log('YOUR REFERENCE NUMBER IS: ', page.props);

                    // // Access component name
                    // console.log('PAGE COMPONENT', page.component);

                    setIsCaseSubmitted(true);
                    setCaseTrackingId(page.flash.case_report_id as string);
                },
            });
        }
    };

    return (
        <>
            {processing && <PortalLoader />}

            {isCaseSubmitted && (
                <CaseTrackingId caseTrackingId={caseTrackingId} />
            )}

            {currentStep < 6 && (
                <>
                    <div
                        className={`fixed flex-col items-center pt-16 transition-all duration-500 ${isStepperOnTop ? 'hidden' : 'flex'}`}
                        style={{ width: '130px' }}
                    >
                        <div className="relative flex flex-col items-center gap-14">
                            {/* Vertical progress line */}
                            <div
                                className="absolute top-0 bottom-0 -z-10 w-[2px]"
                                style={{
                                    backgroundColor: 'var(--border-subtle)',
                                }}
                            />

                            {stepperLabels.map((label, index) => {
                                const s = index + 1;
                                const isActive = currentStep === s;
                                const isCompleted = currentStep > s;

                                return (
                                    <div
                                        key={s}
                                        className="flex flex-col items-center gap-3"
                                    >
                                        {/* Step circle */}
                                        <div
                                            className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all duration-500"
                                            style={{
                                                backgroundColor: isActive
                                                    ? 'var(--accent-primary)'
                                                    : isCompleted
                                                      ? 'var(--accent-hover)'
                                                      : 'var(--bg-surface)',
                                                color:
                                                    isActive || isCompleted
                                                        ? '#ffffff'
                                                        : 'var(--text-secondary)',
                                                border:
                                                    !isActive && !isCompleted
                                                        ? '2px solid var(--border-subtle)'
                                                        : 'none',
                                                boxShadow: isActive
                                                    ? 'var(--card-shadow)'
                                                    : 'none',
                                            }}
                                        >
                                            {isCompleted ? (
                                                <CheckCircle2 className="h-5 w-5" />
                                            ) : (
                                                s
                                            )}
                                        </div>

                                        {/* Step label */}
                                        <div className="relative h-0">
                                            <span
                                                className="absolute top-1/2 left-full ml-5 -translate-y-1/2 text-[9px] font-black tracking-[0.2em] whitespace-nowrap uppercase transition-all duration-300"
                                                style={{
                                                    color: isActive
                                                        ? 'var(--accent-primary)'
                                                        : 'var(--text-secondary)',
                                                    opacity: isActive ? 1 : 0.6,
                                                }}
                                            >
                                                {label}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Mobile/Tablet Horizontal Stepper - visible only for tablet and mobile */}
                    <div
                        className={`fixed z-50 w-full transition-all duration-500 ${isStepperOnTop ? 'block' : 'hidden'}`}
                        style={{
                            backgroundColor: 'var(--bg-surface)',
                            borderBottom: '1px solid var(--border-subtle)',
                        }}
                    >
                        <div className="px-3 py-4 sm:px-6">
                            <div className="relative flex items-center justify-between">
                                {/* Progress bar background */}
                                <div
                                    className="absolute top-1/2 right-0 left-0 h-[2px] -translate-y-1/2"
                                    style={{
                                        backgroundColor: 'var(--border-subtle)',
                                    }}
                                />

                                {/* Progress bar fill */}
                                <div
                                    className="absolute top-1/2 left-0 h-[2px] -translate-y-1/2 transition-all duration-500"
                                    style={{
                                        backgroundColor:
                                            'var(--accent-primary)',
                                        width: `${((currentStep - 1) / (stepperLabels.length - 1)) * 100}%`,
                                    }}
                                />

                                {/* Step indicators */}
                                {stepperLabels.map((label, index) => {
                                    const s = index + 1;
                                    const isActive = currentStep === s;
                                    const isCompleted = currentStep > s;

                                    return (
                                        <div
                                            key={s}
                                            className="relative z-10 flex flex-col items-center gap-2"
                                        >
                                            <div
                                                className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-500 sm:h-10 sm:w-10 sm:text-sm"
                                                style={{
                                                    backgroundColor: isActive
                                                        ? 'var(--accent-primary)'
                                                        : isCompleted
                                                          ? 'var(--accent-hover)'
                                                          : 'var(--bg-surface)',
                                                    color:
                                                        isActive || isCompleted
                                                            ? '#ffffff'
                                                            : 'var(--text-secondary)',
                                                    border:
                                                        !isActive &&
                                                        !isCompleted
                                                            ? '2px solid var(--border-subtle)'
                                                            : 'none',
                                                    boxShadow: isActive
                                                        ? 'var(--card-shadow)'
                                                        : 'none',
                                                }}
                                            >
                                                {isCompleted ? (
                                                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5" />
                                                ) : (
                                                    s
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Main Content Area with Dynamic Padding */}
            <div
                className={`relative h-full min-h-screen w-full overflow-x-hidden pb-5 transition-all duration-500 ${
                    currentStep < 6
                        ? isStepperOnTop
                            ? 'px-3 pt-24 pb-24 sm:px-4 sm:pt-28 md:px-12'
                            : 'pt-5 pr-5 pl-[180px]'
                        : 'px-3 pt-5 pb-24 sm:px-4 md:px-12'
                }`}
            >
                <div
                    className="pointer-events-none absolute top-1/4 left-1/2 h-3/4 w-3/4 -translate-x-1/2 rounded-full blur-[180px]"
                    style={{
                        backgroundColor: 'var(--accent-primary)',
                        opacity: 0.05,
                    }}
                />

                <div
                    className={`animate-reveal relative z-10 mx-auto max-w-full ${isStepperOnTop ? 'w-full' : 'max-w-[1400px]'}`}
                >
                    <div
                        className="relative w-full max-w-full overflow-hidden rounded-[20px] p-4 sm:rounded-[24px] sm:p-6 md:rounded-[48px] md:p-10 lg:p-14 xl:p-16"
                        style={{
                            backgroundColor: 'var(--bg-surface)',
                            border: '1px solid var(--border-subtle)',
                            boxShadow: 'var(--card-shadow)',
                        }}
                    >
                        <div
                            className="pointer-events-none absolute top-0 right-0 p-8 sm:p-12"
                            style={{ opacity: 0.04 }}
                        >
                            <ShieldAlert
                                size={120}
                                className="sm:h-[160px] sm:w-[160px]"
                                style={{ color: 'var(--text-secondary)' }}
                            />
                        </div>

                        {/* Step components */}
                        {currentStep === 1 && <Step1 />}
                        {currentStep === 2 && <Step2 />}
                        {currentStep === 3 && <Step3 />}
                        {currentStep === 4 && <Step4 />}
                        {currentStep === 5 && <Step5 />}

                        {currentStep <= 5 && (
                            <div
                                className="mt-10 flex items-center justify-between gap-3 pt-8 sm:mt-14 sm:gap-6 sm:pt-10"
                                style={{
                                    borderTop: '1px solid var(--border-subtle)',
                                }}
                            >
                                {!isAnonymous && currentStep === 1 && (
                                    <button
                                        onClick={() => resetForm()}
                                        disabled={false}
                                        className="flex cursor-pointer items-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold transition-all sm:gap-3 sm:px-8 sm:py-4"
                                        style={{
                                            border: '1px solid var(--border-subtle)',
                                            color: 'var(--text-secondary)',
                                            backgroundColor: 'transparent',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor =
                                                'var(--bg-app)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor =
                                                'transparent';
                                        }}
                                    >
                                        <ChevronLeft
                                            size={16}
                                            className="sm:h-[18px] sm:w-[18px]"
                                        />
                                        <span className="hidden sm:inline">
                                            Previous
                                        </span>
                                        <span className="sm:hidden">Prev</span>
                                    </button>
                                )}
                                {isAnonymous && currentStep === 2 ? (
                                    <button
                                        onClick={() => resetForm()}
                                        disabled={false}
                                        className="flex cursor-pointer items-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold transition-all sm:gap-3 sm:px-8 sm:py-4"
                                        style={{
                                            border: '1px solid var(--border-subtle)',
                                            color: 'var(--text-secondary)',
                                            backgroundColor: 'transparent',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor =
                                                'var(--bg-app)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor =
                                                'transparent';
                                        }}
                                    >
                                        <ChevronLeft
                                            size={16}
                                            className="sm:h-[18px] sm:w-[18px]"
                                        />
                                        <span className="hidden sm:inline">
                                            Previous
                                        </span>
                                        <span className="sm:hidden">Prev</span>
                                    </button>
                                ) : (
                                    <button
                                        onClick={previousStep}
                                        disabled={currentStep === 1}
                                        className={`flex cursor-pointer items-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold transition-all sm:gap-3 sm:px-8 sm:py-4 ${currentStep === 1 ? 'pointer-events-none opacity-0' : ''}`}
                                        style={
                                            currentStep !== 1
                                                ? {
                                                      border: '1px solid var(--border-subtle)',
                                                      color: 'var(--text-secondary)',
                                                      backgroundColor:
                                                          'transparent',
                                                  }
                                                : {}
                                        }
                                        onMouseEnter={(e) => {
                                            if (currentStep !== 1) {
                                                e.currentTarget.style.backgroundColor =
                                                    'var(--bg-app)';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (currentStep !== 1) {
                                                e.currentTarget.style.backgroundColor =
                                                    'transparent';
                                            }
                                        }}
                                    >
                                        <ChevronLeft
                                            size={16}
                                            className="sm:h-[18px] sm:w-[18px]"
                                        />
                                        <span className="hidden sm:inline">
                                            Previous
                                        </span>
                                        <span className="sm:hidden">Prev</span>
                                    </button>
                                )}
                                <button
                                    onClick={handleNextStep}
                                    className="flex cursor-pointer items-center gap-2 rounded-2xl px-6 py-3 text-xs font-black tracking-widest uppercase transition-all active:scale-95 sm:gap-3 sm:px-12 sm:py-4"
                                    style={{
                                        backgroundColor:
                                            'var(--accent-primary)',
                                        color: '#ffffff',
                                        boxShadow: 'var(--card-shadow)',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor =
                                            'var(--accent-hover)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor =
                                            'var(--accent-primary)';
                                    }}
                                >
                                    {currentStep === 5
                                        ? 'Dispatch'
                                        : 'Continue'}
                                    <ChevronRight
                                        size={14}
                                        className="sm:h-4 sm:w-4"
                                    />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewCase;
