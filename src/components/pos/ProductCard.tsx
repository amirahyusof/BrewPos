import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Product = {
id: string;
name: string;
price: number;
imageUrl?: string;
};


type ProductCardProps = {
product: Product;
onAdd: (product: Product) => void;
};


export const ProductCard: React.FC<ProductCardProps> = ({ product, onAdd }) => {
  return (
  <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer">
    <CardContent className="flex flex-col items-center text-center p-4">
      {product.imageUrl ? (
        <img
        src={product.imageUrl}
        alt={product.name}
        className="w-20 h-20 object-cover rounded-xl mb-2"
        />
        ) : (
        <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 mb-2">
          ☕
        </div>
        )}
      <h3 className="font-medium text-sm text-gray-800">{product.name}</h3>
      <p className="text-sm text-gray-500">RM {product.price.toFixed(2)}</p>
      <Button onClick={() => onAdd(product)} className="mt-2 w-full bg-amber-600 hover:bg-amber-700">
        Add
      </Button>
    </CardContent>
  </Card>
  );
};