import type { LucideIcon } from 'lucide-react';

interface StepHeaderProps {
    icon: LucideIcon;
    title: string;
    description: string;
}

const StepHeader: React.FC<StepHeaderProps> = ({
    icon: Icon,
    title,
    description,
}) => {
    return (
        <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-2xl border bg-muted text-primary md:h-10 md:w-10">
                <Icon size={20} className="text-primary" />
            </div>
            <div className="min-w-0">
                <h2 className="text-lg font-bold tracking-tight text-primary uppercase sm:text-xl md:text-2xl">
                    {title}
                </h2>
                <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default StepHeader;
