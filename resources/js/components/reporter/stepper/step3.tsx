// import { useStepperFormStore } from '@/hooks/store/use-stepper-form-store';
// import { Users } from 'lucide-react';

// export const Step3 = () => {
//     const { formData, errors, updateFormData } = useStepperFormStore();

//     return (
//         <div className="animate-reveal space-y-6 sm:space-y-8">
//             <div className="flex items-center gap-3 sm:gap-5">
//                 <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#ef4444] sm:h-14 sm:w-14">
//                     <Users size={20} className="sm:h-6 sm:w-6" />
//                 </div>
//                 <div className="min-w-0">
//                     <h2 className="text-lg font-bold tracking-tight break-words sm:text-xl md:text-3xl">Accused Details</h2>
//                     <p className="mt-1 text-xs text-white/40 sm:text-sm">Person responsible for the incident.</p>
//                 </div>
//             </div>

//             <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
//                 {/* Name */}
//                 <div className="min-w-0 md:col-span-1">
//                     <label className="mb-2 block text-[10px] font-black tracking-widest text-white/40 uppercase">Name of the Accused</label>
//                     <input
//                         value={formData.accusedName}
//                         onChange={(e) => updateFormData({ accusedName: e.target.value })}
//                         className={`w-full min-w-0 rounded-xl border px-4 py-2.5 text-sm transition-all focus:outline-none ${
//                             errors.accusedName
//                                 ? 'border-red-500 bg-white/10 text-white'
//                                 : 'border-white/10 bg-white/5 text-white focus:border-[#00A896]'
//                         }`}
//                         placeholder="Enter full name"
//                     />
//                     {errors.accusedName && <p className="mt-2 text-[10px] font-black tracking-widest text-red-500 uppercase">{errors.accusedName}</p>}
//                 </div>

//                 {/* accused Sex */}
//                 <div className="min-w-0 md:col-span-1">
//                     <label className="mb-2 block text-[10px] font-black tracking-widest text-white/40 uppercase">Sex</label>
//                     <select
//                         value={formData.accusedSex ?? ''}
//                         onChange={(e) =>
//                             updateFormData({
//                                 accusedSex: e.target.value as 'male' | 'female' | 'prefer_not_to_say' | null,
//                             })
//                         }
//                         className={`w-full min-w-0 cursor-pointer appearance-none rounded-xl border px-4 py-2.5 text-sm text-white transition-all focus:outline-none ${
//                             errors.accusedSex ? 'border-red-500 bg-white/10 text-white' : 'border-white/10 bg-white/5 focus:border-[#00A896]'
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
//                     {errors.accusedSex && <p className="mt-2 text-[10px] font-black tracking-widest text-red-500 uppercase">{errors.accusedSex}</p>}
//                 </div>

//                 {/* Title */}
//                 <div className="min-w-0 md:col-span-1">
//                     <label className="mb-2 block text-[10px] font-black tracking-widest text-white/40 uppercase">Title</label>
//                     <input
//                         value={formData.accusedTitle}
//                         onChange={(e) => updateFormData({ accusedTitle: e.target.value })}
//                         className={`w-full min-w-0 rounded-xl border px-4 py-2.5 text-sm transition-all focus:outline-none ${
//                             errors.accusedTitle
//                                 ? 'border-red-500 bg-white/10 text-white'
//                                 : 'border-white/10 bg-white/5 text-white focus:border-[#00A896]'
//                         }`}
//                         placeholder="Mr. / Ms. / Prof."
//                     />
//                     {errors.accusedTitle && (
//                         <p className="mt-2 text-[10px] font-black tracking-widest text-red-500 uppercase">{errors.accusedTitle}</p>
//                     )}
//                 </div>

