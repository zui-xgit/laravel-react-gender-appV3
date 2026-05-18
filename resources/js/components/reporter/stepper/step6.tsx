import { Eye } from 'lucide-react';
import { useStepperFormStore } from '@/hooks/store/use-stepper-form-store';

// Shadcn UI Components
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useEffect } from 'react';
import { Input } from '@headlessui/react';
import InputError from '@/components/input-error';

export const Step6 = () => {
    const { formData, errors, updateFormData, isAnonymous } =
        useStepperFormStore();

    // Reusable Read-only Field Component
    const renderField = (label: string, value?: string, spanFull = false) => (
        <div
            className={`rounded-2xl border border-border bg-muted/50 p-4 ${
                spanFull ? 'sm:col-span-2' : ''
            }`}
        >
            <label className="mb-2 block text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                {label}
            </label>
            <div className="text-sm font-medium break-words text-foreground">
                {value ? (
                    <span>{value}</span>
                ) : (
                    <span className="text-muted-foreground italic">
                        Not provided
                    </span>
                )}
            </div>
        </div>
    );

    return (
        <div className="animate-reveal space-y-8 sm:space-y-12">
            {/* Header */}
            <div className="flex items-center gap-3 sm:gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-border bg-muted text-primary sm:h-14 sm:w-14">
                    <Eye size={20} className="sm:h-6 sm:w-6" />
                </div>
                <div className="min-w-0">
                    <h2 className="text-lg font-bold tracking-tight break-words text-foreground sm:text-xl md:text-3xl">
                        Statement Verification
                    </h2>
                    <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                        Review your report data carefully before submission.
                    </p>
                </div>
            </div>

            <div className="space-y-8 sm:space-y-12">
                {/* Informant Section (Conditional) */}
                {!isAnonymous && (
                    <section className="space-y-4 sm:space-y-6">
                        <div className="flex items-center gap-3">
                            <Separator className="flex-1" />
                            <h3 className="text-[10px] font-black tracking-[0.4em] whitespace-nowrap text-primary uppercase">
                                Informant / Complainant Details
                            </h3>
                            <Separator className="flex-1" />
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {renderField(
                                'Name of Informant/Complainant',
                                formData.informantName,
                            )}
                            {renderField('Title', formData.informantTitle)}
                            {renderField(
                                'Sex',
                                formData.informantSex?.toString(),
                            )}
                            {renderField(
                                'Age',
                                formData.informantAge?.toString(),
                            )}
                            {renderField(
                                'Phone Number',
                                formData.informantPhone,
                            )}
                            {renderField(
                                'Workplace/Unit',
                                formData.informantWorkplace,
                                true,
                            )}
                        </div>
                    </section>
                )}

                {/* Victim Section */}
                <section className="space-y-4 sm:space-y-6">
                    <div className="flex items-center gap-3">
                        <Separator className="flex-1" />
                        <h3 className="text-[10px] font-black tracking-[0.4em] whitespace-nowrap text-primary uppercase">
                            Victim Information
                        </h3>
                        <Separator className="flex-1" />
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {renderField('Victim Full Name', formData.victimName)}
                        {renderField('Title', formData.victimTitle)}
                        {renderField('Sex', formData.victimSex as string)}
                        {renderField('Age', formData.victimAge?.toString())}
                        {renderField('Phone Number', formData.victimPhone)}
                        {renderField('Email', formData.victimEmail)}
                        {renderField(
                            'Education Level',
                            formData.victimEducation,
                        )}
                        {renderField(
                            'Primary Residence',
                            formData.victimResidence,
                        )}
                        {renderField('Disability', formData.victimDisability)}
                        {renderField(
                            'Workplace/Unit',
                            formData.victimWorkplace,
                            true,
                        )}
                    </div>
                </section>

                {/* Accused Section */}
                <section className="space-y-4 sm:space-y-6">
                    <div className="flex items-center gap-3">
                        <Separator className="flex-1" />
                        <h3 className="text-[10px] font-black tracking-[0.4em] whitespace-nowrap text-primary uppercase">
                            Accused Details
                        </h3>
                        <Separator className="flex-1" />
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {renderField('Name of Accused', formData.accusedName)}
                        {renderField('Sex', formData.accusedSex?.toString())}
                        {renderField('Title', formData.accusedTitle)}
                        {renderField('Age', formData.accusedAge?.toString())}
                        {renderField('Phone Number', formData.accusedPhone)}
                        {renderField('Email', formData.accusedEmail)}
                        {renderField('Education', formData.accusedEducation)}
                        {renderField('Residence', formData.accusedResidence)}
                        {renderField(
                            'Program/School/Workplace',
                            formData.accusedWorkplace,
                            true,
                        )}
                    </div>
                </section>

                {/* Incident Section */}
                <section className="space-y-4 sm:space-y-6">
                    <div className="flex items-center gap-3">
                        <Separator className="flex-1" />
                        <h3 className="text-[10px] font-black tracking-[0.4em] whitespace-nowrap text-primary uppercase">
                            Incident Details
                        </h3>
                        <Separator className="flex-1" />
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {renderField('Date of Incident', formData.incidentDate)}
                        {renderField('Time of Incident', formData.incidentTime)}
                        {renderField(
                            'Where Did Incident Occur',
                            formData.incidentLocation,
                        )}
                        {renderField(
                            'Exact Location',
                            formData.incidentExactLocation,
                        )}
                        {renderField(
                            'What Was the Cause',
                            formData.incidentCause,
                            true,
                        )}
                        {renderField(
                            'How the Incident Happened',
                            formData.incidentDescription,
                            true,
                        )}
                        {renderField(
                            'Immediate Actions Taken',
                            formData.incidentActions,
                            true,
                        )}
                        {renderField(
                            'Injury or Disease Result',
                            formData.incidentInjuries,
                            true,
                        )}
                        {renderField(
                            'Assistance Provided',
                            formData.incidentAssistance,
                            true,
                        )}
                        {renderField(
                            'Who Was Involved',
                            formData.incidentInvolved,
                            true,
                        )}
                    </div>
                </section>

                {/* Confirmation Section */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <Separator className="flex-1" />
                        <h3 className="text-[10px] font-black tracking-[0.4em] whitespace-nowrap text-primary uppercase">
                            Confirmation
                        </h3>
                        <Separator className="flex-1" />
                    </div>

                    <div
                        className={`rounded-2xl border p-6 transition-all ${
                            errors.confirmationChecked
                                ? 'border-destructive bg-destructive/5'
                                : 'border-primary/20 bg-primary/5'
                        }`}
                    >
                        <div className="flex items-start gap-4">
                            <Checkbox
                                id="confirmationChecked"
                                checked={formData.confirmationChecked}
                                onCheckedChange={(checked) =>
                                    updateFormData({
                                        confirmationChecked: checked as boolean,
                                    })
                                }
                                className="mt-1 h-5 w-5 border-primary data-[state=checked]:bg-primary"
                            />
                            <div className="grid gap-1.5 leading-none">
                                <Label
                                    htmlFor="confirmationChecked"
                                    className="cursor-pointer text-sm leading-relaxed font-normal text-foreground"
                                >
                                    I hereby confirm that all the information
                                    provided in this report is true, accurate,
                                    and complete to the best of my knowledge. I
                                    understand that providing false or
                                    misleading information may result in legal
                                    consequences and undermines the integrity of
                                    this reporting system.
                                </Label>
                            </div>
                        </div>
                    </div>

                    {errors.confirmationChecked && (
                        <InputError message={errors.confirmationChecked} />
                    )}
                </section>
            </div>
        </div>
    );
};
