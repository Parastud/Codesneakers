import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

function Login() {
    const [isSignup, setIsSignup] = useState(false);
    const navigate = useNavigate();

    const toggleForm = () => {
        setIsSignup(!isSignup);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-800">
            <div className="bg-gray-700 p-8 rounded-lg shadow-lg max-w-md w-full">
                <div className="text-center mb-6">
                    <h2 className={`text-3xl font-bold text-white transition-all duration-500 transform ${isSignup ? "scale-110" : "scale-100"}`}>
                        {isSignup ? "Sign with us" : "Welcome"}
                    </h2>
                </div>
                <div className="flex justify-center mb-4">
                    <button
                        className={`py-2 px-4 rounded-l-lg transform transition-all duration-300 ${!isSignup ? 'bg-blue-600 text-white scale-110' : 'bg-gray-600 text-gray-400 scale-100'}`}
                        onClick={() => setIsSignup(false)}
                    >
                        Login
                    </button>
                    <button
                        className={`py-2 px-4 rounded-r-lg transform transition-all duration-300 ${isSignup ? 'bg-blue-600 text-white scale-110' : 'bg-gray-600 text-gray-400 scale-100'}`}
                        onClick={() => setIsSignup(true)}
                    >
                        Signup
                    </button>
                </div>
                <div>
                    {!isSignup ? <LoginForm navigate={navigate} /> : <SignupForm />}
                </div>
            </div>
        </div>
    );
}

const LoginForm = ({ navigate }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://52.66.45.131:9002/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                navigate('/home');
            } else {
                setError(data.message || 'An error occurred');
            }
        } catch (err) {
            console.error('Error:', err);
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <form onSubmit={handleLogin} className="space-y-4">
            {error && <div className="text-red-500">{error}</div>}
            <div>
                <input
                    type="text"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-700 bg-gray-900 text-white rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
            </div>
            <div>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-700 bg-gray-900 text-white rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
            </div>
            <div className="text-right flex justify-between">
                <NavLink to="/crew" className="text-blue-400">For Crew Login</NavLink>
                <NavLink to="/forgot" className="text-orange-400">Forgot password?</NavLink>
            </div>
            
            <div>
                <button
                    type="submit"
                    className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                    Login
                </button>
            </div>

        </form>
    );
};

const SignupForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(''); 

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(''); 

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('http://52.66.45.131:9002/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('Signup successful!'); 
            } else {
                setError(data.message || 'An error occurred');
            }
        } catch (err) {
            console.error('Error:', err);
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <form onSubmit={handleSignup} className="space-y-4">
            {error && <div className="text-red-500">{error}</div>}
            {success && <div className="text-green-500">{success}</div>} {/* Display success message */}
            <div>
                <input
                    type="text"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-700 bg-gray-900 text-white rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
            </div>
            <div>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-700 bg-gray-900 text-white rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
            </div>
            <div>
                <input
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-700 bg-gray-900 text-white rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
            </div>
            <div>
                <button
                    type="submit"
                    className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                    Signup
                </button>
            </div>
        </form>
    );
};

export default Login;
