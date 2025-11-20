
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ProductListCard } from '@/components/pos/ProductListCard';

export default function ProductList() {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <div className="space-y-2 items-end">
        <Button variant="outline" onClick={() => navigate('/products')}>
          ← Back
        </Button>
      </div>
      <ProductListCard />
    </div>
  );
}