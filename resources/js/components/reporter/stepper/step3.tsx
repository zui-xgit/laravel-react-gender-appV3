// import { useStepperFormStore } from '@/hooks/store/use-stepper-form-store';
// import { User } from 'lucide-react';
// import { FormInput } from '../form-input';
// import { FormSelect } from '../form-select';
// import { FormTextarea } from '../form-text-area';

// export const Step3 = () => {
//     const { formData, errors, updateFormData } = useStepperFormStore();

//     const sexOptions = [
//         { value: '', label: 'Select' },
//         { value: 'male', label: 'Male' },
//         { value: 'female', label: 'Female' },
//         { value: 'prefer_not_to_say', label: 'Prefer not to say' },
//     ];

//     return (
//         <div className="animate-reveal space-y-6 sm:space-y-8">
//             <div className="flex items-center gap-3 sm:gap-5">
//                 <div className="border-subtle bg-surface flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border text-[var(--accent-primary)] sm:h-14 sm:w-14">
//                     <User size={20} className="sm:h-6 sm:w-6" />
//                 </div>
//                 <div className="min-w-0">
//                     <h2 className="text-lg font-bold tracking-tight break-words text-primary sm:text-xl md:text-3xl">
//                         Victim Information
//                     </h2>
//                     <p className="mt-1 text-xs text-secondary sm:text-sm">
//                         Details of the person affected.
//                     </p>
//                 </div>
//             </div>

//             <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
//                 <FormInput
//                     label="Victim Full Name"
//                     type="text"
//                     value={formData.victimName}
//                     onChange={(e) =>
//                         updateFormData({ victimName: e.target.value })
//                     }
//                     placeholder="Enter full name"
//                     error={errors.victimName}
//                 />

//                 <FormInput
//                     label="Title"
//                     type="text"
//                     value={formData.victimTitle}
//                     onChange={(e) =>
//                         updateFormData({ victimTitle: e.target.value })
//                     }
//                     placeholder="Mr. / Ms. / Prof."
//                     error={errors.victimTitle}
//                 />

//                 <FormSelect
//                     label="Sex"
//                     value={formData.victimSex ?? ''}
//                     onChange={(e) =>
//                         updateFormData({
//                             victimSex: e.target.value as
//                                 | 'male'
//                                 | 'female'
//                                 | 'prefer_not_to_say'
//                                 | null,
//                         })
//                     }
//                     options={sexOptions}
//                     error={errors.victimSex}
//                 />

//                 <FormInput
//                     label="Age"
//                     type="number"
//                     value={formData.victimAge ?? ''}
//                     onChange={(e) =>
//                         updateFormData({ victimAge: Number(e.target.value) })
//                     }
//                     error={errors.victimAge}
//                 />

//                 <FormInput
//                     label="Phone number"
//                     type="number"
//                     value={formData.victimPhone}
//                     onChange={(e) =>
//                         updateFormData({ victimPhone: e.target.value })
//                     }
//                     placeholder="+255..."
//                     error={errors.victimPhone}
//                 />

//                 <FormInput
//                     label="Email"
//                     type="email"
//                     value={formData.victimEmail}
//                     onChange={(e) =>
//                         updateFormData({ victimEmail: e.target.value })
//                     }
//                     placeholder="example@email.com"
//                     error={errors.victimEmail}
//                 />

//                 <FormInput
//                     label="Education Level"
//                     type="text"
//                     value={formData.victimEducation}
//                     onChange={(e) =>
//                         updateFormData({ victimEducation: e.target.value })
//                     }
//                     placeholder="Bachelor / Masters / PhD"
//                     error={errors.victimEducation}
//                 />

//                 <FormInput
//                     label="Primary Residence"
//                     type="text"
//                     value={formData.victimResidence}
//                     onChange={(e) =>
//                         updateFormData({ victimResidence: e.target.value })
//                     }
//                     error={errors.victimResidence}
//                 />

//                 <FormInput
//                     label="Disability (State)"
//                     type="text"
//                     value={formData.victimDisability}
//                     onChange={(e) =>
//                         updateFormData({ victimDisability: e.target.value })
//                     }
//                     error={errors.victimDisability}
//                 />

//                 <FormTextarea
//                     label="Workplace / Unit"
//                     rows={3}
//                     value={formData.victimWorkplace}
//                     onChange={(e) =>
//                         updateFormData({ victimWorkplace: e.target.value })
//                     }
//                     error={errors.victimWorkplace}
//                     spanFull
//                 />
//             </div>
//         </div>
//     );
// };

import { User } from 'lucide-react';
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

