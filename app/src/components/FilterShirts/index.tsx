import { Shirt, ShirtContext } from '@/contexts/ShirtContext';
import { useContext, useEffect, useState } from 'react';

interface FilterCriteria {
    name: string;
    minPrice: number;
    maxPrice: number;
    size: string;
    color: string;
}

interface FilterShirtsProps {
    handleFilterChange: (criteria: FilterCriteria) => void;
    sizes: string[];
    colors: string[];
}

export default function FilterShirts() {
    const { setShirts } = useContext(ShirtContext);
    const [sizes, setSizes] = useState<string[]>([]);
    const [colors, setColors] = useState<string[]>([]);

    const [filterCriteria, setFilterCriteria] = useState({
        name: '',
        minPrice: '',
        maxPrice: '',
        size: '',
        color: ''
    });

    useEffect(() => {
        fetch('http://localhost:3001/sizes')
            .then(response => response.json())
            .then(data => {
                setSizes(data);
            });
        fetch('http://localhost:3001/colors')
            .then(response => response.json())
            .then(data => {
                setColors(data);
            });
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFilterCriteria(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        fetch('http://localhost:3001/shirts')
            .then(response => response.json())
            .then((shirts: Shirt[]) => {
                const filtered = shirts.filter(shirt => {
                    const nameMatch = shirt.title.toLowerCase().includes(filterCriteria.name.toLowerCase());
                    const priceMatch = (filterCriteria.minPrice === '' || shirt.price >= parseFloat(filterCriteria.minPrice)) &&
                        (filterCriteria.maxPrice === '' || shirt.price <= parseFloat(filterCriteria.maxPrice));
                    const sizeMatch = filterCriteria.size === '' || shirt.sizes.includes(filterCriteria.size);
                    const colorMatch = filterCriteria.color === '' || shirt.colors.includes(filterCriteria.color);
                    return nameMatch && priceMatch && sizeMatch && colorMatch;
                });
                setShirts(filtered);
            });
    }, [filterCriteria]);

    return (
        <div className="mb-4">
            <input type="text" name="name" placeholder="Nome" onChange={handleChange} />
            <input type="number" name="minPrice" placeholder="Preço Mínimo" onChange={handleChange} />
            <input type="number" name="maxPrice" placeholder="Preço Máximo" onChange={handleChange} />
            <select name="size" onChange={handleChange}>
                <option value="">Todos os tamanhos</option>
                {sizes.map((size, index) => (
                    <option key={index} value={size}>{size}</option>
                ))}
            </select>
            <select name="color" onChange={handleChange}>
                <option value="">Todas as cores</option>
                {colors.map((color, index) => (
                    <option key={index} value={color}>{color}</option>
                ))}
            </select>
        </div>
    );
}
