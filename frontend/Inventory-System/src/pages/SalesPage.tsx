import React, { useState } from "react";
import Dialog from "../components/Dialog";
import { CircleLoader } from "react-spinners";
import { MdAdd } from "react-icons/md";
import toast from "react-hot-toast";
import salesService from "../services/salesService";
import SaleForm from "../components/forms/SalesForm.tsx";

const SalesPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handlePrintBill = async (saleItems: { item: string; quantity: number }[]) => {
        try {
            setIsLoading(true);

            // Create sale through service
            const sale = await salesService.createSale({ items: saleItems });

            // Open PDF bill
            const pdfUrl = salesService.getBillUrl(sale._id);
            const link = document.createElement("a");
            link.href = pdfUrl;
            link.target = "_blank";
            link.download = `Sale-${sale._id}.pdf`;
            link.click();

            toast.success("Bill generated successfully!");
            setIsDialogOpen(false);
        } catch (err: any) {
            toast.error(err?.message || "Something went wrong!");
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <CircleLoader color="#4F46E5" size={80} />
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Sales</h1>
                    <button
                        onClick={() => setIsDialogOpen(true)}
                        className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                    >
                        <MdAdd className="w-5 h-5" />
                        <span>New Sale</span>
                    </button>
                </div>

                <Dialog
                    isOpen={isDialogOpen}
                    onCancel={() => setIsDialogOpen(false)}
                    onConfirm={() => {}}
                    title="Create New Sale"
                >
                    <SaleForm onPrintBill={handlePrintBill} />
                </Dialog>
            </div>
        </div>
    );
};

export default SalesPage;