"use client";

import { useState } from 'react';

const initialData = [
    { id: 1, room: 'Room 101', bookingDate: '2023-10-01', bookedBy: 'Haisyam Maulana', price: 100 },
    { id: 2, room: 'Room 102', bookingDate: '2023-10-02', bookedBy: 'Hendra', price: 150 },
    { id: 3, room: 'Room 103', bookingDate: '2023-10-03', bookedBy: 'Dikry', price: 200 },
    { id: 4, room: 'Room 104', bookingDate: '2023-10-04', bookedBy: 'Hendra1', price: 250 },
    { id: 5, room: 'Room 105', bookingDate: '2023-10-05', bookedBy: 'Addin', price: 300 },
    { id: 6, room: 'Room 106', bookingDate: '2023-10-06', bookedBy: 'Maulana', price: 350 },
    { id: 7, room: 'Room 107', bookingDate: '2023-10-07', bookedBy: 'abcd', price: 400 },
    { id: 8, room: 'Room 108', bookingDate: '2023-10-08', bookedBy: 'abcde@gmail.com', price: 450 },
    { id: 9, room: 'Room 109', bookingDate: '2023-10-09', bookedBy: 'abcdefg', price: 500 },
    { id: 10, room: 'Room 110', bookingDate: '2023-10-10', bookedBy: 'addin12', price: 550 },
];

export default function DashboardTable() {
    const [data, setData] = useState(initialData);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [sortConfig, setSortConfig] = useState<{ key: keyof typeof initialData[0]; direction: 'ascending' | 'descending' }>({ key: 'room', direction: 'ascending' });
    const [newBooking, setNewBooking] = useState({ room: '', bookingDate: '', bookedBy: '', price: '' });
    const [editBooking, setEditBooking] = useState<typeof initialData[0] | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const itemsPerPage = 5;

    const filteredData = data.filter((item) =>
        item.room.toLowerCase().includes(search.toLowerCase()) ||
        item.bookedBy.toLowerCase().includes(search.toLowerCase())
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

    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    const paginatedData = sortedData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    const requestSort = (key: keyof typeof initialData[0]) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const handleAddOrUpdateBooking = () => {
        if (!newBooking.room || !newBooking.bookingDate || !newBooking.bookedBy || !newBooking.price) {
            alert("Semua bidang harus diisi!");
            return;
        }

        if (editBooking) {
            setData(prevData => prevData.map(item =>
                item.id === editBooking.id ? { ...newBooking, id: editBooking.id, price: Number(newBooking.price) } : item
            ));
        } else {
            setData(prevData => [...prevData, { ...newBooking, id: data.length + 1, price: Number(newBooking.price) }]);
        }

        setNewBooking({ room: '', bookingDate: '', bookedBy: '', price: '' });
        setEditBooking(null);
        setIsModalOpen(false);
    };

    const handleEdit = (item) => {
        setNewBooking({ room: item.room, bookingDate: item.bookingDate, bookedBy: item.bookedBy, price: item.price });
        setEditBooking(item);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        setData(prevData => prevData.filter(item => item.id !== id));
    };

    const openAddModal = () => {
        setNewBooking({ room: '', bookingDate: '', bookedBy: '', price: '' });
        setEditBooking(null);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setNewBooking({ room: '', bookingDate: '', bookedBy: '', price: '' });
        setEditBooking(null);
        setIsModalOpen(false);
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(prevPage => prevPage - 1);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
            <div className="bg-white p-4 rounded-lg shadow w-3/4 mt-2">
                <div className="flex justify-between mb-4">
                    <input
                        type="text"
                        placeholder="Type for search then enter"
                        className="p-2 border rounded-md w-1/3"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={openAddModal}>Add New</button>
                </div>
                <table className="w-full border-collapse bg-white">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2 text-left cursor-pointer" onClick={() => requestSort('id')}>NO</th>
                            <th className="p-2 text-left cursor-pointer" onClick={() => requestSort('room')}>ROOM</th>
                            <th className="p-2 text-left cursor-pointer" onClick={() => requestSort('bookingDate')}>BOOKING DATE</th>
                            <th className="p-2 text-left cursor-pointer" onClick={() => requestSort('bookedBy')}>BOOKED BY</th>
                            <th className="p-2 text-left cursor-pointer" onClick={() => requestSort('price')}>PRICE</th>
                            <th className="p-2 text-center">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((item, index) => (
                            <tr key={item.id} className="border-t">
                                <td className="p-2">{index + 1 + (page - 1) * itemsPerPage}</td>
                                <td className="p-2">{item.room}</td>
                                <td className="p-2">{item.bookingDate}</td>
                                <td className="p-2">{item.bookedBy}</td>
                                <td className="p-2">{item.price}</td>
                                <td className="p-2">
                                    <button className="bg-yellow-500 text-white px-3 py-1 rounded mr-2" onClick={() => handleEdit(item)}>EDIT</button>
                                    <button className="bg-red-600 text-white px-3 py-1 rounded" onClick={() => handleDelete(item.id)}>HAPUS</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-between mt-4">
                    <button onClick={handlePreviousPage} disabled={page === 1} className="bg-gray-300 text-gray-700 px-4 py-2 rounded" >Previous</button>
                    <span>Page {page} of {totalPages}</span>
                    <button onClick={handleNextPage} disabled={page === totalPages} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">Next</button>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-bold mb-4">{editBooking ? "Edit Booking" : "Add New Booking"}</h2>
                        <input type="text" placeholder="Room" className="w-full p-2 border mb-2" value={newBooking.room} onChange={(e) => setNewBooking({ ...newBooking, room: e.target.value })} />
                        <input type="date" className="w-full p-2 border mb-2" value={newBooking.bookingDate} onChange={(e) => setNewBooking({ ...newBooking, bookingDate: e.target.value })} />
                        <input type="text" placeholder="Booked By" className="w-full p-2 border mb-2" value={newBooking.bookedBy} onChange={(e) => setNewBooking({ ...newBooking, bookedBy: e.target.value })} />
                        <input type="number" placeholder="Price" className="w-full p-2 border mb-4" value={newBooking.price} onChange={(e) => setNewBooking({ ...newBooking, price: e.target.value })} />
                        <button className="bg-green-500 text-white px-4 py-2 rounded mr-2" onClick={handleAddOrUpdateBooking}>Save</button>
                        <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}