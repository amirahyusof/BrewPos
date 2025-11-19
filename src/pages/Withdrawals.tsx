import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, AlertCircle } from "lucide-react";

export default function Withdrawals() {
  const recentWithdrawals = [
    { id: 1, user: "John Manager", amount: 500, date: "Today 10:30 AM", status: "Approved" },
    { id: 2, user: "Sarah Staff", amount: 300, date: "Today 9:15 AM", status: "Approved" },
    { id: 3, user: "Mike Cashier", amount: 250, date: "Yesterday 5:00 PM", status: "Pending" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Withdrawals</h1>
          <p className="text-gray-600 mt-1">Manage staff cash withdrawals and reconciliation</p>
        </div>
        <Button className="bg-amber-600 hover:bg-amber-700 flex items-center gap-2">
          <Plus size={18} />
          New Withdrawal
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">RM 1,050.00</div>
            <p className="text-sm text-gray-600 mt-1">Total Today</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">3</div>
            <p className="text-sm text-gray-600 mt-1">Transactions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">RM 250.00</div>
            <p className="text-sm text-gray-600 mt-1">Pending Approval</p>
          </CardContent>
        </Card>
      </div>

      {/* Withdrawal List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Withdrawals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentWithdrawals.map((withdrawal) => (
              <div key={withdrawal.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div>
                  <p className="font-semibold text-gray-900">{withdrawal.user}</p>
                  <p className="text-sm text-gray-600">{withdrawal.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-gray-900">RM {withdrawal.amount}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    withdrawal.status === 'Approved'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {withdrawal.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Info Box */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <p className="text-sm text-blue-900">
            <strong>Withdrawals:</strong> Full cash management system will be implemented in Phase 8.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}