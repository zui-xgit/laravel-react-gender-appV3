import { ArrowLeft, ChevronLeft } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Hint } from './hint';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?:
        | 'default'
        | 'destructive'
        | 'outline'
        | 'secondary'
        | 'ghost'
        | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const BackButton = ({
    className,
    variant = 'ghost',
    size = 'sm',
    ...props
}: ButtonProps) => {
    const handleBack = (e: React.MouseEvent) => {
        e.preventDefault();
        window.history.back();
    };

    return (
        // <Button
        //     variant={variant}
        //     size={size}
        //     onClick={handleBack}
        //     aria-label="Go back"
        //     className={cn(
        //         'cursor-pointer text-muted-foreground transition-colors hover:text-foreground',
        //         className,
        //     )}
        //     {...props}
        // >
        //     <ArrowLeft className="h-4 w-4" />
        // </Button>
        <Hint content="Go Back">
            <Button
                onClick={handleBack}
                variant="outline"
                size="icon"
                className="h-9 w-9 shrink-0 cursor-pointer rounded-full border-none shadow-sm ring-1 ring-border"
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>
        </Hint>
    );
};

export default BackButton;
