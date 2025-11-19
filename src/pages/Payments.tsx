import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Plus } from "lucide-react";

export default function Payments() {
  const paymentMethods = [
    { name: 'Cash', enabled: true, processed: 1234, percent: 45 },
    { name: 'Card', enabled: true, processed: 892, percent: 32 },
    { name: 'E-Wallet', enabled: true, processed: 456, percent: 16 },
    { name: 'Bank Transfer', enabled: false, processed: 0, percent: 0 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Payments</h1>
          <p className="text-gray-600 mt-1">Configure payment methods and settings</p>
        </div>
        <Button className="bg-amber-600 hover:bg-amber-700 flex items-center gap-2">
          <Plus size={18} />
          Add Payment Method
        </Button>
      </div>

      {/* Payment Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div key={method.name} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-semibold text-gray-900">{method.name}</p>
                      <p className="text-sm text-gray-600">
                        {method.processed} transactions ({method.percent}%)
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-amber-600 h-2 rounded-full"
                      style={{ width: `${method.percent}%` }}
                    ></div>
                  </div>
                </div>
                <div className="ml-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    method.enabled
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {method.enabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <span className="text-gray-700 font-medium">Auto Invoice on Payment</span>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <span className="text-gray-700 font-medium">Email Receipt to Customer</span>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <span className="text-gray-700 font-medium">Require Approval for Discounts</span>
            <input type="checkbox" className="w-5 h-5" />
          </div>
        </CardContent>
      </Card>

      {/* Info Box */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <p className="text-sm text-blue-900">
            <strong>Payments:</strong> Payment gateway integration (Toyyibpay) will be implemented in Phase 7.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
