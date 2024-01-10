import {signInWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useRef, useState } from 'react'
import { auth } from '../services/firebase-config';
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useDispatch } from 'react-redux';
import { login } from '../services/store/slices/authSlice';
import { Link } from 'react-router-dom';

function LogIn() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errPopup, setErrPopup] = useState({ show: false, msg: "" });
  const dispatch = useDispatch();

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
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const userDetails = {
        email: user.email,
        token: user.accessToken,
        uid: user.uid,
        isEmailVerified: user.emailVerified,
      }
      dispatch(login(userDetails));
    } catch (err) {
      setErrPopup({ show: true, msg: err.message });
    }
    e.target.reset();
  }

  return (
    <div className='card max-w-[30rem] w-full shadow-md bg-base-100 mx-auto'>
      <div className="card-body items-center">
        <h2 className='card-title mb-6 text-2xl'>Log in</h2>
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
            <button type="submit" className='btn btn-info btn-block text-base'>Submit</button>
            <p className='text-center font-medium'>
              <Link to="/signup">Create an account!</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LogIn