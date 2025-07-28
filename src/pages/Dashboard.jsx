import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import s from '../assets/css/dashboard.module.css'
import Sidebar from '../components/Sidebar';
const Dashboard = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (!user) {
                navigate('/login');
                return;
            }

            try {
                const userRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(userRef);

                if (docSnap.exists()) {
                    setUserData(docSnap.data());
                    console.log(userData)
                } else {
                    console.error("No such user doc in Firestore!");
                }
            } catch (err) {
                console.error("Error fetching user data:", err.message);
            } finally {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);
    if (loading) return <p>Loading dashboard...</p>;

    return (
        <div className={s.dashboard} >
            <div className={s.sidebar}>
                <Sidebar />
            </div>
        </div>
    );
};

export default Dashboard;
