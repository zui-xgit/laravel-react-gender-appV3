// import { useStepperFormStore } from '@/hooks/store/use-stepper-form-store';
// import { Users } from 'lucide-react';
// import { FormInput } from '../form-input';
// import { FormSelect } from '../form-select';

// export const Step4 = () => {
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
//                     <Users size={20} className="sm:h-6 sm:w-6" />
//                 </div>
//                 <div className="min-w-0">
//                     <h2 className="text-lg font-bold tracking-tight break-words text-primary sm:text-xl md:text-3xl">
//                         Accused Details
//                     </h2>
//                     <p className="mt-1 text-xs text-secondary sm:text-sm">
//                         Person responsible for the incident.
//                     </p>
//                 </div>
//             </div>

//             <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
//                 <FormInput
//                     label="Name of the Accused"
//                     value={formData.accusedName}
//                     onChange={(e) =>
//                         updateFormData({ accusedName: e.target.value })
//                     }
//                     placeholder="Enter full name"
//                     error={errors.accusedName}
//                 />

//                 <FormSelect
//                     label="Sex"
//                     value={formData.accusedSex ?? ''}
//                     onChange={(e) =>
//                         updateFormData({
//                             accusedSex: e.target.value as
//                                 | 'male'
//                                 | 'female'
//                                 | 'prefer_not_to_say'
//                                 | null,
//                         })
//                     }
//                     options={sexOptions}
//                     error={errors.accusedSex}
//                 />

//                 <FormInput
//                     label="Title"
//                     value={formData.accusedTitle}
//                     onChange={(e) =>
//                         updateFormData({ accusedTitle: e.target.value })
//                     }
//                     placeholder="Mr. / Ms. / Prof."
//                     error={errors.accusedTitle}
//                 />

//                 <FormInput
//                     label="Age"
//                     type="number"
//                     value={formData.accusedAge ?? ''}
//                     onChange={(e) =>
//                         updateFormData({ accusedAge: Number(e.target.value) })
//                     }
//                     placeholder="Enter age"
//                     error={errors.accusedAge}
//                 />

//                 <FormInput
//                     label="Phone Number"
//                     type="number"
//                     value={formData.accusedPhone ?? ''}
//                     onChange={(e) =>
//                         updateFormData({ accusedPhone: e.target.value })
//                     }
//                     placeholder="+255..."
//                     error={errors.accusedPhone}
//                 />

//                 <FormInput
//                     label="Email"
//                     type="email"
//                     value={formData.accusedEmail}
//                     onChange={(e) =>
//                         updateFormData({ accusedEmail: e.target.value })
//                     }
//                     placeholder="Enter email"
//                     error={errors.accusedEmail}
//                 />

//                 <FormInput
//                     label="Education"
//                     value={formData.accusedEducation}
//                     onChange={(e) =>
//                         updateFormData({ accusedEducation: e.target.value })
//                     }
//                     placeholder="Specify education"
//                     error={errors.accusedEducation}
//                 />

//                 <FormInput
//                     label="Residence"
//                     value={formData.accusedResidence}
//                     onChange={(e) =>
//                         updateFormData({ accusedResidence: e.target.value })
//                     }
//                     placeholder="Specify residence"
//                     error={errors.accusedResidence}
//                 />

//                 <FormInput
//                     label="Program (Bachelor/Masters/PHD) or School/Collage/ Directorate/Unit/Work place"
//                     value={formData.accusedWorkplace}
//                     onChange={(e) =>
//                         updateFormData({ accusedWorkplace: e.target.value })
//                     }
//                     placeholder="Specify workplace"
//                     error={errors.accusedWorkplace}
//                     spanFull
//                 />
//             </div>
//         </div>
//     );
// };

import { Users } from 'lucide-react';
import { useStepperFormStore } from '@/hooks/store/use-stepper-form-store';

