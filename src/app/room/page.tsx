"use client";
import { useState } from "react";

const initialData = [
    { id: 1, name: "Auditorium Utama", capacity: 300, category: "Auditorium", price: "3500000", status: "APPROVED" },
    { id: 2, name: "Hall A", capacity: 200, category: "Hall", price: "2500000", status: "PENDING" },
    { id: 3, name: "Meeting Room", capacity: 50, category: "Room", price: "1000000", status: "APPROVED" },
    { id: 4, name: "Ballroom", capacity: 500, category: "Ballroom", price: "5000000", status: "REJECTED" },
    { id: 5, name: "Conference Hall", capacity: 150, category: "Hall", price: "3000000", status: "APPROVED" },
];

const formatPrice = (value: string) => "Rp. " + Number(value).toLocaleString("id-ID");

const Table = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [tableData, setTableData] = useState(initialData);
    const [editItem, setEditItem] = useState<{
        id: number; name: string; capacity: string; category: string; price: string; status: string;
    } | null>(null);
    const [newItem, setNewItem] = useState({ name: "", capacity: "", category: "", price: "", status: "PENDING" });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const itemsPerPage = 5;

    const [sortField, setSortField] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

    const filteredData = tableData.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleSort = (field: string) => {
        const newSortDirection = sortField === field && sortDirection === "asc" ? "desc" : "asc";
        setSortField(field);
        setSortDirection(newSortDirection);

        const sortedData = [...filteredData].sort((a, b) => {
            if (typeof a[field] === "string") {
                return newSortDirection === "asc"
                    ? a[field].localeCompare(b[field])
                    : b[field].localeCompare(a[field]);
            } else {
                return newSortDirection === "asc"
                    ? a[field] - b[field]
                    : b[field] - a[field];
            }
        });

        setTableData(sortedData);
    };

    const currentItems = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const [nextId, setNextId] = useState(initialData.length + 1);

    const handleAddOrUpdateItem = () => {
        if (!newItem.name || !newItem.capacity || !newItem.category || !newItem.price) {
            alert("Semua bidang harus diisi!");
            return;
        }

        if (editItem) {
            setTableData(prevData =>
                prevData.map(item =>
                    item.id === editItem.id
                        ? { ...newItem, id: editItem.id, capacity: Number(newItem.capacity), price: newItem.price }
                        : item
                )
            );
        } else {
            setTableData(prevData => [
                ...prevData,
                { ...newItem, id: nextId, capacity: Number(newItem.capacity), price: newItem.price },
            ]);
            setNextId(prevId => prevId + 1);
        }

        setNewItem({ name: "", capacity: "", category: "", price: "", status: "PENDING" });
        setEditItem(null);
        setIsModalOpen(false);
    };

    const handleEdit = (item: { id: number; name: string; capacity: number; category: string; price: string; status: string; }) => {
        setNewItem({ ...item, capacity: item.capacity.toString(), price: item.price });
        setEditItem({ ...item, capacity: item.capacity.toString() });
        setIsModalOpen(true);
    };

    const handleDelete = (id: number) => {
        setTableData(prevData => prevData.filter(item => item.id !== id));
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
                <input type="text" placeholder="Search" className="w-80 p-2 border border-gray-300 rounded mb-4" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <button className="bg-blue-500 text-white px-3 py-2 rounded mb-4 ml-2" onClick={() => setIsModalOpen(true)}>Add</button>
                <table className="w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-200">
                            {["ID", "Name", "Capacity", "Category", "Price", "Status", "Action"].map((key) => (
                                <th
                                    key={key}
                                    className="p-3 text-left cursor-pointer"
                                    onClick={() => handleSort(key.toLowerCase())}
                                >
                                    {key}
                                    {sortField === key.toLowerCase() && (
                                        <span>{sortDirection === "asc" ? " ↑" : " ↓"}</span>
                                    )}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map(item => (
                            <tr key={item.id} className="border-t border-gray-200">
                                <td className="p-3">{item.id}</td>
                                <td className="p-3">{item.name}</td>
                                <td className="p-3">{item.capacity}</td>
                                <td className="p-3">{item.category}</td>
                                <td className="p-3">{formatPrice(item.price)}</td>
                                <td className={`p-3 font-bold ${item.status === "APPROVED" ? "text-green-500" : item.status === "PENDING" ? "text-yellow-500" : "text-red-500"}`}>{item.status}</td>
                                <td className="p-3 space-x-2">
                                    <button className="bg-green-500 text-white px-3 py-1 rounded" onClick={() => handleEdit(item)}>Edit</button>
                                    <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDelete(item.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-between items-center mt-4">
                    <button className="px-3 py-1 border rounded" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>Previous</button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button className="px-3 py-1 border rounded" disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-bold mb-4">{editItem ? "Edit Item" : "Add New Item"}</h2>
                        <input type="text" placeholder="Name" className="w-full p-2 border mb-2" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} />
                        <input type="number" placeholder="Capacity" className="w-full p-2 border mb-2" value={newItem.capacity} onChange={(e) => setNewItem({ ...newItem, capacity: e.target.value })} />
                        <input type="text" placeholder="Category" className="w-full p-2 border mb-2" value={newItem.category} onChange={(e) => setNewItem({ ...newItem, category: e.target.value })} />
                        <input type="number" placeholder="Price" className="w-full p-2 border mb-4" value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} />
                        <select className="w-full p-2 border mb-4" value={newItem.status} onChange={(e) => setNewItem({ ...newItem, status: e.target.value })}>
                            <option value="PENDING">PENDING</option>
                            <option value="APPROVED">APPROVED</option>
                            <option value="REJECTED">REJECTED</option>
                        </select>
                        <div className="flex justify-end space-x-2">
                            <button className="bg-gray-400 px-3 py-2 rounded" onClick={() => setIsModalOpen(false)}>Cancel</button>
                            <button className="bg-blue-500 text-white px-3 py-2 rounded" onClick={handleAddOrUpdateItem}>Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Table;
