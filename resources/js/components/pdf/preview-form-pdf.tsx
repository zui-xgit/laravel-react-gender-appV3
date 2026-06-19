import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
} from '@react-pdf/renderer';
import React from 'react';
import { useStepperFormStore } from '@/hooks/store/use-stepper-form-store';

// Register fonts if needed, but for now we'll use defaults for maximum compatibility
// Standard fonts: Helvetica, Courier, Times-Roman

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
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1e3a8a',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    subtitle: {
        fontSize: 10,
        color: '#6b7280',
        textAlign: 'center',
        marginTop: 4,
    },
    section: {
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 12,
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
        width: '35%',
        fontWeight: 'bold',
        color: '#4b5563',
    },
    value: {
        width: '65%',
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
    anonymousNotice: {
        backgroundColor: '#fef2f2',
        color: '#991b1b',
        padding: 8,
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 9,
        fontWeight: 'bold',
    }
});

const DataRow = ({ label, value }: { label: string; value: string | number | null | undefined }) => (
    <View style={styles.row}>
        <Text style={styles.label}>{label}:</Text>
        <Text style={styles.value}>{value || 'N/A'}</Text>
    </View>
);

const LongDataRow = ({ label, value }: { label: string; value: string | null | undefined }) => (
    <View style={styles.fullRow}>
        <Text style={styles.label}>{label}:</Text>
        <Text style={styles.longValue}>{value || 'No details provided.'}</Text>
    </View>
);

const FormPreviewPDF = () => {
    const { formData } = useStepperFormStore();

    return (
        <Document title="Incident Report Preview">
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Incident Report Summary</Text>
                    <Text style={styles.subtitle}>
                        Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                    </Text>
                </View>

                {formData.isAnonymous && (
                    <View style={styles.anonymousNotice}>
                        <Text>THIS IS AN ANONYMOUS REPORT. INFORMANT DETAILS HAVE BEEN WITHHELD.</Text>
                    </View>
                )}

                {/* Step 2: Informant Details (Only if not anonymous) */}
                {!formData.isAnonymous && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>1. Complainant / Informant Details</Text>
                        <DataRow label="Full Name" value={formData.informantName} />
                        <DataRow label="Title/Designation" value={formData.informantTitle} />
                        <DataRow label="Sex" value={formData.informantSex} />
                        <DataRow label="Age" value={formData.informantAge} />
                        <DataRow label="Phone Number" value={formData.informantPhone} />
                        <DataRow label="Workplace" value={formData.informantWorkplace} />
                    </View>
                )}
    
                {/* Step 3: Victim Details */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>2. Victim Information</Text>
                    <DataRow label="Full Name" value={formData.victimName} />
                    <DataRow label="Title" value={formData.victimTitle} />
                    <DataRow label="Sex" value={formData.victimSex} />
                    <DataRow label="Age" value={formData.victimAge} />
                    <DataRow label="Phone" value={formData.victimPhone} />
                    <DataRow label="Email" value={formData.victimEmail} />
                    <DataRow label="Residence" value={formData.victimResidence} />
                    <DataRow label="Workplace" value={formData.victimWorkplace} />
                    <DataRow label="Education" value={formData.victimEducation} />
                    <DataRow label="Disability" value={formData.victimDisability} />
                </View>

                {/* Step 4: Accused Details */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>3. Accused Details</Text>
                    <DataRow label="Full Name" value={formData.accusedName} />
                    <DataRow label="Title" value={formData.accusedTitle} />
                    <DataRow label="Sex" value={formData.accusedSex} />
                    <DataRow label="Age" value={formData.accusedAge} />
                    <DataRow label="Phone" value={formData.accusedPhone} />
                    <DataRow label="Email" value={formData.accusedEmail} />
                    <DataRow label="Residence" value={formData.accusedResidence} />
                    <DataRow label="Workplace" value={formData.accusedWorkplace} />
                </View>

                {/* Step 5: Incident Details */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>4. Incident Description</Text>
                    <DataRow label="Date of Incident" value={formData.incidentDate} />
                    <DataRow label="Time of Incident" value={formData.incidentTime} />
                    <DataRow label="Location" value={formData.incidentLocation} />
                    <DataRow label="Specific Location" value={formData.incidentExactLocation} />
                    <DataRow label="Type of Incident" value={formData.incidentType} />
                    <DataRow label="Cause of Incident" value={formData.incidentCause} />
                    <LongDataRow label="Detailed Description" value={formData.incidentDescription} />
                    <LongDataRow label="Action Taken" value={formData.incidentActions} />
                    <LongDataRow label="Injuries Sustained" value={formData.incidentInjuries} />
                    <LongDataRow label="Assistance Required" value={formData.incidentAssistance} />
                    <DataRow label="Others Involved" value={formData.incidentInvolved} />
                </View>

                {/* Step 6: Evidence Summary */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>5. Evidence & Attachments</Text>
                    <DataRow 
                        label="Number of Files" 
                        value={formData.evidenceFiles?.length || 0} 
                    />
                    <LongDataRow label="Evidence Description" value={formData.evidenceDescription} />
                    {formData.evidenceFiles && formData.evidenceFiles.length > 0 && (
                        <View style={styles.fullRow}>
                            <Text style={styles.label}>Attached Files:</Text>
                            {formData.evidenceFiles.map((file: File, index: number) => (
                                <Text key={index} style={{ fontSize: 9, marginLeft: 10, marginTop: 2 }}>
                                    • {file.name} ({(file.size / 1024).toFixed(2)} KB)
                                </Text>
                            ))}
                        </View>
                    )}
                </View>

                {/* Footer / Certification */}
                <View style={styles.footer}>
                    <Text>This document is a preview of the submitted digital form.</Text>
                    <Text>Confidential - Intended for authorized review only.</Text>
                </View>
            </Page>
        </Document>
    );
};

export default FormPreviewPDF;
