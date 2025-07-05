import { Link } from 'react-router-dom'
import s from '../assets/css/Login.module.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // adjust path as per your structure

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault(); // ✅ add this
        setError('');
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (!user.emailVerified) {
                setError("Please verify your email before logging in.");
                return;
            }
            navigate('/dashboard');
        } catch (err) {
            console.error("Login failed:", err.message);
            setError("Invalid email or password.");
        }
    };

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
                        <button type='submit'>
                            Login
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