export enum CaseStatus {
    NEW = 'NEW',
    IN_PROGRESS = 'IN_PROGRESS',
    ESCALATED = 'ESCALATED',
    CLOSED = 'CLOSED',
    RESOLVED = 'RESOLVED',
}

export enum RiskLevel {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
    CRITICAL = 'CRITICAL',
}

export interface CaseRecord {
    id: string;
    referenceId: string;
    dateReported: string;
    category: string;
    riskLevel: RiskLevel;
    status: CaseStatus;
    assignedOfficer: string;
    lastUpdated: string;
    descriptionSnippet: string;
}

export interface AuditLogEntry {
    id: string;
    timestamp: string;
    adminId: string;
    adminName: string;
    action: string;
    caseRef?: string;
    ipAddress: string;
}

// constants for welcome page.
export interface NavItem {
    label: string;
    href: string;
}

export interface Feature {
    title: string;
    description: string;
    icon: string;
}

export interface Hotline {
    number: string;
    label: string;
    description: string;
}

export interface GenderDesk {
    region: string;
    location: string;
}

export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

export interface SharedAuthUser {
    uuid: number;
    role: UserRole;
    user_name: string;
    first_name: string;
    last_name: string;
    gender: string;
    phone: string;
    status: 'active' | 'inactive' | 'suspended';
}

export interface SharedUser {
    uuid: string; // Changed to string as backend UUIDs are typically strings
    first_name: string;
    last_name: string;
    role: UserRole;
}
export interface SharedDataProps {
    auth: {
        user: SharedAuthUser | null;
    };
    options: {
        all_users: SharedUser[];
    };
    [key: string]: any;
}

// overview props
export interface CaseDetail {
    uuid: number;
    case_tracking_id: string;
    is_anonymous: boolean;
    status: 'unassigned' | 'assigned' | 'resolved' | 'in_progress';
    created_at: string;
}

// case detail with relationships
export type Sex = 'Male' | 'Female' | 'Other' | null;

export interface CaseAssignment {
    assigned_by: {
        first_name: string;
        last_name: string;
        role: UserRole;
    };
    assigned_to: {
        first_name: string;
        last_name: string;
        role: UserRole;
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
    cause: string;
    description: string;
    actions_taken: string;
    injuries: string;
    assistance_needed: string;
    other_involved: string;
}

export interface CaseDetailData {
    uuid: number;
    case_tracking_id: string;
    is_anonymous: number;
    status: 'unassigned' | 'assigned' | 'resolved' | 'in_progress';
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
// end case detail

export interface PaginatedCollection {
    data: CaseDetail[];
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
    links: Array<{ url: string | null; label: string; active: boolean }>;
}

export interface AssignedCase {
    uuid: string;
    case_tracking_id: string;
    is_anonymous: boolean;
    status: 'unassigned' | 'assigned' | 'resolved' | 'in_progress';
    assigned_to: string;
    assigned_to_role: string | null;
    assigned_by: string;
    assigned_by_role: string | null;
    priority: 'low' | 'medium' | 'high' | 'critical';
    date_assigned: string;
    last_updated: string;
}

export interface AssignedCasesPaginatedCollection {
    data: AssignedCase[];
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{ url: string | null; label: string; active: boolean }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export interface PersonalAssignmentCase {
    uuid: string;
    case_tracking_id: string;
    is_anonymous: boolean;
    status: 'unassigned' | 'assigned' | 'resolved' | 'in_progress';
    assigned_by: string;
    assigned_by_role: string | null;
    priority: 'low' | 'medium' | 'high' | 'critical';
    date_assigned: string;
    last_updated: string;
}

export interface PersonalAssignmentsPaginatedCollection {
    data: PersonalAssignmentCase[];
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{ url: string | null; label: string; active: boolean }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export interface OverviewProps {
    totalCases: number;
    stats: {
        unassigned: number;
        assigned: number;
        resolved: number;
    };
    cases: PaginatedCollection;
}

export interface AssignedProps {
    cases: PaginatedCollection;
}
export interface UnassignedProps {
    cases: PaginatedCollection;
}
export interface ResolvedProps {
    cases: PaginatedCollection;
}

export type UserRole = 'admin' | 'officer';
export type UserGender = 'male' | 'female';
export type UserStatus = 'active' | 'inactive' | 'suspended';

export interface UserData {
    uuid: number;

    // Role & access
    role: UserRole;

    // Identity
    user_name: string;
    first_name: string;
    last_name: string;
    gender: UserGender;

    // Contact
    email: string | null;
    phone: string;

    // Management
    status: UserStatus;
    last_login_at: string | null;

    // Timestamps
    created_at: string;
    // updated_at: string;
}
