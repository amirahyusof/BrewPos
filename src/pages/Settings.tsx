import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Save } from "lucide-react";
import { useState } from "react";

export default function Settings() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Configure your BrewPOS application</p>
      </div>

      {/* Success Message */}
      {saved && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          ✅ Settings saved successfully!
        </div>
      )}

      {/* Restaurant Information */}
      <Card>
        <CardHeader>
          <CardTitle>Restaurant Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Restaurant Name</label>
              <input
                type="text"
                defaultValue="BrewPOS Coffee Shop"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location/City</label>
              <input
                type="text"
                defaultValue="Shah Alam, Selangor"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                defaultValue="+60-1-2345-6789"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                defaultValue="contact@brewpos.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Hours */}
      <Card>
        <CardHeader>
          <CardTitle>Business Hours</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
            <div key={day} className="flex items-center gap-4">
              <span className="w-24 font-medium text-gray-700">{day}</span>
              <div className="flex items-center gap-2 flex-1">
                <input
                  type="time"
                  defaultValue="08:00"
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="time"
                  defaultValue="22:00"
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Tax & Currency */}
      <Card>
        <CardHeader>
          <CardTitle>Tax & Currency Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500">
                <option>RM (Malaysian Ringgit)</option>
                <option>USD (US Dollar)</option>
                <option>SGD (Singapore Dollar)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tax Rate (%)</label>
              <input
                type="number"
                defaultValue="6"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Receipt Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Receipt Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Receipt Header</label>
            <textarea
              defaultValue="Welcome to BrewPOS"
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Receipt Footer</label>
            <textarea
              defaultValue="Thank you for your visit!"
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            ></textarea>
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" defaultChecked id="auto-print" className="w-4 h-4" />
            <label htmlFor="auto-print" className="text-gray-700">Auto-print receipts</label>
          </div>
        </CardContent>
      </Card>

      {/* User Management */}
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-semibold text-gray-900">John Manager</p>
                <p className="text-sm text-gray-600">manager@brewpos.com</p>
              </div>
              <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold">Admin</span>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-semibold text-gray-900">Sarah Barista</p>
                <p className="text-sm text-gray-600">sarah@brewpos.com</p>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">Staff</span>
            </div>
          </div>
          <Button className="mt-4 bg-amber-600 hover:bg-amber-700">Add New User</Button>
        </CardContent>
      </Card>

      {/* Backup & Data */}
      <Card>
        <CardHeader>
          <CardTitle>Backup & Data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-4 border rounded-lg">
            <p className="font-semibold text-gray-900 mb-2">Local Backup</p>
            <p className="text-sm text-gray-600 mb-3">Download all your data as backup</p>
            <Button variant="outline" className="w-full">Download Backup</Button>
          </div>
          <div className="p-4 border rounded-lg">
            <p className="font-semibold text-gray-900 mb-2">Clear All Data</p>
            <p className="text-sm text-gray-600 mb-3">Warning: This will delete all local data permanently</p>
            <Button variant="outline" className="w-full text-red-600 hover:text-red-700 border-red-300">Clear Data</Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex gap-3">
        <Button onClick={handleSave} className="bg-amber-600 hover:bg-amber-700 flex items-center gap-2">
          <Save size={18} />
          Save Settings
        </Button>
        <Button variant="outline">Cancel</Button>
      </div>

      {/* Info Box */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <p className="text-sm text-blue-900">
            <strong>Settings:</strong> Full user management and backup features will be implemented in Phase 8.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}