//                 {/* Age */}
//                 <div className="min-w-0 md:col-span-1">
//                     <label className="mb-2 block text-[10px] font-black tracking-widest text-white/40 uppercase">Age</label>
//                     <input
//                         type="number"
//                         value={formData.accusedAge ?? ''}
//                         onChange={(e) => updateFormData({ accusedAge: Number(e.target.value) })}
//                         className={`w-full min-w-0 rounded-xl border px-4 py-2.5 text-sm transition-all focus:outline-none ${
//                             errors.accusedAge
//                                 ? 'border-red-500 bg-white/10 text-white'
//                                 : 'border-white/10 bg-white/5 text-white focus:border-[#00A896]'
//                         }`}
//                         placeholder="Enter age"
//                     />
//                     {errors.accusedAge && <p className="mt-2 text-[10px] font-black tracking-widest text-red-500 uppercase">{errors.accusedAge}</p>}
//                 </div>

//                 {/* Phone */}
//                 <div className="min-w-0 md:col-span-1">
//                     <label className="mb-2 block text-[10px] font-black tracking-widest text-white/40 uppercase">Phone Number</label>
//                     <input
//                         type="number"
//                         value={formData.accusedPhone ?? ''}
//                         onChange={(e) => updateFormData({ accusedPhone: e.target.value })}
//                         className={`w-full min-w-0 rounded-xl border px-4 py-2.5 text-sm transition-all focus:outline-none ${
//                             errors.accusedPhone
//                                 ? 'border-red-500 bg-white/10 text-white'
//                                 : 'border-white/10 bg-white/5 text-white focus:border-[#00A896]'
//                         }`}
//                         placeholder="+255..."
//                     />
//                     {errors.accusedPhone && (
//                         <p className="mt-2 text-[10px] font-black tracking-widest text-red-500 uppercase">{errors.accusedPhone}</p>
//                     )}
//                 </div>

//                 {/* Email */}
//                 <div className="min-w-0 md:col-span-1">
//                     <label className="mb-2 block text-[10px] font-black tracking-widest text-white/40 uppercase">Email</label>
//                     <input
//                         type="email"
//                         value={formData.accusedEmail}
//                         onChange={(e) => updateFormData({ accusedEmail: e.target.value })}
//                         className={`w-full min-w-0 rounded-xl border px-4 py-2.5 text-sm transition-all focus:outline-none ${
//                             errors.accusedEmail
//                                 ? 'border-red-500 bg-white/10 text-white'
//                                 : 'border-white/10 bg-white/5 text-white focus:border-[#00A896]'
//                         }`}
//                         placeholder="Enter email"
//                     />
//                     {errors.accusedEmail && (
//                         <p className="mt-2 text-[10px] font-black tracking-widest text-red-500 uppercase">{errors.accusedEmail}</p>
//                     )}
//                 </div>

//                 {/* Education */}
//                 <div className="min-w-0 md:col-span-1">
//                     <label className="mb-2 block text-[10px] font-black tracking-widest text-white/40 uppercase">Education</label>
//                     <input
//                         value={formData.accusedEducation}
//                         onChange={(e) => updateFormData({ accusedEducation: e.target.value })}
//                         className={`w-full min-w-0 rounded-xl border px-4 py-2.5 text-sm transition-all focus:outline-none ${
//                             errors.accusedEducation
//                                 ? 'border-red-500 bg-white/10 text-white'
//                                 : 'border-white/10 bg-white/5 text-white focus:border-[#00A896]'
//                         }`}
//                         placeholder="Specify education"
//                     />
//                     {errors.accusedEducation && (
//                         <p className="mt-2 text-[10px] font-black tracking-widest text-red-500 uppercase">{errors.accusedEducation}</p>
//                     )}
//                 </div>

//                 {/* Residence */}
//                 <div className="min-w-0 md:col-span-1">
//                     <label className="mb-2 block text-[10px] font-black tracking-widest text-white/40 uppercase">Residence</label>
//                     <input
//                         value={formData.accusedResidence}
//                         onChange={(e) => updateFormData({ accusedResidence: e.target.value })}
//                         className={`w-full min-w-0 rounded-xl border px-4 py-2.5 text-sm transition-all focus:outline-none ${
//                             errors.accusedResidence
//                                 ? 'border-red-500 bg-white/10 text-white'
//                                 : 'border-white/10 bg-white/5 text-white focus:border-[#00A896]'
//                         }`}
//                         placeholder="Specify residence"
//                     />
//                     {errors.accusedResidence && (
//                         <p className="mt-2 text-[10px] font-black tracking-widest text-red-500 uppercase">{errors.accusedResidence}</p>
//                     )}
//                 </div>

