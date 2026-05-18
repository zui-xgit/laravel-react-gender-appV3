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

export const Step2 = () => {
    const { formData, errors, updateFormData } = useStepperFormStore();

    return (
        <div className="animate-reveal w-full space-y-6 sm:space-y-8 md:w-[90%]">
            {/* Header */}
            <div className="flex items-center gap-3 sm:gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-border bg-muted text-primary sm:h-14 sm:w-14">
                    <User size={20} className="sm:h-6 sm:w-6" />
                </div>
                <div className="min-w-0">
                    <h2 className="text-lg font-bold tracking-tight break-words text-primary sm:text-xl md:text-3xl">
                        DETAILS OF THE COMPLAINANT/INFORMANT
                    </h2>
                    <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                        Reports can be filed anonymously.
                    </p>
                </div>
            </div>

            {/* Form */}
            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
                {/* Name Input */}
                <div className="space-y-2">
                    <Label htmlFor="informantName">
                        Name of Informant/complainant
                    </Label>
                    <Input
                        id="informantName"
                        placeholder="Enter name or alias"
                        value={formData.informantName}
                        onChange={(e) =>
                            updateFormData({ informantName: e.target.value })
                        }
                        className={
                            errors.informantName ? 'border-destructive' : ''
                        }
                    />
                    {errors.informantName && (
                        <InputError message={errors.informantName} />
                    )}
                </div>

                {/* Title Input */}
                <div className="space-y-2">
                    <Label htmlFor="informantTitle">Title</Label>
                    <Input
                        id="informantTitle"
                        placeholder="Mr. / Ms. / Prof."
                        value={formData.informantTitle}
                        onChange={(e) =>
                            updateFormData({ informantTitle: e.target.value })
                        }
                        className={
                            errors.informantTitle ? 'border-destructive' : ''
                        }
                    />
                    {errors.informantTitle && (
                        <InputError message={errors.informantTitle} />
                    )}
                </div>

                {/* Sex Select */}
                <div className="space-y-2">
                    <Label htmlFor="informantSex">Sex</Label>
                    <Select
                        value={formData.informantSex ?? ''}
                        onValueChange={(value) =>
                            updateFormData({ informantSex: value as any })
                        }
                    >
                        <SelectTrigger
                            className={
                                errors.informantSex ? 'border-destructive' : ''
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
                    {errors.informantSex && (
                        <InputError message={errors.informantSex} />
                    )}
                </div>

                {/* Age Input */}
                <div className="space-y-2">
                    <Label htmlFor="informantAge">Age</Label>
                    <Input
                        id="informantAge"
                        type="number"
                        placeholder="Age"
                        value={formData.informantAge}
                        onChange={(e) =>
                            updateFormData({
                                informantAge:
                                    e.target.value !== ''
                                        ? Number(e.target.value)
                                        : '',
                            })
                        }
                        className={
                            errors.informantAge ? 'border-destructive' : ''
                        }
                    />
                    sdfsfd
                    {errors.informantAge && (
                        <InputError message={errors.informantAge} />
                    )}
                </div>

                {/* Phone Input */}
                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="informantPhone">Contact Phone</Label>
                    <Input
                        id="informantPhone"
                        placeholder="+255..."
                        value={formData.informantPhone}
                        onChange={(e) =>
                            updateFormData({ informantPhone: e.target.value })
                        }
                        className={
                            errors.informantPhone ? 'border-destructive' : ''
                        }
                    />
                    {errors.informantPhone && (
                        <InputError message={errors.informantPhone} />
                    )}
                </div>

                {/* Workplace Textarea */}
                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="informantWorkplace">
                        Program / School / Directorate / Unit / Workplace
                    </Label>
                    <Textarea
                        id="informantWorkplace"
                        rows={3}
                        placeholder="Specify Program, School, or Workplace."
                        value={formData.informantWorkplace}
                        onChange={(e) =>
                            updateFormData({
                                informantWorkplace: e.target.value,
                            })
                        }
                        className={
                            errors.informantWorkplace
                                ? 'border-destructive'
                                : ''
                        }
                    />
                    {errors.informantWorkplace && (
                        <InputError message={errors.informantWorkplace} />
                    )}
                </div>
            </div>
        </div>
    );
};
