'use client';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

export default function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);

    const toggleAccountDropdown = () => {
        setIsAccountDropdownOpen(!isAccountDropdownOpen);
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo di Kiri */}
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0">
                            <Image
                                src="/next.svg" // Ganti dengan path logo Anda
                                alt="Logo"
                                className="h-25 w-25" // Sesuaikan ukuran logo
                                width={32} // Sesuaikan lebar
                                height={32} // Sesuaikan tinggi
                            />
                        </Link>
                    </div>

                    {/* Menu Utama di Tengah */}
                    <div className="hidden md:block flex-grow text-center">
                        <div className="ml-10 flex items-baseline justify-center space-x-4">
                            {/* Menu Utama */}
                            <Link href="/dashboard" className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                Dashboard
                            </Link>
                            <Link href="/room" className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                Room Management
                            </Link>
                            <Link href="/user" className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                User Management
                            </Link>
                            <Link href="/booking" className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                Booking
                            </Link>
                            {/* Dropdown untuk Transaction */}
                        </div>
                    </div>

                    {/* Dropdown Account (Rata Kanan) */}
                    <div className="flex items-center">
                        <div className="relative">
                            <button
                                onClick={toggleAccountDropdown}
                                className="flex items-center text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none"
                            >
                                <Image
                                    src="globe.svg"
                                    alt="Profile"
                                    className="w-8 h-8 rounded-full mr-2"
                                    width={55}
                                    height={55}
                                />
                                <span>Account</span>
                            </button>
                            {isAccountDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Profile
                                    </Link>
                                    <Link href="/change-password" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Change Password
                                    </Link>
                                    <Link href="/logout" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                                        Log Out
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}