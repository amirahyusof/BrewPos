import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import { ProductForm } from '@/components/pos/ProductForm';
import { Button } from '@/components/ui/button';
import type { CreateProductInput } from '@/hooks/useProducts';

export default function ProductEdit() {
  const navigate = useNavigate();
   const { id } = useParams<{ id: string }>();
  const { getProductById, updateProduct } = useProducts();
  const [notFound, setError] = useState(false);
 
  const product = id ? getProductById(id) : undefined;

  const handleSubmit = async (data: CreateProductInput) => {
    if (!id) {
      setError(true);
      return;
    }
    const result = await updateProduct(id, data);
    if (result) {
      navigate('/products');
    }
  };

  if (notFound) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Product Not Found</h1>
        <Button onClick={() => navigate('/products/list')} className="bg-amber-600 hover:bg-amber-700">
          Back to Products
        </Button>
      </div>
    );
  }

 if (!product) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Product not found</p>
        <Button onClick={() => navigate('/products')} className="mt-4">
          Back to Products
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
        <p className="text-gray-600 mt-1">Update product details</p>
        <Button variant="outline" onClick={() => navigate('/products')}>
          ← Back
        </Button>
      </div>
       <ProductForm 
        onSubmit={handleSubmit} 
        initialData={product}
        isEditing={true}
      />
      
    </div>
  );
}