import { toast } from 'sonner';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

/* =========================================================
   TYPES
========================================================= */

export type Sex = 'male' | 'female' | 'prefer_not_to_say';

export interface FormData {
    // COMPLAINANT / INFORMANT (Step 2)
    informantName: string;
    informantTitle: string;
    informantSex: Sex | null;
    informantAge: number | null;
    informantPhone: string;
    informantWorkplace: string;

    // VICTIM INFORMATION (Step 3)
    victimName: string;
    victimTitle: string;
    victimSex: Sex | null;
    victimAge: number | null;
    victimPhone: string;
    victimEmail: string;
    victimEducation: string;
    victimResidence: string;
    victimDisability: string;
    victimWorkplace: string;

    // ACCUSED DETAILS (Step 4)
    accusedName: string;
    accusedSex: Sex | null;
    accusedTitle: string;
    accusedAge: number | null;
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
    isCaseSubmitted: boolean;

    setCurrentStep: (value: 1 | 2 | 3 | 4 | 5 | 6) => void;
    setAnonymous: (value: boolean) => void;
    setErrors: (newErrors: Partial<Record<keyof FormData, string>>) => void;
    setIsCaseSubmitted: (value: boolean) => void;
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
    informantSex: null,
    informantAge: null,
    informantPhone: '',
    informantWorkplace: '',

    victimName: '',
    victimTitle: '',
    victimSex: null,
    victimAge: null,
    victimPhone: '',
    victimEmail: '',
    victimEducation: '',
    victimResidence: '',
    victimDisability: '',
    victimWorkplace: '',

    accusedName: '',
    accusedSex: null,
    accusedTitle: '',
    accusedAge: null,
    accusedPhone: '',
    accusedEmail: '',
    accusedEducation: '',
    accusedResidence: '',
    accusedWorkplace: '',

    incidentDate: '',
    incidentTime: '',
    incidentLocation: '',
    incidentExactLocation: '',
    incidentCause: '',
    incidentDescription: '',
    incidentActions: '',
    incidentInjuries: '',
    incidentAssistance: '',
    incidentInvolved: '',

    confirmationChecked: false,
};

/* =========================================================
   HELPERS
========================================================= */

const isValidSex = (value: unknown): value is Sex =>
    value === 'male' || value === 'female' || value === 'prefer_not_to_say';

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
            isCaseSubmitted: false,

            setCurrentStep: (value) => {
                set({ currentStep: value });
            },

            //TODO:  i am supposed to implement this to the validate function
            setErrors: (newErrors: Partial<Record<keyof FormData, string>>) => {
                set((state) => ({
                    errors: {
                        ...state.errors, // Keep what's already there
                        ...newErrors, // Overwrite only what you passed in
                    },
                }));
            },

            setAnonymous: (value: boolean) => set({ isAnonymous: value }),

            updateFormData: (data) =>
                set((state) => ({
                    formData: { ...state.formData, ...data },
                })),

            validateStep: () => {
                const { currentStep, formData, isAnonymous } = get();
                const errors: Partial<Record<keyof FormData, string>> = {};
                let anonymouseError: boolean = false;

                // step 1 - checking the anonymous thing

                if (currentStep === 1) {
                    if (isAnonymous === null) {
                        anonymouseError = true;
                        toast.info(
                            'Choose to report anonymously or identfy yourself please',
                        );
                    }
                }

                // Step 2 - Informant (required only if identified)
                if (currentStep === 2 && isAnonymous === false) {
                    if (!formData.informantName.trim())
                        errors.informantName = 'Required';
                    if (!formData.informantTitle.trim())
                        errors.informantTitle = 'Required';
                    if (!isValidSex(formData.informantSex))
                        errors.informantSex = 'Select a valid option';
                    if (!formData.informantAge)
                        errors.informantAge = 'Required';
                    if (!formData.informantPhone.trim())
                        errors.informantPhone = 'Required';
                    if (!formData.informantWorkplace.trim())
                        errors.informantWorkplace = 'Required';
                }

                // Step 3 - Victim
                if (currentStep === 3) {
                    if (!formData.victimName.trim())
                        errors.victimName = 'Required';
                    if (!formData.victimTitle.trim())
                        errors.victimTitle = 'Required';
                    if (!isValidSex(formData.victimSex))
                        errors.victimSex = 'Select a valid option';
                    if (!formData.victimAge) errors.victimAge = 'Required';
                    if (!formData.victimPhone.trim())
                        errors.victimPhone = 'Required';
                    if (!formData.victimEmail.trim())
                        errors.victimEmail = 'Required';
                    if (!formData.victimEducation.trim())
                        errors.victimEducation = 'Required';
                    if (!formData.victimResidence.trim())
                        errors.victimResidence = 'Required';
                    if (!formData.victimDisability.trim())
                        errors.victimDisability = 'Required';
                    if (!formData.victimWorkplace.trim())
                        errors.victimWorkplace = 'Required';
                }

                // Step 4 - Accused
                if (currentStep === 4) {
                    if (!formData.accusedName.trim())
                        errors.accusedName = 'Required';
                    if (!formData.accusedTitle.trim())
                        errors.accusedTitle = 'Required';
                    if (!isValidSex(formData.accusedSex))
                        errors.accusedSex = 'Select a valid option';
                    if (!formData.accusedAge) errors.accusedAge = 'Required';
                    if (!formData.accusedPhone.trim())
                        errors.accusedPhone = 'Required';
                    if (!formData.accusedEmail.trim())
                        errors.accusedEmail = 'Required';
                    if (!formData.accusedEducation.trim())
                        errors.accusedEducation = 'Required';
                    if (!formData.accusedResidence.trim())
                        errors.accusedResidence = 'Required';
                    if (!formData.accusedWorkplace.trim())
                        errors.accusedWorkplace = 'Required';
                }

                // Step 5 - Incident
                if (currentStep === 5) {
                    if (!formData.incidentDate.trim())
                        errors.incidentDate = 'Required';
                    if (!formData.incidentTime.trim())
                        errors.incidentTime = 'Required';
                    if (!formData.incidentLocation.trim())
                        errors.incidentLocation = 'Required';
                    if (!formData.incidentExactLocation.trim())
                        errors.incidentExactLocation = 'Required';
                    if (!formData.incidentCause.trim())
                        errors.incidentCause = 'Required';
                    if (!formData.incidentDescription.trim())
                        errors.incidentDescription = 'Required';
                    if (!formData.incidentActions.trim())
                        errors.incidentActions = 'Required';
                    if (!formData.incidentInjuries.trim())
                        errors.incidentInjuries = 'Required';
                    if (!formData.incidentAssistance.trim())
                        errors.incidentAssistance = 'Required';
                    if (!formData.incidentInvolved.trim())
                        errors.incidentInvolved = 'Required';
                }

                // step 6 - Statement verification
                if (currentStep === 6) {
                    if (formData.confirmationChecked === false) {
                        errors.confirmationChecked = 'Confirmation is Required';
                    }
                }

                set({ errors });
                return Object.keys(errors).length === 0 && !anonymouseError;
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
                    isCaseSubmitted: false,
                }),

            resetErrors: () => {
                set({ errors: {} });
            },

            setIsCaseSubmitted(value: boolean) {
                set({ isCaseSubmitted: value });
            },
        }),
        {
            name: '@gender-app:stepper-form-storage',
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
