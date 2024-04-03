'use client'
import { useContext, useEffect, useState } from 'react';

import FilterShirts from '@/components/FilterShirts';
import { ShirtContext, ShirtProvider } from '@/contexts/ShirtContext';
import ListShirts from '@/components/ListShirts';

interface Shirt {
  id: number;
  title: string;
  price: number;
  description: string;
  sizes: string[];
  colors: string[];
}

export default function Home() {
  return (
    <ShirtProvider>
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-4">Lista de Camisetas</h1>
        <FilterShirts />
        <ListShirts />        
      </div>
    </ShirtProvider>
  );
}
