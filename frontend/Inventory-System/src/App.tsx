import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import Login from "./pages/Auth/Login.tsx";
import SignUp from "./pages/Auth/SignUp.tsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.tsx";
import AdminManageItem from "./pages/Admin/AdminManageItem.tsx";
import AdminStockPage from "./pages/Admin/AdminStockPage.tsx";
import CashierDashboard from "./pages/Cashier/CashierDashboard.tsx";
import Order from "./pages/Cashier/Order.tsx";

const App = () => {
    return (
        <div>
           <Router>
               <Routes>
                   // Auth Routes
                   <Route path="/login" element={<Login />}/>
                   <Route path="/signUp" element={<SignUp/>}/>

                   // Admin Routes
                   <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
                   <Route path="/admin-manage-items" element={<AdminManageItem/>}/>
                   <Route path="/admin-manage-stock" element={<AdminStockPage/>}/>

                   //Cashier Routes
                   <Route path={"/cashier-dashboard"} element={<CashierDashboard/>} />
                   <Route path={"/cashier-order"} element={<Order/>} />

               </Routes>
           </Router>
        </div>
    );
};

export default App;