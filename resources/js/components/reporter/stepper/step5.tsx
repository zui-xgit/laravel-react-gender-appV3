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
import InputError from '@/components/input-error';
import StepHeader from './step-header';

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
    const { formData, errors, setFormData } = useStepperFormStore();

    return (
        <div className="animate-reveal w-full space-y-6 sm:space-y-8 md:w-[90%]">
            <StepHeader
                icon={ClipboardList}
                title="Incident Details"
                description="Detailed account of the occurrence."
            />

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
                                setFormData({ incidentDate: e.target.value })
                            }
                            className={
                                errors.incidentDate ? 'border-destructive' : ''
                            }
                        />
                        {errors.incidentDate && (
                            <InputError message={errors.incidentDate} />
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="incidentTime">Time of incident</Label>
                        <Input
                            id="incidentTime"
                            type="time"
                            value={formData.incidentTime ?? ''}
                            onChange={(e) =>
                                setFormData({ incidentTime: e.target.value })
                            }
                            className={
                                errors.incidentTime ? 'border-destructive' : ''
                            }
                        />
                        {errors.incidentTime && (
                            <InputError message={errors.incidentTime} />
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
                            setFormData({ incidentLocation: e.target.value })
                        }
                        className={
                            errors.incidentLocation ? 'border-destructive' : ''
                        }
                    />
                    {errors.incidentLocation && (
                        <InputError message={errors.incidentLocation} />
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
                            setFormData({
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
                        <InputError message={errors.incidentExactLocation} />
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
                            setFormData({
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
                        <InputError message={errors.incidentType} />
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
                            setFormData({ incidentCause: e.target.value })
                        }
                        className={
                            errors.incidentCause ? 'border-destructive' : ''
                        }
                    />
                    {errors.incidentCause && (
                        <InputError message={errors.incidentCause} />
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
                            setFormData({
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
                        <InputError message={errors.incidentDescription} />
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
                            setFormData({ incidentActions: e.target.value })
                        }
                        className={
                            errors.incidentActions ? 'border-destructive' : ''
                        }
                    />
                    {errors.incidentActions && (
                        <InputError message={errors.incidentActions} />
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
                            setFormData({ incidentInjuries: e.target.value })
                        }
                        className={
                            errors.incidentInjuries ? 'border-destructive' : ''
                        }
                    />
                    {errors.incidentInjuries && (
                        <InputError message={errors.incidentInjuries} />
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
                            setFormData({
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
                        <InputError message={errors.incidentAssistance} />
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
                            setFormData({ incidentInvolved: e.target.value })
                        }
                        className={
                            errors.incidentInvolved ? 'border-destructive' : ''
                        }
                    />
                    {errors.incidentInvolved && (
                        <InputError message={errors.incidentInvolved} />
                    )}
                </div>
            </div>
        </div>
    );
};
