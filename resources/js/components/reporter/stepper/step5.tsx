// import { useStepperFormStore } from '@/hooks/store/use-stepper-form-store';
// import { Eye } from 'lucide-react';

// export const Step5 = () => {
//     const { formData, errors, updateFormData, isAnonymous } = useStepperFormStore();

//     const renderField = (label: string, value?: string, spanFull = false) => (
//         <div className={`rounded-2xl border border-white/5 bg-white/5 p-4 ${spanFull ? 'sm:col-span-2' : ''}`}>
//             <label className="mb-2 block text-[10px] font-black tracking-widest text-white/70 uppercase">{label}</label>
//             <div className="text-sm font-medium break-words text-white/90">
//                 <span className="text-white/70 italic">{value || 'Not provided'}</span>
//             </div>
//         </div>
//     );

//     return (
//         <div className="animate-reveal space-y-8 sm:space-y-12">
//             <div className="flex items-center gap-3 sm:gap-5">
//                 <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#00A896] sm:h-14 sm:w-14">
//                     <Eye size={20} className="sm:h-6 sm:w-6" />
//                 </div>
//                 <div className="min-w-0">
//                     <h2 className="text-lg font-bold tracking-tight break-words sm:text-xl md:text-3xl">Statement Verification</h2>
//                     <p className="mt-1 text-xs text-white/40 sm:text-sm">Review your report data carefully before submission.</p>
//                 </div>
//             </div>

//             <div className="space-y-8 sm:space-y-12">
//                 {/* Complainant Section only when the reporter is not anonymous */}
//                 {!isAnonymous && (
//                     <section className="space-y-4 sm:space-y-6">
//                         <div className="flex items-center gap-3">
//                             <div className="h-px flex-1 bg-white/10" />
//                             <h3 className="text-[10px] font-black tracking-[0.4em] text-[#00A896] uppercase">Informant / Complainant Details</h3>
//                             <div className="h-px flex-1 bg-white/10" />
//                         </div>
//                         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                             {renderField('Name of Informant/Complainant', formData.informantName)}
//                             {renderField('Title', formData.informantTitle)}
//                             {renderField('Sex', formData.informantSex?.toString())}
//                             {renderField('Age', formData.informantAge?.toString())}
//                             {renderField('Phone Number', formData.informantPhone)}
//                             {renderField(
//                                 'Program (Bachelor/Masters/PHD) School/Collage/ Directorate/Unit/Work place',
//                                 formData.informantWorkplace,
//                                 true,
//                             )}
//                         </div>
//                     </section>
//                 )}

//                 {/* Victim Section */}
//                 <section className="space-y-4 sm:space-y-6">
//                     <div className="flex items-center gap-3">
//                         <div className="h-px flex-1 bg-white/10" />
//                         <h3 className="text-[10px] font-black tracking-[0.4em] text-[#00A896] uppercase">Victim Information</h3>
//                         <div className="h-px flex-1 bg-white/10" />
//                     </div>
//                     <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                         {renderField('Victim Full Name', formData.victimName)}
//                         {renderField('Title', formData.victimTitle)}
//                         {renderField('Sex', formData.victimSex as string)}
//                         {renderField('Age', formData.victimAge?.toString())}
//                         {renderField('Phone Number', formData.victimPhone)}
//                         {renderField('Email', formData.victimEmail)}
//                         {renderField('Education Level', formData.victimEducation)}
//                         {renderField('Primary Residence', formData.victimResidence)}
//                         {renderField('Disability', formData.victimDisability)}
//                         {renderField('Workplace/Unit', formData.victimWorkplace, true)}
//                     </div>
//                 </section>

//                 {/* Accused Section */}
//                 <section className="space-y-4 sm:space-y-6">
//                     <div className="flex items-center gap-3">
//                         <div className="h-px flex-1 bg-white/10" />
//                         <h3 className="text-[10px] font-black tracking-[0.4em] text-[#00A896] uppercase">Accused Details</h3>
//                         <div className="h-px flex-1 bg-white/10" />
//                     </div>
//                     <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                         {renderField('Name of Accused', formData.accusedName)}
//                         {renderField('Sex', formData.accusedSex?.toString())}
//                         {renderField('Title', formData.accusedTitle)}
//                         {renderField('Age', formData.accusedAge?.toString())}
//                         {renderField('Phone Number', formData.accusedPhone)}
//                         {renderField('Email', formData.accusedEmail)}
//                         {renderField('Education', formData.accusedEducation)}
//                         {renderField('Residence', formData.accusedResidence)}
//                         {renderField('Program/School/Workplace', formData.accusedWorkplace, true)}
//                     </div>
//                 </section>

