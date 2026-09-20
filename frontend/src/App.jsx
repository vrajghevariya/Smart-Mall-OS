import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Stores from './pages/Stores';
import StoreDetails from './pages/StoreDetails';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import OrderDetails from './pages/OrderDetails';
import Wishlist from './pages/Wishlist';
import Offers from './pages/Offers';
import MallMap from './pages/MallMap';
import Parking from './pages/Parking';
import Assistant from './pages/Assistant';
import Profile from './pages/Profile';
import VoiceShopping from './pages/VoiceShopping';
import ScanAndGo from './pages/ScanAndGo';
import CrowdHeatmap from './pages/CrowdHeatmap';
import QueuePrediction from './pages/QueuePrediction';
import PriceCompare from './pages/PriceCompare';
import SmartTrolley from './pages/SmartTrolley';
import Emergency from './pages/Emergency';
import LostChild from './pages/LostChild';
import DigitalReceipt from './pages/DigitalReceipt';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AdminStores from './pages/admin/AdminStores';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';
import AdminInventory from './pages/admin/AdminInventory';

function ScrollToTop() {
  const { pathname } = useLocation();
  window.scrollTo(0, 0);
  return null;
}

export default function App() {
  const location = useLocation();
  const isAuthPage = ['/login', '/register'].includes(location.pathname);
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      {!isAuthPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/stores" element={<Stores />} />
        <Route path="/stores/:id" element={<StoreDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/mall-map" element={<MallMap />} />
        <Route path="/parking" element={<Parking />} />
        <Route path="/assistant" element={<Assistant />} />
        <Route path="/profile" element={<Profile />} />
        {/* NEW Smart Feature Routes */}
        <Route path="/voice-shopping" element={<VoiceShopping />} />
        <Route path="/scan-go" element={<ScanAndGo />} />
        <Route path="/crowd-heatmap" element={<CrowdHeatmap />} />
        <Route path="/queue-prediction" element={<QueuePrediction />} />
        <Route path="/price-compare" element={<PriceCompare />} />
        <Route path="/smart-trolley" element={<SmartTrolley />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/lost-child" element={<LostChild />} />
        <Route path="/receipt/:id" element={<DigitalReceipt />} />
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="stores" element={<AdminStores />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="inventory" element={<AdminInventory />} />
        </Route>
      </Routes>
      {!isAuthPage && !isAdminPage && <Footer />}
    </>
  );
}
