import {
    ExternalLink,
    FileIcon,
    FileImage,
    FileText,
    Paperclip,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

const FileTypeIcon = ({ type }: { type: string }) => {
    if (type.includes('image'))
        return <FileImage className="h-4 w-4 text-blue-500" />;
    if (type.includes('pdf'))
        return <FileText className="h-4 w-4 text-red-500" />;
    return <FileIcon className="h-4 w-4 text-gray-500" />;
};

interface EvidenceFilesCardProps {
    title: string;
    value: {
        case_evidence: {
            file_path: string;
            file_name: string;
            file_type: string;
            created_at: string;
        }[];
    };
}

const EvidenceFilesCard = ({ title, value }: EvidenceFilesCardProps) => {
    return (
        <>
            <Card className="overflow-hidden border-none shadow-sm ring-1 ring-border/50">
                <CardHeader className="bg-muted/30">
                    <CardTitle className="flex items-center gap-2 text-base font-bold">
                        <Paperclip className="h-4 w-4 text-blue-600" />
                        {title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    {value.case_evidence && value.case_evidence.length > 0 ? (
                        <div className="flex flex-col gap-y-2">
                            {value.case_evidence.map((evidence, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between rounded-xl border border-border/50 bg-muted/5 p-4 transition-all hover:bg-muted/10 hover:shadow-sm"
                                >
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-background shadow-xs">
                                            <FileTypeIcon
                                                type={evidence.file_type}
                                            />
                                        </div>
                                        <div
                                            className="overflow-hidden"
                                            title={evidence.file_name}
                                        >
                                            <p className="truncate text-sm font-bold text-foreground">
                                                {evidence.file_name}
                                            </p>
                                            <p className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
                                                {evidence.file_type.split(
                                                    '/',
                                                )[1] || 'FILE'}
                                            </p>
                                        </div>
                                    </div>

                                    <Button
                                        asChild
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-muted-foreground hover:text-blue-600"
                                    >
                                        <a
                                            href={evidence.file_path}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title="Open in new tab"
                                        >
                                            <ExternalLink className="h-4 w-4" />
                                        </a>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-center opacity-60">
                            <Paperclip className="mb-4 h-12 w-12 text-muted-foreground/30" />
                            <h3 className="text-sm font-bold">
                                No Evidence Uploaded
                            </h3>
                            <p className="mt-1 text-xs text-muted-foreground">
                                There are currently no files or attachments
                                associated with this case.
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </>
    );
};

export default EvidenceFilesCard;
