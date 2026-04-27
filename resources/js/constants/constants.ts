import { FormData } from '@/hooks/store/use-stepper-form-store';
import { GenderDesk, Hotline, NavItem } from '@/types/types';

export const HOTLINES: Hotline[] = [
    {
        number: '116',
        label: 'Child Helpline',
        description: 'National support for child protection',
    },
    {
        number: '117',
        label: 'GBV Hotline',
        description: 'Gender-based violence reporting',
    },
    {
        number: '999',
        label: 'Emergency',
        description: 'Police and immediate danger',
    },
];

export const GENDER_DESKS: GenderDesk[] = [
    {
        region: 'Dar es Salaam',
        location: 'Central Police Station, Gender Desk',
    },
    { region: 'Dodoma', location: 'Police Headquarters, Area D' },
    { region: 'Arusha', location: 'Arusha Central, Makongoro Rd' },
    { region: 'Mwanza', location: 'Nyamagana Gender Desk' },
    { region: 'Zanzibar', location: 'Mazizini Police Gender Desk' },
    { region: 'Iringa', location: 'Iringa Urban Police Post' },
];

export const NAV_ITEMS: NavItem[] = [
    { label: 'How it Works', href: 'hero' },
    { label: 'Emergency Support', href: 'emergency' },
    { label: 'Regional Desks', href: 'desks' },
    { label: 'Privacy', href: 'privacy' },
];

export const InitialFormData: FormData = {
    // INFORMANT
    informantName: '',
    informantTitle: '',
    informantSex: null,
    informantAge: null,
    informantPhone: '',
    informantWorkplace: '',

    // VICTIM
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

    // ACCUSED
    accusedName: '',
    accusedTitle: '',
    accusedSex: null,
    accusedAge: null,
    accusedPhone: '',
    accusedEmail: '',
    accusedEducation: '',
    accusedResidence: '',
    accusedWorkplace: '',

    // INCIDENT
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

    // CONFIRMATION (Step 5)
    confirmationChecked: false,
};
