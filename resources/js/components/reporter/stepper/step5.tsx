// import { useStepperFormStore } from '@/hooks/store/use-stepper-form-store';
// import { ClipboardList } from 'lucide-react';
// import { FormInput } from '../form-input';
// import { FormTextarea } from '../form-text-area';
// export const Step5 = () => {
//     const { formData, errors, updateFormData } = useStepperFormStore();

//     return (
//         <div className="animate-reveal space-y-6 sm:space-y-8">
//             <div className="flex items-center gap-3 sm:gap-5">
//                 <div className="border-subtle bg-surface flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border text-[var(--accent-primary)] sm:h-14 sm:w-14">
//                     <ClipboardList size={20} className="sm:h-6 sm:w-6" />
//                 </div>
//                 <div className="min-w-0">
//                     <h2 className="text-lg font-bold tracking-tight break-words text-primary sm:text-xl md:text-3xl">
//                         Incident Details
//                     </h2>
//                     <p className="mt-1 text-xs text-secondary sm:text-sm">
//                         Detailed account of the occurrence.
//                     </p>
//                 </div>
//             </div>

//             <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
//                 {/* Date & Time */}
//                 <div className="grid min-w-0 grid-cols-2 gap-4 sm:gap-6 md:col-span-2">
//                     <FormInput
//                         label="Date of incident"
//                         type="date"
//                         value={formData.incidentDate ?? ''}
//                         onChange={(e) =>
//                             updateFormData({ incidentDate: e.target.value })
//                         }
//                         error={errors.incidentDate}
//                     />
//                     <FormInput
//                         label="Time of incident"
//                         type="time"
//                         value={formData.incidentTime ?? ''}
//                         onChange={(e) =>
//                             updateFormData({ incidentTime: e.target.value })
//                         }
//                         error={errors.incidentTime}
//                     />
//                 </div>

//                 <FormInput
//                     label="Where did incident occur"
//                     value={formData.incidentLocation ?? ''}
//                     onChange={(e) =>
//                         updateFormData({ incidentLocation: e.target.value })
//                     }
//                     placeholder="Specify location"
//                     error={errors.incidentLocation}
//                 />

//                 <FormInput
//                     label="Exact location of the incident"
//                     value={formData.incidentExactLocation ?? ''}
//                     onChange={(e) =>
//                         updateFormData({
//                             incidentExactLocation: e.target.value,
//                         })
//                     }
//                     placeholder="Specify exact location"
//                     error={errors.incidentExactLocation}
//                 />

//                 <FormTextarea
//                     label="What was the cause?"
//                     rows={3}
//                     value={formData.incidentCause ?? ''}
//                     onChange={(e) =>
//                         updateFormData({ incidentCause: e.target.value })
//                     }
//                     placeholder="Describe cause"
//                     error={errors.incidentCause}
//                     spanFull
//                 />

//                 <FormTextarea
//                     label="Describe how the incident happened"
//                     rows={3}
//                     value={formData.incidentDescription ?? ''}
//                     onChange={(e) =>
//                         updateFormData({ incidentDescription: e.target.value })
//                     }
//                     placeholder="Describe incident"
//                     error={errors.incidentDescription}
//                     spanFull
//                 />

//                 <FormTextarea
//                     label="Describe Immediate actions taken"
//                     rows={3}
//                     value={formData.incidentActions ?? ''}
//                     onChange={(e) =>
//                         updateFormData({ incidentActions: e.target.value })
//                     }
//                     placeholder="Describe immediate actions"
//                     error={errors.incidentActions}
//                     spanFull
//                 />

//                 <FormTextarea
//                     label="If the incident resulted in an injury or disease, describe it"
//                     rows={3}
//                     value={formData.incidentInjuries ?? ''}
//                     onChange={(e) =>
//                         updateFormData({ incidentInjuries: e.target.value })
//                     }
//                     placeholder="Describe injury or disease"
//                     error={errors.incidentInjuries}
//                     spanFull
//                 />

//                 <FormTextarea
//                     label="If injury/disease occurred, describe assistance provided"
//                     rows={3}
//                     value={formData.incidentAssistance ?? ''}
//                     onChange={(e) =>
//                         updateFormData({ incidentAssistance: e.target.value })
//                     }
//                     placeholder="Describe assistance"
//                     error={errors.incidentAssistance}
//                     spanFull
//                 />

//                 <FormInput
//                     label="Who was involved?"
//                     value={formData.incidentInvolved ?? ''}
//                     onChange={(e) =>
//                         updateFormData({ incidentInvolved: e.target.value })
//                     }
//                     placeholder="Specify involved parties"
//                     error={errors.incidentInvolved}
//                     spanFull
//                 />
//             </div>
//         </div>
//     );
// };

import { ClipboardList } from 'lucide-react';
import { useStepperFormStore } from '@/hooks/store/use-stepper-form-store';