//                 {/* Incident Section */}
//                 <section className="space-y-4 sm:space-y-6">
//                     <div className="flex items-center gap-3">
//                         <div className="h-px flex-1 bg-white/10" />
//                         <h3 className="text-[10px] font-black tracking-[0.4em] text-[#00A896] uppercase">Incident Details</h3>
//                         <div className="h-px flex-1 bg-white/10" />
//                     </div>
//                     <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                         {renderField('Date of Incident', formData.incidentDate)}
//                         {renderField('Time of Incident', formData.incidentTime)}
//                         {renderField('Where Did Incident Occur', formData.incidentLocation)}
//                         {renderField('Exact Location', formData.incidentExactLocation)}
//                         {renderField('What Was the Cause', formData.incidentCause, true)}
//                         {renderField('How the Incident Happened', formData.incidentDescription, true)}
//                         {renderField('Immediate Actions Taken', formData.incidentActions, true)}
//                         {renderField('Injury or Disease Result', formData.incidentInjuries, true)}
//                         {renderField('Assistance Provided After Incident', formData.incidentAssistance, true)}
//                         {renderField('Who Was Involved', formData.incidentInvolved, true)}
//                     </div>
//                 </section>

//                 {/* Confirmation Section */}
//                 <section className="space-y-6">
//                     <div className="flex items-center gap-3">
//                         <div className="h-px flex-1 bg-white/10" />
//                         <h3 className="text-[10px] font-black tracking-[0.4em] text-[#00A896] uppercase">Confirmation</h3>
//                         <div className="h-px flex-1 bg-white/10" />
//                     </div>
//                     {/* card */}
//                     <div
//                         className={`cursor-pointer rounded-2xl border p-6 transition-all focus:outline-none ${
//                             errors.confirmationChecked ? 'border-red-500 bg-[#00A896]/10' : 'border-[#00A896]/20 bg-[#00A896]/5'
//                         }`}
//                     >
//                         <label className="flex items-start gap-4">
//                             <input
//                                 checked={formData.confirmationChecked} // ensures boolean
//                                 onChange={(e) => updateFormData({ confirmationChecked: e.target.checked })}
//                                 type="checkbox"
//                                 className="mt-1 h-5 w-5 shrink-0 cursor-pointer rounded border-2 border-white/20 bg-white/5 text-[#00A896] transition-all checked:border-[#00A896] checked:bg-[#00A896] focus:ring-2 focus:ring-[#00A896] focus:ring-offset-2 focus:ring-offset-[#000212] focus:outline-none"
//                             />
//                             <span className="text-sm leading-relaxed text-white/80">
//                                 I hereby confirm that all the information provided in this report is true, accurate, and complete to the best of my
//                                 knowledge. I understand that providing false or misleading information may result in legal consequences and undermines
//                                 the integrity of this reporting system. I acknowledge that this report will be reviewed and investigated by the
//                                 appropriate authorities.
//                             </span>
//                         </label>
//                     </div>
//                     {errors.confirmationChecked && (
//                         <p className="mt-2 text-[10px] font-black tracking-widest text-red-500 uppercase">{errors.confirmationChecked}</p>
//                     )}
//                 </section>
//             </div>
//         </div>
//     );
// };

import { useStepperFormStore } from '@/hooks/store/use-stepper-form-store';
import { Eye } from 'lucide-react';

