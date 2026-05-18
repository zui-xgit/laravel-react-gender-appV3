'use client';

import { useEffect, useState } from 'react';
import {
    Stepper,
    StepperContent,
    StepperIndicator,
    StepperItem,
    StepperNav,
    StepperPanel,
    StepperSeparator,
    StepperTrigger,
} from '@/components/reui/stepper';

import { Button } from '@/components/ui/button';
import { AnonymousCheck } from '@/components/reporter/stepper/anonymous-check';
import {
    useStepperFormStore,
    FormData,
} from '@/hooks/store/use-stepper-form-store';
import { Step2 } from '@/components/reporter/stepper/step2';
import { Step3 } from '@/components/reporter/stepper/step3';
import { Step4 } from '@/components/reporter/stepper/step4';
import { Step5 } from '@/components/reporter/stepper/step5';
import { Step6 } from '@/components/reporter/stepper/step6';
import { useForm } from '@inertiajs/react';
import { InitialFormData } from '@/constants/constants';
import { reporter, reporterReport } from '@/routes';
import { PortalLoader } from '@/components/portal-loader';
import { CaseTrackingId } from '@/components/reporter/case-tracking-id';
import { toast } from 'sonner';
import AppGuestLayout from '@/layouts/app-guest-layout';

const steps = [1, 2, 3, 4, 5, 6];

const Report = () => {
    const currentStep = useStepperFormStore((state) => state.currentStep);
    const setCurrentStep = useStepperFormStore((state) => state.setCurrentStep);
    const previousStep = useStepperFormStore((state) => state.previousStep);
    const nextStep = useStepperFormStore((state) => state.nextStep);
    const formData = useStepperFormStore((state) => state.formData);
    const isAnonymous = useStepperFormStore((state) => state.isAnonymous);
    const isCaseSubmitted = useStepperFormStore(
        (state) => state.isCaseSubmitted,
    );
    const setIsCaseSubmitted = useStepperFormStore(
        (state) => state.setIsCaseSubmitted,
    );
    const [caseTrackingId, setCaseTrackingId] = useState<string>('');

    const { data, setData, post, processing } = useForm<
        FormData & { isAnonymous: boolean | null }
    >({
        ...InitialFormData,
        isAnonymous: null,
    });

    const handlePreviousStep = () => {
        previousStep();
    };

    const handleNextStep = () => {
        if (currentStep === 6 && formData.confirmationChecked) {
            handleSubmit();
        } else {
            nextStep();
        }
    };

    const handleSubmit = () => {
        console.log(data);
        post(reporter().url, {
            // onError: () => {
            //     alert('an error occurred');
            // },
            onError: (errors) => {
                // TODO: important to check for any errors from the database
                console.log(
                    'ERRORS FROM SUBMITING REPORT FORM: ',
                    errors.error,
                );
                toast.error(errors.error);
            },
            onSuccess: (page) => {
                setIsCaseSubmitted(true);
                setCaseTrackingId(page.flash.case_report_id as string);
            },
        });
    };

    useEffect(() => {
        setData({ ...formData, isAnonymous });
    }, [formData, isAnonymous]);

    return (
        <>
            <AppGuestLayout>
                {processing && <PortalLoader />}
                {isCaseSubmitted && (
                    <CaseTrackingId caseTrackingId={caseTrackingId} />
                )}
                <Stepper
                    value={currentStep}
                    onValueChange={setCurrentStep as any}
                    className="w-full space-y-8 px-4 py-2"
                >
                    <StepperNav>
                        {steps.map((step) => (
                            <StepperItem key={step} step={step}>
                                <StepperTrigger asChild>
                                    <StepperIndicator className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=completed]:bg-blue-600 data-[state=completed]:text-white data-[state=inactive]:text-gray-500">
                                        {step}
                                    </StepperIndicator>
                                </StepperTrigger>
                                {steps.length > step && (
                                    <StepperSeparator className="group-data-[state=completed]/step:bg-blue-600" />
                                )}
                            </StepperItem>
                        ))}
                    </StepperNav>

                    <StepperPanel className="text-sm">
                        {steps.map((step) => (
                            <StepperContent
                                className="flex w-full items-center justify-center"
                                key={step}
                                value={step}
                            >
                                {step === 1 && <AnonymousCheck />}
                                {step === 2 && <Step2 />}
                                {step === 3 && <Step3 />}
                                {step === 4 && <Step4 />}
                                {step === 5 && <Step5 />}
                                {step === 6 && <Step6 />}
                            </StepperContent>
                        ))}
                    </StepperPanel>

                    {/* Previous and Next Buttons */}
                    <div className="flex items-center justify-between gap-2.5">
                        <Button
                            variant="outline"
                            onClick={handlePreviousStep}
                            className="cursor-pointer disabled:pointer-events-auto disabled:cursor-not-allowed"
                            disabled={currentStep === 1}
                        >
                            Previous
                        </Button>

                        <Button
                            variant="outline"
                            onClick={handleNextStep}
                            className="cursor-pointer disabled:pointer-events-auto disabled:cursor-not-allowed"
                            // disabled={
                            //     currentStep === steps.length || isAnonymous === null
                            // }
                        >
                            {currentStep === 6 ? <>Submit</> : <>Next</>}
                        </Button>
                    </div>
                </Stepper>
            </AppGuestLayout>
        </>
    );
};

export default Report;

Report.layout = {
    breadcrumbs: [
        {
            title: 'New Case',
            href: reporterReport(),
        },
    ],
};
