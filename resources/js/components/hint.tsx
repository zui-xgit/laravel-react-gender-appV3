// customs

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import React from 'react';

interface HintProps {
    children: React.ReactNode;
    content: string | React.ReactNode;
    side?: 'top' | 'bottom' | 'left' | 'right';
    align?: 'start' | 'center' | 'end';
}

export const Hint = ({
    children,
    content,
    side = 'top',
    align = 'center',
}: HintProps) => {
    return (
        <TooltipProvider delayDuration={300}>
            <Tooltip>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent
                    side={side}
                    align={align}
                    className="border-slate-800 bg-slate-900 text-white"
                >
                    <p className="text-xs font-medium">{content}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
