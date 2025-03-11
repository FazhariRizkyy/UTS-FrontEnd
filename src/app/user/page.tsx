'use client';

import { useState } from 'react';

const initialData = [
    { id: 1, name: 'Haisyam Maulana', email: 'haisyammaulana22@gmail.com' },
    { id: 2, name: 'Hendra', email: 'hendra@gmail.com' },
    { id: 3, name: 'Dikry', email: 'dickrynurohman@gmail.com' },
    { id: 4, name: 'Hendra1', email: 'hendra1@gmail.com' },
    { id: 5, name: 'Addin', email: 'addin@gmail.com' },
    { id: 6, name: 'Maulana', email: 'maulana@gmail.com' },
    { id: 7, name: 'abcd', email: 'abcd@gmail.com' },
    { id: 8, name: 'abcde@gmail.com', email: 'abcde@gmail.com' },
    { id: 9, name: 'abcdefg', email: 'abcdefg@gmail.com' },
    { id: 10, name: 'addin12', email: 'addin12@gmail.com' },
    { id: 11, name: 'Rina', email: 'rina@gmail.com' },
    { id: 12, name: 'Budi', email: 'budi@gmail.com' },
    { id: 13, name: 'Siti', email: 'siti@gmail.com' },
    { id: 14, name: 'Joko', email: 'joko@gmail.com' },
    { id: 15, name: 'Tina', email: 'tina@gmail.com' },
    { id: 16, name: 'Fajar', email: 'fajar@gmail.com' },
    { id: 17, name: 'Dewi', email: 'dewi@gmail.com' },
    { id: 18, name: 'Rudi', email: 'rudi@gmail.com' },
    { id: 19, name: 'Lina', email: 'lina@gmail.com' },
    { id: 20, name: 'Eko', email: 'eko@gmail.com' },
];

export default function DashboardTable() {
    const [data] = useState(initialData);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [sortConfig, setSortConfig] = useState<{ key: keyof typeof initialData[0]; direction: 'ascending' | 'descending' }>({ key: 'name', direction: 'ascending' });
    const itemsPerPage = 5;

    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase())
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
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">Add New</button>
                </div>
                <table className="w-full border-collapse bg-white">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2 text-left cursor-pointer" onClick={() => requestSort('id')}>NO</th>
                            <th className="p-2 text-left cursor-pointer" onClick={() => requestSort('name')}>NAME</th>
                            <th className="p-2 text-left cursor-pointer" onClick={() => requestSort('email')}>EMAIL</th>
                            <th className="p-2 text-center">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((item, index) => (
                            <tr key={item.id} className="border-t">
                                <td className="p-2">{index + 1 + (page - 1) * itemsPerPage}</td>
                                <td className="p-2">{item.name}</td>
                                <td className="p-2">{item.email}</td>
                                <td className="p-2">
                                    <button className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">EDIT</button>
                                    <button className="bg-red-600 text-white px-3 py-1 rounded">HAPUS</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-between items-center mt-4">
                    <span>Showing {itemsPerPage * (page - 1) + 1} to {Math.min(page * itemsPerPage, sortedData.length)} of {sortedData.length} results</span>
                    <div className="flex space-x-2">
                        <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-3 py-1 border rounded disabled:opacity-50">{'<'}</button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button key={i} onClick={() => setPage(i + 1)} className={`px-3 py-1 border rounded ${page === i + 1 ? 'bg-blue-500 text-white' : ''}`}>{i + 1}</button>
                        ))}
                        <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="px-3 py-1 border rounded disabled:opacity-50">{'>'}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}