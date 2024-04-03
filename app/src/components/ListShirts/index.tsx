import { Shirt, ShirtContext } from '@/contexts/ShirtContext';
import { useContext, useEffect } from 'react';
import Image from 'next/image';


export default function ListShirts() {
    const { shirts, setShirts } = useContext(ShirtContext);

     const handleItemClick = (id: string) => {
        const url = `/details?id=${id}`;
        window.open(url, '_blank');
    };

    useEffect(() => {
        fetch('http://localhost:3001/shirts')
            .then(response => response.json())
            .then(data => {
                setShirts(data);
            });
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {shirts.map((shirt: Shirt) => (
                <div key={shirt.id} className="bg-white shadow-md p-4 rounded-lg" onClick={() => handleItemClick(shirt.id)}>
                    <div className="mb-4">
                        <Image src='/t-shirt.png' width={300} height={300} alt={shirt.title} />
                    </div>
                    <h2 className="text-xl font-semibold">{shirt.title}</h2>
                    <p className="text-gray-600">R$ {shirt.price}</p>
                    <div className="mt-2">
                        <p className="text-gray-700">Tamanhos Disponíveis: {shirt.sizes.join(', ')}</p>
                        <p className="text-gray-700">Cores Disponíveis: {shirt.colors.join(', ')}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}