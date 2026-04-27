// import { useStepperFormStore } from '@/hooks/store/use-stepper-form-store';
// import { ClipboardList } from 'lucide-react';

// export const Step4 = () => {
//     const { formData, errors, updateFormData } = useStepperFormStore();

//     return (
//         <div className="animate-reveal space-y-6 sm:space-y-8">
//             <div className="flex items-center gap-3 sm:gap-5">
//                 <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#00A896] sm:h-14 sm:w-14">
//                     <ClipboardList size={20} className="sm:h-6 sm:w-6" />
//                 </div>
//                 <div className="min-w-0">
//                     <h2 className="text-lg font-bold tracking-tight break-words sm:text-xl md:text-3xl">Incident Details</h2>
//                     <p className="mt-1 text-xs text-white/40 sm:text-sm">Detailed account of the occurrence.</p>
//                 </div>
//             </div>

//             <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
//                 {/* Date & Time */}
//                 <div className="grid min-w-0 grid-cols-2 gap-4 sm:gap-6 md:col-span-2">
//                     <div className="min-w-0">
//                         <label className="mb-2 block text-[10px] font-black tracking-widest text-white/40 uppercase">Date of incident</label>
//                         <input
//                             type="date"
//                             value={formData.incidentDate ?? ''}
//                             onChange={(e) => updateFormData({ incidentDate: e.target.value })}
//                             className={`w-full min-w-0 rounded-xl border px-4 py-2.5 text-sm transition-all focus:outline-none ${
//                                 errors.incidentDate
//                                     ? 'border-red-500 bg-white/10 text-white'
//                                     : 'border-white/10 bg-white/5 text-white focus:border-[#00A896]'
//                             }`}
//                         />
//                         {errors.incidentDate && (
//                             <p className="mt-2 text-[10px] font-black tracking-widest text-red-500 uppercase">{errors.incidentDate}</p>
//                         )}
//                     </div>
//                     <div className="min-w-0">
//                         <label className="mb-2 block text-[10px] font-black tracking-widest text-white/40 uppercase">Time of incident</label>
//                         <input
//                             type="time"
//                             value={formData.incidentTime ?? ''}
//                             onChange={(e) => updateFormData({ incidentTime: e.target.value })}
//                             className={`w-full min-w-0 rounded-xl border px-4 py-2.5 text-sm transition-all focus:outline-none ${
//                                 errors.incidentTime
//                                     ? 'border-red-500 bg-white/10 text-white'
//                                     : 'border-white/10 bg-white/5 text-white focus:border-[#00A896]'
//                             }`}
//                         />
//                         {errors.incidentTime && (
//                             <p className="mt-2 text-[10px] font-black tracking-widest text-red-500 uppercase">{errors.incidentTime}</p>
//                         )}
//                     </div>
//                 </div>

//                 {/* Location */}
//                 <div className="min-w-0 md:col-span-1">
//                     <label className="mb-2 block text-[10px] font-black tracking-widest text-white/40 uppercase">Where did incident occur</label>
//                     <input
//                         value={formData.incidentLocation ?? ''}
//                         onChange={(e) => updateFormData({ incidentLocation: e.target.value })}
//                         className={`w-full min-w-0 rounded-xl border px-4 py-2.5 text-sm transition-all focus:outline-none ${
//                             errors.incidentLocation
//                                 ? 'border-red-500 bg-white/10 text-white'
//                                 : 'border-white/10 bg-white/5 text-white focus:border-[#00A896]'
//                         }`}
//                         placeholder="Specify location"
//                     />
//                     {errors.incidentLocation && (
//                         <p className="mt-2 text-[10px] font-black tracking-widest text-red-500 uppercase">{errors.incidentLocation}</p>
//                     )}
//                 </div>

//                 <div className="min-w-0 md:col-span-1">
//                     <label className="mb-2 block text-[10px] font-black tracking-widest text-white/40 uppercase">
//                         Exact location of the incident
//                     </label>
//                     <input
//                         value={formData.incidentExactLocation ?? ''}
//                         onChange={(e) => updateFormData({ incidentExactLocation: e.target.value })}
//                         className={`w-full min-w-0 rounded-xl border px-4 py-2.5 text-sm transition-all focus:outline-none ${
//                             errors.incidentExactLocation
//                                 ? 'border-red-500 bg-white/10 text-white'
//                                 : 'border-white/10 bg-white/5 text-white focus:border-[#00A896]'
//                         }`}
//                         placeholder="Specify exact location"
//                     />
//                     {errors.incidentExactLocation && (
//                         <p className="mt-2 text-[10px] font-black tracking-widest text-red-500 uppercase">{errors.incidentExactLocation}</p>
//                     )}
//                 </div>

