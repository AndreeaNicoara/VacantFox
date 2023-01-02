import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from 'store/auth/provider';

export default function RequireAuth(props) {
   const auth = useAuth();
   const location = useLocation();

   if (!auth.user) {
      return <Navigate to='/signin' state={{ from: location }} replace />;
   }

   return <Outlet />;
}
