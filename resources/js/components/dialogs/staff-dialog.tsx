import { useForm } from '@inertiajs/react';
import { UserPlus, User, Mail, Shield, Lock } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import admin from '@/routes/admin';
import type { StaffMember } from '@/types/types';
import { Spinner } from '../ui/spinner';

interface AddNewStaffDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    staffMember?: StaffMember | null;
}

interface UseFormProps {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    phone: string;
    gender: string;
    role: string | 'male' | 'female';
    password: string;
    password_confirmation: string;
}

const StaffDialog = ({
    open,
    onOpenChange,
    staffMember = null,
}: AddNewStaffDialogProps) => {
    const {
        data,
        setData,
        post,
        processing,
        patch,
        errors,
        reset,
        clearErrors,
    } = useForm<UseFormProps>({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        phone: '',
        gender: '',
        role: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        if (open && staffMember) {
            setData({
                first_name: staffMember.first_name || '',
                last_name: staffMember.last_name || '',
                username: staffMember.username || '',
                email: staffMember.email || '',
                phone: staffMember.phone || '',
                gender: staffMember.gender || '',
                role: staffMember.roles[0] || '',
                password: '',
                password_confirmation: '',
            });
        }
    }, [open, staffMember]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (staffMember) {
            patch(admin.updateStaff({ user: staffMember.uuid }).url, {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    onOpenChange(false);
                },
                onError: (errors) => {
                    if (errors.error) {
                        toast.error(errors.error);
                    }
                },
            });
        } else {
            post(admin.addStaff().url, {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    onOpenChange(false);
                },
                onError: (errors) => {
                    if (errors.error) {
                        toast.error(errors.error);
                    }
                },
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                onCloseAutoFocus={() => {
                    reset();
                    clearErrors();
                }}
                className="max-h-[90vh] overflow-y-auto sm:max-w-[750px]"
            >
                <DialogHeader>
                    <div className="mb-1 flex items-center gap-3">
                        <div className="rounded-lg bg-primary/10 p-2">
                            <UserPlus className="h-5 w-5 text-primary" />
                        </div>
                        <DialogTitle className="text-xl">
                            {staffMember
                                ? 'Update Staff Member'
                                : 'Register New Staff Member'}
                        </DialogTitle>
                    </div>
                    <DialogDescription>
                        {staffMember
                            ? 'Update staff member details below.'
                            : 'Fill in the details below to create a new staff account.'}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 py-4">
                    {/* Form Grid inspired by Step5 */}
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
                        {/* Personal Information Section */}
                        <div className="space-y-4 md:col-span-2">
                            <h4 className="flex items-center gap-2 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                                <User className="h-4 w-4" />
                                Personal Information
                            </h4>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="first_name">
                                        First Name
                                    </Label>
                                    <Input
                                        id="first_name"
                                        placeholder="Enter first name"
                                        value={data.first_name}
                                        onChange={(e) =>
                                            setData(
                                                'first_name',
                                                e.target.value,
                                            )
                                        }
                                        className={
                                            errors.first_name
                                                ? 'border-destructive'
                                                : ''
                                        }
                                    />
                                    <InputError message={errors.first_name} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="last_name">Last Name</Label>
                                    <Input
                                        id="last_name"
                                        placeholder="Enter last name"
                                        value={data.last_name}
                                        onChange={(e) =>
                                            setData('last_name', e.target.value)
                                        }
                                        className={
                                            errors.last_name
                                                ? 'border-destructive'
                                                : ''
                                        }
                                    />
                                    <InputError message={errors.last_name} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="gender">Gender</Label>
                                    <Select
                                        value={data.gender}
                                        onValueChange={(val: any) =>
                                            setData('gender', val)
                                        }
                                    >
                                        <SelectTrigger
                                            id="gender"
                                            className={
                                                errors.gender
                                                    ? 'border-destructive'
                                                    : ''
                                            }
                                        >
                                            <SelectValue placeholder="Select gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="male">
                                                Male
                                            </SelectItem>
                                            <SelectItem value="female">
                                                Female
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.gender} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="username">Username</Label>
                                    <Input
                                        id="username"
                                        placeholder="e.g. jdoe_officer"
                                        value={data.username}
                                        onChange={(e) =>
                                            setData('username', e.target.value)
                                        }
                                        className={
                                            errors.username
                                                ? 'border-destructive'
                                                : ''
                                        }
                                    />
                                    <InputError message={errors.username} />
                                </div>
                            </div>
                        </div>

                        {/* Contact Information Section */}
                        <div className="space-y-4 pt-2 md:col-span-2">
                            <h4 className="flex items-center gap-2 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                                <Mail className="h-4 w-4" />
                                Contact & Communication
                            </h4>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="staff@system.com"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData('email', e.target.value)
                                        }
                                        className={
                                            errors.email
                                                ? 'border-destructive'
                                                : ''
                                        }
                                    />
                                    <InputError message={errors.email} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        placeholder="+255..."
                                        value={data.phone}
                                        onChange={(e) =>
                                            setData('phone', e.target.value)
                                        }
                                        className={
                                            errors.phone
                                                ? 'border-destructive'
                                                : ''
                                        }
                                    />
                                    <InputError message={errors.phone} />
                                </div>
                            </div>
                        </div>

                        {/* Security & Authentication Section */}
                        <div className="space-y-4 pt-2 md:col-span-2">
                            <h4 className="flex items-center gap-2 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                                <Lock className="h-4 w-4" />
                                Security & Authentication
                            </h4>
                            <span className="text-green-800">
                                {staffMember && (
                                    <>
                                        {' '}
                                        ( This is not required incase if you
                                        don't want to update the password)
                                    </>
                                )}
                            </span>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <PasswordInput
                                        id="password"
                                        placeholder="••••••••"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData('password', e.target.value)
                                        }
                                        className={
                                            errors.password
                                                ? 'border-destructive'
                                                : ''
                                        }
                                    />
                                    <InputError message={errors.password} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password_confirmation">
                                        Confirm Password
                                    </Label>
                                    <PasswordInput
                                        id="password_confirmation"
                                        placeholder="••••••••"
                                        value={data.password_confirmation}
                                        onChange={(e) =>
                                            setData(
                                                'password_confirmation',
                                                e.target.value,
                                            )
                                        }
                                        className={
                                            errors.password_confirmation
                                                ? 'border-destructive'
                                                : ''
                                        }
                                    />
                                    <InputError
                                        message={errors.password_confirmation}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Role & Access Section */}
                        <div className="space-y-4 pt-2 md:col-span-2">
                            <h4 className="flex items-center gap-2 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                                <Shield className="h-4 w-4" />
                                Role
                            </h4>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="role">Assign Role</Label>
                                    <Select
                                        value={data.role}
                                        onValueChange={(val: any) =>
                                            setData('role', val)
                                        }
                                    >
                                        <SelectTrigger
                                            id="role"
                                            className={
                                                errors.role
                                                    ? 'border-destructive'
                                                    : ''
                                            }
                                        >
                                            <SelectValue placeholder="Select a role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="admin">
                                                Admin
                                            </SelectItem>
                                            <SelectItem value="officer">
                                                Officer
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.role} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="gap-2 border-t pt-6 sm:gap-0">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => onOpenChange(false)}
                            disabled={processing}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="min-w-[150px]"
                        >
                            {processing && <Spinner className="text-white" />}
                            {staffMember ? 'Update Staff' : 'Register Staff'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default StaffDialog;
