import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Analytics() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
      <p className="text-gray-600 mt-1">Sales analytics and business insights</p>

      <Card>
        <CardHeader>
          <CardTitle>Sales Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Analytics dashboard content coming soon...</p>
          <p className="text-sm text-gray-500 mt-2">Issue #8: Analytics Dashboard</p>
        </CardContent>
      </Card>
    </div>
  );
}