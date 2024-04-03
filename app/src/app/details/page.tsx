'use client';

import { useRouter } from "next/navigation";
import DetailsShirt from "@/components/DetailsShirt";
import { ShirtProvider } from "@/contexts/ShirtContext";

export default function Details({ searchParams }: any) {
    const router = useRouter();

    return (
        <>
            <ShirtProvider>
                <DetailsShirt id={searchParams.id} />
            </ShirtProvider>
            
            <button onClick={() => router.push('/')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                Voltar para a página principal
            </button>
        </>
    );
}
