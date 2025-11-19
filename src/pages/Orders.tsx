import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Plus, Eye, Printer, AlertCircle } from "lucide-react";

export default function Orders() {
  const navigate = useNavigate();

  const recentOrders = [
    { id: "ORD-12347", items: 3, total: 28.50, time: "2 mins ago", status: "Completed" },
    { id: "ORD-12346", items: 2, total: 18.75, time: "8 mins ago", status: "Completed" },
    { id: "ORD-12345", items: 4, total: 42.00, time: "15 mins ago", status: "Completed" },
    { id: "ORD-12344", items: 1, total: 8.50, time: "22 mins ago", status: "Completed" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600 mt-1">Manage and view all orders</p>
        </div>
        <Button 
          onClick={() => navigate('/order/pos')}
          className="bg-amber-600 hover:bg-amber-700 flex items-center gap-2"
        >
          <Plus size={18} />
          New Order
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">156</div>
            <p className="text-sm text-gray-600 mt-1">Today's Orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">RM 2,543.50</div>
            <p className="text-sm text-gray-600 mt-1">Today's Revenue</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">16.3</div>
            <p className="text-sm text-gray-600 mt-1">Average Order (RM)</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left p-3 font-semibold">Order ID</th>
                  <th className="text-center p-3 font-semibold">Items</th>
                  <th className="text-right p-3 font-semibold">Total</th>
                  <th className="text-left p-3 font-semibold">Time</th>
                  <th className="text-center p-3 font-semibold">Status</th>
                  <th className="text-center p-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-semibold text-amber-600">{order.id}</td>
                    <td className="p-3 text-center">{order.items}</td>
                    <td className="p-3 text-right font-semibold">RM {order.total.toFixed(2)}</td>
                    <td className="p-3 text-gray-600 text-sm">{order.time}</td>
                    <td className="p-3 text-center">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                        {order.status}
                      </span>
                    </td>
                    <td className="p-3 text-center space-x-2">
                      <Button size="sm" variant="outline" className="inline-flex items-center gap-1">
                        <Eye size={14} />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="inline-flex items-center gap-1">
                        <Printer size={14} />
                        Print
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Info Box */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <p className="text-sm text-blue-900">
            Click <strong>"New Order"</strong> to create a new order using the POS system.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
