import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useViewCase } from '@/hooks/store/use-view-case';
import { SharedDataProps } from '@/types/types';
import { useForm, usePage } from '@inertiajs/react';
import { CheckCircle2, Loader2, Search, User, UserPlus } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

type CasePriority = 'low' | 'medium' | 'high' | 'critical' | '';

interface AssignOfficerDialogProps {
    isAssignOfficerDialogOpen: boolean;
    setIsAssignOfficerDialogOpen: (open: boolean) => void;
}

interface AssignForm {
    assigned_to: string;
    priority: CasePriority;
}


export function AssignOfficerDialog({ isAssignOfficerDialogOpen, setIsAssignOfficerDialogOpen }: AssignOfficerDialogProps) {
    // Accessing shared data from Inertia
    const { options } = usePage<SharedDataProps>().props;
    const currentCaseData = useViewCase((state) => state.currentCaseData);

    // Initializing useForm with required fields
    const { data, setData, processing, errors, post } = useForm<AssignForm>({
        assigned_to: '', // This matches your backend uuid check
        priority: 'medium',
    });

    const users = options?.all_users || [];
    const [searchQuery, setSearchQuery] = useState('');

    const filteredOfficers = useMemo(() => {
        return users.filter((user) => {
            const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
            return fullName.includes(searchQuery.toLowerCase());
        });
    }, [searchQuery, users]);

    const selectedOfficer = users.find((user) => user.uuid === data.assigned_to);

    const handleConfirmAssignment = () => {
        if (!currentCaseData?.uuid) return;

        post(route('admin.assign-case', { uuid: currentCaseData.uuid }), {
            onError: (errors) => {
                if (errors.error) {
                    toast.error(errors.error);
                    // console.log(errors.error);
                }
            },
            onSuccess: (page) => {
                setIsAssignOfficerDialogOpen(false);
                if (page.flash.message) {
                    toast.success(page.flash.message as string);
                }
            },
        });
    };

    return (
        <Dialog open={isAssignOfficerDialogOpen} onOpenChange={setIsAssignOfficerDialogOpen}>
            <DialogContent
                className="bg-surface border-subtle text-primary flex h-[90vh] w-[95vw] max-w-[850px] flex-col gap-0 overflow-hidden rounded-2xl p-0 shadow-2xl"
                style={{ boxShadow: 'var(--card-shadow)' }}
            >
                <DialogDescription className="sr-only">Assign officer and priority level</DialogDescription>

                {/* HEADER */}
                <DialogHeader className="border-subtle shrink-0 border-b px-8 py-4">
                    <DialogTitle className="text-primary flex items-center gap-2 text-xl font-medium">
                        <UserPlus className="h-5 w-5" style={{ color: 'var(--accent-primary)' }} />
                        Assign Case Personnel
                    </DialogTitle>
                </DialogHeader>

                {/* PRIORITY LEVEL & ASSIGNED PERSONNEL */}
                <div className="bg-app/40 border-subtle grid shrink-0 grid-cols-1 gap-4 border-b px-8 py-3 md:grid-cols-2">
                    {/* PRIORITY LEVEL */}
                    <div className="flex flex-col space-y-2">
                        <Label className="text-secondary ml-1 text-sm font-bold tracking-widest uppercase">Priority Level</Label>
                        <Select value={data.priority} onValueChange={(value) => setData('priority', value as CasePriority)}>
                            <SelectTrigger
                                className={`bg-surface text-primary h-10 rounded-xl text-sm shadow-sm transition-all ${
                                    errors.priority
                                        ? 'border-red-500 ring-2 ring-red-500/20'
                                        : 'border-subtle focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/20'
                                }`}
                            >
                                <SelectValue placeholder="Select Priority" />
                            </SelectTrigger>
                            <SelectContent className="bg-surface border-subtle text-primary rounded-xl">
                                <SelectItem value="critical">Critical</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                                <SelectItem value="medium">Medium ( Default )</SelectItem>
                                <SelectItem value="low">Low</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.priority && <p className="text-md text-red-500">{errors.priority}</p>}
                    </div>

                    {/* ASSIGNED PERSONNEL */}
                    <div className="flex flex-col space-y-2">
                        <Label className="text-secondary ml-1 text-sm font-bold tracking-widest uppercase">Assigned Personnel</Label>
                        <div
                            className={`text-md flex h-10 items-center rounded-xl border px-4 shadow-sm transition-all ${
                                errors.assigned_to
                                    ? 'border-red-500 bg-red-50/5 ring-2 ring-red-500/20'
                                    : selectedOfficer
                                      ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/5 font-medium text-[var(--accent-primary)]'
                                      : 'border-subtle text-secondary border-dashed italic'
                            }`}
                        >
                            {selectedOfficer ? `${selectedOfficer.first_name} ${selectedOfficer.last_name}` : 'Choose an investigator...'}
                        </div>
                        {errors.assigned_to && <p className="text-md text-red-500">{errors.assigned_to}</p>}
                    </div>
                </div>

                {/* SEARCH AREA */}
                <div className="bg-surface border-subtle shrink-0 border-b px-8 py-3">
                    <div className="relative">
                        <Search className="text-secondary absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                        <input
                            placeholder="Filter by name..."
                            className="bg-input border-subtle flex h-10 w-full rounded-xl pl-10 text-sm transition-all focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]/20 focus-visible:outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* HIGH-DENSITY SCROLLABLE LIST AREA */}
                <div className="custom-scrollbar bg-surface flex-1 overflow-y-auto px-6">
                    <div className="space-y-1 py-4">
                        {filteredOfficers.length > 0 ? (
                            filteredOfficers.map((officer) => (
                                <div
                                    key={officer.uuid}
                                    onClick={() => setData('assigned_to', officer.uuid)}
                                    className={`group flex cursor-pointer items-center justify-between rounded-xl border px-4 py-2 transition-all ${
                                        data.assigned_to === officer.uuid
                                            ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/10 shadow-sm'
                                            : 'hover:bg-input border-transparent hover:scale-[1.01] hover:shadow-sm'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${
                                                data.assigned_to === officer.uuid
                                                    ? 'bg-[var(--accent-primary)] text-white'
                                                    : 'bg-surface border-subtle text-secondary border group-hover:border-[var(--accent-primary)]/30'
                                            }`}
                                        >
                                            <User className="size-5" />
                                        </div>
                                        <div className="flex flex-col">
                                            <p
                                                className={`text-md transition-colors ${
                                                    data.assigned_to === officer.uuid ? 'font-medium text-[var(--accent-primary)]' : 'text-primary'
                                                }`}
                                            >
                                                {officer.first_name} {officer.last_name}
                                            </p>
                                            <span className="text-secondary text-[10px] leading-none tracking-wider uppercase">{officer.role}</span>
                                        </div>
                                    </div>

                                    {data.assigned_to === officer.uuid && <CheckCircle2 className="size-7 text-[var(--accent-primary)]" />}
                                </div>
                            ))
                        ) : (
                            <div className="text-secondary py-10 text-center text-sm italic">No personnel found matching "{searchQuery}"</div>
                        )}
                    </div>
                </div>

                {/* FOOTER */}
                <DialogFooter className="border-subtle bg-surface flex shrink-0 items-center justify-end gap-3 border-t px-8 py-4">
                    <Button
                        onClick={() => setIsAssignOfficerDialogOpen(false)}
                        variant="ghost"
                        className="text-secondary hover:text-primary h-10 cursor-pointer rounded-xl px-6 text-sm"
                        disabled={processing}
                    >
                        Cancel
                    </Button>

                    <Button
                        disabled={processing}
                        onClick={handleConfirmAssignment}
                        className={`h-10 cursor-pointer rounded-xl px-8 text-sm text-white shadow-md transition-all active:scale-95 disabled:pointer-events-none disabled:opacity-50`}
                        style={{ backgroundColor: 'var(--accent-primary)' }}
                    >
                        {processing ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Assigning...
                            </>
                        ) : (
                            'Confirm Assignment'
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}