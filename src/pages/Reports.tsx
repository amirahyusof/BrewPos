// src/pages/Reports.tsx
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Sale {
  id: string;
  date: string;
  itemName: string;
  qty: number;
  price: number;
  total: number;
}

export default function Reports() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchSales = async () => {
      const snap = await getDocs(collection(db, "sales"));
      const data: Sale[] = snap.docs.map((doc) => {
        const d = doc.data() as Partial<Sale>;
        return {
          id: doc.id,
          date: d.date ?? "",
          itemName: d.itemName ?? "",
          qty: d.qty ?? 0,
          price: d.price ?? 0,
          total: d.total ?? ((d.qty ?? 0) * (d.price ?? 0)),
        };
      });
      setSales(data);

      const sum = data.reduce((acc, sale) => acc + (sale.total || 0), 0);
      setTotal(sum);
    };

    fetchSales();
  }, []);

  const handleExportCSV = () => {
    const headers = ["Date", "Item", "Qty", "Price", "Total"];
    const rows = sales.map((s) =>
      [s.date, s.itemName, s.qty, s.price, s.total].join(",")
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "sales_report.csv";
    link.click();
  };

  return (
    <div className="p-6 space-y-4">
      <Card className="shadow-md border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Sales Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-2">
            Total Sales: <span className="font-bold text-emerald-600">RM {total.toFixed(2)}</span>
          </p>
          <Button onClick={handleExportCSV}>Export CSV</Button>
        </CardContent>
      </Card>

      <Card className="shadow-sm border border-gray-100">
        <CardHeader>
          <CardTitle>Sales Details</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Date</th>
                <th className="text-left p-2">Item</th>
                <th className="text-right p-2">Qty</th>
                <th className="text-right p-2">Price</th>
                <th className="text-right p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((s) => (
                <tr key={s.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{s.date}</td>
                  <td className="p-2">{s.itemName}</td>
                  <td className="p-2 text-right">{s.qty}</td>
                  <td className="p-2 text-right">{s.price}</td>
                  <td className="p-2 text-right">{s.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
