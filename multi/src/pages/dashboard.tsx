import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";

const DashboardPage = () => {
  const { user } = useAuth();
    return (
      <ProtectedRoute>
        <div className="flex py-2 container mx-auto">
          <div className="text-gray-600 px-12 py-24 mt-24 overflow-y-hidden mx-auto">
            <h2 className="text-2xl font-semibold">You are logged in!</h2>
            <h2 className="text-2xl font-semibold">Email: {user.email}</h2>
            <h2 className="text-2xl font-semibold">Name: {user.displayName}</h2>
            <h2 className="text-2xl font-semibold">Tenant: {user.tenantId || "Customer Pool"}</h2>
          </div>
        </div>
       </ProtectedRoute>
    );
  };
  
  export default DashboardPage;