import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function OrderHistory() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
        <p className="text-gray-600 mt-1">View all previous orders</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="border rounded-lg p-4 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">Order #ORD-12345</p>
                  <p className="text-sm text-gray-600">2 items - Coffee Beverages</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-amber-600">RM 15.50</p>
                  <p className="text-xs text-gray-500">Today 10:30 AM</p>
                </div>
              </div>
            </div>
            <div className="border rounded-lg p-4 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">Order #ORD-12344</p>
                  <p className="text-sm text-gray-600">3 items - Mixed</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-amber-600">RM 22.75</p>
                  <p className="text-xs text-gray-500">Today 09:15 AM</p>
                </div>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">Issue #7: Order History and Management</p>
        </CardContent>
      </Card>
    </div>
  );
}