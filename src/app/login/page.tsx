'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
    
        try {
            const response = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    password,
                    expiresInMins: 30,
                }),
                credentials: 'include'
            });
    
            const data = await response.json();
    
            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(data));
                localStorage.setItem('accessToken', data.accessToken); // typo kamu sebelumnya: `accesTokern`
                router.push('/dashboard');
            } else {
                setError(data.message || 'Login Failed');
            }
        } catch (err) {
            setError('An error occurred. Please try again!');
        } finally {
            setIsLoading(false);
        }
    };
    

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 px-4">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
                <h1 className="text-3xl font-bold text-center mb-2 text-blue-700">Welcome Back!</h1>
                <p className="text-center text-sm text-gray-500 mb-6">
                    Please login to your account
                </p>
                <form onSubmit={handleSubmit}>
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
                    <div className="text-right text-sm mb-4">
                        <a href="#" className="text-blue-500 hover:underline">Forgot password?</a>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition-colors duration-300"
                    >
                        Login
                    </button>
                </form>
                <p className="text-xs text-center text-gray-400 mt-6">
                    © 2025 FAZHARI BAKTI SEJAHTERA. All rights reserved.
                </p>
            </div>
        </div>
    );
}
