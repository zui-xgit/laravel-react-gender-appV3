// import { useStepperFormStore } from '@/hooks/store/use-stepper-form-store';
// import { User } from 'lucide-react';

// export const Step2 = () => {
//     const { formData, errors, updateFormData } = useStepperFormStore();

//     return (
//         <div className="animate-reveal space-y-6 sm:space-y-8">
//             <div className="flex items-center gap-3 sm:gap-5">
//                 <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#00A896] sm:h-14 sm:w-14">
//                     <User size={20} className="sm:h-6 sm:w-6" />
//                 </div>
//                 <div className="min-w-0">
//                     <h2 className="text-lg font-bold tracking-tight break-words sm:text-xl md:text-3xl">Victim Information</h2>
//                     <p className="mt-1 text-xs text-white/40 sm:text-sm">Details of the person affected.</p>
//                 </div>
//             </div>

//             <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
//                 {/* Victim Name */}
//                 <div className="min-w-0 md:col-span-1">
//                     <label className="mb-2 block text-[10px] font-black tracking-widest text-white/40 uppercase">Victim Full Name</label>
//                     <input
//                         type="text"
//                         value={formData.victimName}
//                         onChange={(e) => updateFormData({ victimName: e.target.value })}
//                         className={`w-full min-w-0 rounded-xl border px-4 py-2.5 text-sm transition-all focus:outline-none ${
//                             errors.victimName
//                                 ? 'border-red-500 bg-white/10 text-white'
//                                 : 'border-white/10 bg-white/5 text-white focus:border-[#00A896]'
//                         }`}
//                         placeholder="Enter full name"
//                     />
//                     {errors.victimName && <p className="mt-2 text-[10px] font-black tracking-widest text-red-500 uppercase">{errors.victimName}</p>}
//                 </div>

//                 {/* Victim Title */}
//                 <div className="min-w-0 md:col-span-1">
//                     <label className="mb-2 block text-[10px] font-black tracking-widest text-white/40 uppercase">Title</label>
//                     <input
//                         type="text"
//                         value={formData.victimTitle}
//                         onChange={(e) => updateFormData({ victimTitle: e.target.value })}
//                         placeholder="Mr. / Ms. / Prof."
//                         className={`w-full min-w-0 rounded-xl border px-4 py-2.5 text-sm transition-all focus:outline-none ${
//                             errors.victimTitle
//                                 ? 'border-red-500 bg-white/10 text-white'
//                                 : 'border-white/10 bg-white/5 text-white focus:border-[#00A896]'
//                         }`}
//                     />
//                     {errors.victimTitle && <p className="mt-2 text-[10px] font-black tracking-widest text-red-500 uppercase">{errors.victimTitle}</p>}
//                 </div>

//                 {/* Victim Sex */}
//                 <div className="min-w-0 md:col-span-1">
//                     <label className="mb-2 block text-[10px] font-black tracking-widest text-white/40 uppercase">Sex</label>
//                     <select
//                         value={formData.victimSex ?? ''}
//                         onChange={(e) =>
//                             updateFormData({
//                                 victimSex: e.target.value as 'male' | 'female' | 'prefer_not_to_say' | null,
//                             })
//                         }
//                         className={`w-full min-w-0 cursor-pointer appearance-none rounded-xl border px-4 py-2.5 text-sm text-white transition-all focus:outline-none ${
//                             errors.victimSex ? 'border-red-500 bg-white/10 text-white' : 'border-white/10 bg-white/5 focus:border-[#00A896]'
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
//                     {errors.victimSex && <p className="mt-2 text-[10px] font-black tracking-widest text-red-500 uppercase">{errors.victimSex}</p>}
//                 </div>

//                 {/* Victim Age */}
//                 <div className="min-w-0 md:col-span-1">
//                     <label className="mb-2 block text-[10px] font-black tracking-widest text-white/40 uppercase">Age</label>
//                     <input
//                         type="number"
//                         value={formData.victimAge ?? ''}
//                         onChange={(e) => updateFormData({ victimAge: Number(e.target.value) })}
//                         className={`w-full min-w-0 rounded-xl border px-4 py-2.5 text-sm transition-all focus:outline-none ${
//                             errors.victimAge
//                                 ? 'border-red-500 bg-white/10 text-white'
//                                 : 'border-white/10 bg-white/5 text-white focus:border-[#00A896]'
//                         }`}
//                     />
//                     {errors.victimAge && <p className="mt-2 text-[10px] font-black tracking-widest text-red-500 uppercase">{errors.victimAge}</p>}
//                 </div>

