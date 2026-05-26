'use client';

import { Activity, useEffect, useState } from 'react';
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
import {
    useStepperFormStore,
    FormData,
    InitialFormData,
} from '@/hooks/store/use-stepper-form-store';
import { Step1 } from '@/components/reporter/stepper/step1';
import { Step2 } from '@/components/reporter/stepper/step2';
import { Step3 } from '@/components/reporter/stepper/step3';
import { Step4 } from '@/components/reporter/stepper/step4';
import { Step5 } from '@/components/reporter/stepper/step5';
import { Step6 } from '@/components/reporter/stepper/step6';
import { router, useForm } from '@inertiajs/react';
import { reporter, reporterReport } from '@/routes';
import { PortalLoader } from '@/components/portal-loader';
import AppGuestLayout from '@/layouts/app-guest-layout';
import { Badge } from '@/components/ui/badge';
import { CheckIcon, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';

const steps = [
    {
        id: 1,
        title: 'Step 1',
    },
    {
        id: 2,
        title: 'Step 2',
    },
    {
        id: 3,
        title: 'Step 3',
    },
    {
        id: 4,
        title: 'Step 4',
    },
    {
        id: 5,
        title: 'Step 5',
    },
    {
        id: 6,
        title: 'Step 6',
    },
];

const Report = () => {
    const currentStep = useStepperFormStore((state) => state.currentStep);
    const setCurrentStep = useStepperFormStore((state) => state.setCurrentStep);
    const previousStep = useStepperFormStore((state) => state.previousStep);
    const nextStep = useStepperFormStore((state) => state.nextStep);
    const formData = useStepperFormStore((state) => state.formData);

    const [processing, setProcessing] = useState<boolean>(false);

    // const { post, processing } = useForm<FormData>({
    //     ...InitialFormData,
    // });

    const handlePreviousStep = () => {
        previousStep();
    };

    const handleNextStep = () => {
        if (
            currentStep === 6 &&
            formData.confirmationChecked &&
            formData.evidenceFiles.length > 0 &&
            formData.evidenceDescription.trim() !== ''
        ) {
            handleSubmit();
        } else {
            nextStep();
        }
    };

    const handleSubmit = () => {
        // console.log(formData);
        // post(reporter().url, {
        //     forceFormData: true,
        //     onError: (errors) => {
        //         toast.error(errors.error);
        //     },
        //     // onSuccess: (page) => {
        //     //     // toast.success(page.flash.case_report_id as string);`
        //     // },
        // });

        router.post(reporter().url, formData as any, {
            forceFormData: true,
            onStart: () => setProcessing(true),
            onFinish: () => setProcessing(false),
            onError: (errors) => {
                toast.error(errors.error || 'Submission failed.');
            },
            onSuccess: (page) => {},
        });
    };

    // useEffect(() => {
    //     setData(formData);
    // }, [formData]);

    return (
        <>
            {processing && <PortalLoader />}
            <AppGuestLayout>
                <div className="pt-7 pb-32 md:mx-auto md:w-[80%]">
                    <Stepper
                        value={currentStep}
                        onValueChange={setCurrentStep as any}
                        className="w-full space-y-8 px-4 py-2 md:px-0"
                        indicators={{
                            completed: <CheckIcon className="size-3.5" />,
                            loading: (
                                <LoaderCircle className="size-3.5 animate-spin" />
                            ),
                        }}
                    >
                        <StepperNav>
                            {steps.map((step, index) => (
                                <StepperItem
                                    key={index}
                                    step={index + 1}
                                    className="relative flex-1 items-start"
                                >
                                    <StepperTrigger className="pointer-events-none flex flex-col gap-2.5">
                                        <StepperIndicator className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=completed]:bg-blue-600 data-[state=completed]:text-white data-[state=inactive]:text-gray-500">
                                            {index + 1}
                                        </StepperIndicator>

                                        <div className="hidden md:flex">
                                            <Badge
                                                variant="secondary"
                                                className="hidden group-data-[state=active]/step:inline-flex"
                                            >
                                                In Progress
                                            </Badge>
                                            <Badge
                                                variant="secondary"
                                                className="hidden group-data-[state=completed]/step:inline-flex"
                                            >
                                                Completed
                                            </Badge>
                                            <Badge
                                                variant="secondary"
                                                className="hidden text-muted-foreground group-data-[state=inactive]/step:inline-flex"
                                            >
                                                Pending
                                            </Badge>
                                        </div>
                                    </StepperTrigger>
                                    {steps.length > index + 1 && (
                                        <StepperSeparator className="absolute inset-x-0 top-3 left-[calc(50%+0.875rem)] m-0 group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-2rem+0.225rem)] group-data-[orientation=horizontal]/stepper-nav:flex-none group-data-[state=completed]/step:bg-blue-700" />
                                    )}
                                </StepperItem>
                            ))}
                        </StepperNav>

                        <StepperPanel className="text-sm">
                            {steps.map((step) => (
                                <StepperContent
                                    className="flex w-full items-center justify-center"
                                    key={step.id}
                                    value={step.id}
                                >
                                    {step.id === 1 && <Step1 />}
                                    {step.id === 2 && <Step2 />}
                                    {step.id === 3 && <Step3 />}
                                    {step.id === 4 && <Step4 />}
                                    {step.id === 5 && <Step5 />}
                                    {step.id === 6 && <Step6 />}
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
                </div>
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
