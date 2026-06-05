import { IntRange } from '@/components/case-progress-bar';
import { PageProps } from '@inertiajs/core';

export type Sex = 'Male' | 'Female' | 'Other' | null;

export interface UsePageProps extends PageProps {
    name: string;
    auth: {
        user: {
            uuid: string;
            username: string;
            first_name: string;
            last_name: string;
            role?: string;
        };
        all_users: {
            uuid: string;
            first_name: string;
            last_name: string;
            role?: string;
        }[];
    };
    sidebarOpen: boolean;
    [key: string]: any; // Allows for additional page-specific props
}

export interface CaseAssignment {
    assigned_by: {
        first_name: string;
        last_name: string;
        role: string;
    };
    assigned_to: {
        first_name: string;
        last_name: string;
        role: string;
    };
    priority: string;
}

export interface InformantDetail {
    name: string;
    title: string;
    sex: Sex;
    age: number | null;
    phone: string;
    workplace: string;
}

export interface VictimDetail {
    name: string;
    title: string;
    sex: Sex;
    age: number | null;
    phone: string;
    email: string;
    education: string;
    residence: string;
    disability: string;
    workplace: string;
}

export interface AccusedDetail {
    name: string;
    title: string;
    sex: Sex;
    age: number | null;
    phone: string;
    email: string;
    education: string;
    residence: string;
    workplace: string;
}

export interface IncidentDetail {
    date: string;
    time: string;
    location: string;
    exact_location: string;
    incident_type: string;
    cause: string;
    description: string;
    actions_taken: string;
    injuries: string;
    assistance_needed: string;
    other_involved: string;
}

export interface CaseDetail {
    uuid: string;
    case_tracking_id: string;
    is_anonymous: boolean;
    status: 'pending' | 'completed' | 'in_progress';
    created_at: string;

    // Laravel converts camelCase to snake_case when serializing to JSON.
    //  So in your JavaScript/TypeScript, you need to use snake_case for the relation names:
    // REMEMBER THAT FOR SURE
    case_assignment: CaseAssignment;
    informant_detail: InformantDetail;
    victim_detail: VictimDetail;
    accused_detail: AccusedDetail;
    incident_detail: IncidentDetail;
}

export interface PendingCase {
    uuid: string;
    case_tracking_id: string;
    is_anonymous: boolean;
    status: string;
    created_at: string;
    incident_detail?: {
        incident_type: string;
    };
}

export interface InProgressCase {
    uuid: string;
    case_tracking_id: string;
    is_anonymous: boolean;
    status: string;
    created_at: string;
    caseWorkflowPercentage: IntRange<0, 100>;
    case_assignment: {
        priority: string;
        case_assigned_at: string;
        assigned_by: string;
        assigned_by_role: string;
        assigned_to: string;
        assigned_to_role: string;
    };
}

export interface CompletedCase {
    uuid: string;
    case_tracking_id: string;
    is_anonymous: boolean;
    status: string;
    case_reported_at: string;
    updated_at: string;
    incident_detail: {
        incident_type: string;
    };
    case_assignment: {
        case_assigned_at: string;
        assigned_by: string;
        assigned_by_role: string;
        assigned_to: string;
        assigned_to_role: string;
    };
}

export interface PersonalAssignment {
    caseDetail: {
        uuid: string;
        case_tracking_id: string;
        is_anonymous: boolean;
        status: string;
        caseWorkflowPercentage: IntRange<0, 100>;
    };
    assignedBy: {
        assigned_by: string;
        assigned_by_role: string;
    };
    priority: string;
    date_assigned: string;
    last_updated: string | null;
}
