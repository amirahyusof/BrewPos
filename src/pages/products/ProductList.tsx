import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">All products / menu items</p>
        </div>
        <Button onClick={() => navigate('/products/add')} className="bg-amber-600 hover:bg-amber-700">
          + Add New Product
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Menu Items</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Category</th>
                <th className="text-right p-2">Price</th>
                <th className="text-center p-2">Stock</th>
                <th className="text-center p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-2 font-medium">Latte</td>
                <td className="p-2">Coffee</td>
                <td className="p-2 text-right">RM 8.50</td>
                <td className="p-2 text-center">25</td>
                <td className="p-2 text-center space-x-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="outline" size="sm">Delete</Button>
                </td>
              </tr>
            </tbody>
          </table>
          <p className="text-sm text-gray-500 mt-4">Issue #4: Product Management UI</p>
        </CardContent>
      </Card>
    </div>
  );
}