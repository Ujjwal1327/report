import { Link, useNavigate } from 'react-router-dom'
import s from '../assets/css/Signup.module.css'
import { useContext, useState } from 'react'

import { createUserWithEmailAndPassword } from '@firebase/auth'
import { auth, db } from '../firebase.js'
import { doc, setDoc } from 'firebase/firestore'
import UserContext from '../context/UserContext.jsx'
const Signup = () => {
  const { setUserData } = useContext(UserContext);
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [number, setNumber] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const createUser = async (e) => {
    e.preventDefault()
    const isValid = validation();
    if (!isValid) return;
    setLoading(true);
    try {
      // ✅ Step 1: Create user in Firebase Auth with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // ✅ Step 2: Store additional user details (name, number, etc.) in Firestore
      // This creates a `users` collection, and document ID = user.uid
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        number,
        createdAt: new Date(),
      });
      setUserData({
        name,
        email,
        number,
        uid: user.uid,
      });

      navigate('/verify-email');
      setLoading(false);
    } catch (err) {
      console.error("Error creating user:", err);
      setError(err.message);
      setLoading(false);
    }

  }
  const validation = () => {
    if (!name || name.trim().length < 3) {
      setError("Please enter a valid name (min 3 characters).");
      return false;
    }


    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return false;
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(number)) {
      setError("Please enter a valid 10-digit Indian phone number.");
      return false;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
      );
      return false;
    }


    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }

    setError(""); // All validations passed
    return true;
  };


  return (
    <div className={s.signup}>
      <div className={s.container}>
        <div className={s.left}>
          <div className={s.top}>
            <h2>SignUp</h2>
            <p>Already have an account? <Link to="/login">Login</Link> </p>
          </div>
          <form onSubmit={createUser}>
            <div>
              <label htmlFor="name">Full Name</label>
              <input type="text" name="" id="name" value={name} onChange={(e) => { setName(e.target.value); if (error) setError(""); }} />
            </div>
            <div>
              <label htmlFor="email">Email Id</label>
              <input type="Email" name="" id="email" value={email} onChange={(e) => { setEmail(e.target.value); if (error) setError(""); }} />
            </div>
            <div>
              <label htmlFor="number">Phone Number</label>
              <input type="tel" name="" id="number" value={number} onChange={(e) => { setNumber(e.target.value); if (error) setError(""); }} />
            </div>
            <div className={s.password}>
              <div>
                <label htmlFor="password">password</label>
                <input type="password" name="" id="password" value={password} onChange={(e) => { setPassword(e.target.value); if (error) setError(""); }} />
              </div>
              <div>
                <label htmlFor="confirmPassword">Confirm password</label>
                <input type="password" name="" id="confirmPassword" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value); if (error) setError(""); }} />
              </div>
            </div>

            <button type='submit' >
              {loading ? "Signing Up..." : "SignUp"}
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

export default Signup