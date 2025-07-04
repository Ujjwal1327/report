import { Link } from 'react-router-dom'
import s from '../assets/css/Welcome.module.css'
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
    const navigate = useNavigate();
    return (
        <div className={s.welcome}>
            <div className={s.container}>
                <div className={s.left}>
                    <div className={s.top}>
                        <h2>Welcome</h2>
                        <p>Lets get started</p>
                    </div>
                    <div className={s.bottom}>
                        <p>Existing  customer / Get started </p>
                        <button type="button" onClick={() => navigate('/login')}>
                            SignIn
                        </button>
                        <p>New User? <Link to="/signup">Create new account.</Link> </p>
                    </div>
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

export default Welcome