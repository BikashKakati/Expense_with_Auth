import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase-config';
import { alertHandler } from "../services/store/slices/authSlice";
import { useDispatch } from 'react-redux';

function SignUp() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const Navigate = useNavigate();
    const dispatch = useDispatch();

    async function submitHandler(e) {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        try {
            if (password !== confirmPassword) {
                throw new Error("password didnot match");
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
                Navigate("/login");
            }
        } catch (err) {
            dispatch(alertHandler({ show: true, msg: err.message }))
        }
    }

    return (
        <div className='card max-w-[30rem] w-full shadow-md bg-base-100 mx-auto'>
            <div className="card-body items-center">
                <h2 className='card-title mb-6 text-2xl'>Sign up</h2>
                <form onSubmit={submitHandler}>
                    <div className="w-full card-actions gap-6">
                        <input type="email" placeholder="email" className="input input-bordered w-full" ref={emailRef} />
                        <input type="password" placeholder="******" className="input input-bordered w-full" ref={passwordRef} />

                        <input type="text" placeholder="confirm password" className="input input-bordered w-full" ref={confirmPasswordRef} />

                        <button type="submit" className='btn btn-info btn-block text-base'>Register</button>
                        <p className='text-center font-medium'>
                        <Link to="/login">Have an account? Login</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default SignUp