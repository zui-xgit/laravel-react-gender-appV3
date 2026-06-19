import { useForm } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { trackCase } from '@/routes';
import InputError from '../input-error';
import { Spinner } from '../ui/spinner';

const TrackExistingReportDialog = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { data, setData, processing, errors, post, reset, clearErrors } =
        useForm({
            tracking_id: '',
        });

    const handleTrack = () => {
        post(trackCase().url, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                reset();
                clearErrors();
                setIsOpen(false);
            },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild className="cursor-pointer">
                <Button variant="outline" className="gap-2">
                    <Search className="h-4 w-4" />
                    Track Existing Report
                </Button>
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-125"
                onCloseAutoFocus={() => {
                    reset();
                    clearErrors();
                }}
            >
                <DialogHeader>
                    <DialogTitle>Track Report Status</DialogTitle>
                    <DialogDescription>
                        Enter your unique case tracking ID to see the latest
                        updates.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="tracking_id">Tracking ID</Label>
                    <Input
                        id="tracking_id"
                        placeholder="e.g., CASE-12345"
                        value={data.tracking_id}
                        onChange={(e) => setData('tracking_id', e.target.value)}
                    />

                    <InputError message={errors.tracking_id} />
                </div>

                <DialogFooter>
                    <Button
                        type="button"
                        // disabled={processing || !data.tracking_id}
                        onClick={handleTrack}
                        className="h-10 w-full cursor-pointer gap-2 text-base font-bold"
                    >
                        {processing ? <Spinner /> : 'Track'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default TrackExistingReportDialog;
