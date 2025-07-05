import { useContext } from 'react';
import s from '../assets/css/verifyEmail.module.css';
import UserContext from '../context/UserContext';
import { auth, db } from '../firebase';
import { sendEmailVerification, updateEmail } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';

const VerifyEmail = () => {
    const { userData, setUserData } = useContext(UserContext);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = auth.currentUser;
            if (!user) {
                alert("User not logged in.");
                return;
            }

            // Step 1: Update email in Firebase Auth
            if (user.email !== userData.email) {
                await updateEmail(user, userData.email);
            }

            // Step 2: Update in Firestore
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, {
                email: userData.email,
            });

            // Step 3: Send verification email with redirect
            await sendEmailVerification(user, {
                url: 'http://localhost:5173/login', // ✅ update to your actual domain
                handleCodeInApp: false
            });
            alert("Verification email sent. Please check your inbox.");
        } catch (error) {
            console.error("Error during email verification process:", error.message);
            alert("Something went wrong: " + error.message);
        }

    };
    return (
        <div className={s.verifyEmail}>
            <div className={s.container}>
                <div className={s.left}>
                    <div className={s.top}>
                        <h2>Email Verification - {userData.name}</h2>
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
