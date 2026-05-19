import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { z } from 'zod';
import { toast } from 'sonner';

/* =========================================================
   TYPES
========================================================= */

export type Sex = 'male' | 'female' | 'prefer_not_to_say';

const requiredString = z.string().trim().min(1, 'This Field is Required');
const sexSchema = z.enum(['male', 'female', 'prefer_not_to_say'], {
    message: 'Select a valid option',
});
const requiredAge = z
    .number()
    .min(0, 'This Field is Required')
    .max(120, 'Enter a valid age');

const Step2Schema = z.object({
    informantName: requiredString,
    informantTitle: requiredString,
    informantSex: sexSchema,
    informantAge: requiredAge,
    informantPhone: requiredString,
    informantWorkplace: requiredString,
});

const Step3Schema = z.object({
    victimName: requiredString,
    victimTitle: requiredString,
    victimSex: sexSchema,
    victimAge: requiredAge,
    victimPhone: requiredString,
    victimEmail: z.email('Invalid email address'),
    victimEducation: requiredString,
    victimResidence: requiredString,
    victimDisability: requiredString,
    victimWorkplace: requiredString,
});

const Step4Schema = z.object({
    accusedName: requiredString,
    accusedTitle: requiredString,
    accusedSex: sexSchema,
    accusedAge: requiredAge,
    accusedPhone: requiredString,
    accusedEmail: z.email('Invalid email address').trim(),
    accusedEducation: requiredString,
    accusedResidence: requiredString,
    accusedWorkplace: requiredString,
});

const Step5Schema = z.object({
    incidentDate: requiredString,
    incidentTime: requiredString,
    incidentLocation: requiredString,
    incidentExactLocation: requiredString,
    incidentType: requiredString,
    incidentCause: requiredString,
    incidentDescription: requiredString,
    incidentActions: requiredString,
    incidentInjuries: requiredString,
    incidentAssistance: requiredString,
    incidentInvolved: requiredString,
});

const Step6Schema = z.object({
    confirmationChecked: z.literal(true, {
        message: 'Confirmation is Required',
    }),
});

export interface FormData {
    // COMPLAINANT / INFORMANT (Step 2)
    informantName: string;
    informantTitle: string;
    informantSex: string;
    informantAge: string | number;
    informantPhone: string;
    informantWorkplace: string;

    // VICTIM INFORMATION (Step 3)
    victimName: string;
    victimTitle: string;
    victimSex: string;
    victimAge: string | number;
    victimPhone: string;
    victimEmail: string;
    victimEducation: string;
    victimResidence: string;
    victimDisability: string;
    victimWorkplace: string;

    // ACCUSED DETAILS (Step 4)
    accusedName: string;
    accusedSex: string;
    accusedTitle: string;
    accusedAge: string | number;
    accusedPhone: string;
    accusedEmail: string;
    accusedEducation: string;
    accusedResidence: string;
    accusedWorkplace: string;

    // INCIDENT DETAILS (Step 5)
    incidentDate: string;
    incidentTime: string;
    incidentLocation: string;
    incidentExactLocation: string;
    incidentType: string;
    incidentCause: string;
    incidentDescription: string;
    incidentActions: string;
    incidentInjuries: string;
    incidentAssistance: string;
    incidentInvolved: string;

    // CONFIRMATION (Step 6)
    confirmationChecked: boolean;
}

interface StepperFormState {
    currentStep: 1 | 2 | 3 | 4 | 5 | 6;
    isAnonymous: boolean | null;
    formData: FormData;
    errors: Partial<Record<keyof FormData, string>>;

    setCurrentStep: (value: 1 | 2 | 3 | 4 | 5 | 6) => void;
    setAnonymous: (value: boolean) => void;
    updateFormData: (data: Partial<FormData>) => void;
    validateStep: () => boolean;
    nextStep: () => void;
    previousStep: () => void;
    resetForm: () => void;
    resetErrors: () => void;
}

/* =========================================================
   INITIAL DATA
========================================================= */

