import { Link, useLocation } from 'react-router-dom'
import s from '../assets/css/Login.module.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // adjust path as per your structure
import Spinner from '../components/Spinner';

const Login = () => {

    const location = useLocation()
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(location.state?.message || '');
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault(); // ✅ add this
        setError('');
        const isValid = validation();
        if (!isValid) return;
        setLoading(true); // ✅ Start loading
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (!user.emailVerified) {
                setError("Please verify your email before logging in.");
                setLoading(false); // ✅ end loading
                return;
            }
            navigate('/dashboard');
        } catch (err) {
            console.error("Login failed:", err.message);
            setError("Invalid email or password.");
        } finally {
            setLoading(false); // ✅ Stop loading in both cases
        }
    };
    const validation = () => {
        if (!email || !email.includes("@")) {
            setError("Please enter a valid email address.");
            return false;
        }
        if (!password) {
            setError(
                "Please enter password."
            );
            return false;
        }
        setError(""); // All validations passed
        return true;
    };
    useEffect(() => {
        // Clear message after showing once
        return () => setError('');
    }, []);
    return (
        <div className={s.login}>
            <div className={s.container}>
                <div className={s.left}>
                    <div className={s.top}>
                        <h2>Login</h2>
                        <p>Please log in into your account</p>
                    </div>
                    <form onSubmit={handleLogin}>
                        <div>
                            <label>Email</label>
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <div className={s.label}>
                                <label>Password</label>
                                <Link to="/forgot-password">Forgot password</Link>
                            </div>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type="submit" disabled={loading}>
                            {loading ? <Spinner /> : "Login"}
                        </button>
                        {
                            error && <p>{error}</p>
                        }
                    </form>
                </div>
                <div className={s.right}>
                    <div className={s.wrapper}>
                        <img src="/images/welcome.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login