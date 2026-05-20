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
import InputError from '@/components/input-error';
import StepHeader from './step-header';

export const Step3 = () => {
    const { formData, errors, setFormData } = useStepperFormStore();

    return (
        <div className="animate-reveal w-full space-y-6 sm:space-y-8 md:w-[90%]">
            {/* Header */}

            <StepHeader
                icon={User}
                title="Victim information"
                description="Details of the person affected"
            />

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
                            setFormData({ victimName: e.target.value })
                        }
                        className={
                            errors.victimName ? 'border-destructive' : ''
                        }
                    />
                    {errors.victimName && (
                        <InputError message={errors.victimName} />
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
                            setFormData({ victimTitle: e.target.value })
                        }
                        className={
                            errors.victimTitle ? 'border-destructive' : ''
                        }
                    />
                    {errors.victimTitle && (
                        <InputError message={errors.victimTitle} />
                    )}
                </div>

                {/* Sex */}
                <div className="space-y-2">
                    <Label htmlFor="victimSex">Sex</Label>
                    <Select
                        value={formData.victimSex ?? ''}
                        onValueChange={(value) =>
                            setFormData({ victimSex: value as any })
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
                        <InputError message={errors.victimSex} />
                    )}
                </div>

                {/* Age */}
                <div className="space-y-2">
                    <Label htmlFor="victimAge">Age</Label>
                    <Input
                        id="victimAge"
                        type="number"
                        placeholder="Age"
                        value={formData.victimAge}
                        onChange={(e) =>
                            setFormData({
                                victimAge:
                                    e.target.value !== ''
                                        ? Number(e.target.value)
                                        : '',
                            })
                        }
                        className={errors.victimAge ? 'border-destructive' : ''}
                    />
                    {errors.victimAge && (
                        <InputError message={errors.victimAge} />
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
                            setFormData({ victimPhone: e.target.value })
                        }
                        className={
                            errors.victimPhone ? 'border-destructive' : ''
                        }
                    />
                    {errors.victimPhone && (
                        <InputError message={errors.victimPhone} />
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
                            setFormData({ victimEmail: e.target.value })
                        }
                        className={
                            errors.victimEmail ? 'border-destructive' : ''
                        }
                    />
                    {errors.victimEmail && (
                        <InputError message={errors.victimEmail} />
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
                            setFormData({ victimEducation: e.target.value })
                        }
                        className={
                            errors.victimEducation ? 'border-destructive' : ''
                        }
                    />
                    {errors.victimEducation && (
                        <InputError message={errors.victimEducation} />
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
                            setFormData({ victimResidence: e.target.value })
                        }
                        className={
                            errors.victimResidence ? 'border-destructive' : ''
                        }
                    />
                    {errors.victimResidence && (
                        <InputError message={errors.victimResidence} />
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
                            setFormData({ victimDisability: e.target.value })
                        }
                        className={
                            errors.victimDisability ? 'border-destructive' : ''
                        }
                    />
                    {errors.victimDisability && (
                        <InputError message={errors.victimDisability} />
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
                            setFormData({ victimWorkplace: e.target.value })
                        }
                        className={
                            errors.victimWorkplace ? 'border-destructive' : ''
                        }
                    />
                    {errors.victimWorkplace && (
                        <InputError message={errors.victimWorkplace} />
                    )}
                </div>
            </div>
        </div>
    );
};
