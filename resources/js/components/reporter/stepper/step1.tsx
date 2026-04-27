// import { useStepperFormStore } from '@/hooks/store/use-stepper-form-store';
// import { User } from 'lucide-react';

// export const Step1 = () => {
//     const { formData, errors, updateFormData } = useStepperFormStore();

//     return (
//         <div className="animate-reveal space-y-6 sm:space-y-8">
//             {/* Header */}
//             <div className="flex items-center gap-3 sm:gap-5">
//                 <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#00A896] sm:h-14 sm:w-14">
//                     <User size={20} className="sm:h-6 sm:w-6" />
//                 </div>
//                 <div className="min-w-0">
//                     <h2 className="text-lg font-bold tracking-tight break-words sm:text-xl md:text-3xl">DETAILS OF THE COMPLAINANT/INFORMANT</h2>
//                     <p className="mt-1 text-xs text-white/40 sm:text-sm">Reports can be filed anonymously.</p>
//                 </div>
//             </div>

//             {/* Form */}
//             <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
//                 {/* Name */}
//                 <div className="min-w-0 md:col-span-1">
//                     <label className="mb-2 block text-[10px] font-black tracking-widest text-white/40 uppercase">Name of Informant/complainant</label>
//                     <input
//                         type="text"
//                         value={formData.informantName}
//                         onChange={(e) => updateFormData({ informantName: e.target.value })}
//                         placeholder="Enter name or alias"
//                         className={`w-full min-w-0 rounded-xl border px-4 py-2.5 text-sm transition-all focus:outline-none ${
//                             errors.informantName
//                                 ? 'border-red-500 bg-white/10 text-white'
//                                 : 'border-white/10 bg-white/5 text-white focus:border-[#00A896] focus:ring-1 focus:ring-[#00A896]'
//                         }`}
//                     />
//                     {errors.informantName && (
//                         <p className="mt-2 text-[10px] font-black tracking-widest text-red-500 uppercase">{errors.informantName}</p>
//                     )}
//                 </div>

//                 {/* Title */}
//                 <div className="min-w-0 md:col-span-1">
//                     <label className="mb-2 block text-[10px] font-black tracking-widest text-white/40 uppercase">Title</label>
//                     <input
//                         value={formData.informantTitle}
//                         onChange={(e) => updateFormData({ informantTitle: e.target.value })}
//                         placeholder="Mr. / Ms. / Prof."
//                         className={`w-full min-w-0 rounded-xl border px-4 py-2.5 text-sm transition-all focus:outline-none ${
//                             errors.informantTitle
//                                 ? 'border-red-500 bg-white/10 text-white'
//                                 : 'border-white/10 bg-white/5 text-white focus:border-[#00A896] focus:ring-1 focus:ring-[#00A896]'
//                         }`}
//                     />
//                     {errors.informantTitle && (
//                         <p className="mt-2 text-[10px] font-black tracking-widest text-red-500 uppercase">{errors.informantTitle}</p>
//                     )}
//                 </div>

//                 {/* Sex */}
//                 <div className="min-w-0 md:col-span-1">
//                     <label className="mb-2 block text-[10px] font-black tracking-widest text-white/40 uppercase">Sex</label>
//                     <select
//                         value={formData.informantSex ?? ''}
//                         onChange={(e) =>
//                             updateFormData({
//                                 informantSex: e.target.value as 'male' | 'female' | 'prefer_not_to_say' | null,
//                             })
//                         }
//                         className={`w-full min-w-0 cursor-pointer appearance-none rounded-xl border px-4 py-2.5 text-sm text-white transition-all focus:outline-none ${
//                             errors.informantSex ? 'border-red-500 bg-white/10 text-white' : 'border-white/10 bg-white/5 focus:border-[#00A896]'
//                         }`}
//                         style={{
//                             backgroundColor: 'rgba(255,255,255,0.05)', // keep the theme card style
//                             color: 'white', // ensure text is visible
//                         }}
//                     >
//                         <option value="" className="bg-[#0B0B0B] text-white">
//                             Select
//                         </option>
//                         <option value="male" className="bg-[#0B0B0B] text-white">
//                             Male
//                         </option>
//                         <option value="female" className="bg-[#0B0B0B] text-white">
//                             Female
//                         </option>
//                         <option value="prefer_not_to_say" className="bg-[#0B0B0B] text-white">
//                             Prefer not to say
//                         </option>
//                     </select>
//                     {errors.informantSex && (
//                         <p className="mt-2 text-[10px] font-black tracking-widest text-red-500 uppercase">{errors.informantSex}</p>
//                     )}
//                 </div>

