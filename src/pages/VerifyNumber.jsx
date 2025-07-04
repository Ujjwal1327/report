import { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase.js";
import s from "../assets/css/verifyNumber.module.css";

const VerifyNumber = () => {
    const [phoneNumber, setPhoneNumber] = useState("+917488865604");
    const [otp, setOtp] = useState("");

    const handleGetOTP = async () => {
        // Step 1: Set up reCAPTCHA only if it hasn't been created yet
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, "otp", {
                size: "invisible",
                callback: (response) => {
                    console.log("reCAPTCHA Solved:", response);
                },
            });

            await window.recaptchaVerifier.render();
        }

        // Step 2: Send OTP
        try {
            const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
            window.confirmationResult = confirmationResult;
            alert("OTP sent successfully!");
        } catch (error) {
            console.error("Error during signInWithPhoneNumber:", error);
            alert("Failed to send OTP");
        }
    };

    const handleVerifyOTP = async () => {
        try {
            const result = await window.confirmationResult.confirm(otp);
            alert("Phone number verified successfully!");
            console.log("User:", result.user);
        } catch (error) {
            console.error("OTP verification failed:", error);
            alert("Invalid OTP");
        }
    };

    return (
        <div className={s.VerifyNumber}>
            {/* 👇 Required for invisible reCAPTCHA */}
            <div id="otp"></div>

            <div className={s.container}>
                <div className={s.left}>
                    <div className={s.top}>
                        <h2>Verify Number</h2>
                        <p>Please confirm your Number to get the OTP</p>
                    </div>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label>Phone Number</label>
                            <input
                                type="text"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>

                        <button
                            type="button"
                            className={s.otp}
                            onClick={handleGetOTP}
                        >
                            Get OTP
                        </button>

                        <div>
                            <label>OTP</label>
                            <input
                                type="number"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </div>

                        <button type="button" onClick={handleVerifyOTP}>
                            Verify
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
    );
};

export default VerifyNumber;