export const Step3 = () => {
    const { formData, errors, updateFormData } = useStepperFormStore();

    return (
        <div className="animate-reveal w-full space-y-6 sm:space-y-8 md:w-[90%]">
            {/* Header */}
            <div className="flex items-center gap-3 sm:gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-border bg-muted text-primary sm:h-14 sm:w-14">
                    <User size={20} className="sm:h-6 sm:w-6" />
                </div>
                <div className="min-w-0">
                    <h2 className="text-lg font-bold tracking-tight break-words text-foreground sm:text-xl md:text-3xl">
                        Victim Information
                    </h2>
                    <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                        Details of the person affected.
                    </p>
                </div>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
                {/* Full Name */}
                <div className="space-y-2">
                    <Label htmlFor="victimName">Victim Full Name</Label>
                    <Input
                        id="victimName"
                        placeholder="Enter full name"
                        value={formData.victimName}
                        onChange={(e) =>
                            updateFormData({ victimName: e.target.value })
                        }
                        className={
                            errors.victimName ? 'border-destructive' : ''
                        }
                    />
                    {errors.victimName && (
                        <p className="text-xs text-destructive">
                            {errors.victimName}
                        </p>
                    )}
                </div>

                {/* Title */}
                <div className="space-y-2">
                    <Label htmlFor="victimTitle">Title</Label>
                    <Input
                        id="victimTitle"
                        placeholder="Mr. / Ms. / Prof."
                        value={formData.victimTitle}
                        onChange={(e) =>
                            updateFormData({ victimTitle: e.target.value })
                        }
                        className={
                            errors.victimTitle ? 'border-destructive' : ''
                        }
                    />
                    {errors.victimTitle && (
                        <p className="text-xs text-destructive">
                            {errors.victimTitle}
                        </p>
                    )}
                </div>

                {/* Sex */}
                <div className="space-y-2">
                    <Label htmlFor="victimSex">Sex</Label>
                    <Select
                        value={formData.victimSex ?? ''}
                        onValueChange={(value) =>
                            updateFormData({ victimSex: value as any })
                        }
                    >
                        <SelectTrigger
                            className={
                                errors.victimSex ? 'border-destructive' : ''
                            }
                        >
                            <SelectValue placeholder="Select sex" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="prefer_not_to_say">
                                Prefer not to say
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.victimSex && (
                        <p className="text-xs text-destructive">
                            {errors.victimSex}
                        </p>
                    )}
                </div>

                {/* Age */}
                <div className="space-y-2">
                    <Label htmlFor="victimAge">Age</Label>
                    <Input
                        id="victimAge"
                        type="number"
                        placeholder="Age"
                        value={formData.victimAge ?? ''}
                        onChange={(e) =>
                            updateFormData({
                                victimAge: e.target.value
                                    ? Number(e.target.value)
                                    : null,
                            })
                        }
                        className={errors.victimAge ? 'border-destructive' : ''}
                    />
                    {errors.victimAge && (
                        <p className="text-xs text-destructive">
                            {errors.victimAge}
                        </p>
                    )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                    <Label htmlFor="victimPhone">Phone number</Label>
                    <Input
                        id="victimPhone"
                        type="tel"
                        placeholder="+255..."
                        value={formData.victimPhone}
                        onChange={(e) =>
                            updateFormData({ victimPhone: e.target.value })
                        }
                        className={
                            errors.victimPhone ? 'border-destructive' : ''
                        }
                    />
                    {errors.victimPhone && (
                        <p className="text-xs text-destructive">
                            {errors.victimPhone}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <Label htmlFor="victimEmail">Email</Label>
                    <Input
                        id="victimEmail"
                        type="email"
                        placeholder="example@email.com"
                        value={formData.victimEmail}
                        onChange={(e) =>
                            updateFormData({ victimEmail: e.target.value })
                        }
                        className={
                            errors.victimEmail ? 'border-destructive' : ''
                        }
                    />
                    {errors.victimEmail && (
                        <p className="text-xs text-destructive">
                            {errors.victimEmail}
                        </p>
                    )}
                </div>

                {/* Education */}
                <div className="space-y-2">
                    <Label htmlFor="victimEducation">Education Level</Label>
                    <Input
                        id="victimEducation"
                        placeholder="Bachelor / Masters / PhD"
                        value={formData.victimEducation}
                        onChange={(e) =>
                            updateFormData({ victimEducation: e.target.value })
                        }
                        className={
                            errors.victimEducation ? 'border-destructive' : ''
                        }
                    />
                    {errors.victimEducation && (
                        <p className="text-xs text-destructive">
                            {errors.victimEducation}
                        </p>
                    )}
                </div>

                {/* Residence */}
                <div className="space-y-2">
                    <Label htmlFor="victimResidence">Primary Residence</Label>
                    <Input
                        id="victimResidence"
                        placeholder="Current city/district"
                        value={formData.victimResidence}
                        onChange={(e) =>
                            updateFormData({ victimResidence: e.target.value })
                        }
                        className={
                            errors.victimResidence ? 'border-destructive' : ''
                        }
                    />
                    {errors.victimResidence && (
                        <p className="text-xs text-destructive">
                            {errors.victimResidence}
                        </p>
                    )}
                </div>

                {/* Disability */}
                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="victimDisability">Disability (State)</Label>
                    <Input
                        id="victimDisability"
                        placeholder="None / Specify disability if any"
                        value={formData.victimDisability}
                        onChange={(e) =>
                            updateFormData({ victimDisability: e.target.value })
                        }
                        className={
                            errors.victimDisability ? 'border-destructive' : ''
                        }
                    />
                    {errors.victimDisability && (
                        <p className="text-xs text-destructive">
                            {errors.victimDisability}
                        </p>
                    )}
                </div>

                {/* Workplace */}
                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="victimWorkplace">Workplace / Unit</Label>
                    <Textarea
                        id="victimWorkplace"
                        rows={3}
                        placeholder="Specify Workplace or Unit"
                        value={formData.victimWorkplace}
                        onChange={(e) =>
                            updateFormData({ victimWorkplace: e.target.value })
                        }
                        className={
                            errors.victimWorkplace ? 'border-destructive' : ''
                        }
                    />
                    {errors.victimWorkplace && (
                        <p className="text-xs text-destructive">
                            {errors.victimWorkplace}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};
