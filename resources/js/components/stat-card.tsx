import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils'; // Standard shadcn utility

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    iconColor?: string;
    className?: string;
}

export function StatCard({
    title,
    value,
    icon: Icon,
    iconColor,
    className,
}: StatCardProps) {
    return (
        <Card
            className={cn(
                'border-none shadow-sm ring-1 ring-border',
                className,
            )}
        >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
                <Icon className={cn('h-4 w-4', iconColor)} />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold tracking-tight">{value}</div>
            </CardContent>
        </Card>
    );
}
