"use client"

import { FC } from "react";
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import {
    Pagination as PaginationShadcn,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

interface Props {
    total: number;
    page: number;
    limit: number;
}

const Pagination: FC<Props> = ({ total, page, limit }) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const totalPages = Math.ceil(total / limit);
    const currentPage = page;

    const createPageURL = (pageNumber: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    const navigateToPage = (pageNumber: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        // Use router.push instead of href to prevent page reload and control scroll
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const getPaginationItems = () => {
        const items: (number | 'ellipsis')[] = [];
        const numVisiblePages = 5;
        const delta = 2;

        if (totalPages <= numVisiblePages + 2) {
            for (let i = 1; i <= totalPages; i++) items.push(i);
        } else {
            items.push(1);
            if (currentPage - delta > 2) items.push('ellipsis');
            for (let i = currentPage - delta; i <= currentPage + delta; i++) {
                if (i > 1 && i < totalPages) items.push(i);
            }
            if (currentPage + delta < totalPages - 1) items.push('ellipsis');
            items.push(totalPages);
        }
        return Array.from(new Set(items)).sort((a, b) => {
            if (typeof a === 'number' && typeof b === 'number') return a - b;
            return 0;
        });
    };

    const paginationItems = getPaginationItems();
    
    return (
        <PaginationShadcn>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href={createPageURL(currentPage - 1)}
                        onClick={e => { 
                            e.preventDefault();
                            if (currentPage > 1) {
                                navigateToPage(currentPage - 1);
                            }
                        }}
                        aria-disabled={currentPage === 1}
                        tabIndex={currentPage === 1 ? -1 : undefined}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : undefined}
                    />
                </PaginationItem>
                {paginationItems.map((item, index) => (
                    <PaginationItem key={index}>
                        {item === 'ellipsis' ? (
                            <PaginationEllipsis />
                        ) : (
                            <PaginationLink
                                href={createPageURL(item as number)}
                                onClick={e => {
                                    e.preventDefault();
                                    navigateToPage(item as number);
                                }}
                                isActive={item === currentPage}
                            >
                                {item}
                            </PaginationLink>
                        )}
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationNext
                        href={createPageURL(currentPage + 1)}
                        onClick={e => { 
                            e.preventDefault();
                            if (currentPage < totalPages) {
                                navigateToPage(currentPage + 1);
                            }
                        }}
                        aria-disabled={currentPage === totalPages}
                        tabIndex={currentPage === totalPages ? -1 : undefined}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : undefined}
                    />
                </PaginationItem>
            </PaginationContent>
        </PaginationShadcn>
    );
};

export default Pagination;