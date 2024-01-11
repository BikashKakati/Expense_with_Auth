import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../services/firebase-config';
import { alertHandler } from '../services/store/slices/authSlice';

function ResetPassword() {
    const resetEmailRef = useRef();
    const dispatch = useDispatch();

    async function submitHandler(e) {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, resetEmailRef.current.value);
            dispatch(alertHandler({ show: true, msg: "Check your email! to reset password" }));
        } catch (err) {
            dispatch(alertHandler({ show: true, msg: err.message }));
        }
    }
    return (
        <div className='card max-w-[30rem] w-full shadow-md bg-base-100 mx-auto'>
            <div className="card-body items-center">
                <h2 className='card-title mb-6 text-2xl'>Password Reset</h2>
                <form onSubmit={submitHandler}>
                    <div className="w-full card-actions gap-6">
                        <input type="email" placeholder="email" className="input input-bordered w-full" ref={resetEmailRef} />
                        <button type="submit" className='btn btn-info btn-block text-base'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword