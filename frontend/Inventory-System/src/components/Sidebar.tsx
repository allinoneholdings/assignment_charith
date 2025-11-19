import React, { useState, type JSX } from "react";
import { MdDashboard, MdInventory, MdReport, MdShoppingCart } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/UseAuth.ts";

interface SidebarItem {
  id: string;
  label: string;
  icon: JSX.Element;
}

const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>("dashboard");
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId);
    if (itemId === "dashboard") navigate(`/dashboard`);
    else navigate(`/dashboard/${itemId}`);
  };

  const sidebarItems: SidebarItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <MdDashboard className="w-5 h-5" />,
    },
    {
      id: "items",
      label: "Items",
      icon: <MdInventory className="w-5 h-5" />,
    },
    {
      id: "sales",
      label: "Sales",
      icon: <MdShoppingCart className="w-5 h-5" />,
    },
    ...(user?.role === "Admin"
        ? [
          {
            id: "reports",
            label: "Reports",
            icon: <MdReport className="w-5 h-5" />,
          },
        ]
        : []),
  ];

  return (
      <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-center py-4">
            {user?.role === "Admin" ? "Admin Panel" : "Cashier Panel"}
          </h1>
        </div>

        <nav>
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
                <li key={item.id}>
                  <button
                      onClick={() => handleItemClick(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 text-left ${
                          activeItem === item.id
                              ? "bg-indigo-600 text-white"
                              : "text-gray-300 hover:bg-gray-800 hover:text-white"
                      }`}
                  >
                    <span>{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
            ))}
          </ul>
        </nav>
      </div>
  );
};

export default Sidebar;