// Shadcn UI Components
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export const Step4 = () => {
    const { formData, errors, updateFormData } = useStepperFormStore();

    return (
        <div className="animate-reveal w-full space-y-6 sm:space-y-8 md:w-[90%]">
            {/* Header */}
            <div className="flex items-center gap-3 sm:gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-border bg-muted text-primary sm:h-14 sm:w-14">
                    <Users size={20} className="sm:h-6 sm:w-6" />
                </div>
                <div className="min-w-0">
                    <h2 className="text-lg font-bold tracking-tight break-words text-foreground sm:text-xl md:text-3xl">
                        Accused Details
                    </h2>
                    <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                        Person responsible for the incident.
                    </p>
                </div>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
                {/* Accused Name */}
                <div className="space-y-2">
                    <Label htmlFor="accusedName">Name of the Accused</Label>
                    <Input
                        id="accusedName"
                        placeholder="Enter full name"
                        value={formData.accusedName}
                        onChange={(e) =>
                            updateFormData({ accusedName: e.target.value })
                        }
                        className={
                            errors.accusedName ? 'border-destructive' : ''
                        }
                    />
                    {errors.accusedName && (
                        <p className="text-xs text-destructive">
                            {errors.accusedName}
                        </p>
                    )}
                </div>

                {/* Sex Select */}
                <div className="space-y-2">
                    <Label htmlFor="accusedSex">Sex</Label>
                    <Select
                        value={formData.accusedSex ?? ''}
                        onValueChange={(value) =>
                            updateFormData({ accusedSex: value as any })
                        }
                    >
                        <SelectTrigger
                            className={
                                errors.accusedSex ? 'border-destructive' : ''
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
                    {errors.accusedSex && (
                        <p className="text-xs text-destructive">
                            {errors.accusedSex}
                        </p>
                    )}
                </div>

                {/* Title */}
                <div className="space-y-2">
                    <Label htmlFor="accusedTitle">Title</Label>
                    <Input
                        id="accusedTitle"
                        placeholder="Mr. / Ms. / Prof."
                        value={formData.accusedTitle}
                        onChange={(e) =>
                            updateFormData({ accusedTitle: e.target.value })
                        }
                        className={
                            errors.accusedTitle ? 'border-destructive' : ''
                        }
                    />
                    {errors.accusedTitle && (
                        <p className="text-xs text-destructive">
                            {errors.accusedTitle}
                        </p>
                    )}
                </div>

                {/* Age */}
                <div className="space-y-2">
                    <Label htmlFor="accusedAge">Age</Label>
                    <Input
                        id="accusedAge"
                        type="number"
                        placeholder="Enter age"
                        value={formData.accusedAge ?? ''}
                        onChange={(e) =>
                            updateFormData({
                                accusedAge: e.target.value
                                    ? Number(e.target.value)
                                    : null,
                            })
                        }
                        className={
                            errors.accusedAge ? 'border-destructive' : ''
                        }
                    />
                    {errors.accusedAge && (
                        <p className="text-xs text-destructive">
                            {errors.accusedAge}
                        </p>
                    )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                    <Label htmlFor="accusedPhone">Phone Number</Label>
                    <Input
                        id="accusedPhone"
                        type="tel"
                        placeholder="+255..."
                        value={formData.accusedPhone ?? ''}
                        onChange={(e) =>
                            updateFormData({ accusedPhone: e.target.value })
                        }
                        className={
                            errors.accusedPhone ? 'border-destructive' : ''
                        }
                    />
                    {errors.accusedPhone && (
                        <p className="text-xs text-destructive">
                            {errors.accusedPhone}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <Label htmlFor="accusedEmail">Email</Label>
                    <Input
                        id="accusedEmail"
                        type="email"
                        placeholder="Enter email"
                        value={formData.accusedEmail}
                        onChange={(e) =>
                            updateFormData({ accusedEmail: e.target.value })
                        }
                        className={
                            errors.accusedEmail ? 'border-destructive' : ''
                        }
                    />
                    {errors.accusedEmail && (
                        <p className="text-xs text-destructive">
                            {errors.accusedEmail}
                        </p>
                    )}
                </div>

                {/* Education */}
                <div className="space-y-2">
                    <Label htmlFor="accusedEducation">Education</Label>
                    <Input
                        id="accusedEducation"
                        placeholder="Specify education"
                        value={formData.accusedEducation}
                        onChange={(e) =>
                            updateFormData({ accusedEducation: e.target.value })
                        }
                        className={
                            errors.accusedEducation ? 'border-destructive' : ''
                        }
                    />
                    {errors.accusedEducation && (
                        <p className="text-xs text-destructive">
                            {errors.accusedEducation}
                        </p>
                    )}
                </div>

                {/* Residence */}
                <div className="space-y-2">
                    <Label htmlFor="accusedResidence">Residence</Label>
                    <Input
                        id="accusedResidence"
                        placeholder="Specify residence"
                        value={formData.accusedResidence}
                        onChange={(e) =>
                            updateFormData({ accusedResidence: e.target.value })
                        }
                        className={
                            errors.accusedResidence ? 'border-destructive' : ''
                        }
                    />
                    {errors.accusedResidence && (
                        <p className="text-xs text-destructive">
                            {errors.accusedResidence}
                        </p>
                    )}
                </div>

                {/* Workplace (Full Width) */}
                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="accusedWorkplace">
                        Program / School / College / Directorate / Unit /
                        Workplace
                    </Label>
                    <Input
                        id="accusedWorkplace"
                        placeholder="Specify workplace"
                        value={formData.accusedWorkplace}
                        onChange={(e) =>
                            updateFormData({ accusedWorkplace: e.target.value })
                        }
                        className={
                            errors.accusedWorkplace ? 'border-destructive' : ''
                        }
                    />
                    {errors.accusedWorkplace && (
                        <p className="text-xs text-destructive">
                            {errors.accusedWorkplace}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};
