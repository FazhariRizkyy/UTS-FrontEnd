"use client";
import { useState } from "react";

const data = [
    { id: 1, name: "Auditorium Utama", capacity: 300, category: "Auditorium", price: "Rp. 3.500.000", status: "APPROVED" },
    { id: 2, name: "Hall A", capacity: 200, category: "Hall", price: "Rp. 2.500.000", status: "PENDING" },
    { id: 3, name: "Meeting Room", capacity: 50, category: "Room", price: "Rp. 1.000.000", status: "APPROVED" },
    { id: 4, name: "Ballroom", capacity: 500, category: "Ballroom", price: "Rp. 5.000.000", status: "REJECTED" },
    { id: 5, name: "Conference Hall", capacity: 150, category: "Hall", price: "Rp. 3.000.000", status: "APPROVED" },
    { id: 6, name: "Small Hall", capacity: 100, category: "Hall", price: "Rp. 1.500.000", status: "PENDING" },
    { id: 7, name: "Ruang Serbaguna", capacity: 80, category: "Room", price: "Rp. 1.200.000", status: "APPROVED" },
    { id: 8, name: "Ruang Rapat VIP", capacity: 20, category: "Room", price: "Rp. 800.000", status: "REJECTED" },
    { id: 9, name: "Outdoor Area", capacity: 400, category: "Outdoor", price: "Rp. 4.000.000", status: "PENDING" },
    { id: 10, name: "Ruang Presentasi", capacity: 30, category: "Room", price: "Rp. 600.000", status: "APPROVED" },
    { id: 11, name: "Hall B", capacity: 250, category: "Hall", price: "Rp. 3.200.000", status: "APPROVED" },
    { id: 12, name: "Ruang Kelas", capacity: 40, category: "Room", price: "Rp. 900.000", status: "PENDING" },
    { id: 13, name: "Ruang Pameran", capacity: 350, category: "Exhibition", price: "Rp. 4.500.000", status: "REJECTED" },
    { id: 14, name: "Ruang Diskusi", capacity: 60, category: "Room", price: "Rp. 1.100.000", status: "APPROVED" },
    { id: 15, name: "Ruang Latihan", capacity: 90, category: "Room", price: "Rp. 1.300.000", status: "PENDING" },
    { id: 16, name: "Ruang Konferensi", capacity: 120, category: "Hall", price: "Rp. 2.800.000", status: "APPROVED" },
    { id: 17, name: "Ruang Makan", capacity: 150, category: "Dining", price: "Rp. 2.000.000", status: "REJECTED" },
    { id: 18, name: "Ruang Kreatif", capacity: 70, category: "Room", price: "Rp. 1.400.000", status: "PENDING" },
    { id: 19, name: "Ruang Pertemuan", capacity: 110, category: "Room", price: "Rp. 1.800.000", status: "APPROVED" },
    { id: 20, name: "Ruang Serbaguna 2", capacity: 90, category: "Room", price: "Rp. 1.700.000", status: "PENDING" }
];

const Table = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState<{ key: keyof typeof data[0]; direction: 'ascending' | 'descending' }>({ key: 'id', direction: 'ascending' });
    const itemsPerPage = 5;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedData = [...filteredData].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);

    const requestSort = (key: keyof typeof data[0]) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };
    
    return (
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
                <input
                    type="text"
                    placeholder="Type for search then enter"
                    className="w-80 p-2 border border-gray-300 rounded mb-4"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded ml-107">Add New</button>
                <table className="w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-3 text-left cursor-pointer" onClick={() => requestSort('id')}>NO</th>
                            <th className="p-3 text-left cursor-pointer" onClick={() => requestSort('name')}>NAME</th>
                            <th className="p-3 text-left cursor-pointer" onClick={() => requestSort('capacity')}>CAPACITY</th>
                            <th className="p-3 text-left cursor-pointer" onClick={() => requestSort('category')}>CATEGORY</th>
                            <th className="p-3 text-center cursor-pointer" onClick={() => requestSort('price')}>PRICE</th>
                            <th className="p-3 text-center cursor-pointer" onClick={() => requestSort('status')}>STATUS</th>
                            <th className="p-3 text-center">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item, index) => (
                            <tr key={item.id} className="border-t border-gray-200">
                                <td className="p-3">{index + 1 + indexOfFirstItem}</td>
                                <td className="p-3">{item.name}</td>
                                <td className="p-3">{item.capacity}</td>
                                <td className="p-3">{item.category}</td>
                                <td className="p-3">{item.price}</td>
                                <td className={`p-3 font-bold ${item.status === "APPROVED" ? "text-green-500" : item.status === "PENDING" ? "text-yellow-500" : "text-red-500"}`}>{item.status}</td>
                                <td className="p-3 space-x-2">
                                    <button className="bg-green-500 text-white px-3 py-1 rounded">Approve</button>
                                    <button className="bg-orange-500 text-white px-3 py-1 rounded">Reject</button>
                                    <button className="bg-yellow-500 text-white px-3 py-1 rounded">EDIT</button>
                                    <button className="bg-red-500 text-white px-3 py-1 rounded">HAPUS</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-between items-center mt-4">
                    <button
                        className={`px-3 py-1 border rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "bg-gray-300"}`}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button
                        className={`px-3 py-1 border rounded ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "bg-gray-300"}`}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Table;