import { useStepperFormStore } from '@/hooks/store/use-stepper-form-store';
import {
    Shield,
    Info,
    Lock,
    User,
    CheckCircle2,
    LucideIcon,
    Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';

import { Alert, AlertDescription } from '@/components/ui/alert';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import StepHeader from './step-header';

export const Step1 = () => {
    const { formData, setFormData } = useStepperFormStore();

    return (
        <div className="animate-reveal w-full space-y-6 sm:space-y-8 md:w-[90%]">
            <StepHeader
                icon={Shield}
                title="Reporting Preference"
                description="Choose how you would like to submit this report."
            />
            {/* Informational Notice */}
            <Alert className="border-border bg-muted/40">
                <Info className="h-4 w-4 text-primary" />
                <AlertDescription className="text-xs leading-relaxed sm:text-sm">
                    This reporting system is designed to support individuals
                    affected by gender-based misconduct, harassment, or
                    discrimination. Your safety and privacy are a priority. You
                    are not required to provide identifying information to
                    submit a report.
                </AlertDescription>
            </Alert>

            {/* Selection Options */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Anonymous Option */}
                <Card
                    className={cn(
                        'relative cursor-pointer transition-all duration-200 hover:border-primary/50',
                        formData.isAnonymous === true
                            ? 'border-primary bg-primary/5 ring-1 ring-primary'
                            : 'border-border bg-card',
                    )}
                    onClick={() => setFormData({ isAnonymous: true })}
                >
                    <CardHeader className="flex flex-row items-center gap-4 pb-3">
                        <div
                            className={cn(
                                'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors',
                                formData.isAnonymous === true
                                    ? 'border-primary bg-primary text-primary-foreground'
                                    : 'border-border bg-muted text-muted-foreground',
                            )}
                        >
                            <Lock className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                            <CardTitle className="text-base sm:text-lg">
                                Report Anonymously
                            </CardTitle>
                        </div>
                        {formData.isAnonymous === true && (
                            <CheckCircle2 className="h-5 w-5 animate-in text-primary duration-300 zoom-in-50" />
                        )}
                    </CardHeader>
                    <CardContent>
                        <CardDescription className="text-xs leading-relaxed sm:text-sm">
                            No personal details are collected. This option may
                            limit direct follow-up, but your report will still
                            be reviewed with strict confidentiality.
                        </CardDescription>
                    </CardContent>
                </Card>

                {/* Identified Option */}
                <Card
                    className={cn(
                        'relative cursor-pointer transition-all duration-200 hover:border-primary/50',
                        formData.isAnonymous === false
                            ? 'border-primary bg-primary/5 ring-1 ring-primary'
                            : 'border-border bg-card',
                    )}
                    onClick={() => setFormData({ isAnonymous: false })}
                >
                    <CardHeader className="flex flex-row items-center gap-4 pb-3">
                        <div
                            className={cn(
                                'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors',
                                formData.isAnonymous === false
                                    ? 'border-primary bg-primary text-primary-foreground'
                                    : 'border-border bg-muted text-muted-foreground',
                            )}
                        >
                            <User className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                            <CardTitle className="text-base sm:text-lg">
                                Identify Myself
                            </CardTitle>
                        </div>
                        {formData.isAnonymous === false && (
                            <CheckCircle2 className="h-5 w-5 animate-in text-primary duration-300 zoom-in-50" />
                        )}
                    </CardHeader>
                    <CardContent>
                        <CardDescription className="text-xs leading-relaxed sm:text-sm">
                            Providing your details helps investigators contact
                            you for clarification or offer specific support
                            services tailored to your situation.
                        </CardDescription>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