//                 {/* Victim Phone */}
//                 <div className="min-w-0 md:col-span-1">
//                     <label className="mb-2 block text-[10px] font-black tracking-widest text-white/40 uppercase">Phone number</label>
//                     <input
//                         type="number"
//                         value={formData.victimPhone}
//                         onChange={(e) => updateFormData({ victimPhone: e.target.value })}
//                         className={`w-full min-w-0 rounded-xl border px-4 py-2.5 text-sm transition-all focus:outline-none ${
//                             errors.victimPhone
//                                 ? 'border-red-500 bg-white/10 text-white'
//                                 : 'border-white/10 bg-white/5 text-white focus:border-[#00A896]'
//                         }`}
//                         placeholder="+255..."
//                     />
//                     {errors.victimPhone && <p className="mt-2 text-[10px] font-black tracking-widest text-red-500 uppercase">{errors.victimPhone}</p>}
//                 </div>

//                 {/* Victim Email */}
//                 <div className="min-w-0 md:col-span-1">
//                     <label className="mb-2 block text-[10px] font-black tracking-widest text-white/40 uppercase">Email</label>
//                     <input
//                         type="email"
//                         value={formData.victimEmail}
//                         onChange={(e) => updateFormData({ victimEmail: e.target.value })}
//                         className={`w-full min-w-0 rounded-xl border px-4 py-2.5 text-sm transition-all focus:outline-none ${
//                             errors.victimEmail
//                                 ? 'border-red-500 bg-white/10 text-white'
//                                 : 'border-white/10 bg-white/5 text-white focus:border-[#00A896]'
//                         }`}
//                         placeholder="example@email.com"
//                     />
//                     {errors.victimEmail && <p className="mt-2 text-[10px] font-black tracking-widest text-red-500 uppercase">{errors.victimEmail}</p>}
//                 </div>

//                 {/* Education Level */}
//                 <div className="min-w-0 md:col-span-1">
//                     <label className="mb-2 block text-[10px] font-black tracking-widest text-white/40 uppercase">Education Level</label>
//                     <input
//                         type="text"
//                         value={formData.victimEducation}
//                         onChange={(e) => updateFormData({ victimEducation: e.target.value })}
//                         className={`w-full min-w-0 rounded-xl border px-4 py-2.5 text-sm transition-all focus:outline-none ${
//                             errors.victimEducation
//                                 ? 'border-red-500 bg-white/10 text-white'
//                                 : 'border-white/10 bg-white/5 text-white focus:border-[#00A896]'
//                         }`}
//                         placeholder="Bachelor / Masters / PhD"
//                     />
//                     {errors.victimEducation && (
//                         <p className="mt-2 text-[10px] font-black tracking-widest text-red-500 uppercase">{errors.victimEducation}</p>
//                     )}
//                 </div>

//                 {/* Primary Residence */}
//                 <div className="min-w-0 md:col-span-1">
//                     <label className="mb-2 block text-[10px] font-black tracking-widest text-white/40 uppercase">Primary Residence</label>
//                     <input
//                         type="text"
//                         value={formData.victimResidence}
//                         onChange={(e) => updateFormData({ victimResidence: e.target.value })}
//                         className={`w-full min-w-0 rounded-xl border px-4 py-2.5 text-sm transition-all focus:outline-none ${
//                             errors.victimResidence
//                                 ? 'border-red-500 bg-white/10 text-white'
//                                 : 'border-white/10 bg-white/5 text-white focus:border-[#00A896]'
//                         }`}
//                     />
//                     {errors.victimResidence && (
//                         <p className="mt-2 text-[10px] font-black tracking-widest text-red-500 uppercase">{errors.victimResidence}</p>
//                     )}
//                 </div>

//                 {/* Disability */}
//                 <div className="min-w-0 md:col-span-1">
//                     <label className="mb-2 block text-[10px] font-black tracking-widest text-white/40 uppercase">Disability (State)</label>
//                     <input
//                         type="text"
//                         value={formData.victimDisability}
//                         onChange={(e) => updateFormData({ victimDisability: e.target.value })}
//                         className={`w-full min-w-0 rounded-xl border px-4 py-2.5 text-sm transition-all focus:outline-none ${
//                             errors.victimDisability
//                                 ? 'border-red-500 bg-white/10 text-white'
//                                 : 'border-white/10 bg-white/5 text-white focus:border-[#00A896]'
//                         }`}
//                     />
//                     {errors.victimDisability && (
//                         <p className="mt-2 text-[10px] font-black tracking-widest text-red-500 uppercase">{errors.victimDisability}</p>
//                     )}
//                 </div>

