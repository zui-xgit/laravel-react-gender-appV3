import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
        <Button
            variant={variant}
            size={size}
            onClick={handleBack}
            aria-label="Go back"
            className={cn(
                'cursor-pointer text-muted-foreground transition-colors hover:text-foreground',
                className,
            )}
            {...props}
        >
            <ArrowLeft className="h-4 w-4" />
        </Button>
    );
};

export default BackButton;
