import { Route, Routes } from 'react-router-dom';
// import ProtectedRoute from './ProtectedRoute';
// import CheckAuth from './CheckAuth';
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../pages/dashboard/Dashboard';
import SignIn from '../pages/signin/SignIn';
import UnderConstruction from '../components/UnderConstruction';
import Product from '../pages/product/Product';
import User from '../pages/user/User';
import Category from '../pages/category/Category';
import Campaign from '../pages/campaign/Campaign';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" />
      <Route path="*" element={<UnderConstruction />} />
      <Route path="login" element={<SignIn />} />
      <Route
        path="admin/*"
        element={
          // <ProtectedRoute>
          <AdminLayout />
          // </ProtectedRoute>
        }
      >
        <Route path="*" element={<UnderConstruction />} />
        <Route path="product" element={<Product />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="user" element={<User />} />
        <Route path="category" element={<Category />} />
        <Route path="campaign" element={<Campaign />} />
      </Route>
    </Routes>
  );
};
