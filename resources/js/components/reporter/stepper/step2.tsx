import { FormInput } from '../form-input';
import { FormSelect } from '../form-select';
import { FormTextarea } from '../form-text-area';

import { useStepperFormStore } from '@/hooks/store/use-stepper-form-store';
import { User } from 'lucide-react';

export const Step2 = () => {
    const { formData, errors, updateFormData } = useStepperFormStore();

    const sexOptions = [
        { value: '', label: 'Select' },
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'prefer_not_to_say', label: 'Prefer not to say' },
    ];

    return (
        <div className="animate-reveal space-y-6 sm:space-y-8">
            {/* Header */}
            <div className="flex items-center gap-3 sm:gap-5">
                <div className="border-subtle bg-surface flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border text-[var(--accent-primary)] sm:h-14 sm:w-14">
                    <User size={20} className="sm:h-6 sm:w-6" />
                </div>
                <div className="min-w-0">
                    <h2 className="text-lg font-bold tracking-tight break-words text-primary sm:text-xl md:text-3xl">
                        DETAILS OF THE COMPLAINANT/INFORMANT
                    </h2>
                    <p className="mt-1 text-xs text-secondary sm:text-sm">
                        Reports can be filed anonymously.
                    </p>
                </div>
            </div>

            {/* Form */}
            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
                <FormInput
                    label="Name of Informant/complainant"
                    type="text"
                    value={formData.informantName}
                    onChange={(e) =>
                        updateFormData({ informantName: e.target.value })
                    }
                    placeholder="Enter name or alias"
                    error={errors.informantName}
                />

                <FormInput
                    label="Title"
                    value={formData.informantTitle}
                    onChange={(e) =>
                        updateFormData({ informantTitle: e.target.value })
                    }
                    placeholder="Mr. / Ms. / Prof."
                    error={errors.informantTitle}
                />

                <FormSelect
                    label="Sex"
                    value={formData.informantSex ?? ''}
                    onChange={(e) =>
                        updateFormData({
                            informantSex: e.target.value as
                                | 'male'
                                | 'female'
                                | 'prefer_not_to_say'
                                | null,
                        })
                    }
                    options={sexOptions}
                    error={errors.informantSex}
                />

                <FormInput
                    label="Age"
                    type="number"
                    value={formData.informantAge ?? ''}
                    onChange={(e) =>
                        updateFormData({
                            informantAge: e.target.value
                                ? Number(e.target.value)
                                : null,
                        })
                    }
                    error={errors.informantAge}
                />

                <FormInput
                    label="Contact Phone"
                    type="number"
                    value={formData.informantPhone}
                    onChange={(e) =>
                        updateFormData({ informantPhone: e.target.value })
                    }
                    placeholder="+255..."
                    error={errors.informantPhone}
                    spanFull
                />

                <FormTextarea
                    label="Program / School / Directorate / Unit / Workplace"
                    rows={3}
                    value={formData.informantWorkplace}
                    onChange={(e) =>
                        updateFormData({ informantWorkplace: e.target.value })
                    }
                    placeholder="Specify Program (Bachelor/Masters/PHD) School/Collage/ Directorate/Unit/Work place."
                    error={errors.informantWorkplace}
                    spanFull
                />
            </div>
        </div>
    );
};
