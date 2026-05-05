import React, { useEffect, useState } from 'react';
import { InertiaLinkProps, router } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { useDebouncedCallback } from 'use-debounce';
import { adminPending } from '@/routes';
import { cn } from '@/lib/utils';
import { Spinner } from './ui/spinner';

interface SearchInputProps {
    href: NonNullable<InertiaLinkProps['href']>;
    filters: any;
    className?: string;
}

const SearchInput = ({ href, filters, className }: SearchInputProps) => {
    const [search, setSearch] = useState(filters.search || '');
    const [loading, setLoading] = useState<boolean>(false);

    const debouncedSearch = useDebouncedCallback((value: string) => {
        router.get(
            href,
            { ...filters, search: value },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
                // only: ['data'],
                onStart: () => setLoading(true),
                onFinish: () => setLoading(false),
            },
        );
    }, 300);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);
        debouncedSearch(value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            debouncedSearch(search);
        }
    };

    useEffect(() => {
        setSearch(filters.search || '');
    }, [filters.search]);

    return (
        <div className={cn('relative', className)}>
            <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                placeholder="Search cases..."
                className="w-[200px] pl-8 md:w-[300px]"
                value={search}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            {loading && (
                <div className="absolute top-2.5 right-2.5">
                    <Spinner className="h-4 w-4" />
                </div>
            )}
        </div>
    );
};

export default SearchInput;
