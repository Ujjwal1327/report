import s from '../assets/css/forgotPassword.module.css'

import { useNavigate } from 'react-router-dom';
const ForgotPassword = () => {
    const navigate = useNavigate();
    return (
        <div className={s.forgot}>
            <div className={s.container}>
                <div className={s.left}>
                    <div class={s.top}>
                        <h2>Forgot Password?</h2>
                        <p>Enter your email for the verification process, we will send code to your email</p>
                    </div>
                    <form>
                        <div>
                            <label >Phone Number</label>
                            <input type="Number" />
                        </div>
                        <p>Or continue with email</p>
                        <div>
                            <label >Email</label>
                            <input type="Email" />
                        </div>
                        <button type='button' onClick={() => navigate('/verify-number')}>Continue</button>
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

export default ForgotPassword