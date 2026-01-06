import { Outlet } from "react-router-dom";
import AdminLayoutWrapper from "../components/admin/AdminLayout";

const AdminLayout = () => (
    <AdminLayoutWrapper>
        <Outlet />
    </AdminLayoutWrapper>
);

export default AdminLayout;
