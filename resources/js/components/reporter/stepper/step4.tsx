import { Users } from 'lucide-react';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';

// Shadcn UI Components
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useStepperFormStore } from '@/hooks/store/use-stepper-form-store';
import StepHeader from './step-header';

export const Step4 = () => {
    const { formData, errors, setFormData } = useStepperFormStore();

    return (
        <div className="animate-reveal w-full space-y-6 sm:space-y-8 md:w-[90%]">
            <StepHeader
                icon={Users}
                title="Accused Details"
                description="Person responsible for the incident."
            />

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
                            setFormData({ accusedName: e.target.value })
                        }
                        className={
                            errors.accusedName ? 'border-destructive' : ''
                        }
                    />
                    {errors.accusedName && (
                        <InputError message={errors.accusedName} />
                    )}
                </div>

                {/* Sex Select */}
                <div className="space-y-2">
                    <Label htmlFor="accusedSex">Sex</Label>
                    <Select
                        value={formData.accusedSex ?? ''}
                        onValueChange={(value) =>
                            setFormData({ accusedSex: value as any })
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
                        <InputError message={errors.accusedSex} />
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
                            setFormData({ accusedTitle: e.target.value })
                        }
                        className={
                            errors.accusedTitle ? 'border-destructive' : ''
                        }
                    />
                    {errors.accusedTitle && (
                        <InputError message={errors.accusedTitle} />
                    )}
                </div>

                {/* Age */}
                <div className="space-y-2">
                    <Label htmlFor="accusedAge">Age</Label>
                    <Input
                        id="accusedAge"
                        type="number"
                        placeholder="Enter age"
                        value={formData.accusedAge}
                        onChange={(e) =>
                            setFormData({
                                accusedAge:
                                    e.target.value !== ''
                                        ? Number(e.target.value)
                                        : '',
                            })
                        }
                        className={
                            errors.accusedAge ? 'border-destructive' : ''
                        }
                    />
                    {errors.accusedAge && (
                        <InputError message={errors.accusedAge} />
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
                            setFormData({ accusedPhone: e.target.value })
                        }
                        className={
                            errors.accusedPhone ? 'border-destructive' : ''
                        }
                    />
                    {errors.accusedPhone && (
                        <InputError message={errors.accusedPhone} />
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
                            setFormData({ accusedEmail: e.target.value })
                        }
                        className={
                            errors.accusedEmail ? 'border-destructive' : ''
                        }
                    />
                    {errors.accusedEmail && (
                        <InputError message={errors.accusedEmail} />
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
                            setFormData({ accusedEducation: e.target.value })
                        }
                        className={
                            errors.accusedEducation ? 'border-destructive' : ''
                        }
                    />
                    {errors.accusedEducation && (
                        <InputError message={errors.accusedEducation} />
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
                            setFormData({ accusedResidence: e.target.value })
                        }
                        className={
                            errors.accusedResidence ? 'border-destructive' : ''
                        }
                    />
                    {errors.accusedResidence && (
                        <InputError message={errors.accusedResidence} />
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
                            setFormData({ accusedWorkplace: e.target.value })
                        }
                        className={
                            errors.accusedWorkplace ? 'border-destructive' : ''
                        }
                    />
                    {errors.accusedWorkplace && (
                        <InputError message={errors.accusedWorkplace} />
                    )}
                </div>
            </div>
        </div>
    );
};