//                 {/* Cause */}
//                 <div className="min-w-0 md:col-span-2">
//                     <label className="mb-2 block text-[10px] font-black tracking-widest text-white/40 uppercase">What was the cause?</label>
//                     <textarea
//                         rows={3}
//                         value={formData.incidentCause ?? ''}
//                         onChange={(e) => updateFormData({ incidentCause: e.target.value })}
//                         className={`w-full min-w-0 resize-y rounded-xl border px-4 py-3 text-sm transition-all focus:outline-none ${
//                             errors.incidentCause
//                                 ? 'border-red-500 bg-white/10 text-white'
//                                 : 'border-white/10 bg-white/5 text-white focus:border-[#00A896]'
//                         }`}
//                         placeholder="Describe cause"
//                     />
//                     {errors.incidentCause && (
//                         <p className="mt-2 text-[10px] font-black tracking-widest text-red-500 uppercase">{errors.incidentCause}</p>
//                     )}
//                 </div>

//                 {/* How incident happened */}
//                 <div className="min-w-0 md:col-span-2">
//                     <label className="mb-2 block text-[10px] font-black tracking-widest text-white/40 uppercase">
//                         Describe how the incident happened
//                     </label>
//                     <textarea
//                         rows={3}
//                         value={formData.incidentDescription ?? ''}
//                         onChange={(e) => updateFormData({ incidentDescription: e.target.value })}
//                         className={`w-full min-w-0 resize-y rounded-xl border px-4 py-3 text-sm transition-all focus:outline-none ${
//                             errors.incidentDescription
//                                 ? 'border-red-500 bg-white/10 text-white'
//                                 : 'border-white/10 bg-white/5 text-white focus:border-[#00A896]'
//                         }`}
//                         placeholder="Describe incident"
//                     />
//                     {errors.incidentDescription && (
//                         <p className="mt-2 text-[10px] font-black tracking-widest text-red-500 uppercase">{errors.incidentDescription}</p>
//                     )}
//                 </div>

//                 {/* Immediate actions */}
//                 <div className="min-w-0 md:col-span-2">
//                     <label className="mb-2 block text-[10px] font-black tracking-widest text-white/40 uppercase">
//                         Describe Immediate actions taken
//                     </label>
//                     <textarea
//                         rows={3}
//                         value={formData.incidentActions ?? ''}
//                         onChange={(e) => updateFormData({ incidentActions: e.target.value })}
//                         className={`w-full min-w-0 resize-y rounded-xl border px-4 py-3 text-sm transition-all focus:outline-none ${
//                             errors.incidentActions
//                                 ? 'border-red-500 bg-white/10 text-white'
//                                 : 'border-white/10 bg-white/5 text-white focus:border-[#00A896]'
//                         }`}
//                         placeholder="Describe immediate actions"
//                     />
//                     {errors.incidentActions && (
//                         <p className="mt-2 text-[10px] font-black tracking-widest text-red-500 uppercase">{errors.incidentActions}</p>
//                     )}
//                 </div>

//                 {/* Injury/Disease */}
//                 <div className="min-w-0 md:col-span-2">
//                     <label className="mb-2 block text-[10px] font-black tracking-widest text-white/40 uppercase">
//                         If the incident resulted in an injury or disease, describe it
//                     </label>
//                     <textarea
//                         rows={3}
//                         value={formData.incidentInjuries ?? ''}
//                         onChange={(e) => updateFormData({ incidentInjuries: e.target.value })}
//                         className={`w-full min-w-0 resize-y rounded-xl border px-4 py-3 text-sm transition-all focus:outline-none ${
//                             errors.incidentInjuries
//                                 ? 'border-red-500 bg-white/10 text-white'
//                                 : 'border-white/10 bg-white/5 text-white focus:border-[#00A896]'
//                         }`}
//                         placeholder="Describe injury or disease"
//                     />
//                     {errors.incidentInjuries && (
//                         <p className="mt-2 text-[10px] font-black tracking-widest text-red-500 uppercase">{errors.incidentInjuries}</p>
//                     )}
//                 </div>

//                 {/* Assistance */}
//                 <div className="min-w-0 md:col-span-2">
//                     <label className="mb-2 block text-[10px] font-black tracking-widest text-white/40 uppercase">
//                         If injury/disease occurred, describe assistance provided
//                     </label>
//                     <textarea
//                         rows={3}
//                         value={formData.incidentAssistance ?? ''}
//                         onChange={(e) => updateFormData({ incidentAssistance: e.target.value })}
//                         className={`w-full min-w-0 resize-y rounded-xl border px-4 py-3 text-sm transition-all focus:outline-none ${
//                             errors.incidentAssistance
//                                 ? 'border-red-500 bg-white/10 text-white'
//                                 : 'border-white/10 bg-white/5 text-white focus:border-[#00A896]'
//                         }`}
//                         placeholder="Describe assistance"
//                     />
//                     {errors.incidentAssistance && (
//                         <p className="mt-2 text-[10px] font-black tracking-widest text-red-500 uppercase">{errors.incidentAssistance}</p>
//                     )}
//                 </div>

