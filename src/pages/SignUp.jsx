import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useRef, useState } from 'react'
import { auth } from '../services/firebase-config';
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Link } from 'react-router-dom';

function SignUp() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const [errPopup, setErrPopup] = useState({ show: false, msg: "" });

    useEffect(() => {
        if (errPopup.show) {
            const timer = setTimeout(() => {
                setErrPopup({ show: false, msg: "" });
            }, 2000)

            return () => {
                clearTimeout(timer);
            }
        }
    }, [errPopup.show])

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
            }
        } catch (err) {
            setErrPopup({ show: true, msg: err.message });
        }
        e.target.reset();
    }

    return (
        <div className='card max-w-[30rem] w-full shadow-md bg-base-100 mx-auto'>
            <div className="card-body items-center">
                <h2 className='card-title mb-6 text-2xl'>Sign up</h2>
                {
                    errPopup.show &&
                    <div role="alert" className="alert alert-error">
                        <InformationCircleIcon className='w-6 h-6' />
                        <span>{errPopup.msg}</span>
                    </div>
                }
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