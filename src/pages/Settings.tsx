export default function Settings() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
      <p className="text-gray-600 mt-1">Configure your BrewPOS application</p>

      <div className="space-y-3">
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">General Settings</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Restaurant Information</li>
            <li>• Business Hours</li>
            <li>• Currency & Tax Settings</li>
          </ul>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">User Management</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• User Accounts</li>
            <li>• Roles & Permissions</li>
            <li>• Security Settings</li>
          </ul>
        </div>
      </div>

      <p className="text-sm text-gray-500">Issue #20: Settings & Configuration</p>
    </div>
  );
}