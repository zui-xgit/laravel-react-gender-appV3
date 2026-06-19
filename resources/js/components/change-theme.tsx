import { Monitor, Moon, Sun, Check } from 'lucide-react';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppearance  } from '@/hooks/use-appearance';
import type {Appearance} from '@/hooks/use-appearance';


export function ChangeTheme() {
    const { appearance, updateAppearance } = useAppearance();

    // Helper to show which one is currently active
    const isActive = (mode: Appearance) => appearance === mode;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
                <Button
                    variant="outline"
                    size="icon"
                    className="relative h-9 w-9 border-border bg-background hover:bg-accent"
                >
                    {/* Animated Icons: Only one is visible based on the theme */}
                    <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[150px]">
                <DropdownMenuItem
                    onClick={() => updateAppearance('light')}
                    className="flex cursor-pointer items-center justify-between"
                >
                    <div className="flex items-center gap-2">
                        <Sun className="h-4 w-4" />
                        <span>Light</span>
                    </div>
                    {isActive('light') && (
                        <Check className="h-4 w-4 text-primary" />
                    )}
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={() => updateAppearance('dark')}
                    className="flex cursor-pointer items-center justify-between"
                >
                    <div className="flex items-center gap-2">
                        <Moon className="h-4 w-4" />
                        <span>Dark</span>
                    </div>
                    {isActive('dark') && (
                        <Check className="h-4 w-4 text-primary" />
                    )}
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={() => updateAppearance('system')}
                    className="flex cursor-pointer items-center justify-between"
                >
                    <div className="flex items-center gap-2">
                        <Monitor className="h-4 w-4" />
                        <span>System</span>
                    </div>
                    {isActive('system') && (
                        <Check className="h-4 w-4 text-primary" />
                    )}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
