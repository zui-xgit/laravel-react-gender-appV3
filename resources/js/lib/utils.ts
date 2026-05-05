import type { InertiaLinkProps } from '@inertiajs/react';
import { clsx } from 'clsx';
import type { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function toUrl(url: NonNullable<InertiaLinkProps['href']>): string {
    return typeof url === 'string' ? url : url.url;
}

/**
 * Formats an ISO date string into a readable date and time object.
 */
export const formatDateTime = (dateString: string | null | undefined) => {
    if (!dateString) return { date: 'N/A', time: 'N/A' };

    const dateObj = new Date(dateString);

    // Format: Oct 24, 2026
    const date = dateObj.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });

    // Format: 05:27 PM
    const time = dateObj.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });

    return { date, time };
};

// utils/date.ts

/**
 * Formats: Oct 24, 2026
 */
export const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) return 'N/A';

    return new Date(dateString).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
};

/**
 * Formats: 05:27 PM
 */
export const formatTime = (dateString: string | null | undefined): string => {
    if (!dateString) return 'N/A';

    return new Date(dateString).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
};