export const Step5 = () => {
    const { formData, errors, updateFormData, isAnonymous } = useStepperFormStore();

    const renderField = (label: string, value?: string, spanFull = false) => (
        <div className={`border-subtle bg-input rounded-2xl border p-4 ${spanFull ? 'sm:col-span-2' : ''}`}>
            <label className="text-secondary mb-2 block text-[10px] font-black tracking-widest uppercase">{label}</label>
            <div className="text-primary text-sm font-medium break-words">
                <span className="text-secondary italic">{value || 'Not provided'}</span>
            </div>
        </div>
    );

    return (
        <div className="animate-reveal space-y-8 sm:space-y-12">
            <div className="flex items-center gap-3 sm:gap-5">
                <div className="border-subtle bg-surface flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border text-[var(--accent-primary)] sm:h-14 sm:w-14">
                    <Eye size={20} className="sm:h-6 sm:w-6" />
                </div>
                <div className="min-w-0">
                    <h2 className="text-primary text-lg font-bold tracking-tight break-words sm:text-xl md:text-3xl">Statement Verification</h2>
                    <p className="text-secondary mt-1 text-xs sm:text-sm">Review your report data carefully before submission.</p>
                </div>
            </div>

            <div className="space-y-8 sm:space-y-12">
                {/* Complainant Section only when the reporter is not anonymous */}
                {!isAnonymous && (
                    <section className="space-y-4 sm:space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="h-px flex-1 bg-[var(--border-subtle)]" />
                            <h3 className="text-[10px] font-black tracking-[0.4em] text-[var(--accent-primary)] uppercase">
                                Informant / Complainant Details
                            </h3>
                            <div className="h-px flex-1 bg-[var(--border-subtle)]" />
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {renderField('Name of Informant/Complainant', formData.informantName)}
                            {renderField('Title', formData.informantTitle)}
                            {renderField('Sex', formData.informantSex?.toString())}
                            {renderField('Age', formData.informantAge?.toString())}
                            {renderField('Phone Number', formData.informantPhone)}
                            {renderField(
                                'Program (Bachelor/Masters/PHD) School/Collage/ Directorate/Unit/Work place',
                                formData.informantWorkplace,
                                true,
                            )}
                        </div>
                    </section>
                )}

                {/* Victim Section */}
                <section className="space-y-4 sm:space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="h-px flex-1 bg-[var(--border-subtle)]" />
                        <h3 className="text-[10px] font-black tracking-[0.4em] text-[var(--accent-primary)] uppercase">Victim Information</h3>
                        <div className="h-px flex-1 bg-[var(--border-subtle)]" />
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {renderField('Victim Full Name', formData.victimName)}
                        {renderField('Title', formData.victimTitle)}
                        {renderField('Sex', formData.victimSex as string)}
                        {renderField('Age', formData.victimAge?.toString())}
                        {renderField('Phone Number', formData.victimPhone)}
                        {renderField('Email', formData.victimEmail)}
                        {renderField('Education Level', formData.victimEducation)}
                        {renderField('Primary Residence', formData.victimResidence)}
                        {renderField('Disability', formData.victimDisability)}
                        {renderField('Workplace/Unit', formData.victimWorkplace, true)}
                    </div>
                </section>

                {/* Accused Section */}
                <section className="space-y-4 sm:space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="h-px flex-1 bg-[var(--border-subtle)]" />
                        <h3 className="text-[10px] font-black tracking-[0.4em] text-[var(--accent-primary)] uppercase">Accused Details</h3>
                        <div className="h-px flex-1 bg-[var(--border-subtle)]" />
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {renderField('Name of Accused', formData.accusedName)}
                        {renderField('Sex', formData.accusedSex?.toString())}
                        {renderField('Title', formData.accusedTitle)}
                        {renderField('Age', formData.accusedAge?.toString())}
                        {renderField('Phone Number', formData.accusedPhone)}
                        {renderField('Email', formData.accusedEmail)}
                        {renderField('Education', formData.accusedEducation)}
                        {renderField('Residence', formData.accusedResidence)}
                        {renderField('Program/School/Workplace', formData.accusedWorkplace, true)}
                    </div>
                </section>

                {/* Incident Section */}
                <section className="space-y-4 sm:space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="h-px flex-1 bg-[var(--border-subtle)]" />
                        <h3 className="text-[10px] font-black tracking-[0.4em] text-[var(--accent-primary)] uppercase">Incident Details</h3>
                        <div className="h-px flex-1 bg-[var(--border-subtle)]" />
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {renderField('Date of Incident', formData.incidentDate)}
                        {renderField('Time of Incident', formData.incidentTime)}
                        {renderField('Where Did Incident Occur', formData.incidentLocation)}
                        {renderField('Exact Location', formData.incidentExactLocation)}
                        {renderField('What Was the Cause', formData.incidentCause, true)}
                        {renderField('How the Incident Happened', formData.incidentDescription, true)}
                        {renderField('Immediate Actions Taken', formData.incidentActions, true)}
                        {renderField('Injury or Disease Result', formData.incidentInjuries, true)}
                        {renderField('Assistance Provided After Incident', formData.incidentAssistance, true)}
                        {renderField('Who Was Involved', formData.incidentInvolved, true)}
                    </div>
                </section>

                {/* Confirmation Section */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="h-px flex-1 bg-[var(--border-subtle)]" />
                        <h3 className="text-[10px] font-black tracking-[0.4em] text-[var(--accent-primary)] uppercase">Confirmation</h3>
                        <div className="h-px flex-1 bg-[var(--border-subtle)]" />
                    </div>
                    <div
                        className={`cursor-pointer rounded-2xl border p-6 transition-all focus:outline-none ${
                            errors.confirmationChecked
                                ? 'border-red-500 bg-red-500/10'
                                : 'border-[var(--accent-primary)]/20 bg-[var(--accent-primary)]/5'
                        }`}
                    >
                        <label className="flex cursor-pointer items-start gap-4">
                            <input
                                checked={formData.confirmationChecked}
                                onChange={(e) => updateFormData({ confirmationChecked: e.target.checked })}
                                type="checkbox"
                                className="border-subtle mt-1 h-5 w-5 shrink-0 cursor-pointer accent-[var(--accent-primary)] transition-all checked:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-primary)] focus:ring-offset-2 focus:ring-offset-[var(--bg-app)] focus:outline-none"
                            />
                            <span className="text-primary text-sm leading-relaxed">
                                I hereby confirm that all the information provided in this report is true, accurate, and complete to the best of my
                                knowledge. I understand that providing false or misleading information may result in legal consequences and undermines
                                the integrity of this reporting system. I acknowledge that this report will be reviewed and investigated by the
                                appropriate authorities.
                            </span>
                        </label>
                    </div>
                    {errors.confirmationChecked && (
                        <p className="mt-2 text-[10px] font-black tracking-widest text-red-500 uppercase">{errors.confirmationChecked}</p>
                    )}
                </section>
            </div>
        </div>
    );
};
