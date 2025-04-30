'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        if (name && email && password) {
            // Simulasi register
            router.push('/login');
        } else {
            alert('Please fill in all fields');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 px-4">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
                <h1 className="text-3xl font-bold text-center mb-2 text-green-700">Join Us!</h1>
                <p className="text-center text-sm text-gray-500 mb-6">
                    Create your account to get started
                </p>
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 transition-colors duration-300 mt-2"
                    >
                        Register
                    </button>
                </form>
                <p className="text-sm text-center text-gray-500 mt-6">
                    Already have an account?{' '}
                    <a href="/login" className="text-green-600 hover:underline font-medium">
                        Login here
                    </a>
                </p>
                <p className="text-xs text-center text-gray-400 mt-6">
                    © FAZHARI BAKTI SEJAHTERA. All rights reserved.
                </p>
            </div>
        </div>
    );
}