import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = (props) => {
    const { showAlert } = props;
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    let history = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        if (!credentials.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(credentials.email)) {
            newErrors.email = 'Enter a valid email address';
        }
        if (!credentials.password.trim()) {
            newErrors.password = 'Password is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        setIsLoading(true);
        try {
            const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
            const response = await fetch(`${backendUrl}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: credentials.email,
                    password: credentials.password
                })
            });

            const json = await response.json();

            if (json.success) {
                //Save the auth token and redirect
                localStorage.setItem('token', json.Authtoken);
                showAlert("Logged in successfully!", "success");
                history('/');
            } else {
                showAlert(json.error || "Invalid Credentials", "danger");
            }
        } catch (error) {
            console.error('Login error:', error);
            showAlert("An error occurred during login. Please try again.", "danger");
        } finally {
            setIsLoading(false);
        }
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value
        });
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <motion.div
            className='container mt-3'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className='my-2 d-flex justify-content-center' style={{ color: props.mode === "dark" ? "white" : "#042743" }}>
                Login to continue to NoteSaver
            </h2>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        value={credentials.email}
                        onChange={onChange}
                        id="email"
                        name="email"
                        aria-describedby="emailHelp"
                        disabled={isLoading}
                        style={{
                            backgroundColor: props.mode === "dark" ? "rgb(9 48 80)" : "white",
                            color: props.mode === "dark" ? "white" : "#042743"
                        }}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <div className="input-group">
                        <input type={showPassword ? "text" : "password"} className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            value={credentials.password}
                            onChange={onChange}
                            id="password"
                            name="password"
                            disabled={isLoading}
                            style={{
                                backgroundColor: props.mode === "dark" ? "rgb(9 48 80)" : "white",
                                color: props.mode === "dark" ? "white" : "#042743"
                            }}
                        />
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={togglePasswordVisibility}
                            tabIndex="-1"
                        >
                            <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                        </button>
                    </div>
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>

                <motion.button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isLoading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {isLoading ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Logging In...
                        </>
                    ) : (
                        'Login'
                    )}
                </motion.button>
            </form>
        </motion.div>
    );
};

export default Login;