const initialFormData: FormData = {
    informantName: '',
    informantTitle: '',
    informantSex: '',
    informantAge: '',
    informantPhone: '',
    informantWorkplace: '',

    victimName: '',
    victimTitle: '',
    victimSex: '',
    victimAge: '',
    victimPhone: '',
    victimEmail: '',
    victimEducation: '',
    victimResidence: '',
    victimDisability: '',
    victimWorkplace: '',

    accusedName: '',
    accusedSex: '',
    accusedTitle: '',
    accusedAge: '',
    accusedPhone: '',
    accusedEmail: '',
    accusedEducation: '',
    accusedResidence: '',
    accusedWorkplace: '',

    incidentDate: '',
    incidentTime: '',
    incidentLocation: '',
    incidentExactLocation: '',
    incidentType: '',
    incidentCause: '',
    incidentDescription: '',
    incidentActions: '',
    incidentInjuries: '',
    incidentAssistance: '',
    incidentInvolved: '',

    confirmationChecked: false,
};

/* =========================================================
   STORE
========================================================= */

export const useStepperFormStore = create<StepperFormState>()(
    persist(
        (set, get) => ({
            currentStep: 1,
            isAnonymous: null,
            formData: initialFormData,
            errors: {},

            setCurrentStep: (value) => {
                set({ currentStep: value });
            },

            setAnonymous: (value: boolean) => set({ isAnonymous: value }),

            updateFormData: (data) =>
                set((state) => ({ formData: { ...state.formData, ...data } })),

            validateStep: (): boolean => {
                const { currentStep, formData, isAnonymous } = get();
                const errors: Partial<Record<keyof FormData, string>> = {};
                let stepSchema: z.ZodSchema | null = null;

                if (currentStep === 1) {
                    if (isAnonymous === null) {
                        return false;
                    } else if (isAnonymous === true) {
                        set((state) => ({
                            formData: {
                                ...state.formData,
                                informantName: '',
                                informantTitle: '',
                                informantSex: '',
                                informantAge: '',
                                informantPhone: '',
                                informantWorkplace: '',
                            },
                        }));
                        return true;
                    }
                }

                // Assign schemas per step
                if (currentStep === 2) stepSchema = Step2Schema;
                if (currentStep === 3) stepSchema = Step3Schema;
                if (currentStep === 4) stepSchema = Step4Schema;
                if (currentStep === 5) stepSchema = Step5Schema;
                if (currentStep === 6) stepSchema = Step6Schema;

                // If anonymous skips step 2 or no specific schema maps out, it automatically passes
                if (!stepSchema) {
                    set({ errors: {} });
                    return true;
                }

                // RUN ZOD VALIDATION ENGINE
                const result = stepSchema.safeParse(formData);

                if (!result.success) {
                    result.error.issues.forEach((issue) => {
                        const issueFieldName = issue.path[0] as keyof FormData;
                        const issueMessage = issue.message;
                        errors[issueFieldName] = issueMessage;
                    });
                    set({ errors });
                    return false;
                }

                set({ errors: {} });
                return true;
            },

            nextStep: () => {
                if (get().validateStep()) {
                    if (get().currentStep === 1 && get().isAnonymous) {
                        set((state) => ({
                            currentStep: (state.currentStep + 2) as
                                | 1
                                | 2
                                | 3
                                | 4
                                | 5
                                | 6,
                        }));
                    } else {
                        set((state) => ({
                            currentStep: Math.min(state.currentStep + 1, 6) as
                                | 1
                                | 2
                                | 3
                                | 4
                                | 5
                                | 6,
                        }));
                    }
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                    });
                } else {
                    if (get().isAnonymous === null) {
                        toast.error(
                            'Please select whether you want to report anonymously or not to continue',
                            {
                                className: '!bg-red-100 !text-red-600',
                            },
                        );
                    } else {
                        toast.error('Please fill in all fields to continue', {
                            className: '!bg-red-100 !text-red-600',
                        });
                    }
                }
            },

            previousStep: () => {
                if (get().currentStep === 3 && get().isAnonymous) {
                    set((state) => ({
                        currentStep: (state.currentStep - 2) as
                            | 1
                            | 2
                            | 3
                            | 4
                            | 5
                            | 6,
                    }));
                } else {
                    set((state) => ({
                        currentStep: Math.max(state.currentStep - 1, 1) as
                            | 1
                            | 2
                            | 3
                            | 4
                            | 5
                            | 6,
                    }));
                }
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
            },

            resetForm: () =>
                set({
                    currentStep: 1,
                    isAnonymous: null,
                    formData: initialFormData,
                    errors: {},
                }),

            resetErrors: () => {
                set({ errors: {} });
            },
        }),
        {
            name: '@gender-app:stepper-form-storage',
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
