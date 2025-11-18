import { createBrowserRouter } from "react-router-dom"
import Login from "./pages/LoginPage.tsx";
import AdminRoutes from "./pages/AdminRoutes.tsx";
import Layout from "./pages/Layout.tsx";
import Signup from "./pages/SignUpPage.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import ItemsPage from "./pages/ItemPage.tsx";
import SalesPage from "./pages/SalesPage.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "/", element: <Login /> },
            { path: "/login", element: <Login /> },
            { path: "/signup", element: <Signup /> },
            {
                element: <AdminRoutes />,
                children: [
                    { path: "/dashboard", element: <Dashboard /> },
                    { path: "/dashboard/items", element: <ItemsPage /> },
                    { path: "/dashboard/sales", element: <SalesPage /> },
                ],
            },
        ],
    },
])

export default router
