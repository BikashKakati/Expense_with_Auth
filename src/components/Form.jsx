import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useRef, useState } from 'react'
import { auth } from '../services/firebase-config';

function Form() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const [errPopup, setErrPopup] = useState({ show: false, msg: "" });

    async function submitHandler(e) {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        try {
            if (!email.length || !password.length || !confirmPassword.length) {
                throw new Error("fill all required details");
            } else if (password !== confirmPassword) {
                throw new Error("password didnot match");
            } else {
                const res = await createUserWithEmailAndPassword(auth, email, password);
                console.log(res.user);
            }
        } catch (err) {
            setErrPopup({ show: true, msg: `${err.message}` });
        }
    }
    return (
        <div className='card max-w-[30rem] w-full shadow-md bg-base-300 mx-auto'>
            <div className="card-body items-center">
                <h2 className='card-title'>Sign up</h2>
                {
                    errPopup.show &&
                    <div role="alert" className="alert alert-error">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{errPopup.msg}</span>
                    </div>
                }
                <form onSubmit={submitHandler}>
                    <div className="w-full card-actions gap-6">
                        <input type="email" placeholder="email" className="input input-bordered w-full" ref={emailRef} />
                        <input type="password" placeholder="******" className="input input-bordered w-full" ref={passwordRef} />
                        <input type="text" placeholder="confirm password" className="input input-bordered w-full" ref={confirmPasswordRef} />
                        <button type="submit" className='btn btn-info btn-block'>Sign up</button>
                        <p className='btn'>Have an account? Login</p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Form