//                 {/* Workplace / Program */}
//                 <div className="min-w-0 md:col-span-2">
//                     <label className="mb-2 block text-[10px] font-black tracking-widest text-white/40 uppercase">
//                         Program (Bachelor/Masters/PHD) or School/Collage/ Directorate/Unit/Work place
//                     </label>
//                     <input
//                         value={formData.accusedWorkplace}
//                         onChange={(e) => updateFormData({ accusedWorkplace: e.target.value })}
//                         className={`w-full min-w-0 rounded-xl border px-4 py-2.5 text-sm transition-all focus:outline-none ${
//                             errors.accusedWorkplace
//                                 ? 'border-red-500 bg-white/10 text-white'
//                                 : 'border-white/10 bg-white/5 text-white focus:border-[#00A896]'
//                         }`}
//                         placeholder="Specify workplace"
//                     />
//                     {errors.accusedWorkplace && (
//                         <p className="mt-2 text-[10px] font-black tracking-widest text-red-500 uppercase">{errors.accusedWorkplace}</p>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

import { useStepperFormStore } from '@/hooks/store/use-stepper-form-store';
import { Users } from 'lucide-react';
import { FormInput } from '../form-input';
import { FormSelect } from '../form-select';

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
                    <Users size={20} className="sm:h-6 sm:w-6" />
                </div>
                <div className="min-w-0">
                    <h2 className="text-primary text-lg font-bold tracking-tight break-words sm:text-xl md:text-3xl">Accused Details</h2>
                    <p className="text-secondary mt-1 text-xs sm:text-sm">Person responsible for the incident.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
                <FormInput
                    label="Name of the Accused"
                    value={formData.accusedName}
                    onChange={(e) => updateFormData({ accusedName: e.target.value })}
                    placeholder="Enter full name"
                    error={errors.accusedName}
                />

                <FormSelect
                    label="Sex"
                    value={formData.accusedSex ?? ''}
                    onChange={(e) =>
                        updateFormData({
                            accusedSex: e.target.value as 'male' | 'female' | 'prefer_not_to_say' | null,
                        })
                    }
                    options={sexOptions}
                    error={errors.accusedSex}
                />

                <FormInput
                    label="Title"
                    value={formData.accusedTitle}
                    onChange={(e) => updateFormData({ accusedTitle: e.target.value })}
                    placeholder="Mr. / Ms. / Prof."
                    error={errors.accusedTitle}
                />

                <FormInput
                    label="Age"
                    type="number"
                    value={formData.accusedAge ?? ''}
                    onChange={(e) => updateFormData({ accusedAge: Number(e.target.value) })}
                    placeholder="Enter age"
                    error={errors.accusedAge}
                />

                <FormInput
                    label="Phone Number"
                    type="number"
                    value={formData.accusedPhone ?? ''}
                    onChange={(e) => updateFormData({ accusedPhone: e.target.value })}
                    placeholder="+255..."
                    error={errors.accusedPhone}
                />

                <FormInput
                    label="Email"
                    type="email"
                    value={formData.accusedEmail}
                    onChange={(e) => updateFormData({ accusedEmail: e.target.value })}
                    placeholder="Enter email"
                    error={errors.accusedEmail}
                />

                <FormInput
                    label="Education"
                    value={formData.accusedEducation}
                    onChange={(e) => updateFormData({ accusedEducation: e.target.value })}
                    placeholder="Specify education"
                    error={errors.accusedEducation}
                />

                <FormInput
                    label="Residence"
                    value={formData.accusedResidence}
                    onChange={(e) => updateFormData({ accusedResidence: e.target.value })}
                    placeholder="Specify residence"
                    error={errors.accusedResidence}
                />

                <FormInput
                    label="Program (Bachelor/Masters/PHD) or School/Collage/ Directorate/Unit/Work place"
                    value={formData.accusedWorkplace}
                    onChange={(e) => updateFormData({ accusedWorkplace: e.target.value })}
                    placeholder="Specify workplace"
                    error={errors.accusedWorkplace}
                    spanFull
                />
            </div>
        </div>
    );
};