// Shadcn UI Components
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const INCIDENT_TYPES = [
    // Physical & Grave Harm
    {
        value: 'Physical Assault / Battery',
        label: 'Physical Assault / Battery',
    },
    { value: 'Sexual Assault / Rape', label: 'Sexual Assault / Rape' },
    {
        value: 'Attempted Physical/Sexual Assault',
        label: 'Attempted Physical/Sexual Assault',
    },

    // Sexual & Harassment
    {
        value: 'Sexual Harassment (Work/Public)',
        label: 'Sexual Harassment (Work/Public)',
    },
    {
        value: 'Indecent Exposure / Flashing',
        label: 'Indecent Exposure / Flashing',
    },
    {
        value: 'Non-Consensual Sharing of Intimate Images',
        label: 'Non-Consensual Sharing of Intimate Images',
    },

    // Emotional & Psychological
    {
        value: 'Emotional / Psychological Abuse',
        label: 'Emotional / Psychological Abuse',
    },
    {
        value: 'Verbal Abuse / Hate Speech',
        label: 'Verbal Abuse / Hate Speech',
    },
    {
        value: 'Systemic Gaslighting / Manipulation',
        label: 'Systemic Gaslighting / Manipulation',
    },
    { value: 'Blackmail / Coercion', label: 'Blackmail / Coercion' },

    // Digital & Modern Threats
    {
        value: 'Cyber Stalking / Digital Tracking',
        label: 'Cyber Stalking / Digital Tracking',
    },
    {
        value: 'Doxing / Personal Data Leakage',
        label: 'Doxing / Personal Data Leakage',
    },
    {
        value: 'Identity Theft / Impersonation',
        label: 'Identity Theft / Impersonation',
    },

    // Domestic & Structural
    {
        value: 'Domestic / Intimate Partner Violence',
        label: 'Domestic / Intimate Partner Violence',
    },
    {
        value: 'Economic Abuse (Withholding Funds/Documents)',
        label: 'Economic Abuse (Withholding Funds/Documents)',
    },
    {
        value: 'Denial of Education or Resources',
        label: 'Denial of Education or Resources',
    },

    // Traditional & Institutional
    { value: 'Forced / Child Marriage', label: 'Forced / Child Marriage' },
    {
        value: 'Female Genital Mutilation (FGM)',
        label: 'Female Genital Mutilation (FGM)',
    },
    {
        value: 'Institutional Gender Discrimination',
        label: 'Institutional Gender Discrimination',
    },

    { value: 'Other / Not Listed', label: 'Other / Not Listed' },
];
export const Step5 = () => {
    const { formData, errors, updateFormData } = useStepperFormStore();

    return (
        <div className="animate-reveal w-full space-y-6 sm:space-y-8 md:w-[90%]">
            {/* Header */}
            <div className="flex flex-row items-center justify-start gap-3 sm:gap-5">
                <div className="tborder flex shrink-0 items-center justify-center rounded-2xl border border-border bg-muted text-primary sm:h-14 sm:w-14">
                    <ClipboardList size={20} className="sm:h-6 sm:w-6" />
                </div>
                <div className="min-w-0">
                    <h2 className="text-lg font-bold tracking-tight break-words text-foreground sm:text-xl md:text-3xl">
                        Incident Details
                    </h2>
                    <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                        Detailed account of the occurrence.
                    </p>
                </div>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
                {/* Date & Time Row */}
                <div className="grid min-w-0 grid-cols-2 gap-4 sm:gap-6 md:col-span-2">
                    <div className="space-y-2">
                        <Label htmlFor="incidentDate">Date of incident</Label>
                        <Input
                            id="incidentDate"
                            type="date"
                            value={formData.incidentDate ?? ''}
                            onChange={(e) =>
                                updateFormData({ incidentDate: e.target.value })
                            }
                            className={
                                errors.incidentDate ? 'border-destructive' : ''
                            }
                        />
                        {errors.incidentDate && (
                            <p className="text-xs text-destructive">
                                {errors.incidentDate}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="incidentTime">Time of incident</Label>
                        <Input
                            id="incidentTime"
                            type="time"
                            value={formData.incidentTime ?? ''}
                            onChange={(e) =>
                                updateFormData({ incidentTime: e.target.value })
                            }
                            className={
                                errors.incidentTime ? 'border-destructive' : ''
                            }
                        />
                        {errors.incidentTime && (
                            <p className="text-xs text-destructive">
                                {errors.incidentTime}
                            </p>
                        )}
                    </div>
                </div>

                {/* Locations */}
                <div className="space-y-2">
                    <Label htmlFor="incidentLocation">
                        Where did incident occur
                    </Label>
                    <Input
                        id="incidentLocation"
                        placeholder="Specify location"
                        value={formData.incidentLocation ?? ''}
                        onChange={(e) =>
                            updateFormData({ incidentLocation: e.target.value })
                        }
                        className={
                            errors.incidentLocation ? 'border-destructive' : ''
                        }
                    />
                    {errors.incidentLocation && (
                        <p className="text-xs text-destructive">
                            {errors.incidentLocation}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="incidentExactLocation">
                        Exact location of the incident
                    </Label>
                    <Input
                        id="incidentExactLocation"
                        placeholder="Specify exact location"
                        value={formData.incidentExactLocation ?? ''}
                        onChange={(e) =>
                            updateFormData({
                                incidentExactLocation: e.target.value,
                            })
                        }
                        className={
                            errors.incidentExactLocation
                                ? 'border-destructive'
                                : ''
                        }
                    />
                    {errors.incidentExactLocation && (
                        <p className="text-xs text-destructive">
                            {errors.incidentExactLocation}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label
                        htmlFor="incidentType"
                        className={
                            errors.incidentType ? 'text-destructive' : ''
                        }
                    >
                        Incident Type
                    </Label>

                    <Select
                        value={formData.incidentType ?? ''}
                        onValueChange={(value) =>
                            updateFormData({
                                incidentType: value,
                            })
                        }
                    >
                        <SelectTrigger
                            id="incidentType"
                            className={
                                errors.incidentType
                                    ? 'border-destructive focus:ring-destructive'
                                    : ''
                            }
                        >
                            <SelectValue placeholder="Select the type of incident" />
                        </SelectTrigger>

                        <SelectContent>
                            {INCIDENT_TYPES.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                    {type.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {errors.incidentType && (
                        <p className="text-xs text-destructive">
                            {errors.incidentType}
                        </p>
                    )}
                </div>

                {/* Detailed Textareas (Full Width) */}
                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="incidentCause">What was the cause?</Label>
                    <Textarea
                        id="incidentCause"
                        rows={3}
                        placeholder="Describe cause"
                        value={formData.incidentCause ?? ''}
                        onChange={(e) =>
                            updateFormData({ incidentCause: e.target.value })
                        }
                        className={
                            errors.incidentCause ? 'border-destructive' : ''
                        }
                    />
                    {errors.incidentCause && (
                        <p className="text-xs text-destructive">
                            {errors.incidentCause}
                        </p>
                    )}
                </div>

                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="incidentDescription">
                        Describe how the incident happened
                    </Label>
                    <Textarea
                        id="incidentDescription"
                        rows={3}
                        placeholder="Describe incident"
                        value={formData.incidentDescription ?? ''}
                        onChange={(e) =>
                            updateFormData({
                                incidentDescription: e.target.value,
                            })
                        }
                        className={
                            errors.incidentDescription
                                ? 'border-destructive'
                                : ''
                        }
                    />
                    {errors.incidentDescription && (
                        <p className="text-xs text-destructive">
                            {errors.incidentDescription}
                        </p>
                    )}
                </div>

                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="incidentActions">
                        Describe Immediate actions taken
                    </Label>
                    <Textarea
                        id="incidentActions"
                        rows={3}
                        placeholder="Describe immediate actions"
                        value={formData.incidentActions ?? ''}
                        onChange={(e) =>
                            updateFormData({ incidentActions: e.target.value })
                        }
                        className={
                            errors.incidentActions ? 'border-destructive' : ''
                        }
                    />
                    {errors.incidentActions && (
                        <p className="text-xs text-destructive">
                            {errors.incidentActions}
                        </p>
                    )}
                </div>

                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="incidentInjuries">
                        If the incident resulted in an injury or disease,
                        describe it
                    </Label>
                    <Textarea
                        id="incidentInjuries"
                        rows={3}
                        placeholder="Describe injury or disease"
                        value={formData.incidentInjuries ?? ''}
                        onChange={(e) =>
                            updateFormData({ incidentInjuries: e.target.value })
                        }
                        className={
                            errors.incidentInjuries ? 'border-destructive' : ''
                        }
                    />
                    {errors.incidentInjuries && (
                        <p className="text-xs text-destructive">
                            {errors.incidentInjuries}
                        </p>
                    )}
                </div>

                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="incidentAssistance">
                        If injury/disease occurred, describe assistance provided
                    </Label>
                    <Textarea
                        id="incidentAssistance"
                        rows={3}
                        placeholder="Describe assistance"
                        value={formData.incidentAssistance ?? ''}
                        onChange={(e) =>
                            updateFormData({
                                incidentAssistance: e.target.value,
                            })
                        }
                        className={
                            errors.incidentAssistance
                                ? 'border-destructive'
                                : ''
                        }
                    />
                    {errors.incidentAssistance && (
                        <p className="text-xs text-destructive">
                            {errors.incidentAssistance}
                        </p>
                    )}
                </div>

                {/* Who was involved (Full Width Input) */}
                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="incidentInvolved">Who was involved?</Label>
                    <Input
                        id="incidentInvolved"
                        placeholder="Specify involved parties"
                        value={formData.incidentInvolved ?? ''}
                        onChange={(e) =>
                            updateFormData({ incidentInvolved: e.target.value })
                        }
                        className={
                            errors.incidentInvolved ? 'border-destructive' : ''
                        }
                    />
                    {errors.incidentInvolved && (
                        <p className="text-xs text-destructive">
                            {errors.incidentInvolved}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};
