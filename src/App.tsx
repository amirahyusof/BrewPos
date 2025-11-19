// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { NavContextProvider } from '@/context/NavContext';
import MainLayout from '@/components/MainLayout';

// Pages
import Dashboard from '@/pages/Dashboard';
import POSScreen from '@/pages/orders/POSScreen';
import OrderHistory from '@/pages/orders/OrderHistory';
import Orders from '@/pages/Orders';
import NewOrder from '@/pages/orders/NewOrder';
import Products from '@/pages/Products';
import ProductList from '@/pages/products/ProductList';
import ProductAdd from '@/pages/products/ProductAdd';
import ProductEdit from '@/pages/products/ProductEdit';
import Categories from '@/pages/products/Categories';
import Analytics from '@/pages/Analytics';
import Withdrawals from '@/pages/Withdrawals';
import Payments from '@/pages/Payments';
import Settings from '@/pages/Settings';

function App() {
  return (
    <Router>
      <NavContextProvider>
        <Routes>
          {/* Main Layout Routes */}
          <Route element={<MainLayout />}>
            {/* Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Orders */}
            <Route path="/orders" element={<Orders />} />
            <Route path="/order/pos" element={<POSScreen />} />
            <Route path="/order/history" element={<OrderHistory />} />
            <Route path="/order/new" element={<NewOrder />} />

            {/* Products */}
            <Route path="/products" element={<Products />} />
            <Route path="/products/list" element={<ProductList />} />
            <Route path="/products/add" element={<ProductAdd />} />
            <Route path="/products/edit" element={<ProductEdit />} />
            <Route path="/products/categories" element={<Categories />} />

            {/* Other Pages */}
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/withdrawals" element={<Withdrawals />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* 404 catch-all */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </NavContextProvider>
    </Router>
  );
}

export default App;
