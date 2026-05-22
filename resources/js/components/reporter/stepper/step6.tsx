import {
    UploadCloud,
    FileText,
    X,
    ShieldIcon,
    Image as ImageIcon,
} from 'lucide-react';
import { useStepperFormStore } from '@/hooks/store/use-stepper-form-store';
import { ChangeEvent } from 'react';
import { toast } from 'sonner';

// Shadcn UI Components
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import StepHeader from './step-header';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';

export const Step6 = () => {
    const { formData, errors, setFormData, setErrors } = useStepperFormStore();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const validTypes = [
            'application/pdf',
            'image/png',
            'image/jpeg',
            'image/jpg',
        ];

        const filteredFiles = files.filter((file) => {
            const isValidType = validTypes.includes(file.type);
            if (!isValidType) {
                toast.error(
                    `"${file.name}" is not a supported format (PDF, PNG, JPG, JPEG only).`,
                );
                return false;
            }

            const isDuplicate = formData.evidenceFiles.some(
                (f) => f.name === file.name,
            );

            if (isDuplicate) {
                toast.error(`"${file.name}" has already been added.`);
                return false;
            }

            return true;
        });

        if (filteredFiles.length > 0) {
            setFormData({
                evidenceFiles: [...formData.evidenceFiles, ...filteredFiles],
            });

            if (errors.evidenceFiles) {
                setErrors({ evidenceFiles: '' });
            }
        }

        e.target.value = '';
    };

    const removeFile = (index: number) => {
        setFormData({
            evidenceFiles: formData.evidenceFiles.filter((_, i) => i !== index),
        });
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="animate-reveal space-y-8 sm:space-y-12">
            <StepHeader
                icon={UploadCloud}
                title="Incident Evidence"
                description="Upload any supporting documents, photos, or evidence related to the incident."
            />

            <div className="space-y-8 sm:space-y-10">
                {/* Upload Section */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <Separator className="flex-1" />
                        <h3 className="text-[10px] font-black tracking-[0.4em] whitespace-nowrap text-primary uppercase">
                            Upload Documents
                        </h3>
                        <Separator className="flex-1" />
                    </div>

                    <div className="grid gap-6">
                        {/* Dropzone */}
                        <div className="group relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-muted-foreground/25 bg-muted/30 px-6 py-12 transition-all hover:border-primary/50 hover:bg-primary/5">
                            <div className="mb-4 rounded-full bg-background p-4 shadow-sm transition-transform group-hover:scale-110">
                                <UploadCloud className="h-8 w-8 text-primary" />
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-semibold text-foreground">
                                    Click to upload or drag and drop
                                </p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    PDF, PNG or JPG (MAX. 10MB per file)
                                </p>
                            </div>
                            <Input
                                type="file"
                                multiple
                                accept=".pdf,.png,.jpg,.jpeg"
                                className="absolute inset-0 h-full cursor-pointer opacity-0"
                                onChange={handleFileChange}
                            />
                        </div>
                        {errors.evidenceFiles && (
                            <InputError message={errors.evidenceFiles} />
                        )}

                        {/* File List */}
                        <div className="space-y-3">
                            <Label className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                                Selected Files ({formData.evidenceFiles.length})
                            </Label>

                            <div className="flex flex-col gap-2">
                                {formData.evidenceFiles.length > 0 ? (
                                    formData.evidenceFiles.map(
                                        (file, index) => (
                                            <div
                                                key={index}
                                                className="flex animate-in items-center justify-between rounded-xl border border-border bg-card p-3 shadow-sm transition-all duration-300 fade-in slide-in-from-bottom-2 hover:shadow-md"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="rounded-lg bg-primary/10 p-2">
                                                        {file.type.startsWith(
                                                            'image/',
                                                        ) ? (
                                                            <ImageIcon className="h-5 w-5 text-primary" />
                                                        ) : (
                                                            <FileText className="h-5 w-5 text-primary" />
                                                        )}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="max-w-[200px] truncate text-sm font-medium text-foreground sm:max-w-[400px]">
                                                            {file.name}
                                                        </p>
                                                        <p className="text-[10px] text-muted-foreground">
                                                            {formatFileSize(
                                                                file.size,
                                                            )}{' '}
                                                            • Ready to upload
                                                        </p>
                                                    </div>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() =>
                                                        removeFile(index)
                                                    }
                                                    className="h-8 w-8 text-muted-foreground transition-colors hover:text-destructive"
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ),
                                    )
                                ) : (
                                    <p className="rounded-xl border border-dashed py-8 text-center text-xs text-muted-foreground italic">
                                        No files selected yet.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Additional Information */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <Separator className="flex-1" />
                        <h3 className="text-[10px] font-black tracking-[0.4em] whitespace-nowrap text-primary uppercase">
                            Evidence Description
                        </h3>
                        <Separator className="flex-1" />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="evidenceDescription">
                                Provide context for the uploaded evidence
                            </Label>
                            <Badge
                                variant="secondary"
                                className="h-5 text-[10px]"
                            >
                                Optional
                            </Badge>
                        </div>
                        <Textarea
                            id="evidenceDescription"
                            placeholder="Explain what these files represent and how they support your statement..."
                            // className="min-h-[120px] rounded-2xl bg-muted/30 transition-colors focus:bg-background"
                            value={formData.evidenceDescription}
                            onChange={(e) =>
                                setFormData({
                                    evidenceDescription: e.target.value,
                                })
                            }
                            className={
                                errors.evidenceDescription
                                    ? 'border-destructive'
                                    : ''
                            }
                            rows={3}
                        />
                        {errors.evidenceDescription && (
                            <InputError message={errors.evidenceDescription} />
                        )}
                    </div>
                </section>

                {/* Privacy Warning */}
                <div className="rounded-2xl border border-chart-2/20 bg-chart-2/5 p-4 sm:p-6">
                    <div className="flex items-start gap-4">
                        <div className="rounded-full bg-chart-2/10 p-2">
                            <ShieldIcon className="h-5 w-5 text-chart-2" />
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-sm font-bold text-chart-2">
                                Privacy & Security
                            </h4>
                            <p className="text-xs leading-relaxed text-muted-foreground">
                                All uploaded evidence is encrypted and stored
                                securely. Only authorized personnel involved in
                                the case investigation will have access to these
                                files.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
