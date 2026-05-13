import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils'; // Standard shadcn utility path

type Enumerate<
    N extends number,
    Acc extends number[] = [],
> = Acc['length'] extends N
    ? Acc[number]
    : Enumerate<N, [...Acc, Acc['length']]>;

export type IntRange<F extends number, T extends number> = Exclude<
    Enumerate<T>,
    Enumerate<F>
>;

interface CaseProgressBarProps {
    progress: IntRange<0, 100>;
    className?: string;
}

const CaseProgressBar = ({ progress, className }: CaseProgressBarProps) => {
    return (
        <div className={cn(className, 'flex flex-row items-center gap-3')}>
            {/* <div className="mb-2 flex items-center justify-between text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                <span>Case Progress</span>
            </div> */}
            <Progress value={progress} className="h-2 shadow-sm" />
            <span className="text-xs font-bold text-foreground">
                {progress}%
            </span>
        </div>
    );
};

export default CaseProgressBar;
