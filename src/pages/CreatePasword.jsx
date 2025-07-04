import { useNavigate } from 'react-router-dom';
import s from '../assets/css/createPassword.module.css'
import { FaRegEyeSlash } from "react-icons/fa";


const CreatePassword = () => {
    const navigate = useNavigate()
    return (
        <div className={s.createPassword}>
            <div className={s.container}>
                <div className={s.left}>
                    <div class={s.top}>
                        <h2>Create password</h2>
                        <p>Please keep the password safe n secure</p>
                    </div>
                    <form>
                        <div>
                            <label for="">Enter New Password</label>
                            <div>
                                <input type="text" />
                                <FaRegEyeSlash className={s.icon} />
                            </div>
                        </div>
                        <div>
                            <label for="">Confirm New Password</label>
                            <div>
                                <input type="text" />
                                <FaRegEyeSlash className={s.icon} />
                            </div>
                        </div>
                        <button type='button' onClick={()=>navigate("/login")}>Submit</button>
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

export default CreatePassword