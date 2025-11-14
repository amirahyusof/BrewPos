import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProductAdd() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
        <p className="text-gray-600 mt-1">Add a new item to your menu</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Product Name</label>
              <input type="text" placeholder="e.g., Iced Latte" className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select className="w-full border rounded px-3 py-2">
                <option>Coffee</option>
                <option>Tea</option>
                <option>Food</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price (RM)</label>
              <input type="number" placeholder="0.00" className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Stock Quantity</label>
              <input type="number" placeholder="0" className="w-full border rounded px-3 py-2" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea placeholder="Product description..." rows={3} className="w-full border rounded px-3 py-2"></textarea>
          </div>
          <Button className="bg-amber-600 hover:bg-amber-700">Add Product</Button>
        </CardContent>
      </Card>
    </div>
  );
}