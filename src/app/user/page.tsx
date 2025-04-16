"use client";

import { useState } from "react";

const initialData = [
    { id: 1, name: "Haisyam Maulana", email: "haisyammaulana22@gmail.com" },
    { id: 2, name: "Hendra", email: "hendra@gmail.com" },
    { id: 3, name: "Dikry", email: "dickrynurohman@gmail.com" },
    { id: 4, name: "Hendra1", email: "hendra1@gmail.com" },
    { id: 5, name: "Addin", email: "addin@gmail.com" },
];

const UserTable = () => {
    const [users, setUsers] = useState(initialData);
    const [newUser, setNewUser] = useState({ name: "", email: "" });
    const [editUser, setEditUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [nextId, setNextId] = useState(initialData.length + 1);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' }); // New state for sorting
    const itemsPerPage = 5; // Items per page

    // Sorting function
    const sortedUsers = [...users].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const filteredUsers = sortedUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const displayedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleAddOrUpdateUser = () => {
        if (!newUser.name || !newUser.email) {
            alert("Semua bidang harus diisi!");
            return;
        }

        if (editUser) {
            setUsers(prevUsers => prevUsers.map(user =>
                user.id === editUser.id ? { ...newUser, id: editUser.id } : user
            ));
        } else {
            setUsers(prevUsers => [...prevUsers, { ...newUser, id: nextId }]);
            setNextId(prevId => prevId + 1);
        }

        setNewUser({ name: "", email: "" });
        setEditUser(null);
        setIsModalOpen(false);
    };

    const handleEdit = (user) => {
        setNewUser({ name: user.name, email: user.email });
        setEditUser(user);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
    };

    // Function to handle sorting
    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
                <div className="flex justify-between mb-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border p-2 rounded"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="bg-blue-500 text-white px-3 py-2 rounded" onClick={() => setIsModalOpen(true)}>Add User</button>
                </div>
                <table className="w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-3 text-left cursor-pointer" onClick={() => requestSort('id')}>
                                ID {sortConfig.key === 'id' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : null}
                            </th>
                            <th className="p-3 text-left cursor-pointer" onClick={() => requestSort('name')}>
                                Name {sortConfig.key === 'name' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : null}
                            </th>
                            <th className="p-3 text-left cursor-pointer" onClick={() => requestSort('email')}>
                                Email {sortConfig.key === 'email' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : null}
                            </th>
                            <th className="p-3 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedUsers.map(user => (
                            <tr key={user.id} className="border-t border-gray-200">
                                <td className="p-3">{user.id}</td>
                                <td className="p-3">{user.name}</td>
                                <td className="p-3">{user.email}</td>
                                <td className="p-3 space-x-2">
                                    <button className="bg-green-500 text-white px-3 py-1 rounded" onClick={() => handleEdit(user)}>Edit</button>
                                    <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDelete(user.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-center mt-4 space-x-2">
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            className={`px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                            onClick={() => setCurrentPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-bold mb-4">{editUser ? "Edit User" : "Add New User"}</h2>
                        <input type="text" placeholder="Name" className="w-full p-2 border mb-2" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
                        <input type="email" placeholder="Email" className="w-full p-2 border mb-4" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
                        <div className="flex justify-end space-x-2">
                            <button className="bg-gray-400 px-3 py-2 rounded" onClick={() => setIsModalOpen(false)}>Cancel</button>
                            <button className="bg-blue-500 text-white px-3 py-2 rounded" onClick={handleAddOrUpdateUser}>Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserTable;