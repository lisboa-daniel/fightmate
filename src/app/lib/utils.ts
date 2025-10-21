'use client';

import { useRouter } from "next/navigation";


export function page2Go(href: string) {
    const router = useRouter();

    router.replace(href);
    
}