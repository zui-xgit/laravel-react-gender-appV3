import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ViewCaseDetail } from '@/types/types';
import { formatDate, formatTime } from '@/lib/utils';

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Helvetica',
        fontSize: 10,
        color: '#1f2937',
        lineHeight: 1.5,
    },
    header: {
        marginBottom: 20,
        borderBottom: 2,
        borderBottomColor: '#1e3a8a',
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    headerLeft: {
        flex: 1,
    },
    headerRight: {
        textAlign: 'right',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1e3a8a',
        textTransform: 'uppercase',
    },
    trackingId: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#1e3a8a',
        marginTop: 4,
    },
    subtitle: {
        fontSize: 9,
        color: '#6b7280',
        marginTop: 2,
    },
    section: {
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        backgroundColor: '#f3f4f6',
        padding: 5,
        marginBottom: 8,
        color: '#1e3a8a',
        textTransform: 'uppercase',
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
        paddingVertical: 4,
    },
    label: {
        width: '30%',
        fontWeight: 'bold',
        color: '#4b5563',
    },
    value: {
        width: '70%',
        color: '#111827',
    },
    fullRow: {
        marginTop: 4,
        paddingVertical: 4,
    },
    longValue: {
        marginTop: 2,
        color: '#111827',
        textAlign: 'justify',
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 40,
        right: 40,
        textAlign: 'center',
        color: '#9ca3af',
        fontSize: 8,
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
        paddingTop: 10,
    },
    badge: {
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        fontSize: 8,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    statusPending: {
        backgroundColor: '#fef3c7',
        color: '#92400e',
    },
    statusInProgress: {
        backgroundColor: '#dbeafe',
        color: '#1e40af',
    },
    statusCompleted: {
        backgroundColor: '#dcfce7',
        color: '#166534',
    },
    anonymousNotice: {
        backgroundColor: '#fef2f2',
        color: '#991b1b',
        padding: 8,
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 9,
        fontWeight: 'bold',
    },
});

// Safely converts any value to a display string.
// Handles numbers (including 0), null, undefined, and empty strings.
const toDisplayString = (
    value: string | number | null | undefined,
    fallback: string,
): string => {
    if (value === null || value === undefined || value === '') return fallback;
    return String(value);
};

const DataRow = ({
    label,
    value,
}: {
    label: string;
    value: string | number | null | undefined;
}) => (
    <View style={styles.row}>
        <Text style={styles.label}>{label}:</Text>
        <Text style={styles.value}>{toDisplayString(value, 'N/A')}</Text>
    </View>
);

const LongDataRow = ({
    label,
    value,
}: {
    label: string;
    value: string | null | undefined;
}) => (
    <View style={styles.fullRow}>
        <Text style={styles.label}>{label}:</Text>
        <Text style={styles.longValue}>
            {toDisplayString(value, 'No details provided.')}
        </Text>
    </View>
);

interface CaseDetailPDFProps {
    caseData: ViewCaseDetail;
}

