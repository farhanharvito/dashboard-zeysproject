import { Route, Routes } from 'react-router-dom';
// import ProtectedRoute from './ProtectedRoute';
import CheckAuth from './CheckAuth';
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../pages/dashboard/Dashboard';
import SignIn from '../pages/signin/SignIn';
import Student from '../pages/student/Student';
import UnderConstruction from '../components/UnderConstruction';
import Course from '../pages/course/Course';
import Payment from '../pages/payment/Payment';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CheckAuth />} />
      <Route path="*" element={<UnderConstruction />} />
      <Route
        path="signin"
        element={
          <CheckAuth>
            <SignIn />
          </CheckAuth>
        }
      />
      <Route
        path="admin/*"
        element={
          // <ProtectedRoute>
          <AdminLayout />
          // </ProtectedRoute>
        }
      >
        <Route path="*" element={<UnderConstruction />} />
        <Route path="course" element={<Course />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="students" element={<Student />} />
        <Route path="payment" element={<Payment />} />
        <Route path="report" element={<UnderConstruction />} />
        <Route path="settings" element={<UnderConstruction />} />
      </Route>
    </Routes>
  );
};
