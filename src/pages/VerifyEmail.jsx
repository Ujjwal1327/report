import { useContext } from 'react';
import s from '../assets/css/verifyEmail.module.css';
import UserContext from '../context/UserContext';

const VerifyEmail = () => {
    const { userData, setUserData } = useContext(UserContext);
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(userData)
    }
    return (
        <div className={s.verifyEmail}>
            <div className={s.container}>
                <div className={s.left}>
                    <div className={s.top}>
                        <h2>Email Verification</h2>
                        <p>Please confirm your Email to get the link</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Email Id</label>
                            <input
                                type="email"
                                value={userData.email}
                                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            />
                        </div>

                        <button type="submit">Verify</button>
                    </form>
                </div>
                <div className={s.right}>
                    <div className={s.wrapper}>
                        <img src="/images/welcome.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;