const CaseDetailPDF = ({ caseData }: CaseDetailPDFProps) => {
    const statusStyle =
        caseData.status === 'pending'
            ? styles.statusPending
            : caseData.status === 'in_progress'
              ? styles.statusInProgress
              : styles.statusCompleted;

    return (
        <Document title={`Case-${caseData.case_tracking_id}`}>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Text style={styles.title}>
                            Official Incident Report
                        </Text>
                        <Text style={styles.trackingId}>
                            ID: {caseData.case_tracking_id}
                        </Text>
                    </View>
                    <View style={styles.headerRight}>
                        <Text style={[styles.badge, statusStyle]}>
                            {caseData.status.replace('_', ' ')}
                        </Text>
                        <Text style={styles.subtitle}>
                            Reported: {formatDate(caseData.created_at)}{' '}
                            {formatTime(caseData.created_at)}
                        </Text>
                    </View>
                </View>

                {/* Anonymous Notice */}
                {caseData.is_anonymous ? (
                    <View style={styles.anonymousNotice}>
                        <Text>
                            CONFIDENTIAL: THIS IS AN ANONYMOUS REPORT. INFORMANT
                            IDENTITY PROTECTED.
                        </Text>
                    </View>
                ) : null}

                {/* Assignment Details */}
                {caseData.case_assignment ? (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>
                            Case Assignment Information
                        </Text>
                        <DataRow
                            label="Assigned To"
                            value={`${caseData.case_assignment.assigned_to.first_name} ${caseData.case_assignment.assigned_to.last_name}`}
                        />
                        <DataRow
                            label="Officer Role"
                            value={caseData.case_assignment.assigned_to.role}
                        />
                        <DataRow
                            label="Priority"
                            value={caseData.case_assignment.priority}
                        />
                        <DataRow
                            label="Assigned By"
                            value={`${caseData.case_assignment.assigned_by.first_name} ${caseData.case_assignment.assigned_by.last_name}`}
                        />
                    </View>
                ) : null}

                {/* Incident Details */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>1. Incident Details</Text>
                    <DataRow
                        label="Type of Incident"
                        value={caseData.incident_detail.incident_type}
                    />
                    <DataRow
                        label="Date & Time"
                        value={`${caseData.incident_detail.date} at ${caseData.incident_detail.time}`}
                    />
                    <DataRow
                        label="Primary Location"
                        value={caseData.incident_detail.location}
                    />
                    <DataRow
                        label="Exact Location"
                        value={caseData.incident_detail.exact_location}
                    />
                    <LongDataRow
                        label="Incident Description"
                        value={caseData.incident_detail.description}
                    />
                    <LongDataRow
                        label="Cause / Context"
                        value={caseData.incident_detail.cause}
                    />
                    <LongDataRow
                        label="Injuries Sustained"
                        value={caseData.incident_detail.injuries}
                    />
                    <LongDataRow
                        label="Actions Taken"
                        value={caseData.incident_detail.actions_taken}
                    />
                    <LongDataRow
                        label="Assistance Required"
                        value={caseData.incident_detail.assistance_needed}
                    />
                    <DataRow
                        label="Others Involved"
                        value={caseData.incident_detail.other_involved}
                    />
                </View>

                {/* Victim Details */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        2. Victim Information
                    </Text>
                    <DataRow
                        label="Full Name"
                        value={caseData.victim_detail.name}
                    />
                    <DataRow label="Sex" value={caseData.victim_detail.sex} />
                    <DataRow label="Age" value={caseData.victim_detail.age} />
                    <DataRow
                        label="Phone"
                        value={caseData.victim_detail.phone}
                    />
                    <DataRow
                        label="Email"
                        value={caseData.victim_detail.email}
                    />
                    <DataRow
                        label="Residence"
                        value={caseData.victim_detail.residence}
                    />
                    <DataRow
                        label="Workplace"
                        value={caseData.victim_detail.workplace}
                    />
                    <DataRow
                        label="Education"
                        value={caseData.victim_detail.education}
                    />
                    <DataRow
                        label="Disability Status"
                        value={caseData.victim_detail.disability}
                    />
                </View>

                {/* Accused Details */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>3. Accused Details</Text>
                    <DataRow
                        label="Full Name"
                        value={caseData.accused_detail.name}
                    />
                    <DataRow label="Sex" value={caseData.accused_detail.sex} />
                    <DataRow label="Age" value={caseData.accused_detail.age} />
                    <DataRow
                        label="Phone"
                        value={caseData.accused_detail.phone}
                    />
                    <DataRow
                        label="Email"
                        value={caseData.accused_detail.email}
                    />
                    <DataRow
                        label="Residence"
                        value={caseData.accused_detail.residence}
                    />
                    <DataRow
                        label="Workplace"
                        value={caseData.accused_detail.workplace}
                    />
                </View>

                {/* Informant Details */}
                {!caseData.is_anonymous && caseData.informant_detail ? (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>
                            4. Informant Information
                        </Text>
                        <DataRow
                            label="Full Name"
                            value={caseData.informant_detail.name}
                        />
                        <DataRow
                            label="Title/Designation"
                            value={caseData.informant_detail.title}
                        />
                        <DataRow
                            label="Sex"
                            value={caseData.informant_detail.sex}
                        />
                        <DataRow
                            label="Age"
                            value={caseData.informant_detail.age}
                        />
                        <DataRow
                            label="Phone Number"
                            value={caseData.informant_detail.phone}
                        />
                        <DataRow
                            label="Workplace"
                            value={caseData.informant_detail.workplace}
                        />
                    </View>
                ) : null}

                {/* Footer */}
                <View style={styles.footer}>
                    <Text>System Generated Report - Confidential</Text>
                    <Text>
                        Printed on {new Date().toLocaleDateString()} at{' '}
                        {new Date().toLocaleTimeString()}
                    </Text>
                </View>
            </Page>
        </Document>
    );
};

export default CaseDetailPDF;
