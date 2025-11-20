import { useNavigate } from 'react-router-dom';
import { ProductForm } from '@/components/pos/ProductForm';
import { useProducts } from '@/hooks/useProducts';
import { Button } from '@/components/ui/button';
import type { CreateProductInput } from '@/hooks/useProducts';
import { Card, CardContent } from '@/components/ui/card';

export default function ProductAdd() {
  const navigate = useNavigate();
  const { addProduct } = useProducts();

  const handleSubmit = async (data: CreateProductInput) => {
    const result = await addProduct(data);
    if (result) {
      navigate('/products');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Add New Product</h1>
        <Button variant="outline" onClick={() => navigate('/products')}>
          ← Back
        </Button>
      </div>
      <ProductForm onSubmit={handleSubmit} />

     {/* Info Box */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-2">
          <p className="text-sm text-blue-800">
            💡 <strong>Tip:</strong> Products are stored locally in your browser. They will sync
            to the cloud when you connect Firebase (Phase 5).
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
