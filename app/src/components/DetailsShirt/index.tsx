import { useContext, useEffect } from "react";
import { Shirt, ShirtContext } from "@/contexts/ShirtContext";
import Image from "next/image";

interface Props {
    id?: string;
}

export default function DetailsShirt({ id }: Props) {
    const { shirts, setShirts } = useContext(ShirtContext);

    useEffect(() => {
        fetch("http://localhost:3001/shirts")
            .then((response) => response.json())
            .then((data) => {
                setShirts(data);
            });
    }, []);

    const shirt = shirts.find((shirt: Shirt) => shirt.id === id);

    if (!shirt) {
        return <h1>Camisa não encontrada</h1>;
    }

    return (
        <div className="flex flex-col md:flex-row justify-center items-center md:items-start">
            <div className="md:flex-1">
                <Image
                    src="/t-shirt.png"
                    width={300}
                    height={300}
                    alt={shirt.title}
                    className="rounded-lg"
                />
            </div>
            <div className="md:flex-1 md:ml-8 mt-4 md:mt-0">
                <h1 className="text-3xl font-bold mb-4">{shirt.title}</h1>
                <p className="text-gray-600">Preço: R$ {shirt.price}</p>
                <p className="text-gray-700">{shirt.description}</p>
                <div className="mt-2">
                    <p className="text-gray-700">
                        Tamanhos Disponíveis: {shirt.sizes.join(", ")}
                    </p>
                    <p className="text-gray-700">
                        Cores Disponíveis: {shirt.colors.join(", ")}
                    </p>
                </div>
            </div>
        </div>
    );
}