//                 {/* Age */}
//                 <div className="min-w-0 md:col-span-1">
//                     <label className="mb-2 block text-[10px] font-black tracking-widest text-white/40 uppercase">Age</label>
//                     <input
//                         type="number"
//                         value={formData.informantAge ?? ''}
//                         onChange={(e) => updateFormData({ informantAge: e.target.value ? Number(e.target.value) : null })}
//                         className={`w-full min-w-0 rounded-xl border px-4 py-2.5 text-sm transition-all focus:outline-none ${
//                             errors.informantAge
//                                 ? 'border-red-500 bg-white/10 text-white'
//                                 : 'border-white/10 bg-white/5 text-white focus:border-[#00A896] focus:ring-1 focus:ring-[#00A896]'
//                         }`}
//                     />
//                     {errors.informantAge && (
//                         <p className="mt-2 text-[10px] font-black tracking-widest text-red-500 uppercase">{errors.informantAge}</p>
//                     )}
//                 </div>

//                 {/* Phone */}
//                 <div className="min-w-0 md:col-span-2">
//                     <label className="mb-2 block text-[10px] font-black tracking-widest text-white/40 uppercase">Contact Phone</label>
//                     <input
//                         type="number"
//                         value={formData.informantPhone}
//                         onChange={(e) => updateFormData({ informantPhone: e.target.value })}
//                         placeholder="+255..."
//                         className={`w-full min-w-0 rounded-xl border px-4 py-2.5 text-sm transition-all focus:outline-none ${
//                             errors.informantPhone
//                                 ? 'border-red-500 bg-white/10 text-white'
//                                 : 'border-white/10 bg-white/5 text-white focus:border-[#00A896] focus:ring-1 focus:ring-[#00A896]'
//                         }`}
//                     />
//                     {errors.informantPhone && (
//                         <p className="mt-2 text-[10px] font-black tracking-widest text-red-500 uppercase">{errors.informantPhone}</p>
//                     )}
//                 </div>

//                 {/* Workplace */}
//                 <div className="min-w-0 md:col-span-2">
//                     <label className="mb-2 block text-[10px] font-black tracking-widest text-white/40 uppercase">
//                         Program / School / Directorate / Unit / Workplace
//                     </label>
//                     <textarea
//                         rows={3}
//                         value={formData.informantWorkplace}
//                         onChange={(e) => updateFormData({ informantWorkplace: e.target.value })}
//                         placeholder="Specify Program (Bachelor/Masters/PHD) School/Collage/ Directorate/Unit/Work place."
//                         className={`w-full min-w-0 resize-y rounded-xl border px-4 py-3 text-sm transition-all focus:outline-none ${
//                             errors.informantWorkplace
//                                 ? 'border-red-500 bg-white/10 text-white'
//                                 : 'border-white/10 bg-white/5 text-white focus:border-[#00A896] focus:ring-1 focus:ring-[#00A896]'
//                         }`}
//                     />
//                     {errors.informantWorkplace && (
//                         <p className="mt-2 text-[10px] font-black tracking-widest text-red-500 uppercase">{errors.informantWorkplace}</p>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

import { FormInput } from '../form-input';
import { FormSelect } from '../form-select';
import { FormTextarea } from '../form-text-area';

import { useStepperFormStore } from '@/hooks/store/use-stepper-form-store';
import { User } from 'lucide-react';

export const Step1 = () => {
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
                    <h2 className="text-primary text-lg font-bold tracking-tight break-words sm:text-xl md:text-3xl">
                        DETAILS OF THE COMPLAINANT/INFORMANT
                    </h2>
                    <p className="text-secondary mt-1 text-xs sm:text-sm">Reports can be filed anonymously.</p>
                </div>
            </div>

            {/* Form */}
            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
                <FormInput
                    label="Name of Informant/complainant"
                    type="text"
                    value={formData.informantName}
                    onChange={(e) => updateFormData({ informantName: e.target.value })}
                    placeholder="Enter name or alias"
                    error={errors.informantName}
                />

                <FormInput
                    label="Title"
                    value={formData.informantTitle}
                    onChange={(e) => updateFormData({ informantTitle: e.target.value })}
                    placeholder="Mr. / Ms. / Prof."
                    error={errors.informantTitle}
                />

                <FormSelect
                    label="Sex"
                    value={formData.informantSex ?? ''}
                    onChange={(e) =>
                        updateFormData({
                            informantSex: e.target.value as 'male' | 'female' | 'prefer_not_to_say' | null,
                        })
                    }
                    options={sexOptions}
                    error={errors.informantSex}
                />

                <FormInput
                    label="Age"
                    type="number"
                    value={formData.informantAge ?? ''}
                    onChange={(e) => updateFormData({ informantAge: e.target.value ? Number(e.target.value) : null })}
                    error={errors.informantAge}
                />

                <FormInput
                    label="Contact Phone"
                    type="number"
                    value={formData.informantPhone}
                    onChange={(e) => updateFormData({ informantPhone: e.target.value })}
                    placeholder="+255..."
                    error={errors.informantPhone}
                    spanFull
                />

                <FormTextarea
                    label="Program / School / Directorate / Unit / Workplace"
                    rows={3}
                    value={formData.informantWorkplace}
                    onChange={(e) => updateFormData({ informantWorkplace: e.target.value })}
                    placeholder="Specify Program (Bachelor/Masters/PHD) School/Collage/ Directorate/Unit/Work place."
                    error={errors.informantWorkplace}
                    spanFull
                />
            </div>
        </div>
    );
};