//                 {/* Workplace / Unit */}
//                 <div className="min-w-0 md:col-span-2">
//                     <label className="mb-2 block text-[10px] font-black tracking-widest text-white/40 uppercase">Workplace / Unit</label>
//                     <textarea
//                         rows={3}
//                         value={formData.victimWorkplace}
//                         onChange={(e) => updateFormData({ victimWorkplace: e.target.value })}
//                         className={`w-full min-w-0 resize-y rounded-xl border px-4 py-3 text-sm transition-all focus:outline-none ${
//                             errors.victimWorkplace
//                                 ? 'border-red-500 bg-white/10 text-white'
//                                 : 'border-white/10 bg-white/5 text-white focus:border-[#00A896]'
//                         }`}
//                     />
//                     {errors.victimWorkplace && (
//                         <p className="mt-2 text-[10px] font-black tracking-widest text-red-500 uppercase">{errors.victimWorkplace}</p>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

import { useStepperFormStore } from '@/hooks/store/use-stepper-form-store';
import { User } from 'lucide-react';
import { FormInput } from '../form-input';
import { FormSelect } from '../form-select';
import { FormTextarea } from '../form-text-area';

export const Step3 = () => {
    const { formData, errors, updateFormData } = useStepperFormStore();

    const sexOptions = [
        { value: '', label: 'Select' },
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'prefer_not_to_say', label: 'Prefer not to say' },
    ];

    return (
        <div className="animate-reveal space-y-6 sm:space-y-8">
            <div className="flex items-center gap-3 sm:gap-5">
                <div className="border-subtle bg-surface flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border text-[var(--accent-primary)] sm:h-14 sm:w-14">
                    <User size={20} className="sm:h-6 sm:w-6" />
                </div>
                <div className="min-w-0">
                    <h2 className="text-lg font-bold tracking-tight break-words text-primary sm:text-xl md:text-3xl">
                        Victim Information
                    </h2>
                    <p className="mt-1 text-xs text-secondary sm:text-sm">
                        Details of the person affected.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
                <FormInput
                    label="Victim Full Name"
                    type="text"
                    value={formData.victimName}
                    onChange={(e) =>
                        updateFormData({ victimName: e.target.value })
                    }
                    placeholder="Enter full name"
                    error={errors.victimName}
                />

                <FormInput
                    label="Title"
                    type="text"
                    value={formData.victimTitle}
                    onChange={(e) =>
                        updateFormData({ victimTitle: e.target.value })
                    }
                    placeholder="Mr. / Ms. / Prof."
                    error={errors.victimTitle}
                />

                <FormSelect
                    label="Sex"
                    value={formData.victimSex ?? ''}
                    onChange={(e) =>
                        updateFormData({
                            victimSex: e.target.value as
                                | 'male'
                                | 'female'
                                | 'prefer_not_to_say'
                                | null,
                        })
                    }
                    options={sexOptions}
                    error={errors.victimSex}
                />

                <FormInput
                    label="Age"
                    type="number"
                    value={formData.victimAge ?? ''}
                    onChange={(e) =>
                        updateFormData({ victimAge: Number(e.target.value) })
                    }
                    error={errors.victimAge}
                />

                <FormInput
                    label="Phone number"
                    type="number"
                    value={formData.victimPhone}
                    onChange={(e) =>
                        updateFormData({ victimPhone: e.target.value })
                    }
                    placeholder="+255..."
                    error={errors.victimPhone}
                />

                <FormInput
                    label="Email"
                    type="email"
                    value={formData.victimEmail}
                    onChange={(e) =>
                        updateFormData({ victimEmail: e.target.value })
                    }
                    placeholder="example@email.com"
                    error={errors.victimEmail}
                />

                <FormInput
                    label="Education Level"
                    type="text"
                    value={formData.victimEducation}
                    onChange={(e) =>
                        updateFormData({ victimEducation: e.target.value })
                    }
                    placeholder="Bachelor / Masters / PhD"
                    error={errors.victimEducation}
                />

                <FormInput
                    label="Primary Residence"
                    type="text"
                    value={formData.victimResidence}
                    onChange={(e) =>
                        updateFormData({ victimResidence: e.target.value })
                    }
                    error={errors.victimResidence}
                />

                <FormInput
                    label="Disability (State)"
                    type="text"
                    value={formData.victimDisability}
                    onChange={(e) =>
                        updateFormData({ victimDisability: e.target.value })
                    }
                    error={errors.victimDisability}
                />

                <FormTextarea
                    label="Workplace / Unit"
                    rows={3}
                    value={formData.victimWorkplace}
                    onChange={(e) =>
                        updateFormData({ victimWorkplace: e.target.value })
                    }
                    error={errors.victimWorkplace}
                    spanFull
                />
            </div>
        </div>
    );
};
