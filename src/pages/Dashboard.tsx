import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, ShoppingCart, TrendingUp, Users, Clock, AlertCircle } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome to BrewPOS - Overview of your business</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Sales */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <ShoppingCart className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">RM 2,543.50</div>
            <p className="text-xs text-gray-600">+12% from last week</p>
          </CardContent>
        </Card>

        {/* Total Orders */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-gray-600">Today's orders</p>
          </CardContent>
        </Card>

        {/* Total Customers */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-gray-600">Unique visitors</p>
          </CardContent>
        </Card>

        {/* Average Order Value */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Order</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">RM 16.30</div>
            <p className="text-xs text-gray-600">Average order value</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 pb-4 border-b">
              <Clock className="w-8 h-8 text-amber-600 shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-gray-900">Order Completed</p>
                <p className="text-sm text-gray-600">Order #12345 - RM 25.50</p>
              </div>
              <span className="text-xs text-gray-500">2 mins ago</span>
            </div>
            <div className="flex items-center gap-4 pb-4 border-b">
              <ShoppingCart className="w-8 h-8 text-blue-600 shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-gray-900">New Order</p>
                <p className="text-sm text-gray-600">Order #12344 - RM 18.75</p>
              </div>
              <span className="text-xs text-gray-500">5 mins ago</span>
            </div>
            <div className="flex items-center gap-4">
              <Users className="w-8 h-8 text-green-600 shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-gray-900">New Customer</p>
                <p className="text-sm text-gray-600">First time visitor from Klang Valley</p>
              </div>
              <span className="text-xs text-gray-500">10 mins ago</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info Box */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-blue-900">
              <strong>Dashboard Tip:</strong> This page will show real-time analytics and reports in Phase 4. 
              Currently showing mock data.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}