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
import { useStepperFormStore } from '@/hooks/store/use-stepper-form-store';
import { Step2 } from '@/components/reporter/stepper/step2';
import { Step3 } from '@/components/reporter/stepper/step3';
import { Step4 } from '@/components/reporter/stepper/step4';
import { Step5 } from '@/components/reporter/stepper/step5';
import { Step6 } from '@/components/reporter/stepper/step6';

const steps = [1, 2, 3, 4, 5, 6];

const Report = () => {
    const currentStep = useStepperFormStore((state) => state.currentStep);
    const setCurrentStep = useStepperFormStore((state) => state.setCurrentStep);
    const previousStep = useStepperFormStore((state) => state.previousStep);
    const nextStep = useStepperFormStore((state) => state.nextStep);
    const isAnonymouse = useStepperFormStore((state) => state.isAnonymous);

    // TEST USE EFFECT

    useEffect(() => {
        console.log(isAnonymouse);
    }, [isAnonymouse]);

    return (
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

            {/* Buttons */}
            <div className="flex items-center justify-between gap-2.5">
                <Button
                    variant="outline"
                    onClick={() => previousStep()}
                    className="cursor-pointer disabled:pointer-events-auto disabled:cursor-not-allowed"
                    disabled={currentStep === 1}
                >
                    Previous
                </Button>

                <Button
                    variant="outline"
                    onClick={() => nextStep()}
                    className="cursor-pointer disabled:pointer-events-auto disabled:cursor-not-allowed"
                    // disabled={
                    //     currentStep === steps.length || isAnonymous === null
                    // }
                >
                    {currentStep === 6 ? <>Submit</> : <>Next</>}
                </Button>
            </div>
        </Stepper>
    );
};

export default Report;
