import { createContext, useState, ReactNode } from "react";

export const ShirtContext = createContext<any>({});

export interface Shirt {
    id: string;
    title: string;
    price: number;
    description: string;
    sizes: string[];
    colors: string[];
}

interface Props {
    children: ReactNode;
};


export const ShirtProvider = ({ children }: Props) => {
    const [shirts, setShirts] = useState<Shirt[]>([]);

    return (
        <ShirtContext.Provider value={{
            shirts, setShirts
        }}>
            {children}
        </ShirtContext.Provider>
    );
}