/**
 * Formats an ISO date string into a readable date and time object.
 */
// export const formatDateTime = (dateString: string | null | undefined) => {
//     if (!dateString) return { date: 'N/A', time: 'N/A' };

//     const dateObj = new Date(dateString);

//     // Format: Oct 24, 2026
//     const date = dateObj.toLocaleDateString(undefined, {
//         month: 'short',
//         day: 'numeric',
//         year: 'numeric',
//     });

//     // Format: 05:27 PM
//     const time = dateObj.toLocaleTimeString([], {
//         hour: '2-digit',
//         minute: '2-digit',
//         hour12: true,
//     });

//     return { date, time };
// };

// utils/date.ts

/**
 * Formats: Oct 24, 2026
 */
export const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) {
return 'N/A';
}

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
    if (!dateString) {
return 'N/A';
}

    return new Date(dateString).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
};

/**
 * Formats an ISO date string into a relative time string (e.g., "3 hours ago").
 */
export const formatRelativeTime = (
    dateString: string | null | undefined,
): string => {
    if (!dateString) {
return 'N/A';
}

    const date = new Date(dateString);
    const now = new Date();

    // Get the difference in seconds
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    // Handle potential future dates or slight system clock mismatches
    if (diffInSeconds < 5) {
return 'Just now';
}

    // Time intervals defined in seconds
    const intervals = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'week', seconds: 604800 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 },
    ];

    for (const interval of intervals) {
        const count = Math.floor(diffInSeconds / interval.seconds);

        if (count >= 1) {
            return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
        }
    }

    return 'Just now';
};

/**
 * Extracts uppercase initials from a full name (e.g., "Juma Asha" -> "JA").
 */
export const getInitials = (name: string | null | undefined): string => {
    if (!name || typeof name !== 'string') {
return '';
}

    const trimmedName = name.trim();

    if (!trimmedName) {
return '';
}

    const parts = trimmedName.split(/\s+/); // Splits by any amount of whitespace

    if (parts.length === 1) {
        // If it's a single name, return the first two letters or just the first letter
        return parts[0].substring(0, 2).toUpperCase();
    }

    // Grab the first letter of the first name and the first letter of the last name
    const firstInitial = parts[0].charAt(0);
    const lastInitial = parts[parts.length - 1].charAt(0);

    return `${firstInitial}${lastInitial}`.toUpperCase();
};
