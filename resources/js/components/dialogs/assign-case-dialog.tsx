import { useForm, usePage } from '@inertiajs/react';
import {
    UserCheck,
    ShieldAlert,
    ClipboardList,
    CheckCircle2,
    User,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { adminAssignCase } from '@/routes';
import type { PendingCase} from '@/types/types';
import { UsePageProps } from '@/types/types';
import { Spinner } from '../ui/spinner';

interface AssignModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedCase: PendingCase | null;
    all_users: {
        uuid: string;
        first_name: string;
        last_name: string;
        role: string;
    }[];
}

interface UseFormProps {
    assigned_to: string;
    priority: string;
}

const AssignModal = ({
    isOpen,
    onClose,
    selectedCase,
    all_users,
}: AssignModalProps) => {
    const { data, setData, processing, errors, post, reset } =
        useForm<UseFormProps>({
            assigned_to: '', // This matches your backend uuid check
            priority: 'medium',
        });

    const handleAssign = () => {
        post(adminAssignCase({ case: selectedCase?.uuid! }).url, {
            preserveScroll: true,
            onSuccess: () => {
                onClose();
                reset();
            },
            onError: (error) => {
                if (error.error) {
                    toast.error(error.error);
                }
            },
        });
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={() => {
                onClose();
                reset();
            }}
        >
            {/* Increased width for a more professional dashboard feel */}
            <DialogContent className="overflow-hidden p-0 sm:max-w-[550px]">
                <div className="border-b bg-primary/5 p-6">
                    <DialogHeader>
                        <div className="mb-2 flex items-center gap-3">
                            <div className="rounded-lg bg-primary/10 p-2 text-primary">
                                <ClipboardList className="h-5 w-5" />
                            </div>
                            <DialogTitle className="text-xl">
                                Assign Case Investigation
                            </DialogTitle>
                        </div>
                        <DialogDescription className="text-base">
                            Assign case{' '}
                            <span className="rounded bg-muted px-1.5 py-0.5 font-bold text-foreground">
                                {selectedCase?.case_tracking_id}
                            </span>{' '}
                            to a qualified personnel.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <div className="space-y-6 p-6">
                    {/* Priority Level Section */}
                    <div className="space-y-3">
                        <Label className="flex items-center gap-2 text-sm font-semibold">
                            <ShieldAlert className="h-4 w-4 text-muted-foreground" />
                            Priority Level
                        </Label>
                        <Select
                            onValueChange={(value) =>
                                setData('priority', value)
                            }
                            defaultValue="medium"
                        >
                            <SelectTrigger className="h-11">
                                <SelectValue placeholder="Select urgency" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="low">
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-blue-500" />
                                        <span>Low Priority</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="medium">
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-yellow-500" />
                                        <span>Medium Priority</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="high">
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-red-500" />
                                        <span>High Priority</span>
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Officer Selection Section */}
                    <div className="space-y-3">
                        <Label className="flex items-center gap-2 text-sm font-semibold">
                            <UserCheck className="h-4 w-4 text-muted-foreground" />
                            Assigning Personnel
                        </Label>
                        <Select
                            onValueChange={(value) =>
                                setData('assigned_to', value)
                            }
                            value={data.assigned_to}
                        >
                            <SelectTrigger className="h-11">
                                <SelectValue placeholder="Search available officers..." />
                            </SelectTrigger>

                            <SelectContent className="max-h-[300px]">
                                {all_users?.length > 0 ? (
                                    all_users.map((officer) => (
                                        <SelectItem
                                            key={officer.uuid}
                                            value={officer.uuid}
                                            className="cursor-pointer py-3 focus:bg-primary/5"
                                        >
                                            <div className="flex items-start gap-3">
                                                {/* Icon/Avatar Placeholder */}
                                                <div className="mt-1 rounded-full bg-muted p-1.5">
                                                    <User className="h-2 w-2 text-muted-foreground" />
                                                </div>

                                                {/* Info */}
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="text-xs leading-none font-semibold">
                                                        {officer.first_name}{' '}
                                                        {officer.last_name}
                                                    </span>
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="text-xs font-medium tracking-wider text-muted-foreground">
                                                            {officer.role}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </SelectItem>
                                    ))
                                ) : (
                                    <div className="p-4 text-center text-sm text-muted-foreground">
                                        No personnel found
                                    </div>
                                )}
                            </SelectContent>
                        </Select>
                        {errors.assigned_to && (
                            <p className="text-sm text-red-500">
                                {errors.assigned_to}
                            </p>
                        )}
                    </div>
                </div>

                <DialogFooter className="justify-right flex items-center gap-2 border-t bg-muted/30 p-6 sm:gap-0">
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            onClick={onClose}
                            className="cursor-pointer px-6"
                        >
                            Discard
                        </Button>
                        <Button
                            onClick={handleAssign}
                            disabled={processing}
                            className="w-[7rem] cursor-pointer px-8 shadow-lg shadow-primary/20 disabled:pointer-events-auto disabled:cursor-not-allowed"
                        >
                            {processing ? (
                                <>
                                    <Spinner className="text-red-500" />
                                </>
                            ) : (
                                <>
                                    <CheckCircle2 className="mr-2 h-4 w-4" />
                                    Confirm
                                </>
                            )}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AssignModal;
