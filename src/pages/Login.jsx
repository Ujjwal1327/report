import { Link } from 'react-router-dom'
import s from '../assets/css/Login.module.css'
const Login = () => {
    return (
        <div className={s.login}>
            <div className={s.container}>
                <div className={s.left}>
                    <div className={s.top}>
                        <h2>Login</h2>
                        <p>Please log in into your account</p>
                    </div>
                    <form>
                        <div>
                            <label>Username</label>
                            <input type="text" name="" id="" />
                        </div>
                        <div>
                            <div className={s.label}>
                                <label>Password</label>
                                <Link to="/forgot-password">Forgot password</Link>
                            </div>
                            <input type="password" name="" id="" />
                        </div>
                        <button type='button'>
                            Login
                        </button>
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