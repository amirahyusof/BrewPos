import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, AlertCircle } from 'lucide-react';

type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  category?: string;
};

type ProductCardProps = {
  product: Product;
  addToCart: (product: Product) => void;
  outOfStock?: boolean;
  stock?: number;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  addToCart,
  outOfStock = false,
  stock = 0,
}) => {
  return (
    <Card className={`hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden ${
      outOfStock ? 'opacity-60' : ''
    }`}>
      <CardContent className="flex flex-col items-center text-center p-3 h-full">
        {/* Image */}
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-24 object-cover rounded-lg mb-2"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-24 bg-linear-to-br from-amber-100 to-orange-100 rounded-lg flex items-center justify-center mb-2">
            <span className="text-2xl">☕</span>
          </div>
        )}

        {/* Name */}
        <h3 className="font-semibold text-sm text-gray-800 line-clamp-2">
          {product.name}
        </h3>

        {/* Stock Status */}
        {outOfStock ? (
          <div className="flex items-center gap-1 text-red-600 text-xs mt-1 mb-2">
            <AlertCircle size={14} />
            <span>Out of Stock</span>
          </div>
        ) : (
          <p className="text-xs text-gray-500 mt-1 mb-2">
            Stock: {stock}
          </p>
        )}

        {/* Price */}
        <p className="text-sm font-bold text-amber-600 mb-2">
          RM {product.price.toFixed(2)}
        </p>

        {/* Add Button */}
        <Button
          onClick={() => addToCart(product)}
          disabled={outOfStock}
          className={`w-full transition-all ${
            outOfStock
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-amber-600 hover:bg-amber-700'
          }`}
        >
          <Plus size={16} className="mr-1" />
          Add
        </Button>
      </CardContent>
    </Card>
  );
};