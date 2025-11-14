import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function NewOrder() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Create New Order</h1>
        <p className="text-gray-600 mt-1">Quick order creation template</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Order Type</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full mb-2 bg-amber-600 hover:bg-amber-700">Dine In</Button>
            <Button variant="outline" className="w-full mb-2">Takeaway</Button>
            <Button variant="outline" className="w-full">Delivery</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Info</CardTitle>
          </CardHeader>
          <CardContent>
            <input placeholder="Customer Name" className="w-full border rounded px-2 py-1 mb-2" />
            <input placeholder="Table / Address" className="w-full border rounded px-2 py-1" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Special Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea placeholder="Order notes..." className="w-full border rounded px-2 py-1 h-20"></textarea>
          </CardContent>
        </Card>
      </div>

      <p className="text-sm text-gray-500">Issue #6: Enhance POS/Order Screen</p>
    </div>
  );
}