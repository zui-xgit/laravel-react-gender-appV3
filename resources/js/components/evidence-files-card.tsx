import { router, usePage } from '@inertiajs/react';
import {
    Download,
    ExternalLink,
    FileIcon,
    FileImage,
    FileText,
    Paperclip,
} from 'lucide-react';
import general from '@/routes/general';
import track from '@/routes/track';
import type { UsePageProps } from '@/types/types';
import { Hint } from './hint';
import { Button } from './ui/button';

const FileTypeIcon = ({ type }: { type: string }) => {
    if (type.includes('image')) {
return <FileImage className="h-4 w-4 text-blue-500" />;
}

    if (type.includes('pdf')) {
return <FileText className="h-4 w-4 text-red-500" />;
}

    return <FileIcon className="h-4 w-4 text-gray-500" />;
};

interface EvidenceFilesCardProps {
    case_evidence: {
        uuid: string;
        file_name: string;
        file_type: string;
        created_at: string;
    }[];
}

const EvidenceFilesCard = ({ case_evidence }: EvidenceFilesCardProps) => {
    const { auth } = usePage<UsePageProps>().props;

    return (
        <>
            {case_evidence && case_evidence.length > 0 ? (
                <div className="flex flex-col gap-y-2">
                    {case_evidence.map((evidence, index) => (
                        <div
                            key={index}
                            className="group flex items-center justify-between gap-4 rounded-xl border border-border/50 bg-card p-4 transition-all hover:border-primary/20 hover:bg-muted/30 hover:shadow-sm"
                        >
                            {/* Left: Icon and Name */}
                            <Hint content={evidence.file_name}>
                                <div className="flex items-center gap-4 overflow-hidden">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted shadow-inner">
                                        <FileTypeIcon
                                            type={evidence.file_type}
                                        />
                                    </div>

                                    <div className="min-w-0 overflow-hidden">
                                        <p className="truncate text-sm font-semibold text-foreground">
                                            {evidence.file_name}
                                        </p>

                                        <p className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                                            {evidence.file_type.split('/')[1] ||
                                                'FILE'}
                                        </p>
                                    </div>
                                </div>
                            </Hint>

                            {/* Right: Actions */}

                            <a
                                href={
                                    auth.user
                                        ? general.downloadFile({
                                              file: evidence.uuid,
                                          }).url
                                        : track.downloadFile({
                                              file: evidence.uuid,
                                          }).url
                                }
                                download
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1"
                            >
                                <ExternalLink className="h-4 w-4" />

                                <span className="text-sm">Download</span>
                            </a>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center opacity-60">
                    <Paperclip className="mb-4 h-12 w-12 text-muted-foreground/30" />
                    <h3 className="text-sm font-bold">No Evidence Uploaded</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                        There are currently no files or attachments associated
                        with this case.
                    </p>
                </div>
            )}
        </>
    );
};

export default EvidenceFilesCard;
