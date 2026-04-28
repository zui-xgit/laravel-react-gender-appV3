'use client';

import { useState } from 'react';
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
import { Step1 } from '@/components/reporter/stepper/step1';
import { AnonymousCheck } from '@/components/reporter/stepper/anonymous-check';

const steps = [1, 2, 3, 4];

const Report = () => {
    const [currentStep, setCurrentStep] = useState(2);

    return (
        <Stepper
            value={currentStep}
            onValueChange={setCurrentStep}
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
                        {step === 2 && <p>step 2</p>}
                        {step === 3 && <p>step 3</p>}
                        {step === 4 && <p>step 4</p>}
                    </StepperContent>
                ))}
            </StepperPanel>

            {/* Buttons */}
            <div className="flex items-center justify-between gap-2.5">
                <Button
                    variant="outline"
                    onClick={() => setCurrentStep((prev) => prev - 1)}
                    disabled={currentStep === 1}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    onClick={() => setCurrentStep((prev) => prev + 1)}
                    disabled={currentStep === steps.length}
                >
                    Next
                </Button>
            </div>
        </Stepper>
    );
};

export default Report;
