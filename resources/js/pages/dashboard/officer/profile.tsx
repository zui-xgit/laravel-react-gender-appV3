import { Head } from '@inertiajs/react';
import {
    Calendar,
    Contact,
    Fingerprint,
    History,
    Mail,
    Phone,
    ShieldCheck,
    User,
} from 'lucide-react';
import BackButton from '@/components/back-button';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatDate, formatTime, getInitials } from '@/lib/helpers';
import officer from '@/routes/officer';

interface ProfileProps {
    profile: {
        uuid: string;
        roles: string[];
        username: string;
        full_name: string;
        gender: string;
        email: string | null;
        phone: string;
        status: string;
        email_verified_at: string | null;
        last_login_at: string | null;
        last_logout_at: string | null;
        created_at: string;
        updated_at: string;
    };
}

const ProfileItem = ({
    icon: Icon,
    label,
    value,
    className = '',
}: {
    icon: any;
    label: string;
    value: string | React.ReactNode;
    className?: string;
}) => (
    <div className={`flex items-start gap-3 py-3 ${className}`}>
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted/50 text-muted-foreground">
            <Icon className="h-4 w-4" />
        </div>
        <div className="space-y-0.5">
            <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                {label}
            </p>
            <div className="text-sm font-medium text-foreground">
                {value || (
                    <span className="text-xs text-muted-foreground/50 italic">
                        Not specified
                    </span>
                )}
            </div>
        </div>
    </div>
);

const Profile = ({ profile }: ProfileProps) => {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'active':
                return (
                    <Badge className="border-none bg-emerald-100 text-emerald-700 shadow-none hover:bg-emerald-100">
                        Active Account
                    </Badge>
                );
            case 'suspended':
                return (
                    <Badge variant="destructive" className="shadow-none">
                        Suspended
                    </Badge>
                );
            default:
                return (
                    <Badge variant="outline" className="capitalize shadow-none">
                        {status}
                    </Badge>
                );
        }
    };

    return (
        <>
            <Head title="My Official Profile" />

            <div className="flex flex-col gap-2 px-4 py-6 md:px-8">
                <div className="flex items-center justify-start">
                    <BackButton />
                    <Heading
                        title="Account Profile"
                        description="View your official identity and platform access credentials."
                    />
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Left Column: Identity Card */}
                    <div className="lg:col-span-1">
                        <Card className="h-full border-none shadow-sm ring-1 ring-border">
                            <CardHeader className="pb-2 text-center">
                                <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-primary shadow-inner ring-4 ring-background">
                                    {/* <User className="h-12 w-12" /> */}
                                    <span className="text-4xl">
                                        {getInitials(profile.full_name)}
                                    </span>
                                </div>
                                <CardTitle className="text-xl font-bold">
                                    {profile.full_name}
                                </CardTitle>
                                <CardDescription className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
                                    Role: <>[{profile.roles.join(', ')}]</>
                                </CardDescription>
                                <div className="mt-4 flex justify-center">
                                    {getStatusBadge(profile.status)}
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4 pt-6">
                                <Separator className="bg-border/50" />
                                <ProfileItem
                                    icon={Fingerprint}
                                    label="Unique Identifier"
                                    value={
                                        <span className="font-mono text-[11px] opacity-70">
                                            {profile.uuid}
                                        </span>
                                    }
                                />
                                <ProfileItem
                                    icon={ShieldCheck}
                                    label="Username / Handle"
                                    value={profile.username}
                                />
                                <ProfileItem
                                    icon={User}
                                    label="Gender"
                                    value={
                                        <span className="capitalize">
                                            {profile.gender}
                                        </span>
                                    }
                                />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Middle & Right Column: Details */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Contact Information */}
                        <Card className="border-none shadow-sm ring-1 ring-border">
                            <CardHeader className="flex flex-row items-center gap-2 pb-2">
                                <Contact className="h-5 w-5 text-primary" />
                                <div>
                                    <CardTitle className="text-base">
                                        Contact Details
                                    </CardTitle>
                                    <CardDescription className="text-xs text-muted-foreground">
                                        Information for official communications
                                    </CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 gap-4 py-4 md:grid-cols-2">
                                <ProfileItem
                                    icon={Mail}
                                    label="Email Address"
                                    value={
                                        <div className="flex flex-col gap-1">
                                            <span>{profile.email}</span>
                                            {profile.email_verified_at && (
                                                <span className="flex items-center gap-1 text-[10px] font-bold tracking-tight text-emerald-600 uppercase">
                                                    Verified
                                                </span>
                                            )}
                                        </div>
                                    }
                                />
                                <ProfileItem
                                    icon={Phone}
                                    label="Phone Number"
                                    value={profile.phone}
                                />
                            </CardContent>
                        </Card>

                        {/* System Metadata */}
                        <Card className="border-none shadow-sm ring-1 ring-border">
                            <CardHeader className="flex flex-row items-center gap-2 pb-2">
                                <History className="h-5 w-5 text-primary" />
                                <div>
                                    <CardTitle className="text-base">
                                        Access & Activity
                                    </CardTitle>
                                    <CardDescription className="text-xs text-muted-foreground">
                                        Historical records of your platform
                                        presence
                                    </CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 gap-x-6 gap-y-2 py-4 md:grid-cols-2">
                                <ProfileItem
                                    icon={Calendar}
                                    label="Account Registered"
                                    value={`${formatDate(profile.created_at)} at ${formatTime(profile.created_at)}`}
                                />
                                <ProfileItem
                                    icon={History}
                                    label="Last Modified"
                                    value={`${formatDate(profile.updated_at)} at ${formatTime(profile.updated_at)}`}
                                />
                                <Separator className="my-2 bg-border/50 md:col-span-2" />
                                <ProfileItem
                                    icon={ShieldCheck}
                                    label="Recent Entry (Login)"
                                    value={
                                        profile.last_login_at
                                            ? `${formatDate(profile.last_login_at)} at ${formatTime(profile.last_login_at)}`
                                            : 'No login record'
                                    }
                                />
                                <ProfileItem
                                    icon={ShieldCheck}
                                    label="Recent Exit (Logout)"
                                    value={
                                        profile.last_logout_at
                                            ? `${formatDate(profile.last_logout_at)} at ${formatTime(profile.last_logout_at)}`
                                            : 'No logout record'
                                    }
                                />
                            </CardContent>
                        </Card>

                        {/* Security Notice */}
                        <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 text-center">
                            <p className="text-[11px] leading-relaxed font-medium text-amber-800">
                                <ShieldCheck className="mr-1 mb-0.5 inline-block h-3 w-3" />
                                <strong>Read-Only Access:</strong> Your profile
                                data is managed by platform administrators. If
                                any information is incorrect, please contact
                                your commanding officer or system administrator
                                for corrections.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

Profile.layout = {
    breadcrumbs: [
        {
            title: 'My Profile',
            href: officer.profile(),
        },
    ],
};

export default Profile;