//                 {/* Who was involved */}
//                 <div className="min-w-0 md:col-span-2">
//                     <label className="mb-2 block text-[10px] font-black tracking-widest text-white/40 uppercase">Who was involved?</label>
//                     <input
//                         value={formData.incidentInvolved ?? ''}
//                         onChange={(e) => updateFormData({ incidentInvolved: e.target.value })}
//                         className={`w-full min-w-0 rounded-xl border px-4 py-2.5 text-sm transition-all focus:outline-none ${
//                             errors.incidentInvolved
//                                 ? 'border-red-500 bg-white/10 text-white'
//                                 : 'border-white/10 bg-white/5 text-white focus:border-[#00A896]'
//                         }`}
//                         placeholder="Specify involved parties"
//                     />
//                     {errors.incidentInvolved && (
//                         <p className="mt-2 text-[10px] font-black tracking-widest text-red-500 uppercase">{errors.incidentInvolved}</p>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

import { useStepperFormStore } from '@/hooks/store/use-stepper-form-store';
import { ClipboardList } from 'lucide-react';
import { FormInput } from '../form-input';
import { FormTextarea } from '../form-text-area';
export const Step4 = () => {
    const { formData, errors, updateFormData } = useStepperFormStore();

    return (
        <div className="animate-reveal space-y-6 sm:space-y-8">
            <div className="flex items-center gap-3 sm:gap-5">
                <div className="border-subtle bg-surface flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border text-[var(--accent-primary)] sm:h-14 sm:w-14">
                    <ClipboardList size={20} className="sm:h-6 sm:w-6" />
                </div>
                <div className="min-w-0">
                    <h2 className="text-primary text-lg font-bold tracking-tight break-words sm:text-xl md:text-3xl">Incident Details</h2>
                    <p className="text-secondary mt-1 text-xs sm:text-sm">Detailed account of the occurrence.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
                {/* Date & Time */}
                <div className="grid min-w-0 grid-cols-2 gap-4 sm:gap-6 md:col-span-2">
                    <FormInput
                        label="Date of incident"
                        type="date"
                        value={formData.incidentDate ?? ''}
                        onChange={(e) => updateFormData({ incidentDate: e.target.value })}
                        error={errors.incidentDate}
                    />
                    <FormInput
                        label="Time of incident"
                        type="time"
                        value={formData.incidentTime ?? ''}
                        onChange={(e) => updateFormData({ incidentTime: e.target.value })}
                        error={errors.incidentTime}
                    />
                </div>

                <FormInput
                    label="Where did incident occur"
                    value={formData.incidentLocation ?? ''}
                    onChange={(e) => updateFormData({ incidentLocation: e.target.value })}
                    placeholder="Specify location"
                    error={errors.incidentLocation}
                />

                <FormInput
                    label="Exact location of the incident"
                    value={formData.incidentExactLocation ?? ''}
                    onChange={(e) => updateFormData({ incidentExactLocation: e.target.value })}
                    placeholder="Specify exact location"
                    error={errors.incidentExactLocation}
                />

                <FormTextarea
                    label="What was the cause?"
                    rows={3}
                    value={formData.incidentCause ?? ''}
                    onChange={(e) => updateFormData({ incidentCause: e.target.value })}
                    placeholder="Describe cause"
                    error={errors.incidentCause}
                    spanFull
                />

                <FormTextarea
                    label="Describe how the incident happened"
                    rows={3}
                    value={formData.incidentDescription ?? ''}
                    onChange={(e) => updateFormData({ incidentDescription: e.target.value })}
                    placeholder="Describe incident"
                    error={errors.incidentDescription}
                    spanFull
                />

                <FormTextarea
                    label="Describe Immediate actions taken"
                    rows={3}
                    value={formData.incidentActions ?? ''}
                    onChange={(e) => updateFormData({ incidentActions: e.target.value })}
                    placeholder="Describe immediate actions"
                    error={errors.incidentActions}
                    spanFull
                />

                <FormTextarea
                    label="If the incident resulted in an injury or disease, describe it"
                    rows={3}
                    value={formData.incidentInjuries ?? ''}
                    onChange={(e) => updateFormData({ incidentInjuries: e.target.value })}
                    placeholder="Describe injury or disease"
                    error={errors.incidentInjuries}
                    spanFull
                />

                <FormTextarea
                    label="If injury/disease occurred, describe assistance provided"
                    rows={3}
                    value={formData.incidentAssistance ?? ''}
                    onChange={(e) => updateFormData({ incidentAssistance: e.target.value })}
                    placeholder="Describe assistance"
                    error={errors.incidentAssistance}
                    spanFull
                />

                <FormInput
                    label="Who was involved?"
                    value={formData.incidentInvolved ?? ''}
                    onChange={(e) => updateFormData({ incidentInvolved: e.target.value })}
                    placeholder="Specify involved parties"
                    error={errors.incidentInvolved}
                    spanFull
                />
            </div>
        </div>
    );
};
